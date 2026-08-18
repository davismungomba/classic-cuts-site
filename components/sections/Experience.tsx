import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

const atmosphere = [
  "Straight-Razor Detail",
  "Old-School Pace",
  "Sharp Fades",
  "Family Friendly",
];

export function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-navy py-28 sm:py-36"
    >
      {/* This section used to carry its mood with color-glow alone (no
          actual photo) — it's the one full-bleed "atmosphere" moment on
          the page, so a real shot of the shop mid-cut under its own
          honeycomb lighting earns its place here more than a gradient
          does. Shot from the shop's own Facebook page, same sourcing rule
          as Gallery.tsx (the shop's own posted photos, not customer/
          reviewer photos). The barber shown is shop staff at work — not
          an anonymous customer — which is the same "who's actually
          identifiable" bar Gallery.tsx already applies. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/gallery/behind-the-chair.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      {/* Dark navy scrim over the photo so the pull-quote and pills stay
          legible regardless of where they land against a real photo's
          uneven brightness — same idea as the caption scrim in
          Gallery.tsx, just covering the whole section instead of a
          bottom edge. Text below switches from the bone/hairline tokens
          (tuned for the light bg-ink background every other section
          uses) to the ink/brass-bright tokens Footer.tsx already
          established for dark-navy sections. */}
      <div className="absolute inset-0 bg-navy/82" aria-hidden="true" />
      {/* Two-tone glow kept as a color accent layered over the scrim,
          rather than being the section's only source of color like
          before. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[140%] w-[140%] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,_rgba(200,50,63,0.3),_transparent_55%),radial-gradient(circle_at_15%_60%,_rgba(106,141,201,0.22),_transparent_50%)]" />
      </div>
      <div className="grain-overlay" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-10 px-6 text-center sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-brass-bright">
            <span className="h-px w-8 bg-brass-bright" aria-hidden />
            The Experience
            <span className="h-px w-8 bg-brass-bright" aria-hidden />
          </span>
        </Reveal>

        <RevealText
          as="h2"
          className="text-balance font-display text-4xl font-medium italic leading-[1.2] text-ink sm:text-5xl lg:text-6xl"
        >
          Every visit moves at the pace of a proper cut — sharp tools, a
          clean line, and no reason to rush.
        </RevealText>

        <Reveal
          delay={0.2}
          className="flex flex-wrap items-center justify-center gap-3 pt-4"
        >
          {atmosphere.map((item) => (
            <span
              key={item}
              className="rounded-full border border-ink/25 px-5 py-2 text-xs uppercase tracking-[0.2em] text-ink/75"
            >
              {item}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
