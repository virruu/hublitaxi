import Link from "next/link";
import services from "@/data/services.json";
import { serviceIcons, ArrowRight, Check } from "@/components/Icons";

export function Services() {
  return (
    <section id="services" className="section scroll-mt-20">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our services</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            One taxi service for every journey
          </h2>
          <p className="mt-4 text-ink-700">
            From a quick city ride to a multi-day outstation tour, we have the
            right car and driver for you.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon] ?? serviceIcons.city;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative flex flex-col rounded-3xl border border-ink-900/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-500 group-hover:text-ink-900">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-700">{s.short}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-sm text-ink-700"
                    >
                      <Check className="h-4 w-4 text-green-600" />
                      {h}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
