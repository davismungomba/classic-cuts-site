import { business } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";

export function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-28 sm:py-32">
      <div className="barber-stripe absolute inset-x-0 top-0 h-[3px]" aria-hidden="true" />
      <div className="barber-stripe absolute inset-x-0 bottom-0 h-[3px]" aria-hidden="true" />
      {/* Two-tone glow (red + blue, not just red) at noticeably higher
          opacity than the first light-theme pass — 0.16 on its own nearly
          disappeared against the light background, which was part of why
          this section read as flat/white like everything else instead of
          the page's big color moment before the dark footer. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_35%_35%,_rgba(200,50,63,0.28),_transparent_55%),radial-gradient(circle_at_70%_65%,_rgba(63,107,176,0.22),_transparent_55%)]" />
      </div>
      <div className="grain-overlay" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 text-center sm:px-8">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.32em] text-brass">
            Ready When You Are
          </span>
        </Reveal>
        <RevealText
          as="h2"
          className="text-balance font-display text-5xl font-semibold leading-[1.05] text-bone sm:text-6xl lg:text-7xl"
        >
          Reserve Your Chair
        </RevealText>
        <Reveal delay={0.2}>
          <p className="max-w-lg text-base leading-relaxed text-bone-dim sm:text-lg">
            Message {business.shortName} on Facebook to grab a time, or call
            the shop directly — either way, we&rsquo;ll get you taken care
            of.
          </p>
        </Reveal>
        <Reveal delay={0.35} className="flex flex-col gap-4 pt-2 sm:flex-row">
          <Button
            href={business.bookingUrl}
            external
            variant="primary"
            className="px-10 py-4 text-base"
          >
            Message To Book
          </Button>
          <Button
            href={business.phoneHref}
            variant="outline"
            className="px-10 py-4 text-base"
          >
            Call {business.phoneDisplay}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
