# Running the nine local project demos

These demos run locally and use fictional data for verification. The project checkouts and builds live in a separate folder. The portfolio contains screenshots and links.

## Start, check and stop

From the portfolio workspace in PowerShell 7:

```powershell
./scripts/demo-hub.ps1 Start -ArtifactsRoot "C:/path/to/demo-artifacts"
./scripts/demo-hub.ps1 Status
./scripts/demo-hub.ps1 Stop
```

For Sfera alone, use `./scripts/demo-hub.ps1 Start -ArtifactsRoot "C:/path/to/demo-artifacts" -Project Sfera` (or `Status` / `Stop`). This avoids Docker and other demos entirely. An already-running companion is reused without resetting its server-side inventory; Stop only terminates a Java process actually started and recorded by this hub, never the pre-existing preparation process.

Sfera uses the documented `demo/build.ps1` and `demo/start.ps1 -Port 5181` runtime, not Node. Build first from `2026-10-29/sferatagscanner/work/sferatagscanner` with JDK 17 or 21. The hub reads the prepared `demo/build/runtime.txt` and invokes the same Java command (`-Xms16m -Xmx128m`, shared compiled Kotlin rules, `ServerKt`, port 5181 and demo asset root) directly so there is no child tree to kill. `-SferaJavaHome` accepts an explicit JDK; otherwise JAVA_HOME or this machine's known JDK 17 is used. JDK 25 is rejected. Missing compiled runtime produces an instruction to run the documented build; first-build Maven access is not silently performed. Restart loses the companion's in-memory inventory/history; there is no browser persistence.

`Start` reuses occupied ports, starts the three documented Docker Compose projects with existing images and retained data, restores missing APIs and serves the prepared frontend builds. It does not rebuild dependencies or reset/seed data. Missing builds produce an actionable failure rather than installing or guessing. If Docker is stopped, it launches Docker Desktop and asks you to retry after startup. Set the path with `-ArtifactsRoot` or the `PORTFOLIO_DEMO_ARTIFACTS_ROOT` environment variable.

The lightweight frontend host serves Calculator, Drive Studio, Flowchart, Bella and MiniLang in one Node process while preserving their separate origins. The Flowchart origin forwards `/api/` to its Express API. Fleet uses its existing nginx container; TaskFlow services already running at the start of this work are reused.

`Status` reports listeners, not successful database-backed behavior. `node scripts/verify-live-demos.cjs` performs the actual browser/data checks. Before running it, set `ACADEMIC_DEMO_PASSWORD` to the synthetic teacher password documented in the Academic Portal output guide. No real credentials or data are needed. The verifier creates a booking in its own disposable browser context and creates/deletes exactly one disposable API task, retaining the original task list.

`Stop` stops only processes started by this hub after matching PID, creation time and executable. It stops only Compose containers recorded as newly started by the hub, with matching Compose project labels. Pre-existing services, including reused TaskFlow and containers started before the hub's initial invocation, are deliberately retained. No volumes or files are deleted. State and logs are in the ignored `.demo-hub` directory. Do not delete this state while managed processes are running.

To explicitly stop the retained Docker demos when finished, use the exact project/compose pairs below with `docker compose -p <project> -f <file> stop`; never use `down -v`:

| Project | Compose file relative to ArtifactsRoot |
|---|---|
| repository | 2026-10-28/vehicle-build-cost-calculator/work/repository/docker-compose.yml |
| ctw-portfolio | 2026-10-29/ctw-vehicle-fleet/work/repo/docker-compose.yml |
| academic-portal | 2026-10-29/academic-portal/work/projeto_psa/compose.yaml |

TaskFlow's own `scripts/start-demo.ps1` and `.demo/pids.json` remain authoritative for its pre-existing services. Verify current process identity before stopping those PIDs; this hub never stops arbitrary Node processes or claims ownership of them.

## Links

