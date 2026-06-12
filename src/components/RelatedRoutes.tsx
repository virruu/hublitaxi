import Link from "next/link";
import { ArrowRight, MapPin } from "@/components/Icons";
import { inr } from "@/lib/format";
import type { RelatedRoute } from "@/lib/routes/links";

type RelatedRoutesProps = {
  routes: RelatedRoute[];
  comboTip?: string;
};

export function RelatedRoutes({ routes, comboTip }: RelatedRoutesProps) {
  if (routes.length === 0) return null;

  return (
    <div className="mt-12 border-t border-ink-900/10 pt-10">
      <h3 className="text-xl font-extrabold text-ink-900">Related taxi routes</h3>
      {comboTip && (
        <p className="mt-2 text-sm leading-relaxed text-ink-700">{comboTip}</p>
      )}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {routes.map((route) => (
          <li key={route.slug}>
            <Link
              href={`/routes/${route.slug}`}
              className="group flex flex-col rounded-2xl border border-ink-900/10 bg-white p-4 transition hover:border-brand-500/30 hover:shadow-sm"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                <MapPin className="h-4 w-4 text-brand-600" />
                {route.from} → {route.to}
              </span>
              <p className="mt-2 line-clamp-2 flex-1 text-xs text-ink-700">
                {route.summary}
              </p>
              <span className="mt-3 flex items-center justify-between text-xs">
                <span className="text-ink-700">
                  {route.distanceKm} km · from{" "}
                  <strong className="text-ink-900">{inr(route.fromPrice)}</strong>
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-brand-700 group-hover:underline">
                  View route
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-sm text-ink-700">
        <Link
          href="/routes"
          className="font-semibold text-brand-700 hover:underline"
        >
          Browse all outstation routes from Hubli
        </Link>
      </p>
    </div>
  );
}
