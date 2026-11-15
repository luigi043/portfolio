import { AboutSection } from "@/components/about-section";
import { AndroidShowcase } from "@/components/android-showcase";
import { ContactForm } from "@/components/contact-form";
import { CredentialsSection } from "@/components/credentials-section";
import { ExperienceSection } from "@/components/experience-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { Hero } from "@/components/hero";
import { ProjectExplorer } from "@/components/project-explorer";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Hero />

        <section
          className="section section-tinted"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="shell">
            <header className="section-heading">
              <h2 id="about-title">About me</h2>
            </header>
            <AboutSection />
          </div>
        </section>

        <section className="section" id="projects">
          <div className="shell">
            <SectionHeading
              eyebrow="Selected case studies"
              title="Featured engineering work"
              description="Six prepared projects examined through their constraints, architecture, decisions, and verified result."
            />
            <FeaturedProjects />
            <div className="secondary-projects">
              <header className="subsection-heading">
                <p className="eyebrow">More selected work</p>
                <h2>Across platforms and problem types</h2>
                <p>
                  Explore additional engineering projects and earlier portfolio
                  studies by the kind of engineering they demonstrate.
                </p>
              </header>
              <ProjectExplorer />
            </div>
          </div>
        </section>

        <AndroidShowcase />

        <section className="section section-tinted" id="skills">
          <div className="shell">
            <SectionHeading
              eyebrow="Working toolkit"
              title="Skills backed by project work"
              description="Technologies I have used across application, platform, mobile, automation, and systems work."
            />
            <SkillsSection />
          </div>
        </section>

        <section className="section" id="credentials">
          <div className="shell">
            <SectionHeading
              eyebrow="Verified learning"
              title="Credentials & continued learning"
              description="Completed Coursera credentials with public verification, followed by current learning-platform progress."
            />
            <CredentialsSection />
          </div>
        </section>

        <section
          className="section section-tinted"
          aria-labelledby="experience-title"
        >
          <div className="shell">
            <header className="section-heading">
              <p className="eyebrow">Trajectory</p>
              <h2 id="experience-title">Experience &amp; education</h2>
              <p>Professional delivery and the foundation behind it.</p>
            </header>
            <ExperienceSection />
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="shell">
            <SectionHeading
              eyebrow="Employment & freelance"
              title="Contact"
              description="Have a role, collaboration, or well-defined product problem in mind?"
            />
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
