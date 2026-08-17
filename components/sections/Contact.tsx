import { business } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, FacebookIcon, StarIcon } from "@/components/ui/icons";

export function Contact() {
  return (
    <section id="contact" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-6 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <SectionHeading
          eyebrow="Contact"
          title="Questions Before You Book?"
          description="Call the shop directly, or message us on Facebook."
        />

        <Reveal delay={0.2} className="flex flex-col gap-5">
          <a
            href={business.phoneHref}
            className="flex items-center gap-3 font-display text-3xl text-bone transition-colors hover:text-brass sm:text-4xl"
          >
            <PhoneIcon className="h-6 w-6 text-brass" />
            {business.phoneDisplay}
          </a>
          <div className="flex items-center gap-5">
            <a
              href={business.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-bone-dim transition-colors hover:text-bone"
            >
              <FacebookIcon className="h-4 w-4" /> Facebook
            </a>
            {business.yelpUrl ? (
              <a
                href={business.yelpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-bone-dim transition-colors hover:text-bone"
              >
                <StarIcon className="h-4 w-4" /> Yelp
              </a>
            ) : null}
          </div>
          <Button
            href={business.bookingUrl}
            external
            variant="primary"
            className="mt-2 w-fit"
          >
            Message To Book
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
