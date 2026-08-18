import { business } from "@/lib/constants";
import { HeroCanvas } from "@/components/canvas/HeroCanvas";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import { MapPinIcon } from "@/components/ui/icons";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink"
    >
      {/* Deliberately NOT `inset-0` — that ties this wrapper's height to
          whatever the <section> around it currently measures, and the
          section's actual height isn't as stable as it looks. The hero
          copy staggers in via several Reveal/RevealText entrances (delays
          from 0.1s up to 1.1s) and can nudge the section's content height
          by a pixel or two as each piece settles (font metrics finishing a
          swap-in counts too) — every one of those nudges was propagating
          straight into this div and forcing the WebGL canvas inside
          HeroCanvas to resize its drawing buffer. A canvas resize on a
          phone doesn't always redraw cleanly on the same frame: the top
          portion repaints at the new size while the bottom briefly still
          holds the old buffer's contents, which is exactly the hard
          horizontal seam phone recordings kept showing in the first few
          seconds — never later, because that's the only window any of
          this settling happens in. Pinning this wrapper to a fixed
          `100svh` instead means it can no longer be pushed around by
          whatever the content below is doing, so the canvas has nothing
          left to spuriously resize for. */}
      <div className="absolute inset-x-0 top-0 h-[100svh]" aria-hidden="true">
        <HeroCanvas />
      </div>
      <div className="vignette" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-16 pt-36 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-7">
          <Reveal trigger="load" delay={0.1}>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-hairline/80 bg-ink/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-bone-dim backdrop-blur-sm">
              <MapPinIcon className="h-3.5 w-3.5 text-brass" />
              {business.city}, {business.state} {business.category}
            </div>
          </Reveal>

          <RevealText
            as="h1"
            trigger="load"
            delay={0.25}
            className="max-w-4xl text-balance font-display text-[11vw] font-semibold leading-[0.98] text-bone sm:text-7xl lg:text-8xl"
          >
            {business.tagline}
          </RevealText>

          <Reveal trigger="load" delay={0.6}>
            <p className="max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg">
              A neighborhood barbershop at {business.addressLine1} in{" "}
              {business.city} — fades, beard work, straight-razor shaves, and
              kids cuts, done the classic way.
            </p>
          </Reveal>

          <Reveal trigger="load" delay={0.75}>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
              <Button href={business.bookingUrl} external variant="primary">
                Message To Book
              </Button>
              <Button href={business.phoneHref} variant="outline">
                Call {business.phoneDisplay}
              </Button>
              <span className="text-xs uppercase tracking-[0.18em] text-smoke">
                Call ahead to confirm today&rsquo;s hours
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal
        trigger="load"
        delay={1.1}
        className="relative z-10 mx-auto mb-8 hidden sm:block"
      >
        <div className="flex flex-col items-center gap-2 text-smoke">
          <span className="text-[0.6rem] uppercase tracking-[0.4em]">
            Scroll
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-brass to-transparent motion-safe:animate-pulse" />
        </div>
      </Reveal>
    </section>
  );
}
