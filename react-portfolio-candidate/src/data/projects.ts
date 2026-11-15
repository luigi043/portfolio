import androidRecords from "./android.json";
import localProjects from "./local-projects.json";

export const projectCategories = [
  "All",
  "Mobile",
  "CLI",
  "Web",
  "AI",
  "Architecture",
] as const;

export type ProjectCategory = Exclude<
  (typeof projectCategories)[number],
  "All"
>;
export type VisualizationKind =
  "interface-concept" | "feature-visualization" | "runtime-screenshot";

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortSummary: string;
  problem: string;
  constraints: string[];
  architecture: string;
  decisions: string[];
  highlights: string[];
  outcome: string;
  stack: string[];
  categories: ProjectCategory[];
  featured: boolean;
  public: boolean;
  status: string;
  visualization: {
    kind: VisualizationKind;
    label: "Interface concept" | "Feature visualization" | "Runtime screenshot";
    description: string;
  };
  screenshot?: string;
  gallery?: { src: string; alt: string; width: number; height: number }[];
  screenshotAlt?: string;
  width?: number;
  height?: number;
  caseStudy?: boolean;
  repositoryUrl?: string;
  liveUrl?: string;
  demoSetup?: string;
  apkUrl?: string;
  evidence: string[];
  seo: {
    title: string;
    description: string;
  };
};

