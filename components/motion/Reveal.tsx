"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Pixels to translate up from on entrance. */
  y?: number;
  /** Seconds to delay the start of the animation. */
  delay?: number;
  /** "scroll" animates in once the element nears the viewport; "load" plays immediately on mount. */
  trigger?: "scroll" | "load";
};

/**
 * Generic fade/rise entrance used across sections. Renders content visible
 * by default (no layout shift for non-JS/reduced-motion cases) and only
 * animates once GSAP confirms motion is welcome.
 */
export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  trigger = "scroll",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.set(el, { opacity: 0, y });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger:
        trigger === "scroll"
          ? { trigger: el, start: "top 87%", once: true }
          : undefined,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
