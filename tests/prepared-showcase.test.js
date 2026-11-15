const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const android = require('../assets/projects/android.json');
const androidSlugs = new Set(android.map(project => project.slug));
const records = require('../assets/projects/catalogue.json').filter(project => !androidSlugs.has(project.slug));
const html = fs.readFileSync('index.html', 'utf8');

test('prepared projects have local captures, unique cards and portable case-study routes', () => {
    assert.equal(records.length, 13);
    assert.equal(records.filter(p => p.featured).length, 6);
    assert.equal(new Set(records.map(p => p.repositoryUrl)).size, 13);
    for (const project of records) {
        assert.equal(html.split(`data-prepared-project="${project.slug}"`).length - 1, 1);
        assert.ok(fs.statSync(project.screenshot).size > 1000);
        const page = fs.readFileSync(`projects/${project.slug}.html`, 'utf8');
        assert.ok(page.includes(project.repositoryUrl));
        assert.ok(page.includes('have not been pushed'));
        assert.doesNotMatch(page, /href="[^" ]*(?:localhost|127\.0\.0\.1|C:|plugin:)/i);
        assert.doesNotMatch(page, /Passw0rd|demo123|Documents\/.+?\/2026/);
    }
});

test('both portfolios use the same eleven Android cards, images and public links', () => {
    assert.equal(androidSlugs.size, 11);
    assert.deepEqual(android, require('../react-portfolio-candidate/src/data/android.json'));
    for (const project of android) {
        assert.equal(html.split(`data-android-project="${project.slug}"`).length - 1, 1);
        assert.equal(html.includes(`data-prepared-project="${project.slug}"`), false);
        assert.deepEqual(fs.readFileSync(project.screenshot), fs.readFileSync(`react-portfolio-candidate/public/${project.screenshot}`));
        const page = fs.readFileSync(`projects/${project.slug}.html`, 'utf8');
        if (project.liveUrl) assert.ok(page.includes(`href="${project.liveUrl}"`));
        else assert.doesNotMatch(page, /href="undefined"|Try interactive demo/);
        if (project.apkUrl) assert.ok(page.includes(`href="${project.apkUrl}"`));
    }
});
