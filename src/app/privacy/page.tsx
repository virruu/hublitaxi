import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container-px max-w-3xl prose-sm">
        <h1 className="text-3xl font-black tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-ink-700">
          {site.name} respects your privacy. This page explains what information
          we collect and how we use it.
        </p>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-700">
          <p>
            <strong className="text-ink-900">Information we collect.</strong>{" "}
            When you book a ride we collect your name, phone number and trip
            details so we can confirm and provide the service.
          </p>
          <p>
            <strong className="text-ink-900">How we use it.</strong> We use your
            details only to arrange your taxi, contact you about your booking and
            improve our service. We never sell your data.
          </p>
          <p>
            <strong className="text-ink-900">Contact.</strong> For any privacy
            questions, email us at {site.email}.
          </p>
        </div>
      </div>
    </section>
  );
}
