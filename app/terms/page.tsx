import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";
import { BUSINESS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service · Dilli Darbar",
  description:
    "The terms for ordering home-cooked food from Dilli Darbar in Amar Colony, New Delhi — ordering, pricing, delivery, payment, accounts and liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lead="These terms govern your use of the Dilli Darbar website and your orders for home-cooked food prepared at our kitchen in Amar Colony, New Delhi. By placing an order or using this site, you agree to them. Prices are in Indian Rupees and payment is collected on delivery."
    >
      <LegalSection title="About us">
        <p>
          {BUSINESS.name} is a home cloud kitchen operating from{" "}
          {BUSINESS.address.locality}, serving fresh North Indian food since{" "}
          {BUSINESS.since}. &ldquo;We&rdquo; and &ldquo;us&rdquo; refer to{" "}
          {BUSINESS.name}; &ldquo;you&rdquo; refers to the customer.
        </p>
      </LegalSection>

      <LegalSection title="Placing an order">
        <p>
          When you place an order, you are making an offer to buy. An order is
          confirmed once we accept it. We may decline or cancel an order — for
          example if an item is unavailable, the delivery address is outside our
          area, or we cannot verify the details — and any amount paid for a
          cancelled order is refunded.
        </p>
      </LegalSection>

      <LegalSection title="Pricing">
        <p>
          All prices are in Indian Rupees (₹) and include applicable taxes
          unless stated otherwise. The price you pay is recalculated from our
          official menu at checkout, so the amount charged always reflects our
          current prices regardless of anything cached on your device. We may
          change menu and prices at any time.
        </p>
      </LegalSection>

      <LegalSection title="Delivery">
        <p>
          We deliver within Amar Colony, Lajpat Nagar and nearby areas of South
          Delhi during our operating hours ({BUSINESS.hours}). Delivery times
          are estimates and can vary with demand, weather and traffic. If we
          cannot deliver to your location we will tell you and refund any
          payment.
        </p>
      </LegalSection>

      <LegalSection title="Payment">
        <p>
          Payment is collected on delivery (cash or UPI) unless we agree
          otherwise for a specific order or catering booking.
        </p>
      </LegalSection>

      <LegalSection title="Your account">
        <p>
          If you create an account, you are responsible for keeping your login
          details secure and for activity under your account. Let us know
          immediately if you suspect unauthorised use.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>
          Please use the site lawfully. Do not place fraudulent orders, attempt
          to disrupt the site, or misuse our content. We may suspend access for
          misuse.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The Dilli Darbar name, logo, photographs, menu descriptions and site
          content belong to us and may not be copied or used without permission.
        </p>
      </LegalSection>

      <LegalSection title="Food &amp; allergies">
        <p>
          Our food is cooked in a home kitchen that handles dairy, gluten, nuts
          and other common ingredients. If you have an allergy or dietary
          requirement, please check with us before ordering — we cannot
          guarantee a fully allergen-free preparation.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          We take care to prepare and deliver good food, but to the extent
          permitted by law our liability for any order is limited to the amount
          you paid for that order. Nothing in these terms limits rights you have
          under the Consumer Protection Act, 2019.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of India, and disputes are
          subject to the courts of New Delhi.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these terms from time to time. The current version will
          always be on this page with a revised &ldquo;Last updated&rdquo; date.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
