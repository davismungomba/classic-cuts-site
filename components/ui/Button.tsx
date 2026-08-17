"use client";

import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "outlineLight";
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-[0.08em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass";

// Primary = barbershop red, outline = barbershop blue — the pole's two
// non-white colors, so the site's two most common CTA styles read as a
// deliberate red/blue pair rather than one accent color used everywhere.
// outlineLight is a third variant just for the new dark-navy blocks
// (Footer) — "outline" reads text-bone/border-hairline, both tuned for
// light backgrounds and invisible on a dark section, so a section with a
// dark background needs this instead rather than fighting the shared
// variant's specificity.
const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-brass text-ink hover:bg-brass-bright",
  outline:
    "border border-hairline text-bone hover:border-steel-blue-bright hover:text-steel-blue-bright",
  ghost: "text-bone hover:text-brass",
  outlineLight:
    "border border-ink/25 text-ink hover:border-brass-bright hover:text-brass-bright",
};

/**
 * CTA button with a subtle magnetic pull toward the pointer on desktop.
 * Disabled for touch input and when the user prefers reduced motion.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
  onClick,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.25,
      y: y * 0.45,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  function handlePointerLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`${base} ${variants[variant]} ${className}`}
      {...externalProps}
    >
      {children}
    </Link>
  );
}
