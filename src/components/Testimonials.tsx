import Link from "next/link";
import testimonials from "@/data/testimonials.json";
import { site } from "@/data/site";
import { getApprovedReviews } from "@/lib/reviews/db";
import { ReviewCard } from "@/components/ReviewCard";
import { ArrowRight } from "@/components/Icons";

export async function Testimonials() {
  const customerReviews = await getApprovedReviews(12);
  const seeded = testimonials.map((t, i) => ({
    id: `seed-${i}`,
    name: t.name,
    location: t.location,
    rating: t.rating,
    text: t.text,
  }));

  const displayed = [...customerReviews, ...seeded].slice(0, 8);

  return (
    <section className="section">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Loved by riders</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Rated {site.rating.value}/5 by {site.rating.count}+ customers
          </h2>
          <p className="mt-4 text-ink-700">
            Real feedback from riders across Hubli–Dharwad and outstation trips.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayed.map((t) => (
            <ReviewCard
              key={t.id}
              name={t.name}
              location={t.location}
              rating={t.rating}
              text={t.text}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
          >
            Leave your review
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
