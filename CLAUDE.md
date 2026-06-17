# Dilli Darbar — Project Guide

A full-stack marketing + ordering site for **Dilli Darbar** (दिल्ली Darbar), a home
cloud kitchen in Amar Colony, New Delhi. Built as a single Next.js app: marketing
pages, a clickable menu with an item drawer, a client-side cart, email/password
auth, gated checkout, and lead capture — all in one deploy.

## Tech stack

- **Next.js 14.2.5** (App Router) + **React 18** + **TypeScript** (strict)
- **Tailwind CSS 3** (custom theme) + **Framer Motion 11** (all animation)
- **Auth.js / NextAuth v5 beta** (credentials provider, JWT sessions)
- **Prisma 7** ORM with the **`prisma-client` generator** (driver adapters)
- **Prisma Postgres** via the **`@prisma/adapter-pg`** (`PrismaPg`) driver adapter
- Package manager: **npm**

## Commands

```bash
npm run dev            # local dev server (Next picks first free port: 3000+)
npm run build          # prisma generate && next build  (Vercel runs this)
npm start              # serve the production build
npm run lint           # eslint

npx prisma migrate dev --name <change>   # create + apply a migration
npx prisma generate                      # regenerate client -> ./generated/prisma
npx prisma db seed                       # run prisma/seed.ts (wired in prisma.config.ts)
npx prisma studio                        # browse/edit data
npx tsx scripts/verify-prisma.ts         # connectivity smoke test -> "✅ Connected"
```

`postinstall` also runs `prisma generate`, so the client exists after `npm install`
and on Vercel.

## Architecture

Single Next.js app — frontend + backend together. No separate server, no proxy.
- **Backend** = Route Handlers (`app/api/.../route.ts`) + Server Actions (`"use server"`).
- **Route protection** = `middleware.ts` (edge-safe) gating `/account` and `/checkout`.
- **Client state** = React Context providers mounted once in the root layout.

### Providers (client state)
`components/Providers.tsx` wraps the whole app (mounted in `app/layout.tsx`) with:
- `SessionProvider` (next-auth)
- `CartProvider` — cart state + `localStorage` persistence (`useCart()`)
- `ItemDrawerProvider` — which menu item's detail drawer is open (`useItemDrawer()`)
- and mounts `<ItemDrawer />` + `<CartDrawer />` once.

### Auth (Auth.js v5)
- `auth.config.ts` — **edge-safe** base config (no Prisma/bcrypt). Holds `pages`,
  the `authorized` callback (route gating), and jwt/session callbacks. `trustHost: true`
  is required for Vercel. Imported by `middleware.ts`.
- `auth.ts` — **node** config: Prisma adapter + Credentials provider (bcrypt verify).
  Exports `handlers`, `auth`, `signIn`, `signOut`.
- `app/api/auth/[...nextauth]/route.ts` re-exports `handlers`.
- Sessions are **JWT** (required for the Credentials provider). `session.user.id` is
  populated via callbacks; types augmented in `types/next-auth.d.ts`.

### Database (Prisma Postgres)
- Schema: `prisma/schema.prisma` — `generator client` is `prisma-client`
  (`output = "../generated/prisma"`); `datasource db` is `postgresql` with **no `url`**.
- Connection URL + seed command live in **`prisma.config.ts`** (`datasource.url = env("DATABASE_URL")`,
  `migrations.seed = "tsx prisma/seed.ts"`).
- Runtime client: `lib/prisma.ts` — a singleton `PrismaClient({ adapter })` using
  `new PrismaPg({ connectionString: process.env.DATABASE_URL })`.
- Import the client only via `import { prisma } from "@/lib/prisma"` in **server** code.
  Standalone scripts (`prisma/seed.ts`, `scripts/verify-prisma.ts`) import the client
  with a **relative** path (`../generated/prisma/client`) because `tsx` doesn't resolve
  the `@/` tsconfig alias.

Models: `User`, `Account`, `Session`, `VerificationToken` (Auth.js) + `Lead`
(`type` = `"CATERING" | "ORDER"`, JSON `payload`), `Order`, `OrderItem`.

### Menu data
`data/menu.ts` is the **single source of truth** for dishes (static, not in the DB):
`MenuItem` = `{ id, name, price, veg, category, description, image, ingredients[], calories }`.
Prices are recomputed server-side from this file at checkout (never trust the client total).

## Key flows

