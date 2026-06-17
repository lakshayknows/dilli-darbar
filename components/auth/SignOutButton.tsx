"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="min-h-[44px] px-5 border border-cream/40 text-cream font-body font-bold uppercase tracking-wide text-sm hover:bg-cream hover:text-ink transition"
    >
      Sign out
    </button>
  );
}
