const {chromium,expect:baseExpect}=require('../react-portfolio-candidate/node_modules/@playwright/test');
const expect=baseExpect.configure({timeout:30000});
const assert=require('node:assert/strict');const fs=require('node:fs');
async function main(){
 const browser=await chromium.launch({channel:'chrome',headless:true});const report=[];
 const base='http://127.0.0.1:5181';
 const before=await (await fetch(base+'/api/state')).json();assert.ok(before.items.length);
 try{
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.getByLabel(/^Tag text/).fill(before.items[0].code);
  await page.getByRole('button',{name:'Inspect reference'}).click();await expect(page.getByRole('status').filter({hasText:'Exact duplicate'})).toBeVisible();
  await page.getByRole('button',{name:'Register entry',exact:true}).click();await expect(page.getByRole('status').filter({hasText:'Exact duplicate: use'})).toBeVisible();
  await page.getByLabel('Search inventory').fill(before.items[0].code);await expect(page.locator('#rows tr')).toHaveCount(1);
  const invalid=await page.request.post(base+'/api/in',{form:{text:'bad tag',quantity:'0'}});assert.equal(invalid.status(),400);
  await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:'docs/showcase/sfera-live-390.png',fullPage:true});
  assert.deepEqual(await(await fetch(base+'/api/state')).json(),before);assert.deepEqual(errors,[]);await page.close();
  report.push({demo:base,sharedKotlinInspection:true,duplicateEntryRejected:true,invalidInputRejected:true,existingStateUnchanged:true,mobileOverflow:false,pageErrors:errors});
  for(const [kind,origin] of [['static','http://127.0.0.1:5185'],['react','http://127.0.0.1:3100']]){
   for(const width of [390,1440]){
    const p=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});const pageErrors=[];p.on('pageerror',e=>pageErrors.push(e.message));
    await p.goto(origin);await expect(p.getByRole('heading',{name:'Sfera Tag Scanner',exact:true})).toHaveCount(1);
    const card=p.locator('#android [data-android-project="sferatagscanner"]');
    const url=origin+'/projects/sferatagscanner'+(kind==='static'?'.html':'');
    await card.getByRole('link',{name:/Read case study/}).click();await expect(p).toHaveURL(url);await expect(p.getByRole('heading',{name:'Sfera Tag Scanner',exact:true})).toBeVisible();
    await expect(p.getByRole('link',{name:'Local companion demo ↗',exact:true})).toHaveAttribute('href',base+'/');
    await expect(p.getByRole('link',{name:'Try interactive demo',exact:true})).toHaveCount(0);
    await p.locator('img').evaluateAll(async images=>{for(const i of images){i.loading='eager';await i.decode();}});
    await expect(p.locator('img[alt="Sfera Tag Scanner running in the Android emulator"]')).toHaveCount(1);
    assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(pageErrors,[]);
    await p.screenshot({path:`docs/showcase/sfera-${kind}-${width}.png`});await p.close();report.push({kind,width,route:url,imagesDecoded:true,overflow:false,pageErrors});
   }
  }
 }finally{await browser.close();}
 fs.writeFileSync('docs/showcase/sfera-integration-verification.json',JSON.stringify({checkedAt:new Date().toISOString(),results:report},null,2)+'\n');console.log(report);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
