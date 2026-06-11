import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for ${site.name}.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container-px max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight">
          Terms &amp; Conditions
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-700">
          <p>
            By booking with {site.name} you agree to the following terms. Fares
            quoted are estimates and may vary with route changes, waiting time,
            tolls and parking.
          </p>
          <p>
            <strong className="text-ink-900">Bookings.</strong> Bookings are
            confirmed via call or WhatsApp. Please provide accurate pickup
            details and be ready at the scheduled time.
          </p>
          <p>
            <strong className="text-ink-900">Cancellations.</strong> Free
            cancellation is available up to a reasonable time before the trip.
            Repeated no-shows may be declined service.
          </p>
          <p>
            <strong className="text-ink-900">Liability.</strong> While we take
            every care to provide safe and timely service, {site.name} is not
            liable for delays caused by traffic, weather or events beyond our
            control.
          </p>
        </div>
      </div>
    </section>
  );
}
