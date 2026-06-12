import routes from "@/data/routes.json";
import routeLinks from "@/data/route-links.json";
import { inr } from "@/lib/format";
import { routeFromPrice } from "@/lib/pricing";

export type RouteLinkMeta = {
  related: string[];
  comboTip?: string;
};

export type RelatedRoute = {
  slug: string;
  from: string;
  to: string;
  distanceKm: number;
  fromPrice: number;
  summary: string;
};

const linkMap = routeLinks as Record<string, RouteLinkMeta>;

export function getRouteLinkMeta(slug: string): RouteLinkMeta | undefined {
  return linkMap[slug];
}

export function getRelatedRoutes(slug: string, limit = 4): RelatedRoute[] {
  const meta = linkMap[slug];
  if (!meta) return [];

  return meta.related
    .slice(0, limit)
    .map((relatedSlug) => routes.find((r) => r.slug === relatedSlug))
    .filter((r): r is (typeof routes)[number] => Boolean(r))
    .map((r) => ({
      slug: r.slug,
      from: r.from,
      to: r.to,
      distanceKm: r.distanceKm,
      fromPrice: routeFromPrice(r.distanceKm, r.fromPrice),
      summary: r.summary,
    }));
}

/** Top routes for home page SEO hub — popular first, then fill from all routes. */
export function getHomeRouteLinks(limit = 12) {
  const popular = routes.filter((r) => r.popular);
  const rest = routes.filter((r) => !r.popular);
  const ordered = [...popular, ...rest].slice(0, limit);

  return ordered.map((r) => ({
    slug: r.slug,
    label: `${r.from} to ${r.to}`,
    fromPrice: routeFromPrice(r.distanceKm, r.fromPrice),
  }));
}
