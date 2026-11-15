import type { MetadataRoute } from "next";
import { caseStudyProjects } from "@/data/projects";
import { siteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...caseStudyProjects.map(({ slug }) => ({
      url: `${siteUrl}/projects/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
