import Image from "next/image";
import { business } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import {
  ScissorsIcon,
  RazorIcon,
  CombIcon,
  TowelIcon,
} from "@/components/ui/icons";

const pillars = [
  { icon: ScissorsIcon, label: "Skin Fades" },
  { icon: RazorIcon, label: "Straight-Razor Shaves" },
  { icon: CombIcon, label: "Beard Trims" },
  { icon: TowelIcon, label: "Threading & Finish" },
];

export function About() {
  return (
    <section id="about" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:px-12">
        <SectionHeading
          eyebrow="About"
          title="A Barbershop Built On Craft"
          description={`${business.name} is a neighborhood barbershop in ${business.city}, ${business.state}, at ${business.addressLine1} — covering everything from a clean skin fade to a kid's first haircut, with an old-school attention to detail.`}
        />

        <Reveal delay={0.2} className="flex flex-col justify-center gap-6">
          {/* This section was icons-and-text only — no actual photo of
              the shop's own work, which reads as generic ("any barbershop
              could have made these claims") next to Gallery's real
              photos further down the page. One real close-up up here
              earns the "Built On Craft" heading its own visual proof
              instead of asking the reader to take four icon labels on
              faith until they scroll further. This is a distinct shot
              from every Gallery.tsx tile (sourced the same way — the
              shop's own Facebook photos, not a customer/reviewer photo),
              so a reader who keeps scrolling doesn't hit the same image
              twice between here and the Gallery section. */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-hairline">
            <Image
              src="/gallery/crisp-taper.jpg"
              alt="A crisp taper fade finished at Classic Cut Barber Shop"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {/* Icon chips alternate a tinted red/blue backdrop instead of
                sitting bare on the card — small touch, but on the first
                light-theme pass this whole grid was grey icon-on-white
                cards with color only appearing on hover, which read as
                colorless by default. */}
            {pillars.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-brass/60"
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${
                    i % 2 === 0 ? "bg-brass/12" : "bg-steel-blue/14"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      i % 2 === 0 ? "text-brass" : "text-steel-blue"
                    }`}
                  />
                </span>
                <span className="font-display text-lg leading-tight text-bone">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
