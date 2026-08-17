import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

// Real photos, captured from the shop's own Facebook page (photos the
// business itself posted to show off its space and its work — not
// customer/reviewer photos; see references/gotchas.md, #5, in the
// cinematic-business-site skill for why that distinction matters, and
// why review photos specifically stay off-limits even here). Picked and
// cropped to favor shots with no clearly identifiable customer faces —
// empty-room, back-of-head, and side-profile "after" shots — since even
// with the shop's own photos as the source, minimizing who's
// individually recognizable is the more considerate default. Labels
// describe only what's actually in each photo; nothing here is a named
// station or service that isn't visibly true of the shot.
const tiles = [
  {
    src: "/gallery/shop-interior.jpg",
    label: "The Shop Floor",
    span: "lg:row-span-2",
  },
  {
    src: "/gallery/shop-in-action.jpg",
    label: "In The Chair",
    span: "",
  },
  {
    src: "/gallery/fresh-fade-1.jpg",
    label: "Fresh Fade",
    span: "",
  },
  {
    src: "/gallery/sharp-lines.jpg",
    label: "Sharp Lines",
    span: "",
  },
  {
    src: "/gallery/precision-work.jpg",
    label: "Precision Work",
    span: "",
  },
  {
    src: "/gallery/custom-design.jpg",
    label: "Custom Design",
    span: "lg:row-span-2",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative bg-charcoal py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Gallery"
          title="Inside The Shop"
          description="A look at the space and the work — straight from the shop's own photos."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {tiles.map(({ src, label, span }, i) => (
            <Reveal
              key={src}
              delay={(i % 3) * 0.06}
              className={`group relative min-h-[180px] overflow-hidden rounded-2xl border border-hairline bg-surface ${span}`}
            >
              <Image
                src={src}
                alt={`${label} at Classic Cut Barber Shop`}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* This scrim used to fade from "ink" (near-black in the old
                  dark theme, so this read as a moody photo vignette).
                  With ink now near-white that same gradient nearly
                  vanished into the photo. Navy gives back a real dark
                  caption bar — and a brand color instead of generic
                  black/grey — with light text sitting on top of it. */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
              <span className="pointer-events-none absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.2em] text-ink">
                {label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
