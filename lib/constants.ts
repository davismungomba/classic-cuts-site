/**
 * Verified business data for Classic Cuts Barbershop ("Classic Cut Barber
 * Shop" on Facebook), Seattle WA.
 *
 * Source: the business's own Facebook page
 * (facebook.com/profile.php?id=61557782862795), checked 2026-08-17. No
 * separate website exists. Only facts actually published there are
 * included here — hours aren't listed in detail (just "opens soon"), so
 * that's left as "confirm by phone" rather than guessed. No prices,
 * staff names, or testimonials are published, so none are invented here.
 */

export const business = {
  name: "Classic Cut Barber Shop",
  legalName: "Classic Cut Barber Shop",
  shortName: "Classic Cuts",
  tagline: "Sharp Looks. Old-School Standards.",
  category: "barbershop",
  schemaType: "BarberShop",
  city: "Seattle",
  state: "WA",
  addressLine1: "9455 35th Ave SW",
  addressLine2: "Seattle, WA 98126",
  streetAddress: "9455 35th Ave SW",
  postalCode: "98126",
  phoneDisplay: "(206) 945-0834",
  phoneHref: "tel:+12069450834",
  // No booking platform (Square/Booksy/etc.) is set up yet — Facebook
  // Messenger is their real, current way of taking booking requests, so
  // every "Book Now" CTA on this site points there instead of to a dead
  // link. Swap this out the moment they set up real online booking.
  bookingUrl: "https://www.facebook.com/profile.php?id=61557782862795",
  facebookUrl: "https://www.facebook.com/profile.php?id=61557782862795",
  yelpUrl: "",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=9455+35th+Ave+SW+Seattle+WA+98126",
  mapsEmbedSrc:
    "https://maps.google.com/maps?q=9455+35th+Ave+SW+Seattle+WA+98126&z=15&output=embed",
  // No existing separate website to disclaim against.
  sourceUrl: "",
} as const;

export const siteUrl = "https://classic-cuts-seattle-concept.example";

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Services taken directly from the shop's own Facebook bio: "Men
 * haircuts, kids haircuts, beard trim, eyebrows clean, Threading,
 * Shaving, skin fade." No pricing is published anywhere, so none is
 * invented here — the Services section marks every entry
 * "Confirm pricing in shop" instead.
 *
 * `photo` pairs each service with a real shop photo (same source/sourcing
 * rule as Gallery.tsx and About.tsx — the shop's own Facebook photos).
 * Where About.tsx already paired a pillar card with a photo for the same
 * service (Skin Fade, Beard Trim, Shaving, Threading), this reuses that
 * exact same photo rather than a different one, so the two sections agree
 * with each other instead of implying two different "the photo of X"
 * claims. Men's Haircut and Kids Haircut have no service-specific shot
 * in the shop's available photos (nothing shows a child specifically),
 * so those two use general in-shop/finished-cut photos as honest
 * atmosphere rather than a literal claim about who's in the photo.
 */
export const services = [
  {
    name: "Men's Haircut",
    description:
      "A clean, tailored cut — classic or modern, finished the old-school way.",
    photo: "/gallery/shop-in-action.jpg",
  },
  {
    name: "Skin Fade",
    description:
      "A seamless fade taken down to the skin, blended to your preferred length on top.",
    photo: "/gallery/crisp-taper.jpg",
  },
  {
    name: "Beard Trim",
    description: "Sharp, even beard shaping with a crisp, clean edge.",
    photo: "/gallery/sharp-lines.jpg",
  },
  {
    name: "Kids Haircut",
    description: "A patient, tidy cut for younger clients.",
    photo: "/gallery/custom-design.jpg",
  },
  {
    name: "Shaving",
    description: "A traditional, close, straight-razor shave.",
    photo: "/gallery/precision-work.jpg",
  },
  {
    name: "Eyebrow & Threading",
    description: "Clean eyebrow grooming and threading services.",
    photo: "/gallery/fresh-fade-1.jpg",
  },
] as const;
