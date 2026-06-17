import Link from "next/link";
import { WHATSAPP_URL, SWIGGY_URL, ZOMATO_URL } from "@/lib/constants";

const PAGES = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Catering", href: "/catering" },
  { label: "My Account", href: "/account" },
];

const POLICIES = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund & Cancellation", href: "/refunds" },
  { label: "FSSAI & Hygiene", href: "/hygiene" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "WhatsApp", href: WHATSAPP_URL },
  { label: "Swiggy", href: SWIGGY_URL },
  { label: "Zomato", href: ZOMATO_URL },
];

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-body font-bold uppercase tracking-wide text-cream/50 text-xs mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="font-body text-cream/80 hover:text-saffron transition-colors"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink px-6 md:px-[76px] py-14 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl text-cream">दिल्ली — Darbar</p>
            <p className="font-body text-cream/60 mt-3 max-w-[260px]">
              A home cloud kitchen in Amar Colony, New Delhi. Fresh breakfast,
              lunch and dinner — home cooked, delivered warm.
            </p>
            <p className="font-body text-cream/50 text-sm mt-4">
              10 AM – 10 PM daily
            </p>
          </div>

          <Column title="Pages" links={PAGES} />
          <Column title="Order & Social" links={SOCIAL} />
          <Column title="Policies" links={POLICIES} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-14 pt-8 border-t border-cream/10">
          <p className="font-body text-cream/40 text-xs">
            © 2025 Delhi Darbar. Made with love in Amar Colony.
          </p>
          <p className="font-body text-cream/40 text-xs">
            FSSAI certification in progress · Serving Amar Colony & nearby
          </p>
        </div>
      </div>
    </footer>
  );
}
