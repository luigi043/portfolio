import Link from "next/link";
import { LocalDemoLinks } from "@/components/local-demo-links";
import { ProjectVisual } from "@/components/project-visual";
import { TrackedLink } from "@/components/tracked-link";
import { featuredProjects } from "@/data/projects";
import { getProjectLink } from "@/lib/project-rules";

export function FeaturedProjects() {
  return (
    <div className="featured-grid">
      {featuredProjects.map((project, index) => {
        const externalLink = getProjectLink(project);
        return (
          <article className="featured-card" key={project.slug}>
            <ProjectVisual project={project} />
            <div className="featured-card-copy">
              <div className="card-kicker">
                <span>0{index + 1}</span>
                <span>{project.status}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.shortSummary}</p>
              <ul
                className="tag-list"
                aria-label={`${project.title} technologies`}
              >
                {project.stack.slice(0, 4).map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <div className="card-actions">
                <Link className="text-link" href={`/projects/${project.slug}`}>
                  Read case study <span aria-hidden="true">↗</span>
                </Link>
                <TrackedLink
                  className="quiet-link"
                  href={externalLink.href}
                  event={externalLink.analyticsEvent}
                >
                  {externalLink.label}
                </TrackedLink>
              </div>
              <LocalDemoLinks slug={project.slug} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
