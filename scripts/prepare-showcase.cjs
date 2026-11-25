// Rebuild the static case studies and HTML cards from the reviewed catalogue.
const fs = require('node:fs');
const path = require('node:path');
const android = require('../assets/projects/android.json');
const androidSlugs = new Set(android.map(project => project.slug));
const records = require('../assets/projects/catalogue.json').filter(project => !androidSlugs.has(project.slug));
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const list = values => `<ul>${values.map(v => `<li>${escape(v)}</li>`).join('')}</ul>`;
const sourceLink = project => project.repositoryAccess === 'unavailable'
  ? '<p class="case-source-status">Public source access pending.</p>'
  : '<a href="' + escape(project.repositoryUrl) + '" target="_blank" rel="noopener noreferrer">View GitHub source</a>';
const contribution = project => project.contribution
  ? '<h2>My contribution</h2><p>' + escape(project.contribution) + '</p>'
  : '';
const components = project => project.components
  ? project.components.map(component => '<h2>' + escape(component.title) + '</h2><p>' + escape(component.description) + '</p>').join('')
  : '';
const localSlot = p => `<div data-local-demo="${p.slug}"></div>`;
const gallery = p => p.gallery ? `<section class="companion-gallery" aria-label="Companion screenshot gallery">${p.gallery.map(i => `<figure><a href="../${i.src}"><img src="../${i.src}" alt="${escape(i.alt)}" width="${i.width}" height="${i.height}" loading="lazy"></a><figcaption>${escape(i.alt)}</figcaption></figure>`).join('')}</section>` : '';
fs.mkdirSync('projects', { recursive: true });
for (const project of android) {
  const { slug, title, shortSummary, screenshot, screenshotAlt, width, height, architecture, outcome } = project;
  const sourceLink = project.repositoryUrl ? `<a href="${escape(project.repositoryUrl)}">View repository</a>` : '';
  const apkLink = project.apkUrl ? `<a href="${escape(project.apkUrl)}">Download Android debug APK</a>` : '';
  const demoLink = project.liveUrl ? `<a class="btn btn-secondary" href="${escape(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Try interactive demo</a>` : '';
  fs.writeFileSync(`projects/${slug}.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(project.seo.title)}</title><meta name="description" content="${escape(shortSummary)}"><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="../assets/projects/case-study.css"></head><body><main class="project-case android-case"><a href="../index.html#android">← Android projects</a><h1>${escape(title)}</h1><p class="case-lead">${escape(shortSummary)}</p><div class="prepared-actions">${demoLink}${apkLink}${sourceLink}</div>${localSlot(project)}<figure><a href="../${screenshot}" aria-label="View full screenshot"><img src="../${screenshot}" alt="${escape(screenshotAlt)}" width="${width}" height="${height}"></a><figcaption>Android emulator capture. Select the image to view it at full size.</figcaption></figure><h2>How it works</h2><p>${escape(architecture)}</p><h2>Verification and demo scope</h2><p>${escape(outcome)}</p></main><script src="../js/local-demo-links.js" defer></script></body></html>\n`);
}
for (const p of records) {
  const body = `<a href="index.html">← All projects</a><p class="case-kicker">${p.featured ? 'Featured project' : 'Engineering project'} · Runtime screenshot</p><h1>${escape(p.title)}</h1><p class="case-lead">${escape(p.shortSummary)}</p><p>${escape(p.status)}</p>${sourceLink(p)}${contribution(p)}${components(p)}<figure><a href="../${p.screenshot}"><img src="../${p.screenshot}" alt="${escape(p.screenshotAlt)}" width="${p.width}" height="${p.height}"></a><figcaption>${escape(p.screenshotAlt)}. Captured from the local application with illustrative data.</figcaption></figure><h2>Problem</h2><p>${escape(p.problem)}</p><h2>Architecture</h2><p>${escape(p.architecture)}</p><h2>Engineering decisions</h2>${list(p.decisions)}<h2>Implemented workflow</h2>${list(p.highlights)}<h2>Checks and evidence</h2><p>${escape(p.outcome)}</p>${list(p.evidence)}<h2>Scope and next steps</h2>${list(p.constraints)}<h2>Technology</h2><p>${p.stack.map(escape).join(' · ')}</p><h2>Preview availability</h2><p>Screenshots show the prepared local version. Hosted demos remain pending, and source access may require permission. Local setup requirements and remaining limits are documented above.</p><a href="../index.html#projects">← Return to portfolio</a>`;
  const output = p.demoOutput ? '<h2>Example output</h2><pre class="demo-setup"><code>' + escape(p.demoOutput) + '</code></pre>' : '';
  const setup = p.demoSetup ? `<h2>Run the local demo</h2><p>From the prepared project checkout, run these commands and open the address printed by the server. The repository may require access.</p><pre class="demo-setup"><code>${escape(p.demoSetup)}</code></pre>` : '';
  fs.writeFileSync(`projects/${p.slug}.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(p.seo.title)}</title><meta name="description" content="${escape(p.seo.description)}"><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="../assets/projects/case-study.css"></head><body><main class="project-case">${body.replace('<figure>', localSlot(p)+setup+output+'<figure>').replace('<h2>Problem</h2>', gallery(p)+'<h2>Problem</h2>')}</main><script src="../js/local-demo-links.js" defer></script></body></html>\n`);
}
function card(project, library = false) {
  const prefix = library ? '../' : '';
  const caseHref = (library ? '' : 'projects/') + project.slug + '.html';
  const category = project.categories.includes('CLI') ? 'CLI tool' : project.categories.includes('Mobile') ? 'Android app' : 'Web application';
  const marker = library ? 'data-library-project' : 'data-prepared-project';
  const search = [project.title, project.shortSummary, ...project.stack].join(' ');
  return `<article class="project-card prepared-project portfolio-card" ${marker}="${project.slug}" data-category="${project.categories.map(value => value.toLowerCase()).join(' ')}${project.featured ? ' featured' : ''}" data-search="${escape(search)}">
    <div class="project-image"><img src="${prefix}${project.screenshot}" width="${project.width}" height="${project.height}" alt="${escape(project.screenshotAlt)}" loading="lazy" decoding="async"></div>
    <div class="project-content">
      ${library ? '<p class="project-kind">' + category + '</p>' : ''}
      <h3>${escape(project.title)}</h3>
      <p class="project-summary">${escape(project.shortSummary)}</p>
      <p class="project-stack">${project.stack.slice(0, 3).map(escape).join(' · ')}</p>
      <div class="prepared-actions"><a class="case-study-link" href="${caseHref}" aria-label="Read ${escape(project.title)} case study">Read case study <span aria-hidden="true">↗</span></a></div>
    </div>
  </article>`;
}
const section = (title, entries) => `<div class="projects-section prepared-section"><div class="project-section-heading"><h3 class="section-subsection-title">${title}</h3><a class="all-projects-link" href="projects/index.html">All projects <span aria-hidden="true">↗</span></a></div><div class="projects-grid major-grid portfolio-grid">${entries.map(project => card(project)).join('\n')}</div></div>`;
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<!-- PREPARED SHOWCASE START -->[\s\S]*?<!-- PREPARED SHOWCASE END -->\s*/g, '');
html = html.replace(/<!-- ANDROID SHOWCASE START -->[\s\S]*?<!-- ANDROID SHOWCASE END -->\s*/g, '');
html = html.replace(/data-category="([^"]*)"/g, (_, categories) => `data-category="${categories.split(/\s+/).filter(c => c !== 'featured').join(' ')}"`);
html = html.replace(/class="project-badge featured">Featured/g, 'class="project-badge">Earlier work');
// Reconcile the former restaurant card rather than duplicating the same repository.
html = html.replace(/<div class="project-card " data-category="web angular">/, '<div class="project-card " data-category="web angular" data-archived="true" hidden>');
html = html.replace('An established Angular product build.', 'Earlier projects and portfolio studies.');
html = html.replace('<!-- FEATURED PROJECT INSERT -->', `<!-- PREPARED SHOWCASE START -->${section('Featured Projects', records.filter(p => p.featured))}<!-- Archived additional project cards. Retained for future use. ${section('Additional Engineering Projects', records.filter(p => !p.featured))} --><!-- PREPARED SHOWCASE END -->\n    <!-- FEATURED PROJECT INSERT -->`);
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
fs.writeFileSync('index.html', html.replace(/[ \t]+(?=\r?$)/gm, ''));
console.log(`Generated ${records.length + android.length} case studies and cards.`);

