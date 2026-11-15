import { profile } from "@/data/profile";

const profiles = [
  ["GitHub", profile.profiles.github],
  ["LinkedIn", profile.profiles.linkedin],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>© {new Date().getFullYear()} Luiz Fehlberg. All rights reserved.</p>
        <nav aria-label="Public profiles">
          {profiles.map(([label, href]) => (
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
    </footer>
  );
}
