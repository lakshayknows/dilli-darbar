import type { Metadata } from "next";
import LegalLayout, {
  LegalSection,
  type FaqItem,
} from "@/components/legal/LegalLayout";
import { BUSINESS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "FSSAI & Hygiene · Dilli Darbar",
  description:
    "How Dilli Darbar keeps food safe: fresh daily sourcing, filtered water, clean oil and sealed packaging. Our FSSAI licence application is in progress.",
  alternates: { canonical: "/hygiene" },
};

const faq: FaqItem[] = [
  {
    q: "Is Dilli Darbar FSSAI registered?",
    a: "We have applied for our FSSAI licence and the application is currently in progress. We follow careful food-safety and hygiene practices in the meantime and will publish our licence number here as soon as it is granted.",
  },
  {
    q: "Is the food prepared hygienically?",
    a: "Yes. Dilli Darbar is a home cloud kitchen using fresh, locally sourced ingredients with no preservatives. We cook in small batches, use filtered water and clean cooking oil, and pack every order in sealed, tamper-evident packaging.",
  },
  {
    q: "How fresh is the food?",
    a: "We cook to order in small batches through the day and source ingredients fresh daily, so nothing sits around. Orders are packed hot and sent out for delivery right away.",
  },
  {
    q: "Do you use any preservatives?",
    a: "No. Our food is home-cooked the traditional way without added preservatives, which is also why we cook fresh for each order rather than storing prepared meals.",
  },
];

export default function HygienePage() {
  return (
    <LegalLayout
      title="FSSAI & Hygiene"
      lead={`Dilli Darbar is a home cloud kitchen in Amar Colony, New Delhi, cooking fresh North Indian food since ${BUSINESS.since} — over 25,000 orders at a 4.8-star rating. Our FSSAI licence application is currently in progress. In the meantime we follow careful hygiene practices: fresh daily sourcing, filtered water, clean oil and sealed packaging.`}
      faq={faq}
    >
      <LegalSection title="Our FSSAI status">
        <p>
          We have <strong>applied for our FSSAI licence and the application is
          currently in progress</strong>. We are committed to full compliance
          and will publish our licence number on this page as soon as it is
          issued. We do not display a licence number we have not yet received.
        </p>
      </LegalSection>

      <LegalSection title="How we keep food safe">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Fresh daily sourcing</strong> — ingredients bought fresh and
            used quickly, with no preservatives.
          </li>
          <li>
            <strong>Cooked to order</strong> — small batches through the day, so
            food is hot and fresh, not stored.
          </li>
          <li>
            <strong>Clean kitchen</strong> — regular cleaning, separate handling
            of veg and non-veg, and clean utensils.
          </li>
          <li>
            <strong>Filtered water &amp; clean oil</strong> — used in cooking and
            washing.
          </li>
          <li>
            <strong>Safe packaging</strong> — sealed, tamper-evident containers
            so your food reaches you exactly as it left our kitchen.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Allergies">
        <p>
          Our home kitchen handles dairy, gluten, nuts and other common
          ingredients. If you have an allergy, please check with us before
          ordering at{" "}
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-saffron hover:underline"
          >
            {BUSINESS.email}
          </a>{" "}
          or {BUSINESS.phone}.
        </p>
      </LegalSection>

      <LegalSection title="Questions or concerns">
        <p>
          Food safety matters to us. If you ever have a concern about an order,
          contact us straight away and we will look into it.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
