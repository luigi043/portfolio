"use client";

import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";

const layers = [
  { name: "Interface", detail: "React · Compose", x: 14, y: 18 },
  { name: "API", detail: "REST · WCF", x: 58, y: 18 },
  { name: "Services", detail: "Node · Spring · .NET", x: 14, y: 62 },
  { name: "Database", detail: "PostgreSQL · SQL Server", x: 58, y: 62 },
] as const;

const featuredSystems = [
  "Flowchart",
  "Patterns",
  "VehicleOS",
  "Bem-Estar",
] as const;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionPreference() {
  return window.matchMedia(reducedMotionQuery).matches;
}

export function ArchitectureVisual() {
  const staticState = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    () => true,
  );

  return (
    <div
      className="architecture-visual"
      role="img"
      aria-label="Application architecture: Interface sends requests through an API and Services layer to a Database. Featured projects demonstrate responsibilities across these layers."
      data-motion={staticState ? "static" : "animated"}
    >
      <div className="architecture-topline" aria-hidden="true">
        <span>Architecture / 01</span>
        <span className="signal">
          <i /> System online
        </span>
      </div>

      <div className="architecture-canvas" aria-hidden="true">
        <svg
          className="architecture-paths"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M32 31 H58 M72 38 V62 M58 75 H32 M28 62 V38"
            fill="none"
            stroke="url(#architecture-gradient)"
            strokeWidth="0.8"
            initial={staticState ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.45, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="architecture-gradient" x1="0" x2="1">
              <stop stopColor="#007aff" />
              <stop offset="1" stopColor="#30d5c8" />
            </linearGradient>
          </defs>
        </svg>

        {layers.map((layer, index) => (
          <motion.div
            className="architecture-node"
            key={layer.name}
            style={{ left: `${layer.x}%`, top: `${layer.y}%` }}
            initial={staticState ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.12 * index }}
          >
            <span className="node-index">0{index + 1}</span>
            <strong>{layer.name}</strong>
            <small>{layer.detail}</small>
          </motion.div>
        ))}

        <motion.div
          className="data-pulse"
          initial={staticState ? false : { opacity: 0, x: "-2rem" }}
          animate={{ opacity: [0, 1, 0], x: ["-2rem", "10rem", "20rem"] }}
          transition={{ duration: 1.4, delay: 1.2, times: [0, 0.5, 1] }}
        />
      </div>

      <motion.div
        className="featured-systems"
        initial={staticState ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 1.1 }}
        aria-hidden="true"
      >
        <p>Featured systems</p>
        <div>
          {featuredSystems.map((system) => (
            <span key={system}>{system}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
