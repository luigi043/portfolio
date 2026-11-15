const { chromium, expect: baseExpect } = require('../react-portfolio-candidate/node_modules/@playwright/test');
const expect=baseExpect.configure({timeout:30000});
const fs=require('node:fs');
const demos=require('../assets/projects/local-demos.json');
async function main() {
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const results=[];
 try {
  for(const [kind,origin] of [['static','http://127.0.0.1:5185'],['react','http://127.0.0.1:3100']]) {
   const localContext=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
   const page=await localContext.newPage();
   await page.goto(origin,{waitUntil:'networkidle'});
   const linkCount=Object.values(demos).reduce((count,links)=>count+links.length,0);
   await expect(page.locator('[data-local-demo] a')).toHaveCount(linkCount);
   for(const [slug,links] of Object.entries(demos)) {
    for(const link of links) await expect(page.locator(`[data-local-demo="${slug}"] a[href="${link.url}"]`)).toBeVisible();
    const caseUrl=`${origin}/projects/${slug}${kind==='static'?'.html':''}`;
    const check=await page.context().newPage();await check.goto(caseUrl,{waitUntil:'networkidle'});
    await expect(check.locator('[data-local-demo] a')).toHaveCount(links.length);await check.close();
   }
   await page.locator('[data-local-demo]').first().evaluate(e=>window.scrollTo(0,scrollY+e.getBoundingClientRect().top-500));
   await page.screenshot({path:`docs/showcase/${kind}-local-demos.png`});
   await localContext.close();
   const context=await browser.newContext();
   await context.route('http://portfolio-demo.test/**',async route=>{
    const url=route.request().url().replace('http://portfolio-demo.test',origin);
    const response=await route.fetch({url});await route.fulfill({response});
   });
   const publicPage=await context.newPage();
   for(const suffix of ['',`/projects/sferatagscanner${kind==='static'?'.html':''}`]) {
    await publicPage.goto('http://portfolio-demo.test'+suffix,{waitUntil:'networkidle'});
    await expect(publicPage.locator('[data-local-demo] a')).toHaveCount(0);
    await expect(publicPage.getByText('Local only · services must be running on this computer')).toHaveCount(0);
   }
   await context.close();
   results.push({kind,localHomepageLinks:linkCount,localCaseStudies:Object.keys(demos).length,publicHostnameLinks:0});
  }
 } finally {await browser.close();}
 fs.writeFileSync('docs/showcase/local-demo-links-verification.json',JSON.stringify(results,null,2)+'\n');console.log(results);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
