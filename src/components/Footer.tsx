import Link from "next/link";
import routes from "@/data/routes.json";
import services from "@/data/services.json";
import { site, telLink, whatsappLink } from "@/data/site";
import { Phone, WhatsApp, MapPin } from "@/components/Icons";

export function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-ink-900 text-gray-300">
      <div className="container-px grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-black text-ink-900">
              H
            </span>
            <span className="text-lg font-extrabold">
              Hubli<span className="text-brand-400">Taxi</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            {site.tagline}. Local, airport, railway and outstation cabs across
            Hubli–Dharwad, available 24/7.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={telLink}
              className="btn-primary !px-4 !py-2 text-xs"
              data-analytics="call"
              data-analytics-location="footer"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
            <a
              href={whatsappLink(`Hi ${site.name}, I'd like to book a taxi.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !px-4 !py-2 text-xs"
              data-analytics="whatsapp"
              data-analytics-location="footer"
            >
              <WhatsApp className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-gray-400 transition-colors hover:text-brand-400"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Popular routes
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {routes
              .filter((r) => r.popular)
              .slice(0, 8)
              .map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/routes/${r.slug}`}
                    className="text-gray-400 transition-colors hover:text-brand-400"
                  >
                    {r.from} to {r.to}
                  </Link>
                </li>
              ))}
            <li>
              <Link
                href="/routes"
                className="font-semibold text-brand-400 hover:text-brand-300"
              >
                All routes & travel guides →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>
                {site.address.street}, {site.address.city},{" "}
                {site.address.region} {site.address.postalCode}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-brand-400" />
              <a
                href={telLink}
                className="hover:text-brand-400"
                data-analytics="call"
                data-analytics-location="footer_contact"
              >
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-xs text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            <Link href="/privacy" className="hover:text-gray-300">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="hover:text-gray-300">
              Terms
            </Link>{" "}
            ·{" "}
            <Link href="/reviews" className="hover:text-gray-300">
              Reviews
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
