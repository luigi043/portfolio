import type { Metadata } from "next";
import { caseStudyProjects, type Project } from "@/data/projects";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const siteUrl =
  configuredSiteUrl || "https://portfolio-candidate-luiz.vercel.app";

export function buildProjectMetadata(project: Project): Metadata {
  const canonical = `${siteUrl}/projects/${project.slug}`;
  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: project.seo.title,
      description: project.seo.description,
      url: canonical,
      images: [`${canonical}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.title,
      description: project.seo.description,
      images: [`${canonical}/opengraph-image`],
    },
  };
}

export function getCaseStudyNavigation(slug: string) {
  const index = caseStudyProjects.findIndex((project) => project.slug === slug);
  if (index < 0) throw new Error(`Unknown featured project slug: ${slug}`);

  return {
    previous:
      caseStudyProjects[
        (index - 1 + caseStudyProjects.length) % caseStudyProjects.length
      ],
    next: caseStudyProjects[(index + 1) % caseStudyProjects.length],
  };
}
