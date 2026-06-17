import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";
import { BUSINESS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy · Dilli Darbar",
  description:
    "How Dilli Darbar collects, uses and protects your personal data under India's DPDP Act 2023. Your rights and how to contact our Grievance Officer.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lead="Dilli Darbar, a home cloud kitchen in Amar Colony, New Delhi, collects only the information needed to take, cook and deliver your order — your name, phone, delivery address, email and order history. We never sell your data. This policy explains what we collect, why, and the rights you have under India's DPDP Act, 2023."
    >
      <LegalSection title="Who we are">
        <p>
          This Privacy Policy applies to {BUSINESS.name} (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;) and the website {BUSINESS.siteUrl}. We are a home
          cloud kitchen operating from {BUSINESS.address.locality}. For any
          privacy question, contact us using the details at the bottom of this
          page.
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>We collect only what we need to serve you:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Contact &amp; delivery details</strong> — your name, phone
            number, delivery address and email.
          </li>
          <li>
            <strong>Order information</strong> — the items you order, order
            history and any delivery notes.
          </li>
          <li>
            <strong>Account details</strong> — if you create an account, your
            email and a password (stored only as a securely hashed value — we
            never see your actual password).
          </li>
          <li>
            <strong>Device &amp; usage data</strong> — basic technical
            information your browser sends, and items saved in your browser to
            keep your cart between visits.
          </li>
        </ul>
        <p>
          Payment is collected on delivery, so we do not store card or bank
          details on this site.
        </p>
      </LegalSection>

      <LegalSection title="How we use your information">
        <ul className="list-disc pl-5 space-y-1">
          <li>To prepare, fulfil and deliver your orders.</li>
          <li>To contact you about an order or respond to a query.</li>
          <li>To maintain your account and order history.</li>
          <li>To improve our menu, service and website.</li>
          <li>To meet legal and tax obligations.</li>
        </ul>
        <p>
          We process your data on the basis of your consent and to perform the
          order you ask us to fulfil. You may withdraw consent at any time
          (see your rights below).
        </p>
      </LegalSection>

      <LegalSection title="Who we share it with">
        <p>
          We share your details only with the people who help complete your
          order — for example our delivery staff or partners, and ordering
          platforms (such as Swiggy or Zomato) when you order through them. We
          do not sell or rent your personal data to anyone. We may disclose
          information if required by law.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          We keep order and account information only as long as needed to
          provide our service and to meet legal, accounting and tax
          requirements, after which it is deleted or anonymised.
        </p>
      </LegalSection>

      <LegalSection title="How we protect it">
        <p>
          We use reasonable security measures to protect your information,
          including hashed passwords and access controls. No method of
          transmission over the internet is fully secure, but we work to keep
          your data safe.
        </p>
      </LegalSection>

      <LegalSection title="Cookies &amp; local storage">
        <p>
          We use your browser&rsquo;s local storage to remember your cart and
          keep you signed in. These are essential to how the site works. We do
          not use third-party advertising trackers.
        </p>
      </LegalSection>

      <LegalSection title="Your rights under the DPDP Act, 2023">
        <p>You have the right to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Access the personal data we hold about you.</li>
          <li>Ask us to correct or update inaccurate data.</li>
          <li>Ask us to erase your data, where the law allows.</li>
          <li>Withdraw consent for processing at any time.</li>
          <li>Raise a grievance with our Grievance Officer.</li>
        </ul>
        <p>
          To exercise any of these, email{" "}
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-saffron hover:underline"
          >
            {BUSINESS.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          Our service is intended for adults. We do not knowingly collect data
          from children. If you believe a child has provided us data, contact
          us and we will remove it.
        </p>
      </LegalSection>

      <LegalSection title="Grievance Officer">
        <p>
          In line with the DPDP Act, 2023, you can reach our Grievance Officer
          at{" "}
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-saffron hover:underline"
          >
            {BUSINESS.email}
          </a>{" "}
          or {BUSINESS.phone}. We aim to acknowledge requests within 30 days.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          We may update this policy from time to time. The latest version will
          always be on this page with a revised &ldquo;Last updated&rdquo; date.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
