import {
  caseStudyProjects,
  featuredProjects,
  getPublicProjectSlugs,
} from "@/data/projects";
import {
  buildProjectMetadata,
  getCaseStudyNavigation,
  siteUrl,
} from "@/lib/routes";
import sitemap from "@/app/sitemap";

describe("static case-study route contracts", () => {
  it("generates all prepared, Android and preserved case-study routes", () => {
    expect(getPublicProjectSlugs()).toEqual([
      "vehicle-build-cost-calculator",
      "bmw-configurator",
      "flowchart-to-code-converter",
      "ctw-vehicle-fleet",
      "academic-portal",
      "bella-ops",
      "lang-interpreter",
      "taskflow",
      "bugrepro",
      "constraint-engine",
      "debug-ai",
      "smart-home-command-center",
      "voice-to-code",
      "expense-tracker",
      "simpleloginapp",
      "lifeos",
      "mealplanner",
      "workout-level-up",
      "luigis-workout",
      "meal-prep-workout",
      "study-assistant",
      "echofree",
      "drivemind",
      "sferatagscanner",
      "architectural-pattern-showcase",
      "vehicleos",
      "bem-estar-gym-pilot",
    ]);
  });

  it("builds unique metadata and canonical paths for every case study", () => {
    const metadata = featuredProjects.map(buildProjectMetadata);
    const titles = metadata.map(({ title }) => title);
    const descriptions = metadata.map(({ description }) => description);

    expect(new Set(titles).size).toBe(6);
    expect(new Set(descriptions).size).toBe(6);
    metadata.forEach((entry, index) => {
      const project = featuredProjects[index];
      expect(entry.alternates?.canonical).toBe(
        `${siteUrl}/projects/${project.slug}`,
      );
      expect(entry.openGraph?.images).toEqual([
        `${siteUrl}/projects/${project.slug}/opengraph-image`,
      ]);
    });
  });

  it("provides circular previous and next case-study navigation", () => {
    const navigation = getCaseStudyNavigation("flowchart-to-code-converter");

    expect(navigation.previous.slug).toBe("bmw-configurator");
    expect(navigation.next.slug).toBe("ctw-vehicle-fleet");
  });

  it("includes the homepage and all case studies in the sitemap", () => {
    expect(sitemap().map(({ url }) => url)).toEqual([
      siteUrl,
      ...caseStudyProjects.map(({ slug }) => `${siteUrl}/projects/${slug}`),
    ]);
  });

  it("keeps every case study complete enough for static rendering", () => {
    for (const project of featuredProjects) {
      expect(project.problem).not.toBe("");
      expect(project.constraints.length).toBeGreaterThan(0);
      expect(project.decisions.length).toBeGreaterThan(0);
      expect(project.highlights.length).toBeGreaterThan(0);
      expect(project.outcome).not.toBe("");
      expect(project.visualization.label).toMatch(
        /^(Interface concept|Feature visualization|Runtime screenshot)$/,
      );
    }
  });
});
