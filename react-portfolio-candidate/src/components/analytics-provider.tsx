import { Analytics } from "@vercel/analytics/react";

export function AnalyticsProvider() {
  if (!process.env.VERCEL) return null;
  return <Analytics />;
}
