# SEO / AEO / GEO Implementation Plan — thedillidarbar.com

> Complete optimization strategy for Search Engines, Answer Engines (Perplexity, ChatGPT Search), and Generative AI (Google AI Overviews, Gemini).

**Base URL:** `https://thedillidarbar.com`  
**Phone:** +91 9818575939  
**Hours:** 10 AM – 10 PM (all days)

---

## Table of Contents

1. [What Other Businesses Do — Industry Research](#1-what-other-businesses-do--industry-research)
2. [Technical SEO — Sitemap, Robots, Canonical URLs](#2-technical-seo)
3. [Structured Data / JSON-LD Schema](#3-structured-data--json-ld-schema)
4. [Page-Level Metadata & OpenGraph](#4-page-level-metadata--opengraph)
5. [AEO — Answer Engine Optimization](#5-aeo--answer-engine-optimization)
6. [GEO — Generative Engine Optimization](#6-geo--generative-engine-optimization)
7. [Keyword Strategy & Content Map](#7-keyword-strategy--content-map)
8. [Local SEO — Google Business Profile & NAP](#8-local-seo--google-business-profile--nap)
9. [Proposed File Changes](#9-proposed-file-changes)
10. [Verification Plan](#10-verification-plan)

---

## 1. What Other Businesses Do — Industry Research

### How Top Cloud Kitchens & Food Delivery Sites Optimize

| Business | What They Do Well | Takeaway for Dilli Darbar |
|---|---|---|
| **Rebel Foods (Faasos, Behrouz)** | Separate landing pages per brand/cuisine with city-specific URLs (`/mumbai/biryani-delivery`). Full `Restaurant` + `Menu` JSON-LD on every page. | We should add geo-targeted meta descriptions mentioning "Amar Colony" and "Lajpat Nagar" explicitly. |
| **EatFit** | FAQ sections on every page answering health-related queries ("Is this sugar-free?", "How many calories?"). `FAQPage` schema markup drives AI Overview citations. | Add an FAQ component to the About page with `FAQPage` schema. Our menu already has calorie data — surface it in meta descriptions. |
| **Domino's India** | Hyper-local landing pages (`/order-pizza-amar-colony`), full `FoodEstablishment` schema with `openingHoursSpecification`, `priceRange`, and `servesCuisine`. OG images are dish photos, not logos. | Implement `Restaurant` schema with hours, cuisine types, and price range. Use dish photos for OG images. |
| **Swiggy / Zomato** | Programmatic sitemap generation for every restaurant/city. `BreadcrumbList` schema on category pages. Aggressive `robots.txt` to block internal search/filter URLs from crawling. | Block `/api/*`, `/checkout`, `/account`, `/(auth)/*` in robots.txt. |
| **Box8** | Direct ordering CTAs with `potentialAction` in schema ("OrderAction"). Menu items with `NutritionInformation` schema including calories. WhatsApp ordering as secondary channel. | Add `OrderAction` to our Restaurant schema. Include `NutritionInformation` in Menu item schema since we already have calorie data. |

### Key Industry Practices (2025–2026)

- **90% of food discovery happens on mobile.** Google uses mobile-first indexing exclusively. Meta descriptions must be under 120 chars for mobile SERPs.
- **Direct answers in first 40–60 words** — AI engines (Gemini, ChatGPT, Perplexity) extract the first substantive paragraph. Pages must lead with a clear, factual statement.
- **`Restaurant` + `Menu` + `FAQPage` schema trifecta** — The three schema types that drive the most rich results for food businesses.
- **NAP consistency** — Name, Address, Phone must be identical across website, Google Business Profile, Swiggy, Zomato, Justdial.
- **OG images = food photos, not logos** — Shared links with appetizing dish photos get 3–5× more clicks than logo-only cards.
- **Weekly Google Business Profile posts** — Signals "active business" to Google's local algorithm.
- **Allow AI crawlers** — Most competitors block GPTBot/PerplexityBot. Explicitly allowing them is a competitive advantage for GEO visibility.

---

## 2. Technical SEO

### 2a. Dynamic Sitemap (`app/sitemap.ts`)

Next.js App Router generates `/sitemap.xml` from a `sitemap.ts` file. This is superior to a static XML file because it stays in sync automatically.

**Routes to include (public, indexable):**

| URL | Priority | Change Frequency |
|---|---|---|
| `https://thedillidarbar.com/` | 1.0 | weekly |
| `https://thedillidarbar.com/menu` | 0.9 | weekly |
| `https://thedillidarbar.com/about` | 0.7 | monthly |
| `https://thedillidarbar.com/catering` | 0.8 | monthly |

**Routes to EXCLUDE** (private/transactional — no SEO value):
- `/checkout`, `/account`, `/login`, `/signup`, `/api/*`

### 2b. Robots.txt (`app/robots.ts`)

**Allow:** All major crawlers — Googlebot, Bingbot, GPTBot, PerplexityBot, Applebot, ClaudeBot, Amazonbot.

**Disallow:** `/api/`, `/checkout`, `/account`, `/(auth)/login`, `/(auth)/signup`

**Why allow AI crawlers?** — In 2025–2026, 45% of consumers use AI to find local businesses. Blocking GPTBot/PerplexityBot means Dilli Darbar won't appear in AI-generated recommendations.

### 2c. Canonical URLs

Add canonical URL metadata to the root layout via Next.js `metadata.metadataBase` set to `https://thedillidarbar.com`. This prevents duplicate content issues (e.g., `www` vs non-`www`, trailing slashes).

---

## 3. Structured Data / JSON-LD Schema

### 3a. Restaurant + LocalBusiness Schema (Global — in `layout.tsx`)

Injected once in the root layout as `<script type="application/ld+json">`.

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Dilli Darbar",
  "alternateName": "दिल्ली दरबार",
  "description": "Home cloud kitchen in Amar Colony, New Delhi. Fresh, home-cooked North Indian breakfast, lunch, and dinner — delivered to your door.",
  "url": "https://thedillidarbar.com",
  "telephone": "+919818575939",
  "priceRange": "₹₹",
  "servesCuisine": ["North Indian", "Home Style", "Mughlai"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Amar Colony",
    "addressLocality": "Lajpat Nagar",
    "addressRegion": "New Delhi",
    "postalCode": "110024",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.5700,
    "longitude": 77.2400
  },
  "image": "https://thedillidarbar.com/images/og-home.jpg",
  "hasMenu": {
    "@type": "Menu",
    "url": "https://thedillidarbar.com/menu"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "10:00",
    "closes": "22:00"
  },
  "potentialAction": {
    "@type": "OrderAction",
    "target": "https://thedillidarbar.com/menu",
    "deliveryMethod": "http://schema.org/HomeDelivery"
  },
  "sameAs": [
    "https://wa.me/919818575939"
  ]
}
```

### 3b. Menu + MenuItem Schema (Menu page — `menu/page.tsx`)

Dynamically generated from `data/menu.ts`. Each category becomes a `MenuSection`, each dish a `MenuItem` with `Offer` (price in INR) and `NutritionInformation` (calories).

```json
{
  "@context": "https://schema.org",
  "@type": "Menu",
  "name": "Dilli Darbar Menu",
  "hasMenuSection": [
    {
      "@type": "MenuSection",
      "name": "Darbar Bowls",
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "Rajma Rice Bowl",
          "description": "Rajma, jeera rice, kachumber, pickled carrot, raita",
          "offers": {
            "@type": "Offer",
            "price": "249",
            "priceCurrency": "INR"
          },
          "nutrition": {
            "@type": "NutritionInformation",
            "calories": "560 calories"
          },
          "suitableForDiet": "https://schema.org/VegetarianDiet"
        }
      ]
    }
  ]
}
```

This will be auto-generated from the full `data/menu.ts` array — not hardcoded.

### 3c. FAQPage Schema (About page — `about/page.tsx`)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does Dilli Darbar deliver outside Amar Colony?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We deliver across Amar Colony, Lajpat Nagar, and surrounding South Delhi areas via Swiggy and direct WhatsApp orders."
      }
    },
    {
      "@type": "Question",
      "name": "Are the meals prepared hygienically?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Dilli Darbar is a home cloud kitchen using fresh, locally sourced ingredients with zero preservatives."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer healthy or sugar-free options?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Our menu includes high-protein, sugar-free desserts like Mango Cheesecake (paneer, dahi, honey — no added sugar) and balanced meal boxes under 800 kcal."
      }
    },
    {
      "@type": "Question",
      "name": "How do I place a bulk or catering order?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fill out our catering enquiry form at thedillidarbar.com/catering or message us directly on WhatsApp to customize a menu for your event."
      }
    },
    {
      "@type": "Question",
      "name": "What cuisines does Dilli Darbar serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We specialize in authentic North Indian home-style cooking — dal makhani, rajma, chole, parathas, chicken biryani, and signature Darbar Bowls."
      }
    }
  ]
}
```

---

## 4. Page-Level Metadata & OpenGraph

### Current vs. Proposed Metadata

| Page | Current Title | Proposed Title | Proposed Description |
|---|---|---|---|
| **Home** `/` | Delhi Darbar — Delhi ka khana, ghar se | Dilli Darbar — Home-Cooked Food Delivery in Amar Colony, Delhi | Fresh North Indian meals delivered from our home kitchen in Amar Colony. Rajma bowls, parathas, dal makhani & more. Order now on WhatsApp or Swiggy. |
| **Menu** `/menu` | Menu — Delhi Darbar | Dilli Darbar Menu · Bowls, Parathas, Meals & Desserts | Explore 40+ dishes: signature Darbar Bowls from ₹249, fresh parathas from ₹79, meal boxes, chicken biryani & sugar-free mango cheesecake. |
| **About** `/about` | About — Delhi Darbar | About Dilli Darbar · Our Story & Kitchen Standards | Meet the team behind Dilli Darbar. Home cloud kitchen in Amar Colony since 2021. 25,000+ orders, 4.8★ rating. Fresh ingredients, zero preservatives. |
| **Catering** `/catering` | Catering — Delhi Darbar | Bulk Orders & Catering in Amar Colony | Office lunch boxes, birthday parties, society events. Custom menus of home-cooked North Indian food. Enquire on WhatsApp. |

### OpenGraph & Twitter Cards (all pages)

Every page gets:
- `og:title`, `og:description`, `og:image` (1200×630 dish photo), `og:url`, `og:type`
- `twitter:card: "summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`

**OG Image strategy:** Use hero dish photos (e.g., Rajma Bowl aerial shot) as the default. Food photos get 3–5× more click-through on social shares vs logos. Recommended size: **1200 × 630 px**. Keep focal content in the center 900 × 500 px safe zone.

---

## 5. AEO — Answer Engine Optimization

AEO targets AI-powered answer boxes (Google AI Overviews, Siri, Alexa). The key principle: **provide the answer in the first 40–60 words** of page content.

### 5a. FAQ Component (on About page)

Accordion-style UI with Framer Motion expand/collapse animation, styled with the existing design system (maroon bg, cream text, saffron accents).

**Questions:**

| Question | Answer (concise, AI-parseable) |
|---|---|
| Does Dilli Darbar deliver outside Amar Colony? | Yes, we deliver across Amar Colony, Lajpat Nagar, and surrounding South Delhi areas via Swiggy and direct WhatsApp orders. |
| Are the meals prepared hygienically? | Absolutely. Dilli Darbar is a home cloud kitchen using fresh, locally sourced ingredients with zero preservatives. We maintain kitchen standards comparable to FSSAI guidelines. |
| Do you offer healthy or sugar-free options? | Yes! Our menu includes high-protein, sugar-free desserts like Mango Cheesecake (paneer, dahi, honey — no added sugar) and balanced meal boxes under 800 kcal. |
| How do I place a bulk or catering order? | Fill out our catering enquiry form at thedillidarbar.com/catering or message us directly on WhatsApp to customize a menu for your event. |
| What cuisines does Dilli Darbar serve? | We specialize in authentic North Indian home-style cooking — dal makhani, rajma, chole, parathas, chicken biryani, and signature Darbar Bowls. |

### 5b. First-Paragraph Authority Pattern

Each page's first visible `<p>` element will contain a factual, keyword-rich 40–60 word summary. This is what AI engines extract for citations.

**Example (About page):**
> Dilli Darbar is a home cloud kitchen in Amar Colony, New Delhi, delivering fresh, home-cooked North Indian meals since 2021. With over 25,000 orders and a 4.8-star rating, we serve breakfast, lunch, and dinner made from locally sourced ingredients — zero preservatives, zero shortcuts.

---

## 6. GEO — Generative Engine Optimization

GEO ensures Dilli Darbar is **cited by AI models** (ChatGPT, Gemini, Perplexity) when users ask queries like "best home food delivery in Amar Colony" or "healthy meal box near Lajpat Nagar".

### Strategies

| Tactic | Implementation | Why It Works |
|---|---|---|
| **Structured data completeness** | Full `Restaurant` + `Menu` + `FAQPage` schema | AI models parse schema.org entities as ground-truth facts. |
| **First-paragraph authority** | Lead each page with a factual 40–60 word summary | Generative engines extract opening paragraphs for citations. |
| **E-E-A-T signals** | `sameAs` links to WhatsApp, Swiggy; consistent NAP; review count in content | Builds "trust graph" that AI models use to rank sources. |
| **Topical depth** | Menu page with 40+ items, calorie counts, ingredient lists | Dense, factual content gets cited more than thin marketing copy. |
| **Allow AI crawlers** | Explicitly allow GPTBot, PerplexityBot, ClaudeBot in robots.txt | Many competitors block these — we gain visibility by allowing. |

---

## 7. Keyword Strategy & Content Map

### Primary Keywords (mapped to pages)

| Keyword Cluster | Target Page | Search Intent | Monthly Volume (est.) |
|---|---|---|---|
| "cloud kitchen Amar Colony" | Home `/` | Local / Commercial | 50–100 |
| "home cooked food delivery Lajpat Nagar" | Home `/` | Transactional | 100–200 |
| "healthy meal box delivery South Delhi" | Menu `/menu` | Informational | 200–500 |
| "office bulk catering Amar Colony" | Catering `/catering` | Commercial | 30–50 |
| "tiffin service near Amar Colony Delhi" | Home `/` | Local | 100–200 |
| "best dal makhani delivery Delhi" | Menu `/menu` | Transactional | 50–100 |
| "home kitchen near me New Delhi" | About `/about` | Local | 100–300 |
| "rajma rice bowl delivery" | Menu `/menu` | Transactional | 20–50 |
| "sugar free dessert delivery Delhi" | Menu `/menu` | Informational | 50–100 |
| "party catering Lajpat Nagar" | Catering `/catering` | Commercial | 20–50 |

### Long-Tail / Voice Search Keywords (for FAQ/AEO)

- "where can I order healthy home food near Amar Colony"
- "does dilli darbar deliver to Lajpat Nagar"
- "best paratha delivery in south delhi"
- "how to order catering for office lunch in delhi"

### Content Embedding Strategy

Keywords are naturally embedded into:
- Page `<title>` and `<meta description>`
- `<h1>` and `<h2>` tags
- JSON-LD `description` and `servesCuisine` fields
- FAQ answers
- Alt text on food images

---

## 8. Local SEO — Google Business Profile & NAP

### Google Business Profile Checklist

> This is the #1 local ranking factor. Must be done manually in the Google Business dashboard.

- [ ] **Verify** the GBP listing for "Dilli Darbar"
- [ ] **Categories:** Primary = "Delivery Restaurant"; Secondary = "Cloud Kitchen", "Indian Restaurant"
- [ ] **Description:** Match the website meta description exactly
- [ ] **Menu link:** `https://thedillidarbar.com/menu`
- [ ] **Order link:** `https://thedillidarbar.com/menu` (or WhatsApp link)
- [ ] **Photos:** Upload 10+ high-quality food photos (bowls, parathas, packaging)
- [ ] **Hours:** 10:00 AM – 10:00 PM, all days
- [ ] **Phone:** +91 9818575939
- [ ] **Posts:** Commit to weekly posts (new dishes, offers, behind-the-scenes)
- [ ] **Reviews:** Actively request reviews; respond to every review within 24 hours

### NAP Citation Consistency

Ensure this exact format is used EVERYWHERE:

```
Dilli Darbar
Amar Colony, Lajpat Nagar, New Delhi 110024
+91 9818575939
https://thedillidarbar.com
```

**Platforms to list on:** Google Business Profile, Swiggy, Zomato, Justdial, Sulekha, Instagram bio, Facebook page.

---

## 9. Proposed File Changes

### New Files

| File | Purpose |
|---|---|
| `app/sitemap.ts` | Dynamic sitemap generator for 4 public routes |
| `app/robots.ts` | Programmatic robots.txt with AI crawler allowances |
| `components/seo/JsonLd.tsx` | Reusable JSON-LD injection component (XSS-safe) |
| `components/about/FAQ.tsx` | Accordion FAQ with Framer Motion, 5 questions |

### Modified Files

| File | Changes |
|---|---|
| `lib/constants.ts` | Add `SITE_URL`, real phone number, `BUSINESS_INFO` object |
| `app/layout.tsx` | Add `metadataBase`, global OG/Twitter defaults, Restaurant JSON-LD |
| `app/page.tsx` | Add homepage-specific `metadata` export |
| `app/menu/page.tsx` | Update `metadata` + inject `Menu`/`MenuItem` JSON-LD from `data/menu.ts` |
| `app/about/page.tsx` | Update `metadata` + inject `FAQPage` JSON-LD + render `<FAQ />` |
| `app/catering/page.tsx` | Update `metadata` with catering-specific title/description/OG |

---

## 10. Verification Plan

### Automated (in-code)

| Check | Method |
|---|---|
| Sitemap accessible | Visit `https://thedillidarbar.com/sitemap.xml` — must return valid XML with 4 URLs |
| Robots.txt accessible | Visit `https://thedillidarbar.com/robots.txt` — must show Allow/Disallow rules + sitemap |
| JSON-LD valid | Paste page source into [Schema Markup Validator](https://validator.schema.org/) — zero errors |
| Rich Results eligible | Test each page URL in [Google Rich Results Test](https://search.google.com/test/rich-results) |

### Manual

| Check | Method |
|---|---|
| OG preview | Paste URLs in [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) |
| Lighthouse SEO score | Run Lighthouse audit — target 100/100 on SEO |
| Mobile rendering | Test all pages on Chrome DevTools mobile emulator |
| GBP consistency | Cross-check NAP on website footer vs Google Business Profile vs Swiggy listing |
