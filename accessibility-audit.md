# Accessibility Audit

**Product:** Luiz Fehlberg Portfolio  
**Audit date:** 2026-08-18  
**Target:** WCAG 2.1 Level AA  
**Scope:** Public single-page portfolio, with emphasis on navigation, expandable cards, project search and filters, project preview dialog, and contact form.

## Executive summary

The reviewed public experience has no known open critical or high-severity accessibility defects. Seven issues found during the review were remediated in the implementation. The page now preserves native hidden states, exposes semantic controls for expandable content, provides a labelled keyboard-operable project dialog, associates form errors with their fields, and respects reduced-motion preferences.

Two release checks remain manual: testing with a real screen reader and a full automated contrast scan across every state. These were not available in the current environment and are recorded as validation gaps rather than passed checks.

## Method

- Source review against WCAG 2.1 AA patterns
- Automated markup checks for unique IDs, image alternative text, dialog labelling, form associations, and prohibited attribution copy
- Browser testing at desktop, 390 × 844, and 320 × 720
- Keyboard checks for mobile navigation, expandable cards, dialog tabs, dialog close/focus return, and invalid form submission
- Responsive overflow and minimum target-size checks
- Manual contrast calculation for the main text tokens against the primary background

## Results

| ID | Severity | WCAG | Finding | Resolution | Status |
|---|---|---|---|---|---|
| A-001 | High | 1.3.1, 4.1.2 | Generic cards acted as expandable controls and only worked on touch-oriented devices. | Added real buttons with names, `aria-expanded`, and `aria-controls` on every viewport. | Resolved |
| A-002 | High | 1.3.1, 2.1.1, 4.1.2 | The project preview tabs lacked complete tab-to-panel relationships and robust keyboard navigation. | Added tab IDs, `aria-controls`, `aria-labelledby`, roving focus, Arrow, Home, and End behavior. | Resolved |
| A-003 | High | 1.3.1, 3.3.1, 3.3.3 | Contact validation feedback was not fully associated with each field. | Added `aria-describedby`, synchronized `aria-invalid`, persistent field errors, an alert summary, and first-error focus. | Resolved |
| A-004 | High | 1.3.1 | Component display rules could override the native `hidden` attribute, exposing filtered or archived content. | Added a global `[hidden] { display: none !important; }` utility and verified archived content has no rendered boxes. | Resolved |
| A-005 | Medium | 2.4.4, 4.1.2 | Icon-only profile links did not consistently expose descriptive names. | Added explicit accessible names and hid decorative icons from assistive technology. | Resolved |
| A-006 | Medium | 2.2.2, 2.3.3 | New interaction motion needed a consistent reduced-motion path. | Limited motion to opacity and transforms, routed state changes through animation frames, and disabled nonessential motion under `prefers-reduced-motion`. | Resolved |
| A-007 | Medium | 2.5.5 | The mobile menu control measured below the recommended 44 × 44 CSS-pixel target. | Set a 44 × 44 minimum interactive area and verified it at 320 px. | Resolved |
| A-008 | Validation gap | 1.4.3, 1.4.11 | A full state-by-state automated contrast scan was not available. | Main tokens were manually checked: primary text 18.20:1, secondary text 7.81:1, accent 4.93:1, and revised muted text 5.50:1 on the primary background. Run a full scan before release. | Open |
| A-009 | Validation gap | Multiple | No real screen-reader session was available. | Test the complete flow with NVDA plus Firefox or Chrome before release. | Open |

## Verified interaction outcomes

- At 320 px and 390 px, the document width stays within the viewport with no horizontal page overflow.
- Project search combines with category filtering, updates a live result count, and removes hidden cards from layout and focus order.
- Dialog focus moves to the close control on open and returns to the originating preview button on close.
- Dialog tabs change with Arrow Left/Right and expose the active panel through `aria-labelledby`.
- Invalid contact submission focuses the email field, marks both required fields invalid, reveals associated errors, and announces an alert summary.
- Archived projects remain in source for later curation but are not rendered or exposed as public project choices.

## Recommended release checks

1. Run NVDA through navigation, project filters, one project preview, and the contact validation flow.
2. Run axe or Lighthouse against the deployed URL after CDN assets and production hosting are active.
3. Replace externally hosted images with local, owner-supplied originals, then confirm alternative text and dimensions again.

