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

// Each pillar now carries a real shop photo as its backdrop instead of
// sitting on a flat tinted card — "put pictures there instead of just
// icons" was the direct ask. None of these four photos are a literal
// documentary shot of that exact service in progress (the shop's Facebook
// page doesn't have one for razor shaves, beard trims, or threading
// specifically) — they're real finished-cut/in-shop photos used as
// atmosphere behind an honest label, the same way a photo of a barber's
// hands might illustrate "expert service" without claiming to be that
// specific service. The icon stays, small, as the one abstract element
// that's explicitly NOT claiming to be a photo of the thing itself.
const pillars = [
  { icon: ScissorsIcon, label: "Skin Fades", photo: "/gallery/crisp-taper.jpg" },
  {
    icon: RazorIcon,
    label: "Straight-Razor Shaves",
    photo: "/gallery/precision-work.jpg",
  },
  { icon: CombIcon, label: "Beard Trims", photo: "/gallery/sharp-lines.jpg" },
  {
    icon: TowelIcon,
    label: "Threading & Finish",
    photo: "/gallery/fresh-fade-1.jpg",
  },
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

        <Reveal delay={0.2} className="flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {/* Each card is a real shop photo now (see the pillars comment
                above for why these aren't literal one-to-one service
                shots), darkened with the same navy scrim Gallery.tsx uses
                under its captions so the label stays legible over
                whatever brightness the photo underneath happens to be.
                The icon stays small and top-corner rather than the
                headline element it was before — the photo carries the
                card now, the icon is just a quick-scan visual tag. */}
            {pillars.map(({ icon: Icon, label, photo }, i) => (
              <div
                key={label}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-hairline"
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-navy/10" />
                <span
                  className={`absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm ${
                    i % 2 === 0 ? "bg-brass/85" : "bg-steel-blue/85"
                  }`}
                >
                  <Icon className="h-4 w-4 text-ink" />
                </span>
                <span className="relative p-4 font-display text-lg leading-tight text-ink">
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
