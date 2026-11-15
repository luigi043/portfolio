export const profile = {
  name: "Luiz Fehlberg",
  role: "Computer Engineer & Software Developer",
  positioning:
    "Dependable software across web, mobile, automation, and systems.",
  availability: "Open to remote, hybrid, and relocation opportunities.",
  location: "Porto, Portugal",
  email: "cluiz4003@outlook.pt",
  formspreeEndpoint: "https://formspree.io/f/xovdzoqy",
  profiles: {
    github: "https://github.com/luigi043",
    linkedin: "https://www.linkedin.com/in/luizfehlberg/",
  },
} as const;

export const skills = {
  Languages: [
    "TypeScript",
    "JavaScript",
    "Kotlin",
    "Java",
    "C#",
    "Python",
    "SQL",
    "PHP",
  ],
  Frameworks: [
    "React",
    "Next.js",
    "Angular",
    "Jetpack Compose",
    "Spring Boot",
    "ASP.NET",
    "Node.js",
    "Laravel",
  ],
  "Tools & Systems": [
    "PostgreSQL",
    "SQL Server",
    "Docker",
    "GitHub Actions",
    "Firebase",
    "Arduino",
    "Raspberry Pi",
    "Figma",
  ],
} as const;

export const experience = [
  {
    period: "2024 – Present",
    role: "Freelance Full-Stack Developer",
    organization: "Independent · Remote",
    summary:
      "End-to-end delivery across data modelling, service integration, reporting, and role-specific web experiences, including the Insurex insurance workflow system.",
  },
  {
    period: "July – October 2024",
    role: "Web Developer Intern",
    organization: "Redshift III Innovation, Lda · Beja, Portugal",
    summary:
      "Contributed across frontend, backend, and database layers of a Markdown application, including query analysis and SQL optimisation work.",
    technologies: [
      "Node.js",
      "PHP / Laravel",
      "JavaScript",
      "TypeScript",
      "SQL",
      "HTML/CSS",
    ],
  },
] as const;

export const additionalExperience = [
  {
    period: "Jun – Oct 2026",
    role: "Waiter",
    organization: "JNCQUOI Beach Club · Comporta",
  },
  {
    period: "Mar 2026 – Present",
    role: "Warehouse Operator",
    organization: "El Corte Inglés — Grandes Armazéns S.A.",
  },
  {
    period: "Nov – Dec 2025",
    role: "Customer Support (Christmas Season)",
    organization: "El Corte Inglés — Grandes Armazéns S.A.",
  },
  {
    period: "Oct 2025",
    role: "Warehouse Operator",
    organization: "PWS — Soluções e Recursos Logística, Lda",
  },
  {
    period: "Aug – Oct 2025",
    role: "Waiter",
    organization: "JNCQUOI Beach Club · Comporta",
  },
  {
    period: "Aug – Nov 2024",
    role: "Team Driver",
    organization: "Hotel Vila Galé Nep Kids · Albufeira",
  },
  {
    period: "Jul 2023",
    role: "Waiter",
    organization: "Dote — Barata Salgueiro · Lisbon",
  },
  {
    period: "Jul – Sep 2022",
    role: "Barman / Waiter",
    organization: "SAL — Comporta Soul, Lda",
  },
  {
    period: "Sep – Oct 2021",
    role: "Crew Member / Cashier",
    organization: "BK Portugal, S.A. · Burger King",
  },
] as const;

export const education = [
  {
    period: "2019 – 2024",
    qualification: "B.Sc. Computer Engineering",
    institution: "IPBeja — Polytechnic Institute of Beja",
    level: "EQF Level 6",
    summary:
      "Coursework across software engineering, algorithms, databases, networking, systems programming, and compiler design.",
    subjects: [
      "Software Engineering",
      "Algorithms",
      "Database Systems",
      "Networking",
    ],
  },
  {
    period: "2025",
    qualification: "Graphic Design & Communication",
    institution: "Institute of Employment and Vocational Training",
    summary:
      "Professional training in visual communication, design principles, Photoshop, and Premiere.",
  },
] as const;
