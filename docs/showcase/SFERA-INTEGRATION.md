# Sfera Tag Scanner — ninth-project integration

Prepared locally on 30 October 2026.

## Delivered

Sfera appears in the additional/mobile project collection in both the original static site and the existing React candidate. All eight prior prepared projects remain; the six featured projects retain their order. The older portfolio work and case-study routes remain available. There are now nine prepared projects, six featured records and twelve React case-study routes including the three preserved older studies.

The card and case study link https://github.com/luigi043/sferatagscanner and explain shared Kotlin reference/quantity/duplicate validation, status-filter and unsupported-RFID corrections, the companion architecture, test evidence and outstanding native work. No original authorship, employer/client affiliation or business result is inferred. Prepared source changes remain unpushed.

The three inspected source captures were converted to portfolio-owned WebP assets without cropping (180,346 bytes in total per site). Desktop is the primary card/hero capture; movements and 390px mobile captures form a labeled case-study gallery. Captions explicitly identify the synthetic browser companion and never present these as Android emulator, physical OCR or RFID evidence.

## Runtime and lifecycle

- Companion: http://127.0.0.1:5181/ — no credentials.
- React portfolio: http://127.0.0.1:3100/#projects
- Static portfolio: http://127.0.0.1:5185/#projects
- React case study: http://127.0.0.1:3100/projects/sferatagscanner
- Static case study: http://127.0.0.1:5185/projects/sferatagscanner.html

The running preparation JVM was reused, not restarted. It uses JDK 17, maximum heap 128 MB, the actual compiled shared Kotlin rules and a server-side in-memory inventory/movement adapter. This is not browser persistence, Room storage or an Android emulator. Server restart or an explicit sample reset loses companion state. Integration does not invoke reset or write/delete valid inventory records.

`scripts/demo-hub.ps1 Start -Project Sfera -ArtifactsRoot <path>` restores only Sfera if absent and otherwise reuses its listener. `Status -Project Sfera` reports its port; `Stop -Project Sfera` stops only a process created and identity-recorded by the hub. The pre-existing preparation process is intentionally not adopted or killed. The original all-project mode includes Sfera as project nine. Sfera-only operation skips Docker and Node discovery.

The launcher reads the source's documented `demo/build/runtime.txt` and runs the same JDK command as `demo/start.ps1`: `-Xms16m -Xmx128m -cp <runtime> ServerKt 5181 <demo-root>`. Direct Java execution gives the hub one owned process to stop; it never kills all Java processes. Missing runtime requires the documented build; JDK 17/21 are accepted, JDK 25 rejected. See `LOCAL-DEMOS.md` for commands and prerequisites.

Both portfolios expose the new action as **Local companion demo**, gated to exact loopback hostnames. Public-host visitors retain screenshot, case-study and source links with no localhost action. The shared local registry now contains nine projects and ten homepage links including Bella operations.

## Changed files

- `assets/projects/catalogue.json`, `assets/projects/local-demos.json`: ninth factual record and local companion registry.
- `assets/projects/sfera-{desktop,movements,mobile}.webp` and `react-portfolio-candidate/public/assets/projects/`: owned optimized captures.
- `index.html`, `projects/sferatagscanner.html`: static card/case study generated with gallery and local-only placeholder.
- `scripts/integrate-sfera.cjs`, `scripts/prepare-showcase.cjs`: repeatable inspected-asset import, registry synchronization and optional gallery rendering.
- `assets/projects/case-study.css`: static companion gallery layout.
- `react-portfolio-candidate/src/data/sfera.ts`, `src/data/projects.ts`, `src/data/local-demos.json`: typed record, Mobile categorization and companion URL.
- React `src/app/projects/[slug]/page.tsx` and `src/app/globals.css`: optional screenshot gallery retaining the existing case-study layout.
- `scripts/demo-hub.ps1`: native Kotlin/JDK runtime, Sfera-only lifecycle and scoped process handling.
- Existing count/filter/route/registry tests and browser verifiers: nine projects, six featured, mobile count two, twelve case-study routes and ten local homepage links.
- `scripts/verify-sfera-integration.cjs`: non-resetting functional demo and responsive route/gallery/link checks.

## Verification

Authoritative preparation evidence: `INTEGRATION-HANDOFF.md`, `CASE-STUDY.md`, `LOCAL-DEMO.md`, `VALIDATION.md` and three screenshots in the Sfera preparation outputs. These were read/inspected before integration. The original reset-based browser harness was deliberately not rerun against the existing server; its completed entry/exit coverage is attributed to preparation.

Integration re-ran the 18 actual Kotlin assertions in a separate JVM, leaving the live companion untouched. Current functional checks inspect an existing reference, reject its duplicate entry, search inventory, reject malformed input and compare the full before/after inventory/history. Portfolio checks load the new route, decode gallery images, check source/local companion links and inspect 390px/1440px reflow in both sites. Hostname-gating checks cover all nine local case-study groups and a simulated public origin. Machine-readable evidence is `sfera-integration-verification.json` and `local-demo-links-verification.json`; preview captures are `sfera-{static,react}-{390,1440}.png` and `sfera-live-390.png`.

Final results:

- 11 static checks passed; PowerShell parser and Node syntax checks passed; `git diff --check` passed.
- All 40 React tests passed in 11 files; ESLint and production build including TypeScript passed; twelve case-study routes generated.
- 18 actual Kotlin assertions passed in a separate JVM.
- Sfera-only Stop/Start preserved the pre-existing server and identical inventory/history.
- Chrome passed duplicate inspection/rejection, malformed input, search and 390px companion reflow with zero page errors. Full inventory/history matched before and after.
- Both portfolios passed Mobile filtering and card-to-case-study navigation at 390px/1440px, correct source and local companion URLs, decoded primary/gallery images and no overflow/page errors.
- Both portfolio homepages contained ten loopback actions for nine projects; all nine case-study groups passed. A simulated public hostname showed zero loopback actions on homepage and Sfera case study in both versions.
- Browser preview opening was requested for the updated React case study and returned queued for this chat; actual real-Chrome verification above is independent of that panel operation.

The original companion and both portfolio previews are left running. Other app services and data were not restarted/reset for this Sfera integration. Existing broader dependency advisories and source-project limitations remain as documented previously.

Local feature commit: `d96cf57` (`feat(portfolio): add Sfera Kotlin inventory project and companion evidence`). A separate lifecycle/evidence commit records the launcher, verifier and this report. No push or deployment was performed.

## Residual limitations

Native Android build remains blocked by a missing Android SDK. CameraX capture, physical ML Kit OCR, optional remote image extraction, Room persistence and device files are unverified. RFID adapters are unfinished and now report unsupported; no real hardware connection or EPC mapping is claimed. Basic spreadsheet helpers do not preserve macros or provide full stock backup/synchronization. Native save/movement transaction consistency still needs device/integration tests. The transient synthetic companion is not production inventory software.
