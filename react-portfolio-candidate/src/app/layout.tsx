import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { siteUrl } from "@/lib/routes";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Luiz Fehlberg | Computer Engineer & Software Developer",
  description:
    "Dependable software across web, mobile, automation, and systems.",
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
