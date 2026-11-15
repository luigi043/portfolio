# Accessibility audit

## Audit metadata

**Audited:** React portfolio candidate homepage, project case-study template, and contact flow  
**Date:** 2026-08-22  
**Compliance target:** WCAG 2.1 AA  
**Scope:** Local candidate only. Automated browser checks covered Chromium at 390, 768, and 1440 pixels; reflow and text spacing were additionally stressed at 320 pixels.  
**Methodology:** axe-core scans, Playwright keyboard and interaction checks, responsive overflow checks, light/dark theme checks, reduced-motion checks, semantic component tests, and visual inspection of real full-page screenshots.

## Executive summary

No critical or serious automated axe violations remain in the tested homepage themes or the representative case-study template. The verified keyboard flow includes the skip link, mobile navigation, project filters and disclosures, contact validation focus, and success/error announcements. The candidate also passes the tested 320-pixel reflow and WCAG text-spacing stress without horizontal overflow.

This is not a claim of full WCAG conformance. A real screen-reader pass, color-vision simulation, and Windows High Contrast review still require human verification before broad release.

| Severity                | Open findings |
| ----------------------- | ------------: |
| Critical                |             0 |
| Important               |             0 |
| Minor                   |             0 |
| Manual validation gates |             3 |

## Tools and methods used

**Automated**

- [x] axe-core through Playwright
- [x] React Testing Library semantic and interaction tests
- [x] Playwright keyboard, focus, reflow, text-spacing, theme, motion, and form-flow tests
- [ ] Lighthouse accessibility audit
- [ ] WAVE or Pa11y second-opinion scan

**Manual**

- [x] Visual inspection of real desktop and 390-pixel screenshots
- [x] Keyboard behavior exercised through browser automation
- [x] Reduced-motion preference
- [x] 320-pixel reflow and accessible text-spacing stress
- [ ] Real screen reader
- [ ] Color-vision simulation
- [ ] Windows High Contrast

## Findings by WCAG principle

### 1. Perceivable

- Semantic headings, sections, labels, and landmark structure are present.
- Architecture and project concept visuals expose text alternatives and explicitly avoid presenting themselves as product screenshots.
- Automated contrast checks pass in both light and dark themes.
- Reflow and increased text-spacing tests pass without horizontal overflow.
- Color-vision simulation and Windows High Contrast remain manual release gates.

### 2. Operable

- The skip link receives first keyboard focus.
- Mobile navigation exposes expanded state, closes with Escape, and restores focus.
- Filters and project disclosures are keyboard-operable with programmatic state.
- Focus styling remains visible and motion honours `prefers-reduced-motion`.
- No timed interaction, flashing content, drag-only control, or keyboard trap is present.

### 3. Understandable

- The page language is declared in English.
- Contact fields have persistent labels and appropriate input purposes.
- Validation identifies the first invalid field, associates messages with inputs, and focuses the first error.
- Submission success and failure states are explicit; a failed request preserves the draft and provides direct email fallback.

### 4. Robust

- Interactive controls expose semantic names, roles, values, and expanded/pressed states.
- Filter results and contact submission outcomes use live status semantics.
- Automated tests cover the representative case-study template and all four generated routes.

## Priority findings

There are no open P0, P1, or P2 findings in the automated and browser-driven scope.

## Manual validation roadmap

1. Test the homepage, one case study, project disclosure, mobile menu, and contact errors with NVDA plus Chrome or Firefox on Windows.
2. Review light and dark themes under deuteranopia simulation and Windows High Contrast.
3. Run a production Lighthouse audit after deployment configuration is approved, because local development results do not represent the final hosting path.

The tracking rows are maintained in [accessibility-remediation.csv](accessibility-remediation.csv).
