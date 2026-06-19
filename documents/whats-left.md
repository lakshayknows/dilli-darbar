# What's Left — Dilli Darbar

Running list of remaining work. Updated 18 June 2026.

---

## 🔴 Blockers before launch

- [ ] **Confirm the live domain.** Code assumes `https://thedillidarbar.com`
      (`metadataBase` in `app/layout.tsx`, `BUSINESS.siteUrl` in `lib/legal.ts`,
      `robots.ts`, `sitemap.ts`). If the real domain differs, update those.
- [ ] **Swiggy & Zomato links.** Still being registered. `SWIGGY_URL` and
      `ZOMATO_URL` in `lib/constants.ts` are `"#"` — footer "Swiggy"/"Zomato"
      links go nowhere. Add the real URLs when live (and add them to
      `restaurantSchema().sameAs` in `lib/legal.ts`).
- [ ] **OG share image.** Currently a square bowl PNG tagged 1200×630
      (`app/layout.tsx` openGraph/twitter, `restaurantSchema().image`). Make a
      proper **1200×630** dish photo and drop it at e.g.
      `public/images/og-home.jpg`, then point the metadata at it.

---

## 🟠 FSSAI / legal accuracy

- [ ] **FSSAI licence number.** Application is "in progress" — once granted, add
      the number to `lib/legal.ts` (`fssaiStatus`) and surface it on
      `app/hygiene/page.tsx`. Do NOT display a number before it's issued.
- [ ] **Named Grievance Officer.** `app/privacy/page.tsx` currently uses a
      role title + `office@thedillidarbar.com`. DPDP Act prefers a named person —
      add the name when decided.

---

## 🟡 SEO / local presence (manual, not code)

- [ ] **Google Business Profile** — change Primary category from "Caterer" to
      **"Delivery Restaurant"** (or "Restaurant"); add "Caterer" + "Cloud Kitchen"
      as secondary. GBP link: https://share.google/jnnFzAaZuXD2nKpnK
- [ ] GBP: 10+ food photos, hours (10am–10pm), menu link `/menu`, weekly posts,
      reply to reviews within 24h.
- [ ] **NAP citations** — list the exact same Name/Address/Phone on Justdial,
      Sulekha, Instagram bio, Facebook. Must match `lib/legal.ts` `BUSINESS`.
- [ ] After deploy, submit `sitemap.xml` in Google Search Console.

---

## 🟢 Verification (do after the next deploy)

- [ ] Validate JSON-LD on `/`, `/menu`, `/about`, and a policy page at
      https://validator.schema.org/ — zero errors.
- [ ] Google Rich Results Test on the same URLs (Restaurant / Menu / FAQ).
- [ ] Confirm `/robots.txt` and `/sitemap.xml` load and look right.
- [ ] Confirm GA4 (`G-RVDPBR7MN9`) is receiving traffic in the Realtime report.
- [ ] OG preview via Facebook Sharing Debugger.
- [ ] Lighthouse SEO score (target 100).

---

## ✅ Done

Splash/loading (multi-script wordmark + route loader), hero carousel (4 bowls,
drop shadow, hover names, centered mobile wordmark), Archivo Black headings,
the four policy pages (Privacy, Terms, Refund, FSSAI & Hygiene), WhatsApp number,
"Order Now" → `/menu`, GA4, `robots.ts`, `sitemap.ts`, site-wide + menu + FAQ
schema, SEO titles/descriptions/canonicals, OpenGraph/Twitter defaults.

See `documents/seo-aeo-geo-plan.md` for the full original SEO plan.
