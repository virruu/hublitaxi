import testimonials from "@/data/testimonials.json";
import { site } from "@/data/site";
import { Star } from "@/components/Icons";

export function Testimonials() {
  return (
    <section className="section">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Loved by riders</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Rated {site.rating.value}/5 by {site.rating.count}+ customers
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-3xl border border-ink-900/10 bg-white p-6 shadow-sm"
            >
              <div className="flex gap-0.5 text-brand-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink-900">
                    {t.name}
                  </span>
                  <span className="block text-xs text-ink-700">
                    {t.location}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
