const { chromium } = require('../react-portfolio-candidate/node_modules/playwright');
const fs = require('node:fs');
const androidSlugs = new Set(require('../assets/projects/android.json').map(project => project.slug));
const records = require('../assets/projects/catalogue.json').filter(project => !androidSlugs.has(project.slug));
const assert = require('node:assert/strict');
async function run() {
 const browser = await chromium.launch({channel:'chrome',headless:true});
 const report=[];
 fs.mkdirSync('docs/showcase',{recursive:true});
 try {
  for (const [kind,base] of [['static','http://127.0.0.1:5185'],['react','http://127.0.0.1:3100']]) {
   for(const width of [390,1440]) {
    const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
    const errors=[]; page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base,{waitUntil:'networkidle'});
    assert.equal(await page.locator(kind==='static'?'[data-prepared-project]':'.featured-card').count(),kind==='static'?records.length:6);
    const section=page.locator(kind==='static'?'.prepared-section': '#projects').first();
    await section.scrollIntoViewIfNeeded();
    await page.locator(kind==='static'?'.prepared-project img':'.featured-card img').evaluateAll(async images=>{for(const image of images){image.loading='eager'; await image.decode();}});
    if(kind==='static') {
     await page.getByRole('button',{name:'Featured',exact:true}).click();
     assert.equal(await page.locator('[data-prepared-project]:visible').count(),6);
     await page.getByRole('button',{name:'All Projects',exact:true}).click();
     await page.locator('#project-search-input').fill('MiniLang');
     assert.equal(await page.locator('[data-prepared-project]:visible').count(),1);
     await page.locator('#project-search-input').fill('');
     const trigger=page.getByRole('button',{name:'Open Vehicle Build Cost Calculator preview',exact:true});
     await trigger.click();
     assert.equal(await page.locator('#project-preview-dialog').evaluate(e=>e.open),true);
     await page.keyboard.press('Escape');
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${kind} ${width}: overflow`);
    const firstCard=page.locator(kind==='static'?'.prepared-project':'.featured-card').first();
    await firstCard.evaluate(element => window.scrollTo(0,window.scrollY+element.getBoundingClientRect().top-180));
    await page.screenshot({path:`docs/showcase/${kind}-${width}.png`});
    for(const p of records) {
     const url=kind==='static'?`${base}/projects/${p.slug}.html`:`${base}/projects/${p.slug}`;
     const response=await page.goto(url,{waitUntil:'networkidle'});
     assert.equal(response.status(),200,url);
     assert.equal(await page.locator('h1').textContent(),p.title);
     await page.locator('img').evaluateAll(async images=>{for(const image of images){image.loading='eager';await image.decode();}});
     assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),url);
     assert.ok(await page.getByRole('link',{name:kind==='static'?'View GitHub source':'View repository',exact:true}).getAttribute('href')===p.repositoryUrl);
     assert.equal(await page.locator('a[href*="localhost"],a[href*="127.0.0.1"]').count(),p.demoSetup?0:p.slug==='bella-ops'?2:1);
    }
    assert.deepEqual(errors,[]);
    report.push({kind,width,routes:records.length,images:'decoded',overflow:false,pageErrors:errors});
    await page.close();
   }
  }
 } finally {await browser.close();}
 fs.writeFileSync('docs/showcase/browser-validation.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));
}
run().catch(e=>{console.error(e);process.exitCode=1;});
