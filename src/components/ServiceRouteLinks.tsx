import Link from "next/link";
import routes from "@/data/routes.json";
import { inr } from "@/lib/format";
import { routeFromPrice } from "@/lib/pricing";
import { ArrowRight } from "@/components/Icons";

type ServiceRouteLinksProps = {
  title?: string;
  slugs?: string[];
  limit?: number;
};

export function ServiceRouteLinks({
  title = "Popular outstation routes from Hubli",
  slugs,
  limit = 8,
}: ServiceRouteLinksProps) {
  const list = (slugs
    ? slugs
        .map((slug) => routes.find((r) => r.slug === slug))
        .filter((r): r is (typeof routes)[number] => Boolean(r))
    : routes.filter((r) => r.popular)
  ).slice(0, limit);

  if (list.length === 0) return null;

  return (
    <div className="mt-10 border-t border-ink-900/10 pt-10">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <p className="mt-2 text-sm text-ink-700">
        Fixed fares, travel guides and online booking for each route.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {list.map((route) => (
          <li key={route.slug}>
            <Link
              href={`/routes/${route.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-ink-900/10 bg-white p-4 transition hover:border-brand-500/40 hover:shadow-sm"
            >
              <span>
                <span className="block text-sm font-semibold text-ink-900">
                  {route.from} → {route.to}
                </span>
                <span className="mt-0.5 block text-xs text-ink-700">
                  {route.distanceKm} km · from{" "}
                  {inr(routeFromPrice(route.distanceKm, route.fromPrice))}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/routes"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
      >
        All routes & guides
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
