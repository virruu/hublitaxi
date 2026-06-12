import type { Metadata } from "next";
import { site, telLink, whatsappLink } from "@/data/site";
import { BookingForm } from "@/components/BookingForm";
import { Phone, WhatsApp, MapPin, Clock } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact & Book",
  description: `Contact ${site.name} to book a taxi in Hubli. Call or WhatsApp us 24/7 for local, airport and outstation cabs.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container-px grid items-start gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Contact & book your ride
          </h1>
          <p className="mt-4 text-ink-700">
            Reach us any time — we are available 24/7 for bookings, quotes and
            support.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={telLink}
              className="flex items-center gap-4 rounded-2xl border border-ink-900/10 p-5 transition hover:shadow-card"
              data-analytics="call"
              data-analytics-location="contact_page"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900 text-white">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-ink-700">Call us</span>
                <span className="block text-lg font-bold">{site.phone}</span>
              </span>
            </a>
            <a
              href={whatsappLink(`Hi ${site.name}, I'd like to book a taxi.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-ink-900/10 p-5 transition hover:shadow-card"
              data-analytics="whatsapp"
              data-analytics-location="contact_page"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366] text-white">
                <WhatsApp className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-ink-700">WhatsApp</span>
                <span className="block text-lg font-bold">{site.phone}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-ink-900/10 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="text-sm">
                {site.address.street}, {site.address.city},{" "}
                {site.address.region} {site.address.postalCode}
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-ink-900/10 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <Clock className="h-5 w-5" />
              </span>
              <span className="text-sm">Open 24 hours · 7 days a week</span>
            </div>
          </div>
        </div>

        <BookingForm />
      </div>
    </section>
  );
}
