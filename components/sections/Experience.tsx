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
      className="relative overflow-hidden bg-ink py-28 sm:py-36"
    >
      {/* Bumped from a single 0.14-opacity red glow to a stronger two-tone
          red/blue pair — the original was tuned for the old dark theme
          where a faint glow still read; on white it was nearly invisible,
          which was part of why every section blurred into the same flat
          white regardless of its accent color. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[140%] w-[140%] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,_rgba(200,50,63,0.22),_transparent_55%),radial-gradient(circle_at_15%_60%,_rgba(63,107,176,0.14),_transparent_50%)]" />
      </div>
      <div className="grain-overlay" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-10 px-6 text-center sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-brass">
            <span className="h-px w-8 bg-brass" aria-hidden />
            The Experience
            <span className="h-px w-8 bg-brass" aria-hidden />
          </span>
        </Reveal>

        <RevealText
          as="h2"
          className="text-balance font-display text-4xl font-medium italic leading-[1.2] text-bone sm:text-5xl lg:text-6xl"
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
              className="rounded-full border border-hairline px-5 py-2 text-xs uppercase tracking-[0.2em] text-bone-dim"
            >
              {item}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
