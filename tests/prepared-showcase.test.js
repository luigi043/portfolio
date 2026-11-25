const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const android = require('../assets/projects/android.json');
const androidSlugs = new Set(android.map(project => project.slug));
const records = require('../assets/projects/catalogue.json').filter(project => !androidSlugs.has(project.slug));
const html = fs.readFileSync('index.html', 'utf8').replace(/<!--[\s\S]*?-->/g, '');

test('prepared projects have local captures, unique cards and portable case-study routes', () => {
    assert.equal(records.length, 31);
    assert.equal(records.filter(p => p.featured).length, 6);
    const repositoryUrls = records.map(project => project.repositoryUrl).filter(Boolean);
    assert.equal(new Set(repositoryUrls).size, repositoryUrls.length);
    for (const project of records) {
        assert.equal(html.split(`data-prepared-project="${project.slug}"`).length - 1, project.featured ? 1 : 0);
        assert.ok(fs.statSync(project.screenshot).size > 1000);
        const page = fs.readFileSync(`projects/${project.slug}.html`, 'utf8');
        if (project.repositoryAccess === 'unavailable') {
            assert.equal(page.includes('href="' + project.repositoryUrl + '"'), false);
            assert.ok(page.includes('Public source access pending.'));
        } else {
            assert.ok(page.includes(project.repositoryUrl));
        }
        assert.ok(page.includes('Preview availability'));
        assert.doesNotMatch(page, /href="[^" ]*(?:localhost|127\.0\.0\.1|C:|plugin:)/i);
        assert.doesNotMatch(page, /Passw0rd|demo123|Documents\/.+?\/2026/);
    }
});

test('the HTML portfolio has eleven Android cards with local images and valid demo links', () => {
    assert.equal(androidSlugs.size, 11);
    for (const project of android) {
        assert.equal(html.split(`data-android-project="${project.slug}"`).length - 1, 1);
        assert.equal(html.includes(`data-prepared-project="${project.slug}"`), false);
        assert.ok(fs.statSync(project.screenshot).size > 1000);
        const page = fs.readFileSync(`projects/${project.slug}.html`, 'utf8');
        if (project.liveUrl) assert.ok(page.includes(`href="${project.liveUrl}"`));
        else assert.doesNotMatch(page, /href="undefined"|Try interactive demo/);
        if (project.apkUrl) assert.ok(page.includes(`href="${project.apkUrl}"`));
    }
});


test('the project library links every reviewed case study once', () => {
    const library = fs.readFileSync('projects/index.html', 'utf8');
    const projects = [...records, ...android];
    assert.equal(new Set(projects.map(project => project.slug)).size, 42);
    for (const project of projects) {
        assert.equal(library.split('data-library-project="' + project.slug + '"').length - 1, 1);
        assert.ok(library.includes('href="' + project.slug + '.html"'));
        assert.ok(library.includes('src="../' + project.screenshot + '"'));
        assert.ok(fs.statSync('projects/' + project.slug + '.html').isFile());
    }
    assert.ok(library.includes('src="../js/project-library.js"'));
    assert.ok(html.includes('href="projects/index.html"'));
});
