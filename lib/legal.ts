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
