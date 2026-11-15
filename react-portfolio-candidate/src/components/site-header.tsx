import { MobileNavigation } from "@/components/mobile-navigation";
import { navigation } from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="wordmark" href="#home" aria-label="Luiz Fehlberg, home">
          LF<span>.</span>
        </a>
        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <MobileNavigation />
      </div>
    </header>
  );
}
