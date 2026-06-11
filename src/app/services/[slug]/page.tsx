import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import services from "@/data/services.json";
import { site } from "@/data/site";
import { BookingForm } from "@/components/BookingForm";
import { CtaBanner } from "@/components/CtaBanner";
import { serviceIcons, Check, ArrowRight } from "@/components/Icons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const title = `${service.title} in Hubli`;
  return {
    title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title, description: service.description },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const Icon = serviceIcons[service.icon] ?? serviceIcons.city;

  return (
    <>
      <section className="bg-ink-900 text-white">
        <div className="container-px py-12 lg:py-16">
          <nav className="text-xs text-gray-400">
            <Link href="/" className="hover:text-brand-400">
              Home
            </Link>{" "}
            / <span className="text-gray-300">{service.title}</span>
          </nav>
          <div className="mt-4 grid items-start gap-10 lg:grid-cols-[1fr_400px]">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-ink-900">
                <Icon className="h-7 w-7" />
              </span>
              <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                {service.title} in Hubli
              </h1>
              <p className="mt-4 max-w-xl text-gray-300">
                {service.description}
              </p>
              <ul className="mt-6 grid max-w-md gap-2 sm:grid-cols-2">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-brand-400" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-ink-900">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <h2 className="text-2xl font-extrabold">Other services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-ink-900/10 bg-white p-5 transition hover:border-brand-500/40 hover:shadow-card"
                >
                  <span>
                    <span className="block font-semibold">{s.title}</span>
                    <span className="mt-1 block text-sm text-ink-700">
                      {s.short}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 text-brand-600 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
          </div>
          <p className="mt-8 text-sm text-ink-700">
            Need something specific? Call {site.name} at{" "}
            <a href={`tel:${site.phoneHref}`} className="font-semibold text-brand-700">
              {site.phone}
            </a>{" "}
            — we are available 24/7.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