| Project | Local URL | API/data |
|---|---|---|
| Vehicle Build Cost Calculator | http://127.0.0.1:5173/ | ASP.NET Core 5078, PostgreSQL 5436 |
| Drive Studio | http://127.0.0.1:5174/ | Browser/WebGL |
| Flowchart-to-Code | http://127.0.0.1:5175/ | Express 5079 via same-origin proxy |
| CTW Vehicle Fleet | http://127.0.0.1:5176/ | Spring Boot 5080, PostgreSQL and MongoDB |
| Academic Portal | http://127.0.0.1:5081/ | Laravel session and retained SQLite |
| Bella Ops | http://127.0.0.1:5177/restaurant/home | Browser-local storage |
| Bella operations | http://127.0.0.1:5177/operations | Same browser/origin as customer site |
| MiniLang | http://127.0.0.1:5178/ | Actual interpreter in a Web Worker |
| TaskFlow | http://127.0.0.1:5179/ | Express 5082 with retained file-backed tasks |
| Sfera Tag Scanner | http://127.0.0.1:5181/ | Shared Kotlin rules; synthetic server-side in-memory inventory/history |

Calculator provides **Fill demo login**. Academic Portal requires the synthetic teacher account in its existing output guide. The other demos need no login. Do not enter actual personal, customer or payment data. Bella's optional sample setup is `/demo.html`; loading it replaces only that browser origin's Bella demo keys, so it is not run against the user's existing browser state by this hub.

## Portfolio links and public behavior

The React preview is http://127.0.0.1:3100/#projects; the static preview is http://127.0.0.1:5185/#projects. Both show local links on all nine cards and case studies; Bella also links its operations console. Sfera's action is explicitly **Local companion demo**, not a native Android/emulator claim. These affordances render only when the portfolio hostname is exactly localhost, 127.0.0.1 or IPv6 loopback. Server-rendered React HTML emits no demo links. On a public hostname, the existing screenshots, case studies and source links remain and no localhost links appear. Local buttons mean a local origin is configured, not an automatic health monitor.

The registry is `assets/projects/local-demos.json`. `scripts/prepare-showcase.cjs` rebuilds the static placeholders and synchronizes the React copy. `js/local-demo-links.js` and React's `LocalDemoLinks` apply hostname checks before creating anchors. `scripts/verify-local-demo-links.cjs` verifies both real local origins and a simulated public hostname in Chrome.

## Verification and resource use

See `live-demo-verification.json` for actual application checks, including JWT-backed calculator totals, configured 3D pricing/summary, Express conversion, persisted vehicle telemetry, teacher-assigned attendance, customer/operations booking handoff, factorial/closures and API-backed task creation/reload/cleanup. The independent fleet verifier also passed CRUD, validation, duplicate VIN handling and Mongo telemetry history; Flowchart's API smoke executed generated JavaScript for negative, zero and odd inputs.

All eight stacks were simultaneously listening and functionally exercised on this machine. Available physical memory varied from roughly 0.6 GB to 1.6 GB during recovery/verification out of about 18 GB. This is a resource-constrained local setup; checks were run sequentially and prepared frontend builds were used to avoid five separate dev servers. This is not a load/performance benchmark or a guarantee that other heavy apps can run concurrently. No app had to be omitted.

The calculator launcher explicitly uses its API project directory so `appsettings.Development.json` loads the intended PostgreSQL port. A process listening on 5078 with the wrong content root can still serve HTTP while database-backed login fails; the functional check catches this case.

Final portfolio checks: 11 static checks passed; two focused React tests passed for server rendering without loopback anchors and the eight-project registry; ESLint and the Next.js production build passed. Chrome verified nine homepage links and all eight case-study link groups in each portfolio, then verified zero local-demo anchors on a simulated public hostname for each homepage and Bella case study. See `local-demo-links-verification.json` and the `*-local-demos.png` captures. The updated React production server and both portfolio previews were left running.

Sfera follow-up on 30 October: see `SFERA-INTEGRATION.md` and `sfera-integration-verification.json` for current nine-project checks. Native Android SDK/build, physical camera/OCR, Room persistence and RFID hardware remain unverified; RFID adapters are unfinished. The companion uses synthetic text, not scanned physical tags. No account/key is required. Integration checks inspect existing records and reject an exact duplicate without writing/resetting inventory.
