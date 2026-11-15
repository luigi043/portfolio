"use client";

import { useEffect } from "react";
import { trackApprovedEvent } from "@/lib/analytics";

export function CaseStudyAnalytics() {
  useEffect(() => {
    trackApprovedEvent("case_study_view");
  }, []);

  return null;
}
