# React Portfolio Candidate Design

## Purpose

Build a separate, production-quality portfolio candidate for Luiz Fehlberg. The candidate will not replace the current static portfolio until it has been reviewed through a separate preview deployment.

The portfolio targets general software developer roles while also accepting freelance enquiries. It presents broad engineering ability across web, mobile, backend, automation, architecture, and embedded systems without unsupported claims or invented product evidence.

## Approved product decisions

- Build the candidate separately from the existing static portfolio.
- Use Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion.
- Deploy to a separate Vercel preview URL for review.
- Keep the current blue-and-teal visual identity.
- Follow the visitor's system light or dark theme automatically, with no manual theme toggle.
- Use English only.
- Lead with the title “Computer Engineer & Software Developer.”
- State availability for remote, hybrid, and relocation opportunities.
- Hide the CV button until an updated English CV is supplied.
- Use a new user-supplied professional photo. Until it is supplied, the preview uses the architecture visual without a portrait placeholder.
- Show GitHub, LinkedIn, and YouTube profiles.
- Include both employment and freelance enquiry paths in the contact form.
- Use privacy-limited Vercel Web Analytics.
- Add no tool attribution, generated-with text, co-author footer, or other implementation provenance to the public site or repository content.

## Audience and positioning

The primary audience is recruiters, engineering managers, and potential collaborators evaluating Luiz for a general software developer role. The portfolio should demonstrate:

1. Range across platforms and stacks.
2. Ability to reason about architecture and trade-offs.
3. Ability to complete practical software independently.
4. Responsible handling of safety, privacy, release status, and technical claims.

The hero identity is:

- Name: Luiz Fehlberg
- Role: Computer Engineer & Software Developer
- Positioning: dependable software across web, mobile, automation, and systems
- Availability: open to remote, hybrid, and relocation opportunities

## Information architecture

### Homepage

The homepage contains, in order:

1. Sticky top navigation with Home, Projects, Skills, About, and Contact.
2. Hero with professional identity, availability, primary actions, and animated architecture visual.
3. Four featured projects with expandable summaries and links to dedicated case studies.
4. Filterable secondary project grid.
5. Evidence-based skills grouped by Languages, Frameworks, and Tools & Systems.
6. Professional experience and education.
7. Concise About section focused on independent delivery and career trajectory.
8. Contact section supporting employment and freelance enquiries.
9. Footer with selected public profiles and legal ownership notice.

### Featured case-study routes

The four featured projects are:

1. Flowchart-to-Code Converter
2. Architectural Pattern Showcase
3. VehicleOS
4. Bem-Estar Gym pilot

Each dedicated case study contains:

- Project summary and honest status
- Problem
- Constraints
- Architecture
- Major engineering decisions and trade-offs
- Implementation highlights
- Verified result
- Technology stack
- Clearly labelled interface concepts or feature visualizations
- Real screenshots when supplied and verified
- Public repository link, or an explicitly labelled GitHub-profile link
- Links to the previous and next featured case study

### Secondary project grid

The initial secondary set is:

- Insurex
- Vitalis
- L.Y.R.A.
- T.A.R.S.
- Local Video Subtitle Tool
- User Session Tracker Pro
- Bulk File Renamer

Secondary projects can be filtered by Mobile, CLI, Web, AI, and Architecture. Filtering uses opacity and transform transitions with no layout-dependent animation.

## Project truth and evidence rules

- Real screenshots take precedence when supplied.
- Designed product screens must be labelled “Interface concept.”
- Abstract product diagrams must be labelled “Feature visualization.”
- Designed visuals must never be described as live product screenshots.
- “View repository” is used only for a verified project repository URL.
- Projects without public code use “Explore GitHub profile.”
- Private or unavailable repositories are described honestly.
- No fabricated users, revenue, performance, production readiness, coverage, or usage data is allowed.
- Quantitative claims require a repository-derived or user-confirmed source.

Approved featured-project evidence:

- Flowchart-to-Code Converter: qualitative outcome only; no numerical metric.
- Architectural Pattern Showcase: one member-management system implemented in two architectures, two-tier and three-tier.
- VehicleOS: qualitative outcome only; no numerical metric.
- Bem-Estar Gym: four role-based experiences, platform administrator, gym owner, trainer, and member. Status is pilot scope, not production ready.

## Visual direction

The candidate evolves the existing portfolio identity instead of adopting the proposed amber console theme.

### Palette

- Primary accent: current portfolio blue
- Secondary accent: current portfolio teal
- Dark theme: deep navy backgrounds, cool glass surfaces, high-contrast light text
- Light theme: cool white and pale blue surfaces, dark navy text, the same blue-and-teal accents
- Both themes must meet WCAG AA contrast requirements in default, hover, focus, disabled, error, and selected states

### Typography

- Display: Space Grotesk or a metrically compatible local fallback
- Body: IBM Plex Sans or a metrically compatible local fallback
- Technical data and labels: IBM Plex Mono or a metrically compatible local fallback
- Fonts must use optimized loading and resilient fallbacks

### Hero architecture visual

The signature hero visual combines two approved concepts:

