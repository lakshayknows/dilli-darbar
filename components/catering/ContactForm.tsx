"use client";

import { FormEvent, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/constants";
import { submitCateringLead } from "@/components/catering/actions";

const EVENT_TYPES = [
  "Office Lunch",
  "Society Event",
  "Birthday Party",
  "Family Gathering",
  "Other",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: EVENT_TYPES[0],
    headcount: "",
    date: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "sent" | "error">(
    "idle"
  );

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("saving");

    // Save the enquiry as a lead in our database first.
    const res = await submitCateringLead(form);
    if (!res.ok) {
      setStatus("error");
      return;
    }
    setStatus("sent");

    // Then offer the WhatsApp hand-off as a secondary channel.
    const message = [
      `Hi Delhi Darbar! I'd like to enquire about catering.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Event type: ${form.eventType}`,
      `Expected headcount: ${form.headcount}`,
      `Date: ${form.date}`,
      form.message ? `Message: ${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppUrl(message), "_blank");
  }

  const inputClasses =
    "w-full min-h-[44px] bg-transparent border border-ink/30 px-4 py-2 font-body text-ink placeholder:text-ink/40 focus:outline-none focus:border-saffron";

  return (
    <form onSubmit={handleSubmit} className="bg-cream p-6 md:p-10 space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="font-body font-medium text-ink text-sm block mb-1">
            Name
          </label>
          <input
            required
            className={inputClasses}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div>
          <label className="font-body font-medium text-ink text-sm block mb-1">
            Phone
          </label>
          <input
            required
            type="tel"
            className={inputClasses}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="font-body font-medium text-ink text-sm block mb-1">
            Event Type
          </label>
          <select
            className={inputClasses}
            value={form.eventType}
            onChange={(e) => update("eventType", e.target.value)}
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-body font-medium text-ink text-sm block mb-1">
            Expected Headcount
          </label>
          <input
            required
            type="number"
            min={1}
            className={inputClasses}
            value={form.headcount}
            onChange={(e) => update("headcount", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="font-body font-medium text-ink text-sm block mb-1">
          Date
        </label>
        <input
          required
          type="date"
          className={inputClasses}
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
        />
      </div>

      <div>
        <label className="font-body font-medium text-ink text-sm block mb-1">
          Message
        </label>
        <textarea
          rows={4}
          className={inputClasses}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      {status === "sent" && (
        <p className="font-body text-sm text-green-700">
          Enquiry received — we&apos;ll be in touch. (We also opened WhatsApp so
          you can message us directly.)
        </p>
      )}
      {status === "error" && (
        <p className="font-body text-sm text-red-700">
          Something went wrong. Please try again or message us on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "saving"}
        className="min-h-[44px] w-full md:w-auto px-8 bg-saffron text-cream font-body font-bold uppercase tracking-wide hover:brightness-110 transition disabled:opacity-60"
      >
        {status === "saving" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
