import { business } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { MapPinIcon, PhoneIcon, ClockIcon } from "@/components/ui/icons";

export function Location() {
  return (
    <section id="location" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="Location" title="Find The Shop" />

          <Reveal delay={0.15} className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-brass" />
              <div>
                <p className="text-lg text-bone">{business.addressLine1}</p>
                <p className="text-bone-dim">{business.addressLine2}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-brass" />
              <a
                href={business.phoneHref}
                className="text-lg text-bone transition-colors hover:text-brass"
              >
                {business.phoneDisplay}
              </a>
            </div>
            <div className="flex items-start gap-4">
              <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-brass" />
              <p className="text-bone-dim">
                Hours vary by day — call ahead or check Facebook to confirm
                before you visit.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col gap-4 sm:flex-row">
            <Button href={business.mapsUrl} external variant="primary">
              Get Directions
            </Button>
            <Button href={business.bookingUrl} external variant="outline">
              Message To Book
            </Button>
          </Reveal>
        </div>

        <Reveal
          delay={0.2}
          className="overflow-hidden rounded-2xl border border-hairline"
        >
          <iframe
            title={`Map to ${business.name}, ${business.addressLine1}, ${business.addressLine2}`}
            src={business.mapsEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full saturate-[1.05] sm:h-full sm:min-h-[420px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