const legacyProjects: Project[] = [
  {
    id: "flowchart-code",
    slug: "flowchart-to-code-converter",
    title: "Flowchart-to-Code Converter",
    shortSummary:
      "A visual programming tool that turns structured flowcharts into pseudocode, Python, and JavaScript.",
    problem:
      "Learning control flow is harder when the diagram and generated program drift apart or invalid structures reach code generation.",
    constraints: [
      "Keep the visual editor understandable for learners.",
      "Validate graph structure before generation.",
      "Produce multiple language outputs from one model without claiming equivalence beyond supported nodes.",
    ],
    architecture:
      "A React Flow editor creates a typed graph model. Validation normalises and checks the graph before language-specific generators render pseudocode, Python, or JavaScript.",
    decisions: [
      "Use one canonical graph model rather than separate state per output language.",
      "Block generation on structural errors and return actionable feedback.",
      "Keep generators deterministic so the same graph produces the same output.",
    ],
    highlights: [
      "Drag-and-drop flow construction.",
      "Structural validation before code generation.",
      "Side-by-side language output from a shared graph.",
    ],
    outcome:
      "A working educational workflow connects visual reasoning to generated code without relying on unsupported numerical claims.",
    stack: ["React", "TypeScript", "React Flow", "Node.js"],
    categories: ["Web"],
    featured: true,
    public: true,
    status: "Public repository · educational tool",
    visualization: {
      kind: "interface-concept",
      label: "Interface concept",
      description:
        "A labelled concept showing the node canvas, validation panel, and generated language tabs. It is not a product screenshot.",
    },
    repositoryUrl: "https://github.com/luigi043/demo3-flowchart-to-code",
    evidence: [
      "Qualitative result only; no numerical performance or usage claim.",
    ],
    seo: {
      title: "Flowchart-to-Code Converter Case Study | Luiz Fehlberg",
      description:
        "How a typed graph, structural validation, and deterministic generators connect flowcharts to pseudocode, Python, and JavaScript.",
    },
  },
  {
    id: "architecture-showcase",
    slug: "architectural-pattern-showcase",
    title: "Architectural Pattern Showcase",
    shortSummary:
      "The same member-management domain implemented as both two-tier and three-tier systems.",
    problem:
      "Architecture trade-offs are difficult to explain when examples change both the domain and the implementation at the same time.",
    constraints: [
      "Keep the member-management behavior comparable.",
      "Make responsibilities and dependency direction visible.",
      "Avoid presenting one pattern as universally superior.",
    ],
    architecture:
      "One implementation connects the client directly to the data tier. The other inserts a service layer between presentation and persistence while preserving the same domain workflow.",
    decisions: [
      "Use one domain and equivalent user flows for both architectures.",
      "Explain operational simplicity versus separation and deployment flexibility.",
      "Keep diagrams explicit about process and data boundaries.",
    ],
    highlights: [
      "Comparable two-tier and three-tier implementations.",
      "Shared member-management scenario.",
      "Responsibility and dependency diagrams.",
    ],
    outcome:
      "The paired implementation provides a concrete way to discuss where each architecture reduces or introduces complexity.",
    stack: ["C#", ".NET", "SQL Server", "Architecture"],
    categories: ["Architecture"],
    featured: true,
    public: true,
    status: "Architecture study · public repository not verified",
    visualization: {
      kind: "feature-visualization",
      label: "Feature visualization",
      description:
        "A comparison diagram of presentation, service, and data responsibilities in two-tier and three-tier variants.",
    },
    evidence: [
      "One member-management system implemented in two architectures: two-tier and three-tier.",
    ],
    seo: {
      title: "Architectural Pattern Showcase Case Study | Luiz Fehlberg",
      description:
        "A controlled comparison of two-tier and three-tier member-management systems and their engineering trade-offs.",
    },
  },
  {
    id: "vehicle-os",
    slug: "vehicleos",
    title: "VehicleOS",
    shortSummary:
      "A full-stack vehicle management platform covering authentication, vehicle records, and service history.",
    problem:
      "Vehicle information and maintenance history become difficult to reason about when identity, ownership, and service records are handled as disconnected features.",
    constraints: [
      "Protect authenticated vehicle data.",
      "Keep frontend, API, and persistence contracts aligned.",
      "Support a repeatable local environment without claiming production readiness.",
    ],
    architecture:
      "A React client communicates with a Spring Boot API backed by PostgreSQL. Authentication gates vehicle and service-history workflows, while Docker describes the local service topology.",
    decisions: [
      "Keep domain rules in backend services rather than UI components.",
      "Use explicit API contracts for vehicle and service-history data.",
      "Containerise supporting services for consistent local setup.",
    ],
    highlights: [
      "Authenticated vehicle CRUD workflows.",
      "Service-history modelling.",
      "Containerised application topology.",
    ],
    outcome:
      "The project demonstrates an end-to-end vehicle workflow across frontend, backend, database, and local infrastructure layers.",
    stack: ["Spring Boot", "React", "PostgreSQL", "Docker"],
    categories: ["Web", "Architecture"],
    featured: true,
    public: true,
    status: "Portfolio project · public repository not verified",
    visualization: {
      kind: "feature-visualization",
      label: "Feature visualization",
      description:
        "A system flow linking authentication, vehicle records, service history, the API, and PostgreSQL.",
    },
    evidence: [
      "Qualitative result only; no numerical performance or usage claim.",
    ],
    seo: {
      title: "VehicleOS Case Study | Luiz Fehlberg",
      description:
        "Architecture and trade-offs behind a Spring Boot, React, PostgreSQL, and Docker vehicle management platform.",
    },
  },
  {
    id: "bem-estar",
    slug: "bem-estar-gym-pilot",
    title: "Bem-Estar Gym pilot",
    shortSummary:
      "A pilot-scoped gym management system shaped around four distinct role-based experiences.",
    problem:
      "Gym operations cross platform administration, gym ownership, training delivery, and member participation, each with different permissions and priorities.",
    constraints: [
      "Keep tenant and role boundaries explicit.",
      "Treat financial and operational readiness as unresolved release work.",
      "Present pilot scope honestly rather than implying production use.",
    ],
    architecture:
      "A web client and Node.js service layer organise workflows around platform administrator, gym owner, trainer, and member roles with PostgreSQL persistence.",
    decisions: [
      "Model permissions around four role experiences.",
      "Keep tenant-aware behavior visible at service boundaries.",
      "Gate any production claim on financial precision, migrations, backup restore, and physical pilot verification.",
    ],
    highlights: [
      "Platform administrator experience.",
      "Gym owner experience.",
      "Trainer and member experiences.",
    ],
    outcome:
      "The pilot demonstrates the planned multi-role workflow, while production readiness remains explicitly unclaimed.",
    stack: ["Node.js", "React", "PostgreSQL", "Prisma"],
    categories: ["Web", "Architecture"],
    featured: true,
    public: true,
    status: "Pilot scope · not production ready",
    visualization: {
      kind: "interface-concept",
      label: "Interface concept",
      description:
        "Four labelled role views around a shared gym workspace. These designed views are not live product screenshots.",
    },
    evidence: [
      "Four role-based experiences: platform administrator, gym owner, trainer, and member.",
      "Pilot scope only; production readiness is not claimed.",
    ],
    seo: {
      title: "Bem-Estar Gym Pilot Case Study | Luiz Fehlberg",
      description:
        "A candid pilot case study for a four-role gym management system and its remaining production gates.",
    },
  },
  {
    id: "insurex",
    slug: "insurex",
    title: "Insurex",
    shortSummary:
      "An insurance asset-protection workflow delivered across web, service, and data layers.",
    problem:
      "Role-specific insurance workflows need a shared view of policies, assets, and reporting.",
    constraints: [
      "Integrate a legacy-oriented .NET stack.",
      "Respect role boundaries.",
      "Keep client details private.",
    ],
    architecture:
      "ASP.NET Web Forms consumes REST and WCF services backed by a SQL Server data layer.",
    decisions: [
      "Separate portal, service, and data responsibilities.",
      "Keep reporting behind role-aware workflows.",
    ],
    highlights: [
      "Role-specific dashboards.",
      "Policy and asset workflows.",
      "Reporting integration.",
    ],
    outcome:
      "A freelance delivery spanning the application layers without exposing private client data.",
    stack: ["C#", ".NET", "WCF", "SQL Server"],
    categories: ["Web", "Architecture"],
    featured: false,
    public: true,
    status: "Freelance delivery · repository private or unavailable",
    visualization: {
      kind: "feature-visualization",
      label: "Feature visualization",
      description: "A role and service boundary map.",
    },
    evidence: [],
    seo: {
      title: "Insurex | Luiz Fehlberg",
      description:
        "An insurance asset-protection workflow across web, service, and data layers.",
    },
  },
  {
    id: "vitalis",
    slug: "vitalis",
    title: "Vitalis",
    shortSummary: "An offline-first Android health and wellbeing application.",
    problem:
      "Personal meal, mood, and journal information should remain useful without requiring cloud storage.",
    constraints: [
      "Keep personal data on device.",
      "Support offline use.",
      "Fit mobile interaction patterns.",
    ],
    architecture:
      "A Kotlin and Jetpack Compose app stores local wellbeing data on the device.",
    decisions: [
      "Prefer local persistence.",
      "Group planning and reflection workflows in one mobile experience.",
    ],
    highlights: ["Meal planning.", "Mood tracking.", "Private journal."],
    outcome:
      "A mobile concept focused on private, offline wellbeing workflows.",
    stack: ["Kotlin", "Jetpack Compose", "Android"],
    categories: ["Mobile"],
    featured: false,
    public: true,
    status: "Portfolio project · public repository not verified",
    visualization: {
      kind: "interface-concept",
      label: "Interface concept",
      description: "A labelled mobile wellbeing flow, not a live screenshot.",
    },
    evidence: [],
    seo: {
      title: "Vitalis | Luiz Fehlberg",
      description: "An offline-first Android wellbeing application.",
    },
  },
  {
    id: "lyra",
    slug: "lyra",
    title: "L.Y.R.A.",
    shortSummary:
      "A local-first personal command centre for projects, research, and connected workflows.",
    problem:
      "Personal work is fragmented across projects, research, calendar, social, and everyday tasks.",
    constraints: [
      "Show disconnected providers honestly.",
      "Keep consequential actions approval-gated.",
      "Keep credentials server-side.",
    ],
    architecture:
      "A modular TypeScript workspace separates the web experience, workflow services, adapters, and persisted records.",
    decisions: [
      "Use deterministic previews.",
      "Separate approval from execution.",
      "Stage external providers incrementally.",
    ],
    highlights: [
      "Project command centre.",
      "Connection states.",
      "Approval-aware workflows.",
    ],
    outcome:
      "A practical local-first workspace with honest integration boundaries.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    categories: ["Web", "AI", "Architecture"],
    featured: false,
    public: true,
    status: "Local-first application · integrations staged",
    visualization: {
      kind: "interface-concept",
      label: "Interface concept",
      description: "A command-centre workspace concept.",
    },
    evidence: [],
    seo: {
      title: "L.Y.R.A. | Luiz Fehlberg",
      description:
        "A local-first personal command centre with approval-aware workflows.",
    },
  },
  {
    id: "tars",
    slug: "tars",
    title: "T.A.R.S.",
    shortSummary:
      "A developer-oriented assistant experiment focused on structured local workflows.",
    problem:
      "Developer assistance becomes unreliable when context and actions are not clearly bounded.",
    constraints: [
      "Keep local actions explicit.",
      "Do not imply autonomous production access.",
      "Expose workflow status.",
    ],
    architecture:
      "A local command layer coordinates bounded tools and presents their state to the user.",
    decisions: ["Prefer explicit actions.", "Keep tool output inspectable."],
    highlights: [
      "Structured commands.",
      "Visible task state.",
      "Local workflow focus.",
    ],
    outcome:
      "An assistant experiment used to explore clear boundaries between suggestion and action.",
    stack: ["Python", "TypeScript", "Automation"],
    categories: ["AI", "CLI"],
    featured: false,
    public: true,
    status: "Experimental project · public repository not verified",
    visualization: {
      kind: "feature-visualization",
      label: "Feature visualization",
      description: "A bounded assistant workflow diagram.",
    },
    evidence: [],
    seo: {
      title: "T.A.R.S. | Luiz Fehlberg",
      description: "A bounded developer-assistant workflow experiment.",
    },
  },
  {
    id: "subtitle-tool",
    slug: "local-video-subtitle-tool",
    title: "Local Video Subtitle Tool",
    shortSummary:
      "A local workflow for creating and reviewing subtitles without uploading source video.",
    problem:
      "Private video material may need transcription and subtitle review without a hosted workflow.",
    constraints: [
      "Keep source files local.",
      "Expose reviewable subtitle output.",
      "Avoid unsupported accuracy claims.",
    ],
    architecture:
      "A local processing pipeline extracts audio, runs transcription, and writes editable subtitle files.",
    decisions: [
      "Keep media local.",
      "Produce standard subtitle output.",
      "Treat generated text as review-required.",
    ],
    highlights: [
      "Local media processing.",
      "Editable subtitle output.",
      "Review-first workflow.",
    ],
    outcome:
      "A repeatable local subtitle workflow with human review kept in the loop.",
    stack: ["Python", "FFmpeg", "CLI"],
    categories: ["CLI", "AI"],
    featured: false,
    public: true,
    status: "Local tool · public repository not verified",
    visualization: {
      kind: "feature-visualization",
      label: "Feature visualization",
      description: "A local media-to-subtitle pipeline.",
    },
    evidence: [],
    seo: {
      title: "Local Video Subtitle Tool | Luiz Fehlberg",
      description: "A private, review-first local subtitle workflow.",
    },
  },
  {
    id: "session-tracker",
    slug: "user-session-tracker-pro",
    title: "User Session Tracker Pro",
    shortSummary:
      "A web dashboard concept for inspecting user-session events and operational signals.",
    problem:
      "Session events are hard to inspect when raw records lack a usable timeline and filters.",
    constraints: [
      "Avoid claiming live production traffic.",
      "Keep event details readable.",
      "Protect personal data.",
    ],
    architecture:
      "A web interface queries structured session events and renders filtered timelines and summaries.",
    decisions: [
      "Use explicit event schemas.",
      "Keep the interface a concept until live evidence is supplied.",
    ],
    highlights: [
      "Event timeline.",
      "Session filters.",
      "Operational summaries.",
    ],
    outcome:
      "An interface concept for reasoning about session events without invented usage data.",
    stack: ["TypeScript", "React", "Web"],
    categories: ["Web"],
    featured: false,
    public: true,
    status: "Interface concept · public repository not verified",
    visualization: {
      kind: "interface-concept",
      label: "Interface concept",
      description:
        "A designed session timeline, not a live dashboard screenshot.",
    },
    evidence: [],
    seo: {
      title: "User Session Tracker Pro | Luiz Fehlberg",
      description: "A privacy-aware session event dashboard concept.",
    },
  },
  {
    id: "bulk-renamer",
    slug: "bulk-file-renamer",
    title: "Bulk File Renamer",
    shortSummary:
      "A command-line utility for previewing and applying predictable batch rename rules.",
    problem:
      "Manual renaming is slow and error-prone when many files follow the same rule.",
    constraints: [
      "Preview changes before applying.",
      "Avoid overwrites.",
      "Keep rename rules deterministic.",
    ],
    architecture:
      "A CLI parses rename rules, builds a proposed manifest, validates collisions, and applies confirmed changes.",
    decisions: [
      "Make preview the default.",
      "Reject collisions before mutation.",
      "Keep output auditable.",
    ],
    highlights: [
      "Dry-run preview.",
      "Collision checks.",
      "Deterministic rules.",
    ],
    outcome:
      "A safer batch-rename workflow centred on preview and explicit application.",
    stack: ["Python", "CLI", "File systems"],
    categories: ["CLI"],
    featured: false,
    public: true,
    status: "Utility project · public repository not verified",
    visualization: {
      kind: "feature-visualization",
      label: "Feature visualization",
      description: "A preview, validate, and apply command flow.",
    },
    evidence: [],
    seo: {
      title: "Bulk File Renamer | Luiz Fehlberg",
      description: "A preview-first batch file renaming utility.",
    },
  },
];

