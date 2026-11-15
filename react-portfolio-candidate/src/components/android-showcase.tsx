import Link from "next/link";
import { LocalDemoLinks } from "@/components/local-demo-links";
import { ProjectVisual } from "@/components/project-visual";
import { androidProjects } from "@/data/projects";

export function AndroidShowcase() {
  return (
    <section className="section" id="android" aria-labelledby="android-title">
      <div className="shell">
        <header className="section-heading">
          <h2 id="android-title">Android Projects</h2>
          <p>Emulator screenshots and interactive browser demos.</p>
        </header>
        <div className="secondary-grid">
          {androidProjects.map((project) => (
            <article
              className="secondary-card android-card"
              key={project.slug}
              data-android-project={project.slug}
            >
              <ProjectVisual project={project} compact />
              <div className="secondary-card-copy">
                <h3>{project.title}</h3>
                <p>{project.shortSummary}</p>
                <LocalDemoLinks slug={project.slug} />
                <div className="secondary-actions">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Try interactive demo
                    </a>
                  )}
                  <Link href={`/projects/${project.slug}`}>
                    Read case study
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
