import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import routes from "@/data/routes.json";
import { site } from "@/data/site";
import { inr } from "@/lib/format";
import {
  fleetFaresForRoute,
  routeFromPrice,
  routeTripKm,
} from "@/lib/pricing";
import { BookingForm } from "@/components/BookingForm";
import { CtaBanner } from "@/components/CtaBanner";
import { Check, Clock, MapPin, ArrowRight } from "@/components/Icons";

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

function getRoute(slug: string) {
  return routes.find((r) => r.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) return {};
  const fromPrice = routeFromPrice(route.distanceKm, route.fromPrice);
  const title = `${route.from} to ${route.to} Taxi | Cab Fare from ${inr(
    fromPrice
  )}`;
  const description = `Book a ${route.from} to ${route.to} taxi (${route.distanceKm} km, ~${route.durationHrs} hrs). Round-trip cabs from ${inr(fromPrice)} (sedan, approx.). ${route.summary}`;
  return {
    title,
    description,
    alternates: { canonical: `/routes/${route.slug}` },
    openGraph: { title, description },
  };
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) notFound();

  const fromPrice = routeFromPrice(route.distanceKm, route.fromPrice);
  const fares = fleetFaresForRoute(fromPrice);
  const tripKm = routeTripKm(route.distanceKm);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${route.from} to ${route.to} taxi`,
    provider: { "@type": "TaxiService", name: site.name, url: site.url },
    areaServed: [route.from, route.to],
    offers: {
      "@type": "Offer",
      price: fromPrice,
      priceCurrency: "INR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-ink-900 text-white">
        <div className="container-px py-12 lg:py-16">
          <nav className="text-xs text-gray-400">
            <Link href="/" className="hover:text-brand-400">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/routes" className="hover:text-brand-400">
              Routes
            </Link>{" "}
            / <span className="text-gray-300">{route.from} to {route.to}</span>
          </nav>
          <div className="mt-4 grid items-start gap-10 lg:grid-cols-[1fr_400px]">
            <div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                {route.from} to {route.to} Taxi
              </h1>
              <p className="mt-4 max-w-xl text-gray-300">{route.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  <MapPin className="mr-1 inline h-4 w-4 text-brand-400" />
                  {route.distanceKm} km
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  <Clock className="mr-1 inline h-4 w-4 text-brand-400" />~
                  {route.durationHrs} hrs
                </span>
                <span className="rounded-full bg-brand-500 px-4 py-2 text-sm font-bold text-ink-900">
                  From {inr(fromPrice)}
                </span>
              </div>
              <ul className="mt-6 grid max-w-md gap-2 sm:grid-cols-2">
                {route.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-brand-400" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-ink-900">
              <BookingForm defaultRoute={route.to} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold">
              Fares for {route.from} → {route.to}
            </h2>
            <p className="mt-3 text-ink-700">
              Indicative round-trip fares ({tripKm} km total). Sedan price is
              fixed; other cars scale by fleet per-km rate. One-way trips also
              available — get an exact quote on WhatsApp.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-ink-900/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-ink-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Car type</th>
                    <th className="px-4 py-3 font-semibold">Seats</th>
                    <th className="px-4 py-3 font-semibold">Approx. fare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-900/5">
                  {fares.map((car) => (
                    <tr key={car.slug}>
                      <td className="px-4 py-3 font-medium">{car.name}</td>
                      <td className="px-4 py-3">{car.seats}</td>
                      <td className="px-4 py-3 font-semibold">
                        {inr(car.fare)}
                        <span className="ml-1 text-xs font-normal text-ink-700">
                          ({inr(car.perKm)}/km)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">
              Why book with {site.name}?
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-ink-700">
              {[
                "Transparent fixed fares with no hidden charges",
                "Experienced highway drivers who know the route",
                "Clean, sanitised AC cars for a comfortable journey",
                "One-way and round-trip options, available 24/7",
                "Instant booking confirmation on call or WhatsApp",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/routes" className="btn-outline mt-6">
              See other routes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
