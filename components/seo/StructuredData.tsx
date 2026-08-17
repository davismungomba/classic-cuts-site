import { business, siteUrl } from "@/lib/constants";

/**
 * LocalBusiness structured data built only from facts verified on the
 * business's live site / listings (address, phone, booking link, social
 * profiles). No hours, ratings, or price range should be added here
 * unless they're actually published somewhere you checked.
 *
 * business.schemaType should be a real schema.org type, not just
 * "LocalBusiness" if a more specific one fits — see
 * references/business-types.md in the skill for common options
 * (BarberShop, Restaurant, Dentist, AutoRepair, RealEstateAgent, ...).
 */
export function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": business.schemaType,
    name: business.legalName,
    alternateName: business.name,
    url: siteUrl,
    telephone: business.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.postalCode,
      addressCountry: "US",
    },
    sameAs: [business.facebookUrl, business.yelpUrl].filter(Boolean),
    hasMap: business.mapsUrl,
    areaServed: `${business.city}, ${business.state}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
