import Link from "next/link";
import routes from "@/data/routes.json";
import { inr } from "@/lib/format";
import { ArrowRight, MapPin, Clock } from "@/components/Icons";

export function PopularRoutes() {
  const list = routes.filter((r) => r.popular);

  return (
    <section id="routes" className="section scroll-mt-20 bg-gray-50">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Popular outstation routes</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Favourite trips from Hubli
            </h2>
            <p className="mt-4 text-ink-700">
              Fixed fares, experienced highway drivers and one-way or round-trip
              options to the most-loved destinations.
            </p>
          </div>
          <Link
            href="/routes"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700"
          >
            View all routes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <Link
              key={r.slug}
              href={`/routes/${r.slug}`}
              className="group flex flex-col rounded-3xl border border-ink-900/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                <MapPin className="h-4 w-4 text-brand-600" />
                {r.from}
                <ArrowRight className="h-4 w-4 text-ink-700" />
                {r.to}
              </div>
              <p className="mt-3 flex-1 text-sm text-ink-700">{r.summary}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-ink-700">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {r.distanceKm} km
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {r.durationHrs} hrs
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-ink-900/5 pt-4">
                <div>
                  <span className="text-xs text-ink-700">From </span>
                  <span className="text-lg font-extrabold text-ink-900">
                    {inr(r.fromPrice)}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:underline">
                  Book now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
