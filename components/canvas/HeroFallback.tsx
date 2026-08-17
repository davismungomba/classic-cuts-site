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
 * of a soft color-matched glow rather than a literal disc shape. It also
 * spins slowly via a pure-CSS `spin-badge` keyframe (see globals.css) —
 * the first version was completely static, which read as broken/dead
 * next to the desktop version's turning medallion once someone had seen
 * both. A CSS transform animation is a fraction of the cost of the real
 * WebGL scene, so this stays cheap on exactly the low-power devices this
 * fallback exists for.
 *
 * The logo image itself is intentionally translucent rather than solid —
 * at full opacity it read as a second, competing block of content sitting
 * on top of the paragraph text on narrow screens (there's far less spare
 * width on a phone than on desktop for the badge to sit in without
 * overlapping the copy), the same "medallion too solid, fighting the
 * headline" mistake HeroObject.tsx's MEDALLION_OPACITY went through
 * earlier. But this logo is mostly thin linework with a lot of fully
 * transparent space in the artwork itself (unlike the 3D medallion, which
 * is a solid-colored disc even where the texture is faint) — the same
 * opacity percentage that reads as a clear, confident watermark on a
 * solid shape reads as barely-there on line art, so this needs to sit
 * meaningfully higher (65%, not 40%) to actually be legible rather than
 * a ghost of itself.
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
          around a real object instead of a fake coin. Sized down a step
          from the first pass (68vw → 58vw) to leave more clear space
          around the hero copy on narrow screens. */}
      <div
        className="relative h-[58vw] w-[58vw] max-h-80 max-w-80 rounded-full motion-safe:animate-[pulse_6s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(169,193,230,0.55) 0%, rgba(106,141,201,0.35) 40%, rgba(63,107,176,0.16) 68%, transparent 78%)",
        }}
      >
        {/* This inner wrapper is what actually spins (spin-badge, defined
            in globals.css) — kept separate from the glow above so the
            glow's own pulse animation and the badge's turn don't have to
            share one transform/animation property. motion-safe: means
            anyone with reduced-motion turned on (who lands here via
            HeroCanvas's own reduced-motion check) still gets the logo,
            just holding still instead of spinning. */}
        <div className="absolute inset-[16%] motion-safe:animate-[spin-badge_12s_linear_infinite]">
          <Image
            src="/logo-badge.png"
            alt="Classic Cut Barber Shop logo"
            fill
            sizes="50vw"
            className="object-contain opacity-[0.65] drop-shadow-[0_12px_22px_rgba(22,35,61,0.2)]"
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
