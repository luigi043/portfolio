import { androidProjects, type Project } from "@/data/projects";
import Image from "next/image";

export function ProjectVisual({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  if (project.screenshot) {
    return (
      <figure
        className={`project-visual runtime-visual${compact ? " project-visual-compact" : ""}`}
      >
        <Image
          src={project.screenshot}
          alt={project.screenshotAlt || project.title}
          width={project.width || 1440}
          height={project.height || 1000}
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
        <figcaption className="visual-label">
          {androidProjects.includes(project)
            ? "Android emulator capture"
            : "Runtime screenshot · Local demo"}
        </figcaption>
      </figure>
    );
  }
  return (
    <div
      className={`project-visual${compact ? " project-visual-compact" : ""}`}
    >
      <div className="visual-grid" aria-hidden="true" />
      <div className="visual-node visual-node-primary" aria-hidden="true">
        {project.title.slice(0, 2).toUpperCase()}
      </div>
      <div className="visual-line" aria-hidden="true" />
      <div className="visual-node visual-node-secondary" aria-hidden="true">
        {project.categories[0]}
      </div>
      <p className="visual-label">{project.visualization.label}</p>
      <p className="sr-only">{project.visualization.description}</p>
    </div>
  );
}
