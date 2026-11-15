import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main id="main-content" className="not-found shell">
      <p className="eyebrow">404 / Case study</p>
      <h1>Project not found</h1>
      <p>This candidate only publishes verified featured case studies.</p>
      <Link className="button button-primary" href="/#projects">
        Return to projects
      </Link>
    </main>
  );
}
