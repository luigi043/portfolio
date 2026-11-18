# Project-2026 portfolio update

Reviewed 18 November 2026 in the existing showcase checkout.

## Inventory and evidence

The source folder contains seven repositories and a completion handoff, done.txt. The five existing entries are BugRepro, Constraint Engine, Debug AI, Smart Home Command Center and Voice to Code. Their case studies were retained.

Two completed demos were missing and have been added to both variants.

| Project | Evidence reviewed | Added material |
| --- | --- | --- |
| Mosaic Content Planner (social) | README, lib/planner.ts, repository configuration, completion handoff and screenshots | Editorial planning workflow, storage and publishing limitations, source link, setup commands, desktop and mobile gallery |
| Smart Gym Transformation App | README, frontend/package.json, repository configuration, completion handoff and screenshots | Dated workout and weight tracking, browser demo and account API scope, source link, setup commands, desktop and mobile gallery |

The evidence identifies source URLs as https://github.com/luigi043/social and https://github.com/luigi043/smart-gym-transformation-app. Links were matched to repository configuration. Public reachability and source parity have not been established. Preparation changes remain in the source checkouts. There are no hosted demo URLs for these two additions.

The prepared catalogue now has 15 engineering records and the existing eleven Android records. Source project directories were read only. Existing featured ordering, Android screenshots, APK and browser links, layout and phone demonstrations were retained.

## Implementation

The existing generator creates the new HTML case studies and cards, synchronizes the React catalogue, and normalizes React gallery image paths. Four inspected screenshots were resized to WebP and copied to both public asset roots. Existing catalogue-count checks were adjusted for two additions.

The Smart Gym handoff records an older development signing key in source history, documented as a deployment prerequisite in its case study. Mosaic's source framework update requirement and browser storage concurrency limits are documented. Test results for the source apps are attributed to their handoff.

## Validation

- Static checks passed, 12 tests including all eleven Android records and their mirrored assets.
- React ESLint passed.
- React smoke and project explorer tests passed, 4 tests across 2 files.
- Chrome loaded both new HTML case studies at 390px and 1440px, decoded all images and checked source links and horizontal overflow.
- The final React production build passed with the supported webpack option, including TypeScript and static page generation.
- Chrome passed both variants at 390px and 1440px. Each new route returned 200, all images decoded, source links matched, all eleven Android cards remained, and there were no page errors or horizontal overflow. Static search isolated each new project.
- See project-2026-validation.json and the four new 390px screenshots for the rendered evidence.

The default Turbopack build failed twice while starting its CSS worker, including an unrestricted retry. The supported webpack build compiled and passed TypeScript. The final build includes the gallery-path correction.

## Local commits and previews

- 431022c adds both projects, gallery assets, generator normalization and catalogue assertions.
- A separate verification commit records this inventory and the rendered checks.
- HTML preview http://127.0.0.1:5185/
- React preview http://127.0.0.1:3100/

The updates are local to portfolio-showcase. No push or public deployment was performed. The photo remains pending from the earlier request.
