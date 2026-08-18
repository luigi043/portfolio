const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');

test('uses unique HTML ids', () => {
    const ids = Array.from(html.matchAll(/\sid=["']([^"']+)["']/g), (match) => match[1]);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    assert.deepEqual([...new Set(duplicates)], []);
});

test('provides alt text attributes for every image', () => {
    const images = html.match(/<img\b[^>]*>/g) || [];
    assert.ok(images.length > 0, 'Expected at least one image');
    images.forEach((image) => assert.match(image, /\salt=["'][^"']*["']/));
});

test('connects the project preview dialog to its accessible text', () => {
    assert.match(html, /<dialog[^>]+aria-labelledby="project-preview-title"/);
    assert.match(html, /<dialog[^>]+aria-modal="true"/);
    assert.match(html, /aria-describedby="project-preview-description project-preview-note"/);
    ['project-preview-title', 'project-preview-description', 'project-preview-note'].forEach((id) => {
        assert.match(html, new RegExp(`id=["']${id}["']`));
    });
});

test('associates contact fields with labels and error messages', () => {
    ['email', 'message'].forEach((id) => {
        assert.match(html, new RegExp(`<label\\b[^>]*for=["']${id}["']`));
    });
    assert.match(html, /id="email"[^>]+aria-describedby="email-error"/);
    assert.match(html, /id="message"[^>]+aria-describedby="message-error"/);
});

test('keeps unprofessional and AI-attribution phrases out of public copy', () => {
    const forbidden = [
        /don't ask/i,
        /garbage/i,
        /generated with (?:claude|codex|chatgpt)/i,
        /co-authored-by:\s*(?:claude|codex|chatgpt)/i
    ];

    forbidden.forEach((pattern) => assert.doesNotMatch(html, pattern));
});
