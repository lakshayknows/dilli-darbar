import type { Metadata } from "next";
import LegalLayout, {
  LegalSection,
  type FaqItem,
} from "@/components/legal/LegalLayout";
import { BUSINESS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation · Dilli Darbar",
  description:
    "Cancel before we start cooking for a full refund. Wrong, missing or spoiled order? We replace it or refund you. Dilli Darbar's fair, food-first refund policy.",
  alternates: { canonical: "/refunds" },
};

const faq: FaqItem[] = [
  {
    q: "Can I cancel my order?",
    a: "Yes — you can cancel free of charge any time before we start cooking. Once preparation has begun we may not be able to cancel, because the food is freshly made for you. To cancel, call or WhatsApp us at +91 9818575939 as soon as possible.",
  },
  {
    q: "What if my order is wrong, missing items, or spoiled?",
    a: "We'll make it right. Report it within 2 hours of delivery with a photo, and we'll either replace the item or refund you for it. Contact us at office@thedillidarbar.com or +91 9818575939.",
  },
  {
    q: "How long do refunds take?",
    a: "Approved refunds are processed within 5–7 business days to your original payment method, or by UPI where payment was on delivery.",
  },
  {
    q: "What if you cancel my order?",
    a: "If we cancel — for example an item sells out or your address is outside our delivery area — you get a full refund of anything you paid.",
  },
];

export default function RefundsPage() {
  return (
    <LegalLayout
      title="Refund & Cancellation"
      lead="We cook every order fresh, so we keep cancellations simple and fair: cancel before we start cooking for a full refund. If an order arrives wrong, incomplete or spoiled, tell us within 2 hours and we'll replace it or refund you. Food quality is our promise."
      faq={faq}
    >
      <LegalSection title="Cancelling an order">
        <p>
          You can cancel free of charge any time <strong>before we start
          preparing</strong> your order. Because our food is freshly cooked to
          order, once preparation has begun a cancellation may not be possible.
          To cancel, call or WhatsApp {BUSINESS.phone} as early as you can.
        </p>
      </LegalSection>

      <LegalSection title="When you're entitled to a refund or replacement">
        <p>We will replace the item or refund you if:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>You received the wrong item.</li>
          <li>Items were missing from your order.</li>
          <li>The food arrived spoiled, or with a genuine quality issue.</li>
        </ul>
        <p>
          As food is perishable, we cannot offer refunds simply for a change of
          mind after the food has been prepared or delivered. This does not
          affect your rights under the Consumer Protection Act, 2019.
        </p>
      </LegalSection>

      <LegalSection title="How to report a problem">
        <p>
          Please tell us within <strong>2 hours of delivery</strong> and, where
          possible, share a photo. Email{" "}
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-saffron hover:underline"
          >
            {BUSINESS.email}
          </a>{" "}
          or call {BUSINESS.phone}. Reporting quickly helps us check what
          happened and put it right.
        </p>
      </LegalSection>

      <LegalSection title="How refunds are made">
        <p>
          Approved refunds are processed within 5–7 business days to your
          original payment method, or by UPI where the order was paid on
          delivery.
        </p>
      </LegalSection>

      <LegalSection title="If we cancel">
        <p>
          If we cancel an order — for example an item sells out or your address
          is outside our delivery area — you receive a full refund of any amount
          paid.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
