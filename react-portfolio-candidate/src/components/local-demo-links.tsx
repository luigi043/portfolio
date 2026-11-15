"use client";

import { useSyncExternalStore } from "react";
import demos from "@/data/local-demos.json";

const subscribe = () => () => {};
const getSnapshot = () =>
  ["localhost", "127.0.0.1", "[::1]", "::1"].includes(window.location.hostname);
const getServerSnapshot = () => false;

export function LocalDemoLinks({ slug }: { slug: string }) {
  const local = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const links = demos[slug as keyof typeof demos];
  if (!local || !links) return null;
  return (
    <div className="local-demo-actions" data-local-demo={slug}>
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label} ↗
        </a>
      ))}
      <small>Local only · services must be running on this computer</small>
    </div>
  );
}
