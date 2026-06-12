import Link from "next/link";
import services from "@/data/services.json";
import { getHomeRouteLinks } from "@/lib/routes/links";
import { inr } from "@/lib/format";
import { ArrowRight } from "@/components/Icons";

export function HomeSeoHub() {
  const routeLinks = getHomeRouteLinks(12);

  return (
    <section className="section border-t border-ink-900/5 bg-white">
      <div className="container-px">
        <div className="mx-auto max-w-4xl">
          <span className="eyebrow">Service area</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Taxi & cab service in Hubli, Hubballi & Dharwad
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-700">
            <p>
              {`Hubli Taxi (Hubballi) provides `}
              <Link
                href="/services/local-taxi"
                className="font-semibold text-brand-700 hover:underline"
              >
                local city cabs
              </Link>
              {`, `}
              <Link
                href="/services/airport-taxi"
                className="font-semibold text-brand-700 hover:underline"
              >
                Hubballi Airport (HBX) transfers
              </Link>
              {`, `}
              <Link
                href="/services/railway-station-taxi"
                className="font-semibold text-brand-700 hover:underline"
              >
                railway station pickups at UBL
              </Link>
              {`, and `}
              <Link
                href="/services/outstation-cabs"
                className="font-semibold text-brand-700 hover:underline"
              >
                outstation taxis
              </Link>
              {` across Karnataka, Goa and Maharashtra. Whether you need a sedan for a twin-city errand, an Innova for a family trip to `}
              <Link
                href="/routes/hubli-to-goa"
                className="font-semibold text-brand-700 hover:underline"
              >
                Goa
              </Link>
              {`, or a `}
              <Link
                href="/services/tempo-traveller"
                className="font-semibold text-brand-700 hover:underline"
              >
                Tempo Traveller for a group
              </Link>
              {` — fixed fares are quoted upfront on call or WhatsApp.`}
            </p>
            <p>
              We run 24/7 with professional drivers who know highway routes from
              North Karnataka to Bengaluru, Pune, Hyderabad, Mysuru, the Konkan
              coast and heritage sites like Hampi and Badami. One-way drops and
              round trips are both available; you only pay for the journey you
              need.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-extrabold text-ink-900">
              Outstation taxi routes from Hubli
            </h3>
            <p className="mt-2 text-sm text-ink-700">
              Fixed sedan round-trip fares — tap a route for travel guide, fare
              table and instant booking.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {routeLinks.map((route) => (
                <li key={route.slug}>
                  <Link
                    href={`/routes/${route.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border border-ink-900/10 bg-gray-50 px-3 py-1.5 text-xs font-medium text-ink-800 transition hover:border-brand-500/40 hover:bg-brand-50"
                  >
                    {route.label}
                    <span className="text-ink-700">· {inr(route.fromPrice)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/routes"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
            >
              View all routes & travel guides
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-extrabold text-ink-900">
              Local & transfer services
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex items-center justify-between rounded-xl border border-ink-900/10 px-4 py-3 text-sm transition hover:border-brand-500/30 hover:bg-gray-50"
                  >
                    <span className="font-medium text-ink-900">{s.title}</span>
                    <ArrowRight className="h-4 w-4 text-brand-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
