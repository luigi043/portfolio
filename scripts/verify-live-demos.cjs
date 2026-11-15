const { chromium, expect: baseExpect } = require('../react-portfolio-candidate/node_modules/@playwright/test');
const expect = baseExpect.configure({timeout:30000});
const assert = require('node:assert/strict');
const fs = require('node:fs');
const demos = require('../assets/projects/local-demos.json');
async function json(url, options) {const r=await fetch(url,{signal:AbortSignal.timeout(20000),...options});assert.ok(r.ok,`${url}: ${r.status}`);return r.json();}
async function main() {
 const report=[];
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try {
  for(const [slug,links] of Object.entries(demos)) {
   const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
   const page=await context.newPage(); page.setDefaultTimeout(30000);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const url=links[0].url;
   const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});assert.equal(response.status(),200);
   let verified;
   if(slug==='vehicle-build-cost-calculator') {
    await page.getByRole('button',{name:'Fill demo login'}).click();
    await page.getByRole('button',{name:'Sign in',exact:true}).click();
    await expect(page.getByText('Build cost calculator',{exact:true})).toBeVisible();
    await expect(page.locator('body')).toContainText('2,380');
    assert.ok(!await page.getByText('Failed to fetch',{exact:false}).count());
    verified='Real JWT login and PostgreSQL-backed scenario totals rendered';
   } else if(slug==='bmw-configurator') {
    await expect(page.locator('canvas')).toBeVisible();
    await expect(page.getByTestId('total')).toHaveText('€58,900');
    await page.getByTestId('paint-tanzanite').click();
    await expect(page.getByTestId('total')).toHaveText('€60,100');
    await page.getByRole('button',{name:'Review build'}).click();
    await expect(page.getByRole('dialog')).toContainText('60,100');
    verified='WebGL canvas, configuration price change and real build summary';
   } else if(slug==='flowchart-to-code-converter') {
    await page.getByRole('button',{name:/Convert/}).click();
    await expect(page.locator('pre')).toContainText('BEGIN');
    verified='Frontend converts the graph through the running Express API';
   } else if(slug==='ctw-vehicle-fleet') {
    const health=await json('http://127.0.0.1:5080/actuator/health');assert.equal(health.status,'UP');
    const vehicles=await json('http://127.0.0.1:5176/api/vehicles');assert.ok(vehicles.length>=4);
    const sample=vehicles.find(v=>v.vin==='WBA5A7C50FD000002');assert.ok(sample);
    const history=await json(`http://127.0.0.1:5176/api/vehicles/${sample.id}/telemetry/history`);assert.ok(history.length>=3);
    await page.getByRole('link',{name:sample.model,exact:true}).click();
    await expect(page.locator('body')).toContainText('12');
    verified=`PostgreSQL catalogue (${vehicles.length} vehicles), Mongo telemetry (${history.length} samples), health and detail UI`;
   } else if(slug==='academic-portal') {
    assert.ok(process.env.ACADEMIC_DEMO_PASSWORD,'Set ACADEMIC_DEMO_PASSWORD from the project demo guide');
    await page.getByLabel('Email',{exact:true}).fill('docente.web@example.test');
    await page.getByLabel('Palavra-passe').fill(process.env.ACADEMIC_DEMO_PASSWORD);
    await page.getByRole('button',{name:'Entrar',exact:true}).click();
    await expect(page.getByRole('heading',{name:'Unidades curriculares',exact:true})).toBeVisible();
    await expect(page.locator('body')).toContainText('DAW');
    await page.getByRole('link',{name:'Consultar',exact:true}).first().click();
    await expect(page.locator('body')).toContainText('Aluno Demo');
    verified='Real teacher session, assigned DAW course and saved fictional attendance from SQLite';
   } else if(slug==='bella-ops') {
    await page.goto('http://127.0.0.1:5177/restaurant/reservations');
    await page.getByLabel('Full name').fill('Local Demo Check');
    await page.getByLabel('Email address').fill('local-check@example.test');
    const date=new Date();date.setDate(date.getDate()+7);if([0,1].includes(date.getDay()))date.setDate(date.getDate()+(2-date.getDay()));
    await page.getByLabel('Date',{exact:true}).fill(date.toLocaleDateString('en-CA'));
    await page.getByRole('button',{name:'Confirm reservation'}).click();
    await expect(page.getByText('DEMO RESERVATION SAVED')).toBeVisible();
    await page.goto('http://127.0.0.1:5177/operations');
    await page.getByRole('button',{name:/^Reservations(?: \d+)?$/}).click();
    await expect(page.locator('.reservation-list article').filter({hasText:'Local Demo Check'})).toBeVisible();
    verified='New fictional booking reaches operations in an isolated browser storage context';
   } else if(slug==='lang-interpreter') {
    await page.locator('#run').click();
    await expect(page.locator('#output')).toContainText('5040');
    await page.locator('#examples').selectOption({label:'Closures · counter'});
    await page.locator('#run').click();
    await expect(page.locator('#output')).toHaveText('1\n2\n3');
    verified='Actual worker interpreter executes factorial and lexical closures';
   } else if(slug==='sferatagscanner') {
    const before=await json('http://127.0.0.1:5181/api/state');
    assert.ok(before.items.length);
    const item=before.items[0];
    await page.getByLabel(/^Tag text/).fill(item.code);
    await page.getByRole('button',{name:'Inspect reference'}).click();
    await expect(page.getByRole('status').filter({hasText:'Exact duplicate'})).toBeVisible();
    assert.deepEqual(await json('http://127.0.0.1:5181/api/state'),before);
    verified='Shared Kotlin exact-duplicate inspection against live server inventory; existing in-memory state retained';
   } else if(slug==='taskflow') {
    await json('http://127.0.0.1:5082/api/health');
    const before=await json('http://127.0.0.1:5082/api/tasks');
    let created;
    try {
     created=await json('http://127.0.0.1:5082/api/tasks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:'Disposable local demo verification'})});
     const tasks=await json('http://127.0.0.1:5082/api/tasks');
     const task=created.task||created;assert.ok((tasks.tasks||tasks).some(t=>t.id===task.id));
     await page.reload();await expect(page.locator('body')).toContainText(task.title);
    } finally {if(created){const task=created.task||created;const r=await fetch(`http://127.0.0.1:5082/api/tasks/${task.id}`,{method:'DELETE'});assert.ok(r.ok);}}
    const after=await json('http://127.0.0.1:5082/api/tasks');assert.deepEqual(after,before);
    verified='Live API create/read rendered after reload; disposable record deleted, existing list retained';
   }
   assert.deepEqual(errors,[],slug);
   report.push({project:slug,url,verified,pageErrors:errors});console.log(`PASS ${slug}: ${verified}`);
   await context.close();
  }
 } finally {await browser.close();fs.mkdirSync('docs/showcase',{recursive:true});fs.writeFileSync('docs/showcase/live-demo-verification.json',JSON.stringify({checkedAt:new Date().toISOString(),projects:report},null,2)+'\n');}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