const preparedProjects = [
  {
    id: "vehicle-build-cost-calculator",
    slug: "vehicle-build-cost-calculator",
    title: "Vehicle Build Cost Calculator",
    shortSummary:
      "Owner-scoped build budgets with planned, actual and projected costs across independent scenarios.",
    problem:
      "Build estimates need explicit prices, consistent scenario links and a reliable ownership boundary.",
    architecture:
      "React communicates with an ASP.NET Core API; EF Core persists owner-scoped records and decimal costs in PostgreSQL.",
    decisions: [
      "Scope queries and summaries to the JWT owner, including parent links.",
      "Keep unknown legacy costs and owners unassigned; never infer money from notes.",
      "Compare alternatives separately and include shared costs once.",
    ],
    highlights: [
      "Build and scenario CRUD with linked parts, labor and forecast allowances.",
      "Server-calculated planned, actual and projected totals; EUR, USD and GBP without conversion.",
    ],
    outcome:
      "38 backend tests, frontend build, real browser cost edits and PostgreSQL migration/persistence checks passed.",
    constraints: [
      "Full line totals only: no quantity pricing, partial-payment ledger, receipts or currency conversion.",
      "Production secrets, token lifecycle, deployment migrations and broader accessibility review remain.",
    ],
    stack: [
      "React",
      "TypeScript",
      "ASP.NET Core",
      "EF Core",
      "PostgreSQL",
      "JWT",
    ],
    categories: ["Web", "Architecture"],
    featured: true,
    public: true,
    status: "Local demonstration · Static runtime preview",
    screenshot: "/assets/projects/vehicle-build-cost-calculator.webp",
    screenshotAlt:
      "Cost comparison table with separate planned, paid, projected and remaining amounts",
    width: 1152,
    height: 481,
    visualization: {
      kind: "runtime-screenshot",
      label: "Runtime screenshot",
      description:
        "Cost comparison table with separate planned, paid, projected and remaining amounts",
    },
    repositoryUrl: "https://github.com/luigi043/vehicle-build-cost-calculator",
    evidence: [
      "Verification describes the prepared local checkout on 28–29 October 2026; it is not a production or business outcome claim.",
      "Prepared improvements have not been pushed; the public repository may differ from this runtime preview.",
    ],
    seo: {
      title: "Vehicle Build Cost Calculator Case Study | Luiz Fehlberg",
      description:
        "Owner-scoped build budgets with planned, actual and projected costs across independent scenarios.",
    },
    caseStudy: true,
  },
  {
    id: "bmw-configurator",
    slug: "bmw-configurator",
    title: "BMW Configurator / Drive Studio",
    shortSummary:
      "A procedural 3D concept car with visible customization, indicative pricing and a build-summary dialog.",
    problem:
      "Visual selections and the quoted total must agree with the rendered car and build summary.",
    architecture:
      "A React interface shares configuration through Zustand; React Three Fiber renders one procedural body with local studio reflections.",
    decisions: [
      "Render one procedural model and expose wheels through body openings.",
      "Validate package IDs and deduplicate charges.",
      "Honor reduced motion and separate the viewport from mobile controls.",
    ],
    highlights: [
      "Paint, wheel and cabin-accent selections with reset.",
      "Build review lists current selections and exact illustrative EUR line items.",
    ],
    outcome:
      "14 unit tests, 12 desktop/mobile browser checks, lint and production build passed.",
    constraints: [
      "Independent concept; no official BMW affiliation. Prices are illustrative, not dealer quotations.",
      "Two tiers share one stylized body; interior is an accent and driver assistance affects price only.",
      "No saved builds, checkout or backend. Inactive OBJ provenance is unverified; that asset is not reused here.",
    ],
    stack: [
      "React",
      "JavaScript",
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "Zustand",
    ],
    categories: ["Web"],
    featured: true,
    public: true,
    status: "Local demonstration · Static runtime preview",
    screenshot: "/assets/projects/bmw-configurator.webp",
    screenshotAlt:
      "Customized procedural concept car and configuration controls",
    width: 1440,
    height: 1000,
    visualization: {
      kind: "runtime-screenshot",
      label: "Runtime screenshot",
      description:
        "Customized procedural concept car and configuration controls",
    },
    repositoryUrl: "https://github.com/luigi043/bmw-configurator",
    evidence: [
      "Verification describes the prepared local checkout on 28–29 October 2026; it is not a production or business outcome claim.",
      "Prepared improvements have not been pushed; the public repository may differ from this runtime preview.",
    ],
    seo: {
      title: "BMW Configurator / Drive Studio Case Study | Luiz Fehlberg",
      description:
        "A procedural 3D concept car with visible customization, indicative pricing and a build-summary dialog.",
    },
    caseStudy: true,
  },
  {
    id: "flowchart-to-code-converter",
    slug: "flowchart-to-code-converter",
    title: "Flowchart-to-Code",
    shortSummary:
      "A visual editor that validates structured graphs and generates pseudocode, Python and JavaScript.",
    problem:
      "Branch joins and invalid graph connections can silently change the meaning of generated code.",
    architecture:
      "React Flow sends a graph to Express; validation precedes a shared intermediate representation and three language renderers.",
    decisions: [
      "Validate connectivity and outgoing edges after adjacency construction.",
      "Use common postdominators to identify shared continuations.",
      "Clear stale output after edits and discard delayed responses.",
    ],
    highlights: [
      "Edit nodes and connections, reset examples, copy and download generated source.",
      "Actionable feedback for invalid graphs and unsupported structures.",
    ],
    outcome:
      "36 backend tests with Python enabled, two frontend API tests, HTTP checks and real browser workflows passed.",
    constraints: [
      "Acyclic sequences and structured decisions only; loops and crossing overlaps are rejected.",
      "Labels are emitted as verbatim code: no expression parser, type checker or safe-code guarantee.",
      "No diagram persistence or hosted execution. The canvas is designed for desktop/laptop use.",
    ],
    stack: ["React", "TypeScript", "React Flow", "Express"],
    categories: ["Web", "Architecture"],
    featured: true,
    public: true,
    status: "Local demonstration · Static runtime preview",
    screenshot: "/assets/projects/flowchart-to-code-converter.webp",
    screenshotAlt:
      "Flowchart canvas and generated pseudocode for an even/odd decision",
    width: 1280,
    height: 800,
    visualization: {
      kind: "runtime-screenshot",
      label: "Runtime screenshot",
      description:
        "Flowchart canvas and generated pseudocode for an even/odd decision",
    },
    repositoryUrl: "https://github.com/luigi043/demo3-flowchart-to-code",
    evidence: [
      "Verification describes the prepared local checkout on 28–29 October 2026; it is not a production or business outcome claim.",
      "Prepared improvements have not been pushed; the public repository may differ from this runtime preview.",
    ],
    seo: {
      title: "Flowchart-to-Code Case Study | Luiz Fehlberg",
      description:
        "A visual editor that validates structured graphs and generates pseudocode, Python and JavaScript.",
    },
    caseStudy: true,
  },
  {
    id: "ctw-vehicle-fleet",
    slug: "ctw-vehicle-fleet",
    title: "CTW Vehicle Fleet",
    shortSummary:
      "A vehicle catalogue and stored telemetry reference app with two persistence models.",
    problem:
      "Vehicle master data and timestamped telemetry require distinct storage and clear validation feedback.",
    architecture:
      "Angular calls a layered Spring Boot API; Flyway manages PostgreSQL vehicle records and MongoDB stores timestamped telemetry. nginx proxies the integrated Docker environment.",
    decisions: [
      "Use DTOs and service boundaries rather than exposing persistence entities.",
      "Validate VIN uniqueness, numeric precision and missing measurements.",
      "Distinguish an empty telemetry result from a failed request.",
    ],
    highlights: [
      "Create, inspect, edit and delete vehicles with structured conflict errors.",
      "Read the latest stored telemetry; API endpoints expose ordered history.",
    ],
    outcome:
      "24 backend tests plus browser CRUD, mobile, API and restart-persistence checks passed.",
    constraints: [
      "Independent reference app; no company, client or employment affiliation is claimed.",
      "No authentication, streaming or sensor integration; history is unpaginated and telemetry remains after vehicle deletion.",
      "Local demo only. Preparation audit reported 55 npm advisories, including two critical build dependencies; remediation remains.",
    ],
    stack: [
      "Angular",
      "TypeScript",
      "Java 21",
      "Spring Boot",
      "PostgreSQL",
      "MongoDB",
      "Docker",
    ],
    categories: ["Web", "Architecture"],
    featured: true,
    public: true,
    status: "Local demonstration · Static runtime preview",
    screenshot: "/assets/projects/ctw-vehicle-fleet.webp",
    screenshotAlt: "Vehicle fleet catalogue with illustrative vehicle records",
    width: 1440,
    height: 1000,
    visualization: {
      kind: "runtime-screenshot",
      label: "Runtime screenshot",
      description: "Vehicle fleet catalogue with illustrative vehicle records",
    },
    repositoryUrl: "https://github.com/luigi043/ctw-vehicle-fleet",
    evidence: [
      "Verification describes the prepared local checkout on 28–29 October 2026; it is not a production or business outcome claim.",
      "Prepared improvements have not been pushed; the public repository may differ from this runtime preview.",
    ],
    seo: {
      title: "CTW Vehicle Fleet Case Study | Luiz Fehlberg",
      description:
        "A vehicle catalogue and stored telemetry reference app with two persistence models.",
    },
    caseStudy: true,
  },
  {
    id: "academic-portal",
    slug: "academic-portal",
    title: "Academic Portal / Portal Académico",
    shortSummary:
      "Course-scoped teacher access and attendance recording in a Laravel application.",
    problem:
      "Attendance updates must validate the enrolled roster and restrict teachers to assigned courses.",
    architecture:
      "Laravel session authentication protects Blade attendance views. Assignment checks run on the server; transactional writes and unique student/class keys preserve record integrity.",
    decisions: [
      "Reuse Laravel sessions and hashed passwords.",
      "Apply one course-context policy to viewing, editing and direct submissions.",
      "Validate the complete enrollment roster before a transaction.",
    ],
    highlights: [
      "Teacher sign-in/logout and assigned-course dashboard.",
      "Record present, absent, late or excused; review and correct saved attendance.",
    ],
    outcome:
      "10 tests with 68 assertions plus cross-teacher denial, browser logout, mobile and restart checks passed.",
    constraints: [
      "Local demo uses fictional students and SQLite; no institutional deployment or endorsement is claimed.",
      "No account administration, password recovery, MFA, change audit history or concurrent-edit resolution.",
      "Individual/group coursework context and exact personal contribution are unconfirmed.",
    ],
    stack: ["Laravel", "PHP", "Blade", "SQLite", "Eloquent"],
    categories: ["Web", "Architecture"],
    featured: true,
    public: true,
    status: "Local demonstration · Static runtime preview",
    screenshot: "/assets/projects/academic-portal.webp",
    screenshotAlt:
      "Attendance summary with fictional student records and four attendance states",
    width: 1265,
    height: 712,
    visualization: {
      kind: "runtime-screenshot",
      label: "Runtime screenshot",
      description:
        "Attendance summary with fictional student records and four attendance states",
    },
    repositoryUrl: "https://github.com/luigi043/projeto_psa",
    evidence: [
      "Verification describes the prepared local checkout on 28–29 October 2026; it is not a production or business outcome claim.",
      "Prepared improvements have not been pushed; the public repository may differ from this runtime preview.",
    ],
    seo: {
      title: "Academic Portal / Portal Académico Case Study | Luiz Fehlberg",
      description:
        "Course-scoped teacher access and attendance recording in a Laravel application.",
    },
    caseStudy: true,
  },
  {
    id: "bella-ops",
    slug: "bella-ops",
    title: "Bella Ops",
    shortSummary:
      "Connected restaurant customer and operations experiences sharing bookings, menus and orders in one browser.",
    problem:
      "Guest reservations and orders need to reach the operational view, while menu changes must reach customers.",
    architecture:
      "Lazy Angular customer and operations routes share TypeScript browser-local stores. SCSS supports the restaurant site and compact operations console.",
    decisions: [
      "Keep the existing frontend stack and explicit browser-local scope.",
      "Validate bookings and integer-cent totals; report failed storage writes.",
      "Persist customer order/status handoffs and menu visibility across reloads.",
    ],
    highlights: [
      "Browse the menu, save a reservation and place a simulated collection order.",
      "Review customer bookings/orders and publish menu prices and availability.",
    ],
    outcome:
      "Production build and five Chrome regression scenarios passed, including mobile, persistence, denied writes and repeat checkout.",
    constraints: [
      "Fictional restaurant prototype: no backend, real authentication, payments, email or multi-user synchronization.",
      "Overview sales, staff and charts are sample modules rather than measured checkout analytics.",
      "17 dependency advisories remain, including one critical; broader deployment needs remediation.",
    ],
    stack: ["Angular", "TypeScript", "SCSS", "localStorage"],
    categories: ["Web"],
    featured: true,
    public: true,
    status: "Local demonstration · Static runtime preview",
    screenshot: "/assets/projects/bella-ops.webp",
    screenshotAlt:
      "Fictional restaurant customer homepage with existing illustrative photography",
    width: 1440,
    height: 1000,
    visualization: {
      kind: "runtime-screenshot",
      label: "Runtime screenshot",
      description:
        "Fictional restaurant customer homepage with existing illustrative photography",
    },
    repositoryUrl: "https://github.com/luigi043/restaurant-app",
    evidence: [
      "Verification describes the prepared local checkout on 28–29 October 2026; it is not a production or business outcome claim.",
      "Prepared improvements have not been pushed; the public repository may differ from this runtime preview.",
    ],
    seo: {
      title: "Bella Ops Case Study | Luiz Fehlberg",
      description:
        "Connected restaurant customer and operations experiences sharing bookings, menus and orders in one browser.",
    },
    caseStudy: true,
  },
  {
    id: "lang-interpreter",
    slug: "lang-interpreter",
    title: "MiniLang Interpreter",
    shortSummary:
      "A TypeScript language pipeline with lexical environments, recursion, closures and a bounded browser playground.",
    problem:
      "Language features need consistent scope, logical precedence, return behavior and readable execution errors.",
    architecture:
      "A lexer feeds a recursive-descent parser and tree-walk interpreter. The browser runs the actual interpreter in a disposable worker; the CLI provides a persistent REPL.",
    decisions: [
      "Give blocks child environments and separate AND/OR precedence.",
      "Validate native arity/types and propagate returns explicitly.",
      "Bound visits, call depth and output; terminate browser workers on timeout.",
    ],
    highlights: [
      "Inspect editable examples including factorial and returned counter closures.",
      "Display tokens/statement counts, output and language errors; preserve/reset REPL state.",
    ],
    outcome:
      "62 interpreter tests, type checks, CLI/REPL checks, production build and browser examples passed.",
    constraints: [
      "Educational language: no arrays/objects, modules or JavaScript interop; numbers use JavaScript floating-point behavior.",
      "Worker limits are demo safeguards, not a hardened hostile-code sandbox or memory quota.",
      "Manual Stop was not independently confirmed; interpreter-budget termination and subsequent recovery were verified.",
    ],
    stack: ["TypeScript", "Lexer", "Parser", "AST", "Web Workers", "Vite"],
    categories: ["Web"],
    featured: false,
    public: true,
    status: "Local demonstration · Static runtime preview",
    screenshot: "/assets/projects/lang-interpreter.webp",
    screenshotAlt:
      "Actual MiniLang playground executing factorial of seven with output 5040",
    width: 1265,
    height: 1154,
    visualization: {
      kind: "runtime-screenshot",
      label: "Runtime screenshot",
      description:
        "Actual MiniLang playground executing factorial of seven with output 5040",
    },
    repositoryUrl: "https://github.com/luigi043/lang-interpreter",
    evidence: [
      "Verification describes the prepared local checkout on 28–29 October 2026; it is not a production or business outcome claim.",
      "Prepared improvements have not been pushed; the public repository may differ from this runtime preview.",
    ],
    seo: {
      title: "MiniLang Interpreter Case Study | Luiz Fehlberg",
      description:
        "A TypeScript language pipeline with lexical environments, recursion, closures and a bounded browser playground.",
    },
    caseStudy: true,
  },
  {
    id: "taskflow",
    slug: "taskflow",
    title: "TaskFlow",
    shortSummary:
      "A task manager with browser-local storage or an optional file-backed Express API.",
    problem:
      "Tasks should survive normal restarts and failed loads should be recoverable without losing edit feedback.",
    architecture:
      "A React task hook uses interchangeable storage adapters. The Express demo validates records and replaces JSON snapshots before publishing mutations in memory.",
    decisions: [
      "Keep components independent of the selected storage adapter.",
      "Clear completed tasks through one atomic server operation.",
      "Add Retry loading and visible edit errors that retain the draft.",
    ],
    highlights: [
      "Add, edit, complete, reopen and delete tasks; filter active/completed items.",
      "Separate local/API lists, retained theme and responsive inline editing.",
    ],
    outcome:
      "29 client tests, 16 server tests, both production builds and browser/restart checks passed; package audits reported zero at preparation time.",
    constraints: [
      "No accounts, authentication, automatic synchronization or hosted database guarantees.",
      "Snapshot persistence supports one process and small lists; no power-loss guarantee or concurrent-edit protection.",
      "Browser and API modes keep separate lists. Hosted durability and physical-device coverage remain unverified.",
    ],
    stack: [
      "React",
      "Express",
      "Tailwind CSS",
      "Vitest",
      "React Testing Library",
      "Supertest",
    ],
    categories: ["Web", "Architecture"],
    featured: false,
    public: true,
    status: "Local demonstration · Static runtime preview",
    screenshot: "/assets/projects/taskflow.webp",
    screenshotAlt:
      "TaskFlow dark interface with illustrative active and completed tasks",
    width: 1440,
    height: 900,
    visualization: {
      kind: "runtime-screenshot",
      label: "Runtime screenshot",
      description:
        "TaskFlow dark interface with illustrative active and completed tasks",
    },
    repositoryUrl: "https://github.com/luigi043/taskflows",
    evidence: [
      "Verification describes the prepared local checkout on 28–29 October 2026; it is not a production or business outcome claim.",
      "Prepared improvements have not been pushed; the public repository may differ from this runtime preview.",
    ],
    seo: {
      title: "TaskFlow Case Study | Luiz Fehlberg",
      description:
        "A task manager with browser-local storage or an optional file-backed Express API.",
    },
    caseStudy: true,
  },
] satisfies Project[];

