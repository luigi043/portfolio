const test = require('node:test');
const assert = require('node:assert/strict');

const { projectMatches, projectPreviewForTitle } = require('../js/project-controls.js');

test('matches all projects when filter and query are empty', () => {
    assert.equal(projectMatches('web featured', 'Vehicle platform React', 'all', ''), true);
});

test('requires the selected category', () => {
    assert.equal(projectMatches('mobile featured', 'Health tracker Kotlin', 'mobile', ''), true);
    assert.equal(projectMatches('web featured', 'Restaurant Angular', 'mobile', ''), false);
});

test('searches project text case-insensitively', () => {
    assert.equal(projectMatches('web', 'Angular 17 and RxJS', 'all', 'rxjs'), true);
    assert.equal(projectMatches('web', 'Angular 17 and RxJS', 'all', 'Kotlin'), false);
});

test('combines category and search constraints', () => {
    assert.equal(projectMatches('mobile featured', 'Vitalis Kotlin wellness', 'featured', 'kotlin'), true);
    assert.equal(projectMatches('mobile', 'Expense tracker Kotlin', 'featured', 'kotlin'), false);
});

test('provides an interactive preview for each project without a screenshot', () => {
    const previewTitles = [
        'VehicleOS - Vehicle Management Platform',
        'Vitalis - Health & Wellness Tracker',
        'BMW E36 Custom Control Systems',
        'BemEstar - Gym Management SaaS',
        'Insurex - Insurance Asset Protection System',
    ];

    previewTitles.forEach((title) => {
        const preview = projectPreviewForTitle(title);
        assert.ok(preview, `${title} should have preview data`);
        assert.equal(preview.views.length, 3);
        preview.views.forEach((view) => assert.equal(view.stats.length, 3));
    });
});
