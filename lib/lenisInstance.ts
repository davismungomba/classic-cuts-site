import type Lenis from "lenis";

/** Set by SmoothScrollProvider; read by anything that needs to trigger a smooth scroll (nav links, in-page CTAs). */
export const lenisInstance: { current: Lenis | null } = { current: null };
