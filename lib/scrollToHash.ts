import { lenisInstance } from "@/lib/lenisInstance";
import { prefersReducedMotion } from "@/lib/motion";

/** Smoothly scrolls to an in-page section, accounting for the fixed navbar and reduced-motion preference. */
export function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = prefersReducedMotion();

  if (lenisInstance.current) {
    lenisInstance.current.scrollTo(el, {
      offset: -88,
      duration: reduced ? 0 : 1.2,
    });
    return;
  }

  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
