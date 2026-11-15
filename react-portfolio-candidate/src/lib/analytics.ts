export const approvedAnalyticsEvents = [
  "case_study_view",
  "repository_click",
  "github_profile_click",
  "cv_click",
  "contact_success",
] as const;

export type AnalyticsEvent = (typeof approvedAnalyticsEvents)[number];

export function isApprovedAnalyticsEvent(
  value: string,
): value is AnalyticsEvent {
  return (approvedAnalyticsEvents as readonly string[]).includes(value);
}

export function buildAnalyticsPayload(event: AnalyticsEvent) {
  return { name: event } as const;
}

export function trackApprovedEvent(event: AnalyticsEvent) {
  if (process.env.NODE_ENV !== "production") return;
  void import("@vercel/analytics").then(({ track }) => track(event));
}
