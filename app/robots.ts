import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/legal";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/checkout", "/account", "/login", "/signup"];

  return {
    rules: [
      // Allow everyone, including AI answer engines (GPTBot, PerplexityBot,
      // ClaudeBot, etc.) — many competitors block these; allowing them is a
      // GEO advantage. Block private/transactional routes for all.
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: `${BUSINESS.siteUrl}/sitemap.xml`,
    host: BUSINESS.siteUrl,
  };
}
