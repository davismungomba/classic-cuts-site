"use client";

import { useEffect, useRef, type Ref } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type RevealTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  trigger?: "scroll" | "load";
};

/**
 * Word-by-word cinematic text reveal. The full string is always present in
 * the server-rendered markup for SEO/accessibility; GSAP's SplitText only
 * re-wraps it into animatable spans on the client.
 */
export function RevealText({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  trigger = "scroll",
}: RevealTextProps) {
  // Typed loosely because `Tag` is polymorphic (h1/h2/h3/p); SplitText only
  // needs a generic HTMLElement.
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const split = new SplitText(el, {
      type: "words",
      wordsClass: "reveal-word",
    });

    gsap.set(split.words, { opacity: 0, y: "0.55em" });

    const tween = gsap.to(split.words, {
      opacity: 1,
      y: "0em",
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.045,
      delay,
      scrollTrigger:
        trigger === "scroll"
          ? { trigger: el, start: "top 85%", once: true }
          : undefined,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
