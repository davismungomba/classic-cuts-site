import { business, services } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function Services() {
  return (
    <section id="services" className="relative bg-charcoal py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="The Menu"
            description="Pricing isn't published online — call or book to confirm current services and rates before your visit."
          />
          <Reveal delay={0.2}>
            <Button
              href={business.bookingUrl}
              external
              variant="outline"
              className="w-fit"
            >
              Check Availability
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.name}
              delay={(i % 3) * 0.08}
              className="group relative z-0 flex flex-col overflow-hidden bg-surface p-8 transition-all duration-500 ease-out hover:z-10 hover:-translate-y-1 hover:bg-surface-raised hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.7)]"
            >
              {/* A permanent, alternating red/blue top edge — not just a
                  hover-only accent — so the grid reads as colorful at a
                  glance rather than needing interaction to reveal any
                  color at all, which was true of every card everywhere
                  else on the first light-theme pass. */}
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-1 ${
                  i % 2 === 0 ? "bg-brass" : "bg-steel-blue"
                }`}
              />
              {/* Alternating red/blue on hover — a light nod to the
                  barber pole rather than leaning on one accent color for
                  every tile. */}
              <span
                className={`font-display text-5xl text-hairline transition-colors duration-500 ${
                  i % 2 === 0
                    ? "group-hover:text-brass/50"
                    : "group-hover:text-steel-blue-bright/50"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-2xl text-bone">
                {service.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-dim">
                {service.description}
              </p>
              <span className="mt-6 inline-block w-fit rounded-full border border-hairline px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-brass transition-colors duration-500 group-hover:border-brass">
                Confirm pricing in shop
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
