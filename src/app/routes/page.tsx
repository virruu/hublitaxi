import type { Metadata } from "next";
import Link from "next/link";
import routes from "@/data/routes.json";
import { inr } from "@/lib/format";
import { routeFromPrice } from "@/lib/pricing";
import { CtaBanner } from "@/components/CtaBanner";
import { ArrowRight, MapPin, Clock } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Outstation Taxi Routes from Hubli",
  description:
    "Browse all outstation taxi routes from Hubli — Goa, Bangalore, Hampi, Gokarna, Dandeli and more. Fixed fares, one-way & round-trip cabs, 24/7 booking.",
  alternates: { canonical: "/routes" },
};

export default function RoutesPage() {
  return (
    <>
      <section className="bg-ink-900 text-white">
        <div className="container-px py-12 lg:py-16">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Outstation taxi routes from Hubli
          </h1>
          <p className="mt-4 max-w-2xl text-gray-300">
            Comfortable cabs to the most popular destinations across Karnataka
            and Goa, with transparent fixed fares.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((r) => (
            <Link
              key={r.slug}
              href={`/routes/${r.slug}`}
              className="group flex flex-col rounded-3xl border border-ink-900/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <MapPin className="h-4 w-4 text-brand-600" />
                {r.from}
                <ArrowRight className="h-4 w-4 text-ink-700" />
                {r.to}
              </div>
              <p className="mt-3 flex-1 text-sm text-ink-700">{r.summary}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-ink-700">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {r.distanceKm} km
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {r.durationHrs} hrs
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-ink-900/5 pt-4">
                <div>
                  <span className="text-xs text-ink-700">Round trip (sedan) </span>
                  <span className="text-lg font-extrabold">
                    {inr(routeFromPrice(r.distanceKm))}
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
      </section>

      <CtaBanner />
    </>
  );
}