1. A technical application flow: Interface → API → Services → Database.
2. Featured projects and technologies revealed against the layer they demonstrate.

The animation communicates data and responsibility moving through the system. It must remain understandable as a static diagram. It is decorative support for the written hero, not the only source of information.

### Motion

The hero and route transitions may use cinematic motion. All other motion remains restrained.

Allowed motion:

- Hero architecture paths and node reveals
- Case-study route transitions
- Section fade and transform reveals
- Project filter reflow
- Expand and collapse transitions
- Button, link, and card feedback

Guardrails:

- Animate transform and opacity rather than layout properties.
- No scroll-jacking.
- No continuously running heavy background animation after the hero settles.
- Avoid WebGL unless profiling proves a clear benefit and acceptable mobile performance.
- `prefers-reduced-motion` renders the final state immediately and disables nonessential transitions.
- Mobile performance takes priority over decorative effects.

## Technical architecture

### Rendering and routes

- Next.js App Router provides the homepage and static featured case-study routes.
- Project content is stored in one typed data module.
- Cards, filters, metadata, and case studies consume the same project records.
- Static project pages are generated at build time.
- Route-specific metadata includes title, description, canonical path, and social-sharing image.
- A sitemap and robots file are generated from public routes.

### Server and client boundaries

Server-rendered by default:

- Page shell
- Navigation content
- Hero copy
- Project content
- Skills, experience, education, and About content
- Case-study content
- Metadata

Client components are limited to:

- Hero architecture animation
- Mobile navigation
- Project filters and expandable previews
- Route transition presentation
- System-theme observation when required beyond CSS media queries
- Contact form state and validation
- Vercel Analytics integration

### Project data contract

Each project record includes:

- Stable ID and slug
- Title and short summary
- Problem, constraints, decisions, and outcome
- Stack and category tags
- Featured and public flags
- Honest status
- Visualization type and label
- Optional verified repository URL
- Optional live URL
- Optional confirmed evidence statements
- SEO title and description

The build fails when a featured project lacks required case-study content, metadata, or visualization labelling.

## Contact flow

The contact form uses the existing Formspree service and contains:

- Name
- Email
- Enquiry type: employment or freelance
- Message

Requirements:

- Validate on the client and through native form constraints.
- Associate field errors with inputs.
- Focus the first invalid field.
- Announce submission state and result.
- Disable duplicate submission while sending.
- Preserve entered content when submission fails.
- Present direct email as the fallback.
- Never send form names, email addresses, message contents, or validation errors to analytics.

## Analytics

Vercel Web Analytics is enabled only after deployment. Approved events are:

1. Page and case-study views
2. Verified repository link clicks
3. GitHub-profile link clicks from private projects
4. CV clicks after the updated CV is supplied
5. Successful contact-form completion

Analytics must not include names, email addresses, messages, free-text fields, or other personally identifying form data.

## Accessibility and resilience

- Target WCAG 2.1 AA.
- Maintain semantic landmark and heading order.
- All interactive controls require visible focus states and keyboard operation.
- Expandable regions expose `aria-expanded` and `aria-controls`.
- Filter status changes use an appropriate live region.
- Visualizations have concise text alternatives and explicit concept labels.
- Reduced-motion behavior is tested, not assumed.
- Focus returns correctly after dialogs or expandable overlays close.
- The architecture visual has a complete static fallback.
- External links use descriptive labels and safe `rel` values.
- Formspree failure preserves the user's draft and exposes the email fallback.
- Missing media uses a designed, labelled visualization rather than a broken asset or fabricated screenshot.

## Performance

- Optimize and locally store the supplied profile photo and owned project media.
- Use explicit image dimensions and modern formats.
- Lazy-load below-the-fold images and interactive visualizations.
- Keep the hero animation lightweight and stop continuous work after completion.
- Route-split case studies and client-only interactions.
- Avoid loading project-specific visual code on unrelated routes.
- Validate production performance on mobile before preview approval.

## Testing and acceptance

### Automated tests

- Project data validation and required fields
- Featured and secondary project selection
- Category filtering
- Case-study route generation
- Link-label rules for repositories and GitHub-profile fallbacks
- Contact validation and submission states
- Analytics event allowlist and absence of form data
- Reduced-motion rendering
- Unique metadata per public route

### Browser verification

- Viewports: 390, 768, and 1440 CSS pixels
- System light and dark themes
- Keyboard-only navigation
- Hero static and animated states
- Project filtering and expansion
- All featured case-study routes
- Contact success and failure states without submitting real test messages to production
- No horizontal overflow
- Focus visibility and focus return

### Release gates

- Production build passes.
- Automated tests pass.
- Lighthouse and accessibility checks have no unresolved critical or serious issues.
- Real screen-reader smoke test covers navigation, one project, and contact validation.
- No broken public links.
- All visualizations are correctly labelled.
- User supplies and approves the professional profile photo before final release.
- CV remains hidden until an updated English CV is supplied and approved.
- User approves the Vercel preview before any replacement of the current portfolio.

## Delivery boundaries

The first delivery creates a separate candidate and preview. It does not replace the existing static portfolio, push to the current production branch, publish a custom domain, fabricate missing assets, or claim production readiness for pilot projects.

