import { featuredProjects, projects, secondaryProjects } from "@/data/projects";
import type { Project } from "@/data/projects";
import {
  filterProjects,
  getProjectLink,
  validateProjects,
} from "@/lib/project-rules";

describe("portfolio project truth rules", () => {
  it("selects the six prepared featured projects in narrative order", () => {
    expect(featuredProjects.map(({ slug }) => slug)).toEqual([
      "vehicle-build-cost-calculator",
      "bmw-configurator",
      "flowchart-to-code-converter",
      "ctw-vehicle-fleet",
      "academic-portal",
      "bella-ops",
    ]);
  });

  it("preserves earlier work and adds the two engineering projects", () => {
    expect(secondaryProjects.map(({ title }) => title)).toEqual([
      "MiniLang Interpreter",
      "TaskFlow",
      "BugRepro",
      "Constraint Engine",
      "Debug AI",
      "Smart Home Command Center",
      "Voice to Code",
      "Architectural Pattern Showcase",
      "VehicleOS",
      "Bem-Estar Gym pilot",
      "Insurex",
      "Vitalis",
      "L.Y.R.A.",
      "T.A.R.S.",
      "Local Video Subtitle Tool",
      "User Session Tracker Pro",
      "Bulk File Renamer",
    ]);
  });

  it("rejects incomplete featured case-study content", () => {
    const featured = featuredProjects[0];

    expect(() =>
      validateProjects([{ ...featured, problem: "" }, ...secondaryProjects]),
    ).toThrow(/problem/i);
  });

  it("rejects missing visualization labels", () => {
    const featured = featuredProjects[0];

    expect(() =>
      validateProjects([
        {
          ...featured,
          visualization: {
            ...featured.visualization,
            label: "" as Project["visualization"]["label"],
          },
        },
        ...secondaryProjects,
      ]),
    ).toThrow(/visualization label/i);
  });

  it("uses the verified repository label only when a repository URL exists", () => {
    const flowchart = featuredProjects.find(
      (p) => p.slug === "flowchart-to-code-converter",
    )!;

    expect(getProjectLink(flowchart)).toEqual({
      href: "https://github.com/luigi043/demo3-flowchart-to-code",
      label: "View repository",
      analyticsEvent: "repository_click",
    });
  });

  it("uses the GitHub profile fallback when public code is not verified", () => {
    const vehicleOs = projects.find(({ slug }) => slug === "vehicleos");

    expect(getProjectLink(vehicleOs!)).toEqual({
      href: "https://github.com/luigi043",
      label: "Explore GitHub profile",
      analyticsEvent: "github_profile_click",
    });
  });

  it("filters secondary work by an approved category", () => {
    expect(
      filterProjects(secondaryProjects, "Mobile").map(({ title }) => title),
    ).toEqual(["Vitalis"]);
    expect(filterProjects(secondaryProjects, "All")).toHaveLength(17);
  });

  it("validates the complete approved project collection", () => {
    expect(validateProjects(projects)).toBe(projects);
  });
});