export const androidProjects: Project[] = androidRecords.map((record) => ({
  ...record,
  categories: ["Mobile"],
  screenshot: "/" + record.screenshot,
  visualization: {
    ...record.visualization,
    kind: "runtime-screenshot",
    label: "Runtime screenshot",
  },
}));

export const projects: Project[] = [
  ...preparedProjects,
  ...localProjects.map((record): Project => ({
    ...record,
    categories: record.categories.filter(
      (category): category is ProjectCategory =>
        projectCategories.some(
          (value) => value === category && value !== "All",
        ),
    ),
    screenshot: "/" + record.screenshot,
    caseStudy: true,
    visualization: {
      ...record.visualization,
      kind: "runtime-screenshot",
      label: "Runtime screenshot",
    },
  })),
  ...androidProjects,
  ...legacyProjects
    .filter((p) => p.id !== "flowchart-code")
    .map((p) => ({ ...p, caseStudy: p.featured, featured: false })),
];

export const caseStudyProjects = projects.filter(
  (p) => p.public && p.caseStudy,
);

export const featuredProjects = projects.filter(
  ({ featured, public: isPublic }) => featured && isPublic,
);
export const secondaryProjects = projects.filter(
  (project) =>
    !project.featured && project.public && !androidProjects.includes(project),
);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getPublicProjectSlugs() {
  return caseStudyProjects.map(({ slug }) => slug);
}
