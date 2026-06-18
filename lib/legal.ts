/**
 * Single source of truth for the business's Name / Address / Phone (NAP) and
 * legal metadata. Imported by the footer-linked policy pages and their JSON-LD
 * so the NAP can never drift between body copy, schema, and the site footer.
 */
export const BUSINESS = {
  name: "Dilli Darbar",
  legalName: "Dilli Darbar",
  email: "office@thedillidarbar.com",
  phone: "+91 9818575939",
  /** E.164, for tel: links and schema. */
  phoneE164: "+919818575939",
  hours: "10 AM – 10 PM, all days",
  since: 2021,
  siteUrl: "https://thedillidarbar.com",
  mapsUrl:
    "https://www.google.com/maps/place/Dilli+Darbar/@28.5617318,77.242679,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce378b8b318fd:0x6875f7143e095ce3!8m2!3d28.5617318!4d77.242679!16s%2Fg%2F11z92j6z1f",
  /** Google Business Profile share link. */
  gbpUrl: "https://share.google/jnnFzAaZuXD2nKpnK",
  /** Honest status — application filed, not yet granted. Never show a number we don't have. */
  fssaiStatus: "Licence application in progress",
  address: {
    line1: "2nd Floor, B-110, Amar Colony B Block (Block B)",
    line2: "Lajpat Nagar 4, Lajpat Nagar",
    locality: "New Delhi",
    region: "Delhi",
    postalCode: "110024",
    country: "IN",
    /** One-line form for inline body copy. */
    full: "2nd Floor, B-110, Amar Colony B Block (Block B), Lajpat Nagar 4, New Delhi, Delhi 110024",
  },
  geo: { latitude: 28.5617318, longitude: 77.242679 },
} as const;

/** Last reviewed date shown on every policy page. Update when content changes. */
export const LAST_UPDATED = "18 June 2026";

/**
 * Canonical Restaurant / LocalBusiness schema.org object, built from the single
 * NAP source above. Injected site-wide in the root layout and reused by the
 * policy pages so the structured-data facts never drift.
 */
export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS.name,
    alternateName: "दिल्ली दरबार",
    description:
      "Home cloud kitchen in Amar Colony, New Delhi. Fresh, home-cooked North Indian breakfast, lunch and dinner — delivered to your door.",
    url: BUSINESS.siteUrl,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    priceRange: "₹₹",
    servesCuisine: ["North Indian", "Home Style", "Mughlai"],
    hasMap: BUSINESS.mapsUrl,
    image: `${BUSINESS.siteUrl}/images/bowls/rajma-bowl.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.line1,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    hasMenu: `${BUSINESS.siteUrl}/menu`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "22:00",
    },
    potentialAction: {
      "@type": "OrderAction",
      target: `${BUSINESS.siteUrl}/menu`,
      deliveryMethod: "http://schema.org/HomeDelivery",
    },
    sameAs: [
      `https://wa.me/${BUSINESS.phoneE164.replace("+", "")}`,
      BUSINESS.gbpUrl,
      BUSINESS.mapsUrl,
    ],
  };
}