- **Browse → item drawer:** any food card calls `openItem(item)` → `ItemDrawer`
  (right drawer on desktop, bottom sheet on mobile) shows ingredients, calories,
  qty, Add to cart.
- **Cart:** `add()` → nav cart badge + `CartDrawer`; persisted in `localStorage`.
- **Checkout (`/checkout`, gated):** `placeOrder` server action revalidates prices,
  creates an `Order` + `OrderItem`s for the signed-in user, and a `Lead{type:"ORDER"}`.
- **Catering (`/catering`):** `submitCateringLead` server action writes a
  `Lead{type:"CATERING"}` (WhatsApp hand-off kept as a secondary action).
- **Account (`/account`, gated):** server component lists the user's order history.

## Directory map

```
app/
  layout.tsx            root layout: fonts, <Providers>, Nav/Footer/StickyBar/SplashScreen
  page.tsx              home: Hero, Marquee, WhatMakesSpecial, DarbarBowls, AboutTeaser, Reviews, FinalCTA
  loading.tsx           route-level loading splash (animated multi-language wordmark)
  menu|about|catering/  marketing/menu pages
  (auth)/login|signup/  auth pages + actions.ts (registerUser)
  checkout/             page.tsx + actions.ts (placeOrder)
  account/              gated order history
  api/auth/[...nextauth]/route.ts
components/
  Providers.tsx         session + cart + item-drawer providers (mounts drawers)
  layout/               Nav, Footer, StickyBar, SplashScreen
  home/                 hero + landing sections
  menu/                 MenuGrid, MenuCard, FilterBar (incl. veg-only), ItemDrawer(+Provider)
  cart/                 CartProvider, CartDrawer
  catering/             ContactForm (+ actions), UseCases
  about/                Story, ProcessGrid, TrustCards
  auth/                 SignOutButton
  ui/                   Section, Button, Reveal, useIsDesktop
lib/                    prisma.ts (singleton), constants.ts (WhatsApp/Swiggy/Zomato URLs)
data/menu.ts            all dishes
prisma/                 schema.prisma, migrations/, seed.ts
scripts/verify-prisma.ts
auth.ts, auth.config.ts, middleware.ts, prisma.config.ts
generated/prisma/       generated client — gitignored, regenerated on build
```

## Design system / conventions

- **Colors** (tailwind.config.ts): `maroon #7C1111`, `cream #F5EDD6`, `saffron #FF4D00`,
  `ink #1A1A1A`. **Fonts**: `font-display` = Gajraj One (CSS var `--font-gajraj`,
  set in `globals.css`); `font-body` = Space Grotesk (next/font).
- **Sections**: use the shared `components/ui/Section.tsx` primitive (`bg`, `size`,
  consistent `px-6 md:px-[76px]` gutters, `max-w-[1400px]` container). Don't hand-roll
  section padding.
- **Buttons**: `components/ui/Button.tsx` (`solid | outline | ink`). Entrance
  animations: `components/ui/Reveal.tsx` (IntersectionObserver). Drawers/sheets follow
  the Framer Motion `AnimatePresence` pattern in `Nav`/`StickyBar`.
- Reference files as `path:line`. Match surrounding code style.

## Gotchas

- **`@/generated/...` doesn't resolve under `tsx`** — scripts use relative imports.
- The **generated client is gitignored**; if imports look missing, run `npx prisma generate`.
- **Windows file lock**: a running `next dev` can lock the Prisma engine DLL and break
  `prisma generate`/`build` with `EPERM`. Stop node first (`taskkill /F /IM node.exe`).
- Scroll-triggered `Reveal` sections render at opacity 0 in a no-scroll full-page
  screenshot — that's expected, not a bug.
- **Middleware is edge** — only import `auth.config.ts` there, never `lib/prisma` (Node).

## Deployment (Vercel)

- Build runs `prisma generate && next build` (+ `postinstall: prisma generate`).
- Set these env vars in the Vercel project (they're gitignored locally):
  - `DATABASE_URL` — the Prisma Postgres connection string
  - `AUTH_SECRET` — Auth.js secret
- Domain: add it under Vercel → Settings → Domains and match the records Vercel shows.
  DNS only routes the domain; a failing build still serves an error.

## Secrets

`.env` (DATABASE_URL, AUTH_SECRET) and `generated/` are **gitignored** — never commit,
print, or log the connection string or auth secret.
