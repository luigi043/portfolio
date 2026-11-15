param(
 [ValidateSet('Start','Status','Stop')][string]$Action='Status',
 [string]$ArtifactsRoot=$env:PORTFOLIO_DEMO_ARTIFACTS_ROOT,
 [string]$SferaJavaHome=$env:JAVA_HOME,
 [ValidateSet('All','Sfera')][string]$Project='All'
)
$ErrorActionPreference='Stop'
$workspace=Split-Path $PSScriptRoot -Parent
$stateDir=Join-Path $workspace '.demo-hub'
New-Item -ItemType Directory -Path $stateDir -Force | Out-Null
$statePath=Join-Path $stateDir 'state.json'
$state=@{processes=@();containers=@()}
if(Test-Path $statePath){$state=Get-Content $statePath -Raw | ConvertFrom-Json -AsHashtable}
function Save-State { $state | ConvertTo-Json -Depth 8 | Set-Content $statePath }
function Listening($port) { return $port -in [System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpListeners().Port }
function Start-Owned($name,$executable,$arguments,$directory) {
 $process=Start-Process -FilePath $executable -ArgumentList $arguments -WorkingDirectory $directory -WindowStyle Hidden -RedirectStandardOutput (Join-Path $stateDir "$name.log") -RedirectStandardError (Join-Path $stateDir "$name-error.log") -PassThru
 $state.processes+=@{name=$name;pid=$process.Id;started=$process.StartTime.ToUniversalTime().ToString('o');executable=$executable}
 Save-State
}
$projects=@(
 @{name='calculator';dir='2026-10-28/vehicle-build-cost-calculator/work/repository';port=5173;api=5078;build='frontend/dist'},
 @{name='drive-studio';dir='2026-10-28/bmw-configurator/work/repo';port=5174;build='dist'},
 @{name='flowchart';dir='2026-10-28/flowchart-to-code/app';port=5175;api=5079;build='frontend/dist'},
 @{name='fleet';dir='2026-10-29/ctw-vehicle-fleet/work/repo';port=5176;api=5080},
 @{name='academic';dir='2026-10-29/academic-portal/work/projeto_psa';port=5081},
 @{name='bella';dir='2026-10-29/bella-ops/work/restaurant-app';port=5177;build='dist/restaurant-web-app/browser'},
 @{name='minilang';dir='2026-10-29/minilang-interpreter/work/minilang';port=5178;build='playground-dist'},
 @{name='taskflow';dir='2026-10-29/taskflow/work/taskflows';port=5179;api=5082;build='client/dist'},
 @{name='sfera';dir='2026-10-29/sferatagscanner/work/sferatagscanner';port=5181}
)
if($Action -eq 'Stop') {
 foreach($record in $state.processes) {
  if($Project -eq 'Sfera' -and $record.name -ne 'sfera-companion'){continue}
  $process=Get-Process -Id $record.pid -ErrorAction SilentlyContinue
  if($process -and $process.StartTime.ToUniversalTime().Ticks -eq ([datetime]$record.started).ToUniversalTime().Ticks -and $process.Path -eq $record.executable) {Stop-Process -Id $process.Id; Write-Output "Stopped owned $($record.name)"}
 }
 foreach($record in $state.containers) {
  if($Project -eq 'Sfera'){continue}
  $inspect=& docker inspect $record.id 2>$null | ConvertFrom-Json
  if($LASTEXITCODE -eq 0 -and $inspect[0].Config.Labels.'com.docker.compose.project' -eq $record.project) {& docker stop $record.id | Out-Null}
 }
 if($Project -eq 'Sfera'){$state.processes=@($state.processes | Where-Object name -ne 'sfera-companion')}
 else {$state=@{processes=@();containers=@()}}
 Save-State
 Write-Output 'Pre-existing services and database volumes were retained.'
 exit
}
if($Action -eq 'Start') {
 if([string]::IsNullOrWhiteSpace($ArtifactsRoot) -or -not (Test-Path -LiteralPath $ArtifactsRoot -PathType Container)) {
  throw 'Set -ArtifactsRoot or PORTFOLIO_DEMO_ARTIFACTS_ROOT to the demo artifacts directory.'
 }
 if($Project -eq 'All') {
 & docker info --format '{{.ServerVersion}}' 2>$null | Out-Null
 if($LASTEXITCODE -ne 0) {Start-Process 'C:/Program Files/Docker/Docker/Docker Desktop.exe' -WindowStyle Hidden; throw 'Docker is starting. Retry Start after Docker is ready.'}
 foreach($spec in @(@{project='repository';dir=$projects[0].dir;file='docker-compose.yml'},@{project='academic-portal';dir=$projects[4].dir;file='compose.yaml'},@{project='ctw-portfolio';dir=$projects[3].dir;file='docker-compose.yml'})) {
  $before=@(& docker ps -q --filter "label=com.docker.compose.project=$($spec.project)")
  $compose=Join-Path (Join-Path $ArtifactsRoot $spec.dir) $spec.file
  & docker compose -p $spec.project -f $compose up -d --no-build
  if($LASTEXITCODE -ne 0){throw "Compose failed: $($spec.project)"}
  foreach($id in @(& docker ps -q --filter "label=com.docker.compose.project=$($spec.project)")) {
   if($id -and $id -notin $before){$state.containers+=@{id=$id;project=$spec.project};Save-State}
  }
 }
 }
 $node=if($Project -eq 'All'){(Get-Command node.exe).Source}else{$null}
 if(!(Listening 5181)) {
  $demo=Join-Path (Join-Path $ArtifactsRoot $projects[8].dir) 'demo'
  $runtimeFile=Join-Path $demo 'build/runtime.txt'
  if(!(Test-Path $runtimeFile)){throw 'Build Sfera first with demo/build.ps1 using JDK 17 or 21; no state will be reset by this hub.'}
  if(!$SferaJavaHome){$SferaJavaHome=Join-Path $env:USERPROFILE '.jdks/jbr-17.0.14'}
  $java=Join-Path $SferaJavaHome 'bin/java.exe'
  if(!(Test-Path $java)){throw 'Set -SferaJavaHome to a JDK 17 or 21 installation.'}
  $version=(& $java -version 2>&1 | Out-String)
  if($version -notmatch 'version "(17|21)\.') {throw 'Sfera requires JDK 17 or 21; JDK 25 is incompatible.'}
  $runtime=(Get-Content $runtimeFile -Raw).Trim()
  # Equivalent to demo/start.ps1: run the actual Kotlin server directly so no child tree needs termination.
  Start-Owned 'sfera-companion' $java @('-Xms16m','-Xmx128m','-cp',('"'+$runtime+'"'),'ServerKt','5181',('"'+$demo+'"')) (Split-Path $demo -Parent)
 }
 if($Project -eq 'All') {
 $calculator=Join-Path $ArtifactsRoot $projects[0].dir
 if(!(Listening 5078)) {
  $dotnet=Join-Path $ArtifactsRoot '2026-10-28/vehicle-build-cost-calculator/work/dotnet/dotnet.exe'
  $env:DOTNET_ROOT=Split-Path $dotnet -Parent
  $env:ASPNETCORE_ENVIRONMENT='Development'
  try {Start-Owned 'calculator-api' $dotnet @('bin/Debug/net10.0/VehicleBuildCostCalculator.Api.dll','--urls','http://127.0.0.1:5078') (Join-Path $calculator 'backend/src/VehicleBuildCostCalculator.Api')}
  finally {Remove-Item Env:ASPNETCORE_ENVIRONMENT -ErrorAction SilentlyContinue}
 }
 if(!(Listening 5079)) {
  $previousPort=$env:PORT;$env:PORT='5079'
  try {Start-Owned 'flowchart-api' $node @('dist/index.js') (Join-Path (Join-Path $ArtifactsRoot $projects[2].dir) 'backend')}
  finally {$env:PORT=$previousPort}
 }
 if(!(Listening 5082)) {
  $env:PORT='5082';$env:HOST='127.0.0.1';$env:CLIENT_ORIGIN='http://127.0.0.1:5179'
  $server=Join-Path (Join-Path $ArtifactsRoot $projects[7].dir) 'server'
  $env:TASK_DATA_FILE=Join-Path $server 'data/tasks.json'
  try {Start-Owned 'taskflow-api' $node @('src/index.js') $server}
  finally {Remove-Item Env:PORT,Env:HOST,Env:CLIENT_ORIGIN,Env:TASK_DATA_FILE -ErrorAction SilentlyContinue}
 }
 $frontends=@()
 foreach($p in $projects) {
  if($p.build -and !(Listening $p.port)) {
   $root=Join-Path (Join-Path $ArtifactsRoot $p.dir) $p.build
   if(!(Test-Path (Join-Path $root 'index.html'))){throw "Missing prepared build: $root. Follow this project's output demo guide."}
   $entry=@{name=$p.name;port=$p.port;root=$root}
   if($p.name -eq 'flowchart'){$entry.api=5079}
   $frontends+=$entry
  }
 }
 if($frontends.Count) {
  $config=Join-Path $stateDir "frontends-$([DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()).json"
  ConvertTo-Json -InputObject @($frontends) -Depth 5 | Set-Content $config
  Start-Owned "frontend-host-$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())" $node @(('"'+(Join-Path $PSScriptRoot 'demo-static-host.cjs')+'"'),('"'+$config+'"')) $workspace
 }
 }
}
if($Project -eq 'Sfera'){$projects=@($projects | Where-Object name -eq 'sfera')}
if($Action -eq 'Start') {
 $deadline=[DateTime]::UtcNow.AddSeconds(30)
 do {
  $missing=@($projects | Where-Object { !(Listening $_.port) -or ($_.api -and !(Listening $_.api)) })
  if(!$missing.Count){break}
  Start-Sleep -Milliseconds 500
 } while([DateTime]::UtcNow -lt $deadline)
}
foreach($p in $projects) {
 $web=Listening $p.port
 $api=if($p.api){Listening $p.api}else{$null}
 [PSCustomObject]@{Project=$p.name;URL="http://127.0.0.1:$($p.port)";WebListening=$web;APIListening=$api}
}
Write-Output 'Listening ports are a process check only. Run scripts/verify-live-demos.cjs for application/data verification. Reused services are not stopped by Stop.'
