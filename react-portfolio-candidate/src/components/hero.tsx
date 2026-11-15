import { ArchitectureVisual } from "@/components/architecture-visual";
import { profile } from "@/data/profile";

const publicProfiles = [
  ["GitHub", profile.profiles.github],
  ["LinkedIn", profile.profiles.linkedin],
] as const;

export function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="availability">
            <span aria-hidden="true" /> {profile.availability}
          </p>
          <p className="hero-name">{profile.name}</p>
          <h1>{profile.role}</h1>
          <p className="hero-summary">
            Based in {profile.location}. I build web applications, Android apps,
            and tools for practical engineering workflows.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore selected work{" "}
              <span className="button-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="button button-secondary" href="#about">
              About me{" "}
              <span className="button-arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
          <nav className="profile-links" aria-label="Hero public profiles">
            {publicProfiles.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <ArchitectureVisual />
      </div>
    </section>
  );
}
