// Rebuild the static case studies and HTML cards from the reviewed catalogue.
const fs = require('node:fs');
const path = require('node:path');
const android = require('../assets/projects/android.json');
const androidSlugs = new Set(android.map(project => project.slug));
const records = require('../assets/projects/catalogue.json').filter(project => !androidSlugs.has(project.slug));
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const list = values => `<ul>${values.map(v => `<li>${escape(v)}</li>`).join('')}</ul>`;
const localSlot = p => `<div data-local-demo="${p.slug}"></div>`;
const gallery = p => p.gallery ? `<section class="companion-gallery" aria-label="Companion screenshot gallery">${p.gallery.map(i => `<figure><a href="../${i.src}"><img src="../${i.src}" alt="${escape(i.alt)}" width="${i.width}" height="${i.height}" loading="lazy"></a><figcaption>${escape(i.alt)}</figcaption></figure>`).join('')}</section>` : '';
fs.copyFileSync('assets/projects/local-demos.json', 'react-portfolio-candidate/src/data/local-demos.json');
fs.copyFileSync('assets/projects/android.json', 'react-portfolio-candidate/src/data/android.json');
fs.writeFileSync('react-portfolio-candidate/src/data/local-projects.json', JSON.stringify(records.filter(project => project.demoSetup), null, 2) + '\n');
fs.mkdirSync('projects', { recursive: true });
for (const project of android) {
  const { slug, title, shortSummary, screenshot, screenshotAlt, width, height, architecture, outcome } = project;
  const sourceLink = project.repositoryUrl ? `<a href="${escape(project.repositoryUrl)}">View repository</a>` : '';
  const apkLink = project.apkUrl ? `<a href="${escape(project.apkUrl)}">Download Android debug APK</a>` : '';
  const demoLink = project.liveUrl ? `<a class="btn btn-secondary" href="${escape(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Try interactive demo</a>` : '';
  fs.writeFileSync(`projects/${slug}.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(project.seo.title)}</title><meta name="description" content="${escape(shortSummary)}"><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="../assets/projects/case-study.css"></head><body><main class="project-case android-case"><a href="../index.html#android">← Android projects</a><h1>${escape(title)}</h1><p class="case-lead">${escape(shortSummary)}</p><div class="prepared-actions">${demoLink}${apkLink}${sourceLink}</div>${localSlot(project)}<figure><a href="../${screenshot}" aria-label="View full screenshot"><img src="../${screenshot}" alt="${escape(screenshotAlt)}" width="${width}" height="${height}"></a><figcaption>Android emulator capture. Select the image to view it at full size.</figcaption></figure><h2>How it works</h2><p>${escape(architecture)}</p><h2>Verification and demo scope</h2><p>${escape(outcome)}</p></main><script src="../js/local-demo-links.js" defer></script></body></html>\n`);
}
for (const p of records) {
  const body = `<a href="../index.html#projects">← All projects</a><p class="case-kicker">${p.featured ? 'Featured project' : 'Engineering project'} · Runtime screenshot</p><h1>${escape(p.title)}</h1><p class="case-lead">${escape(p.shortSummary)}</p><p>${escape(p.status)}</p><a class="btn btn-secondary" href="${p.repositoryUrl}" target="_blank" rel="noopener noreferrer">View GitHub source</a><figure><a href="../${p.screenshot}"><img src="../${p.screenshot}" alt="${escape(p.screenshotAlt)}" width="${p.width}" height="${p.height}"></a><figcaption>${escape(p.screenshotAlt)}. Captured from the local application with illustrative data.</figcaption></figure><h2>Problem</h2><p>${escape(p.problem)}</p><h2>Architecture</h2><p>${escape(p.architecture)}</p><h2>Engineering decisions</h2>${list(p.decisions)}<h2>Implemented workflow</h2>${list(p.highlights)}<h2>Verified result</h2><p>${escape(p.outcome)}</p>${list(p.evidence)}<h2>Scope and next steps</h2>${list(p.constraints)}<h2>Technology</h2><p>${p.stack.map(escape).join(' · ')}</p><h2>Preview availability</h2><p>Static runtime preview. No hosted interactive demo is available. The prepared improvements were verified in a local checkout and have not been pushed to GitHub; public source may differ from these captures. Use the repository documentation for the public version's setup requirements.</p><a href="../index.html#projects">← Return to portfolio</a>`;
  const setup = p.demoSetup ? `<h2>Run the local demo</h2><p>From the prepared project checkout, run these commands and open the address printed by the server. The repository may require access.</p><pre class="demo-setup"><code>${escape(p.demoSetup)}</code></pre>` : '';
  fs.writeFileSync(`projects/${p.slug}.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(p.seo.title)}</title><meta name="description" content="${escape(p.seo.description)}"><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="../assets/projects/case-study.css"></head><body><main class="project-case">${body.replace('<figure>', localSlot(p)+setup+'<figure>').replace('<h2>Problem</h2>', gallery(p)+'<h2>Problem</h2>')}</main><script src="../js/local-demo-links.js" defer></script></body></html>\n`);
}
const card = p => `<article class="project-card prepared-project" data-category="web ${p.featured ? 'featured' : 'engineering'} ${p.categories.includes('Architecture') ? 'fullstack' : ''} ${p.stack.includes('Angular') ? 'angular' : ''}" data-prepared-project="${p.slug}"><div class="project-image"><img src="${p.screenshot}" width="${p.width}" height="${p.height}" alt="${escape(p.screenshotAlt)}" loading="lazy" decoding="async"></div><div class="project-content"><h3>${escape(p.title)}</h3><span class="project-date">Local demo · Runtime screenshot</span><p>${escape(p.shortSummary)}</p><div class="project-tech">${p.stack.map(s => `<span class="tech-tag">${escape(s)}</span>`).join('')}</div><div class="prepared-actions"><a class="btn btn-secondary" href="projects/${p.slug}.html">Read case study</a><a href="${p.repositoryUrl}" target="_blank" rel="noopener noreferrer">GitHub source ↗</a></div></div></article>`;
const section = (title, entries) => `<div class="projects-section prepared-section"><h3 class="section-subsection-title">${title}</h3><p class="section-subsection-subtitle">Real application captures · Case studies and source · No hosted interactive demos</p><div class="projects-grid major-grid">${entries.map(p => card(p).replace('data-category="web ',`data-category="${p.categories.includes('Mobile')?'mobile':'web'} `).replace('<div class="prepared-actions">', localSlot(p)+'<div class="prepared-actions">')).join('\n')}</div></div>`;
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<!-- PREPARED SHOWCASE START -->[\s\S]*?<!-- PREPARED SHOWCASE END -->\s*/g, '');
html = html.replace(/<!-- ANDROID SHOWCASE START -->[\s\S]*?<!-- ANDROID SHOWCASE END -->\s*/g, '');
html = html.replace(/data-category="([^"]*)"/g, (_, categories) => `data-category="${categories.split(/\s+/).filter(c => c !== 'featured').join(' ')}"`);
html = html.replace(/class="project-badge featured">Featured/g, 'class="project-badge">Earlier work');
// Reconcile the former restaurant card rather than duplicating the same repository.
html = html.replace(/<div class="project-card " data-category="web angular">/, '<div class="project-card " data-category="web angular" data-archived="true" hidden>');
html = html.replace('An established Angular product build.', 'Earlier projects and portfolio studies.');
html = html.replace('<!-- SECTION 1: FEATURED & MAJOR PROJECTS -->', `<!-- PREPARED SHOWCASE START -->${section('Featured Projects', records.filter(p => p.featured))}${section('Additional Engineering Projects', records.filter(p => !p.featured))}<!-- PREPARED SHOWCASE END -->\n    <!-- SECTION 1: FEATURED & MAJOR PROJECTS -->`);
if (!html.includes('assets/projects/case-study.css')) html = html.replace('</head>', '<link rel="stylesheet" href="assets/projects/case-study.css">\n</head>');
if (!html.includes('src="js/local-demo-links.js"')) html = html.replace('</body>', '<script src="js/local-demo-links.js" defer></script>\n</body>');
if (!html.includes('href="#android"')) {
  html = html.replace('<li><a href="#projects">Projects</a></li>', '<li><a href="#projects">Projects</a></li>\n                <li><a href="#android">Android</a></li>');
}
const androidCards = android.map(project => `
  <article class="project-card prepared-project" data-android-project="${project.slug}">
    <div class="project-image"><img src="${project.screenshot}" width="${project.width}" height="${project.height}" alt="${escape(project.screenshotAlt)}" loading="lazy" decoding="async"></div>
    <div class="project-content">
      <h3>${escape(project.title)}</h3>
      <p>${escape(project.shortSummary)}</p>
      ${localSlot(project)}
      <div class="prepared-actions">
${project.liveUrl ? `        <a class="btn btn-secondary" href="${escape(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Try interactive demo</a>\n` : ''}        <a href="projects/${project.slug}.html">Read case study</a>
      </div>
    </div>
  </article>`).join('\n');
html = html.replace('<section id="contact"', `<!-- ANDROID SHOWCASE START -->
<section id="android" class="section" aria-labelledby="android-title">
  <div class="container">
    <h2 class="section-title" id="android-title">Android Projects</h2>
    <p class="section-subsection-subtitle">Emulator screenshots and interactive browser demos.</p>
    <div class="projects-grid major-grid">${androidCards}</div>
  </div>
</section>
<!-- ANDROID SHOWCASE END -->
<section id="contact"`);
fs.writeFileSync('index.html', html);
console.log(`Generated ${records.length + android.length} case studies and cards.`);
