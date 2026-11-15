import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LocalDemoLinks } from "@/components/local-demo-links";
import { notFound } from "next/navigation";
import { CaseStudyNavigation } from "@/components/case-study-navigation";
import { CaseStudyAnalytics } from "@/components/case-study-analytics";
import { ProjectVisual } from "@/components/project-visual";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackedLink } from "@/components/tracked-link";
import {
  androidProjects,
  getProjectBySlug,
  getPublicProjectSlugs,
} from "@/data/projects";
import { getProjectLink } from "@/lib/project-rules";
import { buildProjectMetadata } from "@/lib/routes";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublicProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.caseStudy || !project.public) return {};
  return buildProjectMetadata(project);
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.caseStudy || !project.public) notFound();

  const externalLink = getProjectLink(project);
  const isAndroid = androidProjects.includes(project);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="case-study">
        <CaseStudyAnalytics />
        <header className="case-hero section">
          <div className="shell case-hero-grid">
            <div>
              <Link
                className="back-link"
                href={isAndroid ? "/#android" : "/#projects"}
              >
                {isAndroid ? "← Android projects" : "← All projects"}
              </Link>
              <p className="eyebrow">Project case study</p>
              <h1>{project.title}</h1>
              <p className="case-summary">{project.shortSummary}</p>
              <p className="case-status">{project.status}</p>
              <LocalDemoLinks slug={project.slug} />
              {isAndroid ? (
                <div className="secondary-actions">
                  {project.liveUrl && (
                    <a
                      className="button button-secondary"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Try interactive demo
                    </a>
                  )}
                  {project.apkUrl ? (
                    <a href={project.apkUrl}>Download Android debug APK</a>
                  ) : null}
                  {project.screenshot ? (
                    <a href={project.screenshot}>View full screenshot</a>
                  ) : null}
                </div>
              ) : project.screenshot ? (
                <p className="evidence-note">
                  Static runtime preview. No hosted interactive demo is
                  available. Prepared improvements have not been pushed; public
                  source may differ from these captures.
                </p>
              ) : null}
              {(!isAndroid || project.repositoryUrl) && (
                <TrackedLink
                  className="button button-secondary"
                  href={externalLink.href}
                  event={externalLink.analyticsEvent}
                >
                  {externalLink.label}
                </TrackedLink>
              )}
            </div>
            <ProjectVisual project={project} />
          </div>
        </header>

        {project.gallery ? (
          <section
            className="shell case-gallery"
            aria-label="Companion screenshot gallery"
          >
            {project.gallery.map((item) => (
              <figure key={item.src}>
                <a href={item.src}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    unoptimized
                  />
                </a>
                <figcaption>{item.alt}</figcaption>
              </figure>
            ))}
          </section>
        ) : null}
        {project.demoSetup && (
          <section
            className="shell case-body"
            aria-labelledby="demo-setup-heading"
          >
            <div>
              <h2 id="demo-setup-heading">Run the local demo</h2>
              <p>
                From the prepared project checkout, run these commands and open
                the address printed by the server. The repository may require
                access.
              </p>
              <pre className="demo-setup">
                <code>{project.demoSetup}</code>
              </pre>
            </div>
          </section>
        )}
        {isAndroid ? (
          <div className="shell case-body">
            <section>
              <h2>How it works</h2>
              <p>{project.architecture}</p>
            </section>
            <section>
              <h2>Verification and demo scope</h2>
              <p>{project.outcome}</p>
            </section>
          </div>
        ) : (
          <div className="shell case-body">
            <section aria-labelledby="problem-heading">
              <p className="eyebrow">01 / Context</p>
              <h2 id="problem-heading">Problem</h2>
              <p>{project.problem}</p>
            </section>

            <section aria-labelledby="constraints-heading">
              <p className="eyebrow">02 / Boundaries</p>
              <h2 id="constraints-heading">Constraints</h2>
              <ul>
                {project.constraints.map((constraint) => (
                  <li key={constraint}>{constraint}</li>
                ))}
              </ul>
            </section>

            <section
              className="case-wide"
              aria-labelledby="architecture-heading"
            >
              <p className="eyebrow">03 / System</p>
              <h2 id="architecture-heading">Architecture</h2>
              <p>{project.architecture}</p>
              <div className="case-visualization">
                <ProjectVisual project={project} />
                <div>
                  <p className="visual-disclosure">
                    {project.visualization.label}
                  </p>
                  <p>{project.visualization.description}</p>
                </div>
              </div>
            </section>

            <section aria-labelledby="decisions-heading">
              <p className="eyebrow">04 / Trade-offs</p>
              <h2 id="decisions-heading">Major engineering decisions</h2>
              <ol>
                {project.decisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="highlights-heading">
              <p className="eyebrow">05 / Build</p>
              <h2 id="highlights-heading">Implementation highlights</h2>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="result-heading">
              <p className="eyebrow">06 / Evidence</p>
              <h2 id="result-heading">Verified result</h2>
              <p>{project.outcome}</p>
              {project.evidence.map((statement) => (
                <p className="evidence-note" key={statement}>
                  {statement}
                </p>
              ))}
            </section>

            <section aria-labelledby="stack-heading">
              <p className="eyebrow">07 / Toolkit</p>
              <h2 id="stack-heading">Technology stack</h2>
              <ul className="tag-list">
                {project.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </section>
          </div>
        )}
        <div className="shell">
          <CaseStudyNavigation slug={project.slug} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
