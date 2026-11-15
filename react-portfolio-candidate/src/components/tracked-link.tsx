"use client";

import type { ReactNode } from "react";
import { trackApprovedEvent, type AnalyticsEvent } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  event: AnalyticsEvent;
  children: ReactNode;
  className?: string;
};

export function TrackedLink({
  href,
  event,
  children,
  className,
}: TrackedLinkProps) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackApprovedEvent(event)}
    >
      {children}
    </a>
  );
}
