/**
 * Pure-CSS stand-in for the chrome medallion hero object — a blue-toned
 * disc with a thin red/blue accent ring (echoing the logo's barber-pole
 * stripe), used only for low-power/small viewports, when WebGL is
 * unavailable, or when the WebGL context is lost. Intentionally NOT used
 * as a loading flash while the 3D chunk downloads (see HeroCanvas.tsx +
 * references/gotchas.md in the cinematic-business-site skill for why —
 * a brief flash of a flat CSS shape before the real one pops in reads as
 * unpolished, so that case renders nothing and lets the page background
 * carry it instead). Colors matched to HeroObject.tsx's blue medallion
 * (#2c4f8c/#3f6bb0/#6a8dc9) so the fallback and the real 3D object read
 * as the same object rather than two different props.
 */
export function HeroFallback({ loading = false }: { loading?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(63,107,176,0.14),_transparent_60%)]" />

      <div
        className="relative h-[42vw] w-[42vw] max-h-64 max-w-64 rounded-full shadow-[0_0_90px_10px_rgba(63,107,176,0.2)] motion-safe:animate-[pulse_6s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #a9c1e6 0%, #6a8dc9 40%, #3f6bb0 70%, #2c4f8c 100%)",
        }}
      >
        <div
          className="absolute inset-[8%] rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #b3212f 0deg 90deg, #eef1f4 90deg 180deg, #2f4d80 180deg 270deg, #eef1f4 270deg 360deg)",
            opacity: 0.35,
            maskImage:
              "radial-gradient(circle, transparent 62%, black 64%, black 72%, transparent 74%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 62%, black 64%, black 72%, transparent 74%)",
          }}
        />
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
