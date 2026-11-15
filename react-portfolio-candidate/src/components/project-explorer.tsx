"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import { LocalDemoLinks } from "@/components/local-demo-links";
import { ProjectVisual } from "@/components/project-visual";
import { TrackedLink } from "@/components/tracked-link";
import {
  projectCategories,
  secondaryProjects,
  type ProjectCategory,
} from "@/data/projects";
import { filterProjects, getProjectLink } from "@/lib/project-rules";

type ProjectFilter = ProjectCategory | "All";

export function ProjectExplorer() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const filteredProjects = useMemo(
    () => filterProjects(secondaryProjects, filter),
    [filter],
  );

  return (
    <div className="project-explorer">
      <div className="filter-row" aria-label="Filter projects by category">
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => {
              setFilter(category);
              setExpandedSlug(null);
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="filter-status" role="status" aria-live="polite">
        Showing {filteredProjects.length}{" "}
        {filteredProjects.length === 1 ? "project" : "projects"}
      </p>

      <div className="secondary-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project) => {
            const expanded = expandedSlug === project.slug;
            const detailsId = `project-details-${project.slug}`;
            const externalLink = getProjectLink(project);

            return (
              <motion.article
                className="secondary-card"
                key={project.slug}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <ProjectVisual project={project} compact />
                <div className="secondary-card-copy">
                  <p className="secondary-status">{project.status}</p>
                  <h3>{project.title}</h3>
                  <p>{project.shortSummary}</p>
                  <LocalDemoLinks slug={project.slug} />
                  <div className="secondary-actions">
                    {project.caseStudy ? (
                      <Link href={`/projects/${project.slug}`}>
                        Read case study
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={detailsId}
                      onClick={() =>
                        setExpandedSlug(expanded ? null : project.slug)
                      }
                    >
                      {expanded ? "Less" : "More"} about {project.title}
                    </button>
                    <TrackedLink
                      href={externalLink.href}
                      event={externalLink.analyticsEvent}
                    >
                      {externalLink.label}
                    </TrackedLink>
                  </div>
                  <AnimatePresence initial={false}>
                    {expanded ? (
                      <motion.div
                        id={detailsId}
                        className="project-details"
                        role="region"
                        aria-label={`${project.title} details`}
                        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p>
                          <strong>Status:</strong> {project.status}
                        </p>
                        <p>
                          <strong>Engineering focus:</strong>{" "}
                          {project.decisions[0]}
                        </p>
                        <ul
                          className="tag-list"
                          aria-label={`${project.title} stack`}
                        >
                          {project.stack.map((technology) => (
                            <li key={technology}>{technology}</li>
                          ))}
                        </ul>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
