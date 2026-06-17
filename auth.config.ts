import type { NextAuthConfig } from "next-auth";

// Edge-safe base config (no Prisma / bcrypt). Shared by middleware and the full
// node-side config in auth.ts.
export const authConfig = {
  // Required on Vercel / behind proxies — otherwise Auth.js throws UntrustedHost.
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  // Real providers are added in auth.ts (they need Node APIs).
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected =
        nextUrl.pathname.startsWith("/account") ||
        nextUrl.pathname.startsWith("/checkout");
      if (isProtected) return isLoggedIn; // false -> redirect to signIn page
      return true;
    },
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
