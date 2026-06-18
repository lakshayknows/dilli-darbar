import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.siteUrl;
  const now = new Date();

  const route = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ) => ({ url: `${base}${path}`, lastModified: now, changeFrequency, priority });

  return [
    route("/", 1.0, "weekly"),
    route("/menu", 0.9, "weekly"),
    route("/catering", 0.8, "monthly"),
    route("/about", 0.7, "monthly"),
    route("/hygiene", 0.5, "monthly"),
    route("/privacy", 0.3, "yearly"),
    route("/terms", 0.3, "yearly"),
    route("/refunds", 0.3, "yearly"),
  ];
}
