import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import routes from "@/data/routes.json";
import services from "@/data/services.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/routes", "/about", "/contact", "/privacy", "/terms"];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  for (const s of services) {
    entries.push({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const r of routes) {
    entries.push({
      url: `${site.url}/routes/${r.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
