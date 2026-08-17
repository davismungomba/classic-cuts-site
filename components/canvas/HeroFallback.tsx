import Image from "next/image";

/**
 * Hero object for everyone who doesn't get the interactive 3D scene —
 * which, since HeroCanvas.tsx's MOBILE_BREAKPOINT is 768px, is effectively
 * every phone visitor, not just an edge case. It used to be a pure-CSS
 * abstraction (a colored disc + a masked ring standing in for "the logo,
 * roughly") with no actual logo on it — fine as a placeholder shape, but
 * on a real phone it just reads as an unlabeled blue circle, and a phone
 * is exactly where most people will actually look this shop up. This now
 * shows the shop's real logo (the same file HeroObject.tsx projects onto
 * the 3D medallion), cut out of its black background (see logo-badge.png)
 * so it sits directly on the page instead of inside a black box, on top
 * of a soft color-matched glow rather than a literal disc shape.
 *
 * Intentionally NOT used as a loading flash while the 3D chunk downloads
 * on capable/desktop viewports (see HeroCanvas.tsx + references/gotchas.md
 * in the cinematic-business-site skill for why — a brief flash of this
 * before the real scene pops in reads as unpolished, so that case renders
 * nothing and lets the page background carry it instead). This component
 * only ever renders for the small-viewport/no-WebGL/reduced-motion paths,
 * where it's the permanent hero visual, not a placeholder.
 */
export function HeroFallback({ loading = false }: { loading?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(63,107,176,0.16),_transparent_60%)]" />

      {/* Soft color-matched glow standing in for the medallion's chrome
          disc — kept as a backdrop rather than a hard-edged shape now
          that the actual logo sits on top of it, so it reads as a halo
          around a real object instead of a fake coin. */}
      <div
        className="relative h-[68vw] w-[68vw] max-h-96 max-w-96 rounded-full motion-safe:animate-[pulse_6s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(169,193,230,0.55) 0%, rgba(106,141,201,0.35) 40%, rgba(63,107,176,0.16) 68%, transparent 78%)",
        }}
      >
        <div className="absolute inset-[12%]">
          <Image
            src="/logo-badge.png"
            alt="Classic Cut Barber Shop logo"
            fill
            sizes="60vw"
            className="object-contain drop-shadow-[0_18px_32px_rgba(22,35,61,0.28)]"
            priority
          />
        </div>
      </div>

      <div className="grain-overlay" />
      <div className="vignette" />

      {loading ? (
        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.35em] text-smoke">
          Loading scene
        </span>
      ) : null}
    </div>
  );
}
