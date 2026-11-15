import type { Project, ProjectCategory } from "@/data/projects";
import { profile } from "@/data/profile";

const featuredRequiredFields = [
  "problem",
  "architecture",
  "outcome",
] as const satisfies readonly (keyof Project)[];

export function validateProjects<T extends Project[]>(records: T): T {
  const slugs = new Set<string>();

  for (const project of records) {
    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: ${project.slug}`);
    }
    slugs.add(project.slug);

    if (!project.visualization.label) {
      throw new Error(`${project.title} requires a visualization label`);
    }

    if (project.featured) {
      for (const field of featuredRequiredFields) {
        if (!project[field]) {
          throw new Error(`${project.title} requires ${field}`);
        }
      }
      if (
        !project.constraints.length ||
        !project.decisions.length ||
        !project.highlights.length
      ) {
        throw new Error(`${project.title} requires complete case-study lists`);
      }
      if (!project.seo.title || !project.seo.description) {
        throw new Error(`${project.title} requires unique SEO metadata`);
      }
    }
  }

  return records;
}

export function getProjectLink(project: Project) {
  if (project.repositoryUrl) {
    return {
      href: project.repositoryUrl,
      label: "View repository" as const,
      analyticsEvent: "repository_click" as const,
    };
  }

  return {
    href: profile.profiles.github,
    label: "Explore GitHub profile" as const,
    analyticsEvent: "github_profile_click" as const,
  };
}

export function filterProjects(
  projectRecords: Project[],
  category: ProjectCategory | "All",
) {
  if (category === "All") return projectRecords;
  return projectRecords.filter((project) =>
    project.categories.includes(category),
  );
}
