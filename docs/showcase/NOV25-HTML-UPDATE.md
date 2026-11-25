# HTML portfolio update

Prepared 25 November 2026 from the read-only project-2026 workspace.

## Project collection

The approved homepage keeps six featured projects and eleven Android projects. Its All Projects link opens projects/index.html, a searchable collection of 42 case studies. Newly added work appears first. Older homepage project code remains in comments.

Eleven projects were added.

| Source folder | Portfolio title | Evidence |
| --- | --- | --- |
| car-os-dashboard | Car OS Dashboard | README, architecture and testing guides, frontend package and simulator captures |
| configcraft | ConfigCraft | README, JavaScript package configuration and conversion/mobile captures |
| db-engine | Local-First DB Engine | README storage and sync contract, package workspaces and completed-sync/mobile captures |
| gaming-team-management-system | Aurora Tactical | README, frontend package and note-edit/mobile captures |
| gta-rp-business-management-tool | GTA RP Workshop Management | README, frontend package and payment/mobile captures |
| meccanico-della-velocit- | Meccanico della Velocità | README role walkthrough, frontend package and mechanic/customer captures |
| test-web-app | Harbor Desk | README with version-checked SQLite writes and resolved-request/mobile captures |
| vehicle-digital-platforms | Fleetline | README describing JPA optimistic locking and maintenance/mobile captures |
| csv-cleaner | CSV Cleaner | README, actual sample output and two passing unit tests |
| file-inventory | File Inventory | README, actual sample output and two passing unit tests |
| log-analyzer | Log Analyzer | README, actual sample output and one passing unit test |

Job Tracker, Ecommerce Analytics, FiveM CAD/MDT, Smart Gym, BugRepro, Constraint Engine, Debug AI, Smart Home Command Center, Mosaic and Voice to Code received refreshed galleries. The three original BMW E36 repositories remain combined in the automotive case study.

Browser application checks were not rerun during this integration. Their case studies distinguish prepared screenshots and documented workflows from verification performed here. The three Python tools were run with their synthetic examples and the documented root-level unittest commands. Bytecode creation was disabled. The output images are clearly labeled command-output captures. The source folders were not edited.

## Design and behavior

The featured grid now uses two columns on desktop and one on narrow screens, with larger screenshots, plain technology text, consistent spacing and aligned case-study actions. The expandable-details controls and technology pills are absent from these new cards. Screenshot zoom remains accessible from the image. The new cards are excluded from the older hover-collapse CSS rules so pointer and keyboard focus do not change text spacing.

The library reuses the card renderer. Search matches titles, descriptions and technologies. Project type filters include web applications, Android and CLI tools. An empty result offers a reset action that returns keyboard focus to search. The page also exposes all cases without JavaScript.

## Source access and demos

Anonymous requests checked 27 engineering repository URLs. Eight returned HTTP 200 and nineteen were unavailable. Only verified public repository buttons are shown. No Git URL was invented for projects without a configured remote. Existing Android links were retained. See nov25-repository-access.json.

New hosted demos remain pending. Case studies provide local setup commands, actual captures, workflow descriptions and implementation limits. The portfolio update does not publish or change the source projects.

## Verification

- HTML, script and catalogue checks passed, 13 tests.
- Python tool checks passed, five tests across the three tools.
- Chrome checks passed at 390px and 1440px for all 42 case-study routes.
- Homepage counts remained six featured cards and eleven Android cards.
- Library search, combined type filters, empty-state reset, keyboard submission and focus restoration passed.
- Featured screenshot preview opened and closed with Escape. Desktop footer alignment passed after returning focus from the dialog.
- Images decoded successfully. There were no page errors or horizontal overflow.
- Repeated generation preserved the homepage, including its commented archive.
- The tracked-text scan found no incidental assistant attribution.

See nov25-html-validation.json and the four nov25 layout screenshots. Implementation commit db0cf5e contains the library, eleven additions, refreshed galleries, source-access handling and card redesign. A separate commit records verification evidence.
