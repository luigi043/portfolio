# Eight-project portfolio integration

Prepared locally on 29 October 2026.

Follow-up: the eight interactive demos have since been restored locally and hostname-gated demo buttons added to both portfolios. See `LOCAL-DEMOS.md`, `live-demo-verification.json` and `local-demo-links-verification.json`. The original integration record below describes the earlier static-preview delivery; public hosting remains unperformed.

30 October follow-up: Sfera Tag Scanner is now project nine in both versions, with a synthetic shared-Kotlin companion on port 5181 and an explicit Android/hardware verification boundary. See `SFERA-INTEGRATION.md` for current counts, screenshots and final verification; the six featured projects remain unchanged.

## Completed scope

Both the original HTML/CSS/JavaScript portfolio and the pre-existing Next.js candidate contain the same eight reviewed projects. Six are featured, in this order: Vehicle Build Cost Calculator, BMW Configurator / Drive Studio, Flowchart-to-Code, CTW Vehicle Fleet, Academic Portal and Bella Ops. MiniLang Interpreter and TaskFlow appear as additional engineering work.

The obsolete static restaurant card is archived rather than duplicated. The React Flowchart record is replaced by the reviewed version. Earlier portfolio sections are retained; three older React case-study routes remain available after moving their cards into secondary work. Older static cards are no longer tagged as the featured selection.

Each prepared project has a real runtime screenshot, concise card, repository source link and case study covering the problem, architecture, decisions, implementation, verification and limitations. Captures were visually inspected before import and converted to WebP without cropping. Eight optimized captures total 368,324 bytes per site. No inactive OBJ or additional 3D asset was imported.

No hosted interactive demo is claimed. Public copy explains that the prepared enhancements are local and unpushed, so public GitHub source may differ. No localhost application demos, demo passwords, internal artifact paths or chat links appear in the published case-study copy. No personal contribution, employer/client relationship or business outcome was inferred.

## Local previews

- Static portfolio: http://127.0.0.1:5185/#projects
- Built React portfolio: http://127.0.0.1:3100/#projects

Start the static preview with `node scripts/preview-static.cjs` from the repository root. For React, install the locked dependencies in `react-portfolio-candidate`, run `npm run build`, then `npm run start -- --hostname 127.0.0.1 --port 3100`. These URLs are machine-local review servers, not public deployments.

## Files and maintenance

- `assets/projects/catalogue.json`: reviewed static project content and source URLs.
- `assets/projects/*.webp`: optimized application captures.
- `assets/projects/case-study.css`: small extensions to the existing static design.
- `projects/*.html`: eight generated, portable static case studies.
- `scripts/prepare-showcase.cjs`: rebuild static cards and case studies from the catalogue.
- `index.html`, `js/project-controls.js`: cards, filtering and honest preview-dialog disclosure.
- `react-portfolio-candidate/src/data/projects.ts`: typed React records, including preserved earlier work.
- `react-portfolio-candidate/src/components/project-visual.tsx`: runtime screenshots with original concept fallback for older records.
- `react-portfolio-candidate/src/components/project-explorer.tsx`: case-study links for the additional projects.
- React project route, route helpers and sitemap: all eight prepared routes plus three preserved routes.
- `scripts/verify-showcase.cjs`: real Chrome responsive/image/route/link verification for both sites.
- `tests/prepared-showcase.test.js`: catalogue uniqueness, local asset and portable-link contract.

The React candidate was recorded unchanged in a separate baseline commit before edits, so its prior state can be reviewed. No package versions or lockfiles were changed by this integration. The generated `next-env.d.ts` now references production route types after the successful build.

## Validation

- Static syntax and Node checks: 11 passed.
- React unit suite: 37 passed and one stale explorer-count expectation failed in the initial full run. After updating that expectation for preserved older work, all three explorer tests passed. All 38 distinct cases were verified across those runs.
- React TypeScript and ESLint: passed.
- Next.js production build: passed; homepage, sitemap and 11 case-study paths generated.
- Chrome integration verification: both sites at 390px and 1440px, all eight routes each (32 route visits), correct source links, fully decoded images, no document overflow or page errors. Static search, Featured filter and screenshot-dialog Escape interaction also passed. See `browser-validation.json`.
- Existing desktop E2E suite: 17 passed; the homepage axe scan initially exceeded its 30-second budget. After allowing 120 seconds, the focused homepage scan passed in 18.7 seconds. All 18 desktop E2E cases were verified across those runs, including light/dark homepage accessibility and the Flowchart case-study accessibility scan.
- The first sandbox build failed because Turbopack could not start its CSS subprocess. The same production build passed outside that restriction. The default E2E attempt could not launch missing Playwright Chromium; the actual browser checks use installed Chrome via `PLAYWRIGHT_CHANNEL=chrome`.

Preview captures: `static-390.png`, `static-1440.png`, `react-390.png`, `react-1440.png`. They show the actual integrated sites, not generated mockups. Mobile coverage is browser emulation, not physical-device certification.

## Remaining needs

Personal role, collaborators, motivations and any real-user outcomes still require the owner's factual context before adding a first-person story. The technical implementation is presented without those assumptions.

The unchanged React dependency set reports 10 advisories (2 moderate, 7 high, 1 critical) at this review; see `../../react-portfolio-candidate/docs/showcase-dependency-audit.json`. Project-specific limitations and the fleet/Bella dependency maintenance needs remain readable in their case studies. These demonstrations are not production-readiness claims.

Public hosting, canonical origin selection and source-repository pushes remain unperformed. No services were purchased and nothing was publicly deployed or pushed.

## Local commits

- `274a7e6` — preserve the supplied React candidate baseline and ignore generated output.
- `3476cbe` — integrate the eight projects into the static portfolio with local runtime assets and case studies.
- `e084aa4` — integrate the same projects into React, preserve old routes and update verification contracts.
- A final documentation commit records this report, browser evidence and dependency audit.
