import {
  approvedAnalyticsEvents,
  buildAnalyticsPayload,
  isApprovedAnalyticsEvent,
} from "@/lib/analytics";

describe("privacy-limited analytics boundary", () => {
  it("allows only the approved event names", () => {
    expect(approvedAnalyticsEvents).toEqual([
      "case_study_view",
      "repository_click",
      "github_profile_click",
      "cv_click",
      "contact_success",
    ]);
    expect(isApprovedAnalyticsEvent("repository_click")).toBe(true);
    expect(isApprovedAnalyticsEvent("contact_message")).toBe(false);
    expect(isApprovedAnalyticsEvent("email")).toBe(false);
  });

  it("builds an event-only payload with no property channel for form data", () => {
    expect(buildAnalyticsPayload("contact_success")).toEqual({
      name: "contact_success",
    });
    expect(Object.keys(buildAnalyticsPayload("contact_success"))).toEqual([
      "name",
    ]);
  });
});
