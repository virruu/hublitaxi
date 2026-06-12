"use client";

import { useState } from "react";
import Link from "next/link";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewDetailModal } from "@/components/ReviewDetailModal";
import { ReviewsBrowseModal } from "@/components/ReviewsBrowseModal";
import { ArrowRight } from "@/components/Icons";
import type { HomeReviewStats } from "@/lib/reviews/home";
import type { PublicReview } from "@/lib/reviews/types";

type TestimonialsProps = {
  stats: HomeReviewStats;
};

export function Testimonials({ stats }: TestimonialsProps) {
  const { reviews, totalCount, averageRating } = stats;
  const [browseOpen, setBrowseOpen] = useState(false);
  const [detailReview, setDetailReview] = useState<PublicReview | null>(null);
  const showViewAll = totalCount > reviews.length;

  return (
    <section className="section">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Loved by riders</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Rated {averageRating}/5 by {totalCount} customer
            {totalCount === 1 ? "" : "s"}
          </h2>
          <p className="mt-4 text-ink-700">
            Real feedback from riders across Hubli–Dharwad and outstation trips.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reviews.map((t) => (
            <ReviewCard
              key={t.id}
              name={t.name}
              location={t.location}
              rating={t.rating}
              text={t.text}
              compact
              onClick={() => setDetailReview(t)}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {showViewAll && (
            <button
              type="button"
              className="btn-outline"
              onClick={() => setBrowseOpen(true)}
            >
              View all reviews
            </button>
          )}
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
          >
            Leave your review
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <ReviewsBrowseModal
        open={browseOpen}
        onClose={() => setBrowseOpen(false)}
        initialReviews={reviews}
        total={totalCount}
        averageRating={averageRating}
        includeSeeded
        onReviewClick={setDetailReview}
      />

      <ReviewDetailModal
        review={detailReview}
        onClose={() => setDetailReview(null)}
      />
    </section>
  );
}
