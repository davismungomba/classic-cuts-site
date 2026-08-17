"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroFallback } from "./HeroFallback";
import { prefersReducedMotion } from "@/lib/motion";

const Scene = dynamic(() => import("./Scene").then((mod) => mod.Scene), {
  ssr: false,
  loading: () => null,
});

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
 * Decides once (and again if the GL context is lost mid session) whether
 * the environment can run the interactive 3D scene. This used to also
 * gate on viewport width — anything under 768px got the CSS fallback
 * unconditionally, on the assumption that phones are underpowered for it.
 * That assumption is what caused the whole run of mobile-only bugs (the
 * fallback's logo scale/opacity/glow-ring/spin all needing separate fixes
 * from the real 3D medallion): it's a second, hand-maintained visual that
 * has to be kept in sync with the real one by hand instead of just being
 * the real one. The explicit ask now is for mobile to look exactly like
 * desktop, and the scene already has its own runtime quality easing for
 * weaker hardware (see Scene.tsx's PerformanceMonitor, which drops pixel
 * ratio and disables Sparkles under load) — so it's a better fit than a
 * width check to actually decide "is this device struggling," rather than
 * assuming every phone is. Only two conditions still fall back: WebGL
 * genuinely unavailable, or the visitor has reduced motion turned on.
 */
export function HeroCanvas() {
  const [mode, setMode] = useState<"checking" | "3d" | "fallback">(
    "checking",
  );

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const webgl = supportsWebGL();
    setMode(!reduced && webgl ? "3d" : "fallback");
  }, []);

  if (mode === "fallback") {
    return <HeroFallback />;
  }

  if (mode === "checking") {
    return null;
  }

  return <Scene onContextLost={() => setMode("fallback")} />;
}
