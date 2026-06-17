import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Edge-safe auth middleware. The `authorized` callback in authConfig decides
// whether a request to a protected route may proceed.
export const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  // The `authorized` callback handles allow/deny + redirect to /login.
  void req;
});

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*"],
};
