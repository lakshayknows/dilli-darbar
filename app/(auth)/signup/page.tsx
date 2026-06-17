"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerUser } from "@/app/(auth)/actions";

function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/account";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData(e.currentTarget);

    const result = await registerUser(data);
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Auto sign-in after successful registration.
    const res = await signIn("credentials", {
      email: String(data.get("email")),
      password: String(data.get("password")),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      router.push("/login");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <p className="font-body text-sm bg-red-700/15 text-red-200 px-3 py-2">
          {error}
        </p>
      )}
      <Field label="Name" name="name" type="text" autoComplete="name" />
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full min-h-[44px] bg-saffron text-cream font-body font-bold uppercase tracking-wide hover:brightness-110 transition disabled:opacity-60"
      >
        {loading ? "Creating account…" : "Create account"}
      </button>
      <p className="font-body text-cream/60 text-sm text-center">
        Already have an account?{" "}
        <Link
          href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="text-saffron font-bold"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="font-body text-cream/70 text-sm">{label}</span>
      <input
        name={name}
        type={type}
        required={name !== "phone"}
        autoComplete={autoComplete}
        className="mt-1 w-full bg-transparent border border-cream/30 px-3 py-2.5 text-cream font-body focus:border-saffron focus:outline-none"
      />
    </label>
  );
}

export default function SignupPage() {
  return (
    <main className="bg-maroon min-h-screen flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-sm">
        <h1 className="font-heading text-cream text-4xl mb-2">Create account</h1>
        <p className="font-body text-cream/60 mb-8">
          So we know where to send your khana.
        </p>
        <Suspense fallback={null}>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
}
