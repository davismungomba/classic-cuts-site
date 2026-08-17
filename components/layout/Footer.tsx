import Link from "next/link";
import { business, navLinks } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { FacebookIcon, StarIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // Every section up through Contact is some shade of near-white, which
    // was a big part of "too clean/too white" — this is the one deliberately
    // dark, saturated block on the page, closing the site out on a real
    // color rather than another pale card. text-ink/text-ink/NN replace
    // bone/bone-dim/hairline here specifically because those tokens are
    // tuned for dark text on a light page and would be unreadable inverted
    // on a dark background; outlineLight on the Button below does the same
    // job for the CTA.
    <footer className="relative bg-navy">
      <div className="barber-stripe h-[3px] w-full" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-12 lg:py-20">
        <div className="flex flex-col gap-4">
          <span className="font-display text-2xl font-semibold text-ink">
            {business.name}
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-ink/60">
            A neighborhood barbershop in {business.city}, {business.state} —
            fades, beard work, straight-razor shaves, and kids cuts.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a
              href={business.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${business.name} on Facebook`}
              className="text-ink/60 transition-colors hover:text-brass-bright"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            {business.yelpUrl ? (
              <a
                href={business.yelpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-ink/60 transition-colors hover:text-brass-bright"
              >
                <StarIcon className="h-4 w-4" />
                Yelp
              </a>
            ) : null}
          </div>
        </div>

        <nav aria-label="Footer">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-steel-blue-bright">
            Explore
          </span>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-ink/60 transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-5">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-steel-blue-bright">
            Visit
          </span>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 text-sm text-ink/60 transition-colors hover:text-ink"
          >
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass-bright" />
            <span>
              {business.addressLine1}
              <br />
              {business.addressLine2}
            </span>
          </a>
          <a
            href={business.phoneHref}
            className="flex items-center gap-3 text-sm text-ink/60 transition-colors hover:text-ink"
          >
            <PhoneIcon className="h-4 w-4 shrink-0 text-brass-bright" />
            {business.phoneDisplay}
          </a>
          <Button href={business.bookingUrl} external variant="outlineLight" className="mt-1 w-fit">
            Message To Book
          </Button>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-6 py-6 text-xs text-ink/40 sm:flex-row sm:justify-between sm:px-8 lg:px-12">
          <p>
            &copy; {year} {business.name}, {business.city} {business.state}.
            All rights reserved.
          </p>
          {/* If the business has no existing site (business.sourceUrl is
              blank), drop this whole disclaimer line instead of leaving a
              dead link. */}
          {business.sourceUrl ? (
            <p className="text-center sm:text-right">
              Independent redesign concept —{" "}
              <Link
                href={business.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-ink/20 underline-offset-2 hover:text-ink/70"
              >
                not an official {business.name} website
              </Link>
              .
            </p>
          ) : (
            <p className="text-center sm:text-right">
              Independent redesign concept — not an official {business.name}{" "}
              website.
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
