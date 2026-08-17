"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroFallback } from "./HeroFallback";
import { prefersReducedMotion } from "@/lib/motion";

const Scene = dynamic(() => import("./Scene").then((mod) => mod.Scene), {
  ssr: false,
  loading: () => null,
});

const MOBILE_BREAKPOINT = 768;

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Decides once (and on breakpoint-crossing resize) whether the environment
 * can comfortably run the interactive 3D scene. Falls back to a static,
 * on-brand CSS poster for small/low-power viewports, missing WebGL support,
 * or a reduced-motion preference — and again if the GL context is lost mid
 * session. While the 3D scene's code is still downloading/mounting on a
 * capable environment, nothing renders (no placeholder pole) — the hero's
 * dark background carries that brief moment instead.
 */
export function HeroCanvas() {
  const [mode, setMode] = useState<"checking" | "3d" | "fallback">(
    "checking",
  );

  useEffect(() => {
    let frame = 0;

    function evaluate() {
      const smallViewport = window.innerWidth < MOBILE_BREAKPOINT;
      const reduced = prefersReducedMotion();
      const webgl = supportsWebGL();
      setMode(!smallViewport && !reduced && webgl ? "3d" : "fallback");
    }

    function scheduleEvaluate() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(evaluate);
    }

    evaluate();
    window.addEventListener("resize", scheduleEvaluate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", scheduleEvaluate);
    };
  }, []);

  if (mode === "fallback") {
    return <HeroFallback />;
  }

  if (mode === "checking") {
    return null;
  }

  return <Scene onContextLost={() => setMode("fallback")} />;
}
