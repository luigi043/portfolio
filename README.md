# Luiz Fehlberg - Portfolio

Personal portfolio website showcasing my work as a Computer Engineer and Full-Stack Developer. Built with HTML, CSS, and JavaScript.

## About

I'm Luiz Fehlberg, a developer based in Portugal with a Bachelor's in Computer Engineering from IPBeja. I build web applications, mobile apps, and full-stack solutions using a wide range of technologies.

- **Location**: Porto, Portugal
- **GitHub**: [luigi043](https://github.com/luigi043)
- **LinkedIn**: [luizfehlberg](https://www.linkedin.com/in/luizfehlberg/)

## Tech Stack

**Frontend**: HTML, CSS, JavaScript, TypeScript, React, Angular, Tailwind CSS

**Backend**: Node.js, PHP, Laravel, C#, ASP.NET Core, Java, Spring Boot, Python

**Mobile**: Kotlin, Jetpack Compose, Android (Java/Kotlin)

**Databases**: MySQL, PostgreSQL, MongoDB, Firebase, SQLite, SQL Server

**DevOps**: Git, GitHub, Docker, CI/CD, AWS

**Design**: Figma, Adobe Photoshop, Adobe Premiere Pro, UX Design

## Featured Projects

- **Vehicle Build Cost Calculator** — owner-scoped budgets and scenario comparisons.
- **BMW Configurator / Drive Studio** — independent procedural 3D concept configurator.
- **Flowchart-to-Code** — validated structured graphs and three code outputs.
- **CTW Vehicle Fleet** — independent vehicle/telemetry reference app.
- **Academic Portal** — course-scoped teacher access and attendance.
- **Bella Ops** — browser-local restaurant customer/operations prototype.

**Additional engineering:** MiniLang Interpreter and TaskFlow. The Android section includes eleven projects with emulator screenshots, public browser demos and case studies. Sfera Tag Scanner appears in the Android section.

The Project-2026 additions are BugRepro, Constraint Engine, Debug AI, Smart Home Command Center and Voice to Code. Each case study includes a screenshot of an example workflow, local demo commands and the limits recorded in the project handoff. The Android cards offer browser demo links where available.

The engineering case studies show screenshots from prepared local checkouts. Android cards link to browser demos where available. Preparation changes have not been pushed to the source repositories, so GitHub may differ from the captures. Test counts describe local technical checks, not usage or business outcomes.

The catalogues are `assets/projects/catalogue.json` and `assets/projects/android.json`. Run `node scripts/prepare-showcase.cjs` to rebuild the HTML cards and case studies. The portfolio exposes the Android section at `#android`.

For local review, run `node scripts/preview-static.cjs` and open `http://127.0.0.1:5185/`. Run `npm run check` to verify the HTML and scripts.

To restore the nine local demos on this machine, run `./scripts/demo-hub.ps1 Start -ArtifactsRoot "C:/path/to/demo-artifacts"` in PowerShell 7. `Status` checks listeners and `Stop` stops only hub-owned processes/containers. The portfolio shows local demo buttons only on an exact loopback hostname; public visitors retain screenshot/case-study/source links. See [local demo guide](docs/showcase/LOCAL-DEMOS.md) for prerequisites, retained services and resource limits.

The public portfolio intentionally shows this curated selection. Additional, lower-priority project cards remain archived in `index.html` with `data-archived="true"` and `hidden`; remove both attributes only after deciding they should return to the public selection.

## Structure

```
portfolio/
├── index.html          # Main portfolio page
├── grafica.html        # Graphic design projects page
├── styles.css          # Main stylesheet
├── script.js           # Core portfolio interactions
├── js/                 # Focused UI modules (about, projects, skills, graphics)
├── assets/             # Favicon and static assets
├── file/               # CV and resume PDFs
└── imagens/            # Project images and screenshots
```

## Run Locally

The portfolio is a static site. Open `index.html` directly, or serve the folder with any static file server:

```bash
npx serve .
```

## Development Checks

No package installation is required for the current checks. Run the JavaScript syntax check before publishing changes:

```bash
npm run check
```

The portfolio uses Font Awesome and Google Fonts from CDNs. The contact form submits through Formspree; update the form endpoint in `index.html` if the contact inbox changes.

## Asset and media policy

Keep portfolio assets in the repository whenever possible. Do not add new externally hosted screenshots or media. If an original asset is unavailable, use an explicit unavailable-preview state rather than a broken request or a replacement that could misrepresent the work. The existing externally hosted profile and project screenshots should be replaced with owner-supplied local originals in a future update.

## Interaction Notes

- The responsive navigation is keyboard-accessible and closes after choosing a section.
- Project search and category filters work together, announce their result count, and provide an empty-state reset.
- Public project cards progressively enhance with keyboard-accessible detail controls while keeping their summaries visible.
- Every public project has an accessible preview dialog: original imagery where available and clearly labeled interactive feature previews otherwise.
- Skill cards use plain-language proficiency labels rather than arbitrary percentage scores.
- The contact form reports sending, success, and error states without leaving the page.
- Project poster cards are intentional text-first fallbacks where a project screenshot is not available yet.
- Motion honors each visitor's reduced-motion preference; the graphics slideshow also pauses on hover, focus, and request.

## License

All rights reserved. This portfolio and its contents are the intellectual property of Luiz Fehlberg.