const libraryProjects = [...records, ...android.map(project => ({ ...project, categories: ['Mobile'] }))];
libraryProjects.sort((first, second) => (second.addedOn || '').localeCompare(first.addedOn || '') || Number(Boolean(second.featured)) - Number(Boolean(first.featured)));
const libraryCards = libraryProjects.map(project => card(project, true)).join('\n');
fs.writeFileSync('projects/index.html', `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>All Projects | Luiz Fehlberg</title><meta name="description" content="Application case studies, Android projects and Python tools by Luiz Fehlberg."><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="../assets/projects/case-study.css"><script src="../js/project-controls.js" defer></script><script src="../js/project-library.js" defer></script></head>
<body class="project-library"><a class="skip-link" href="#library-main">Skip to projects</a>
<header class="library-header"><a href="../index.html" class="library-brand">Luiz Fehlberg</a><a href="../index.html#projects">Back to portfolio <span aria-hidden="true">↗</span></a></header>
<main id="library-main" class="library-main"><h1>All projects</h1><p class="library-intro">Applications, Android projects and developer tools. Explore the workflow, implementation and available evidence.</p>
<form class="library-controls" role="search" aria-label="Find projects"><label for="library-search">Search projects<input type="search" id="library-search" placeholder="Search by project or technology" autocomplete="off"></label><label for="library-category">Project type<select id="library-category"><option value="all">All types</option><option value="web">Web applications</option><option value="mobile">Android apps</option><option value="cli">CLI tools</option></select></label></form>
<p id="library-count" role="status" aria-live="polite">${libraryProjects.length} projects</p>
<div class="portfolio-grid library-grid">${libraryCards}</div>
<div id="library-empty" hidden><h2>No matching projects</h2><p>Try another name or technology.</p><button type="button" id="library-reset">Clear filters</button></div>
</main><footer class="library-footer"><a href="../index.html#contact">Get in touch</a><span>Luiz Fehlberg</span></footer></body></html>\n`);
