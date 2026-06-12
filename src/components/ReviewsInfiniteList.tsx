"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReviewCard } from "@/components/ReviewCard";
import { REVIEWS_PAGE_SIZE } from "@/lib/reviews/constants";
import type { PublicReview } from "@/lib/reviews/types";

type ReviewsPageResponse = {
  reviews: PublicReview[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
};

type ReviewsInfiniteListProps = {
  initialReviews: PublicReview[];
  total: number;
  includeSeeded?: boolean;
  onReviewClick: (review: PublicReview) => void;
  className?: string;
};

export function ReviewsInfiniteList({
  initialReviews,
  total,
  includeSeeded = false,
  onReviewClick,
  className = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: ReviewsInfiniteListProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [hasMore, setHasMore] = useState(initialReviews.length < total);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    setReviews(initialReviews);
    setHasMore(initialReviews.length < total);
  }, [initialReviews, total]);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const params = new URLSearchParams({
        offset: String(reviews.length),
        limit: String(REVIEWS_PAGE_SIZE),
      });
      if (includeSeeded) params.set("includeSeeded", "true");

      const res = await fetch(`/api/reviews?${params}`);
      if (!res.ok) return;

      const data = (await res.json()) as ReviewsPageResponse;
      setReviews((prev) => {
        const seen = new Set(prev.map((r) => r.id));
        const next = data.reviews.filter((r) => !seen.has(r.id));
        return [...prev, ...next];
      });
      setHasMore(data.hasMore);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasMore, includeSeeded, reviews.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <div>
      <div className={className}>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            name={review.name}
            location={review.location}
            rating={review.rating}
            text={review.text}
            compact
            onClick={() => onReviewClick(review)}
          />
        ))}
      </div>

      {hasMore && (
        <div
          ref={sentinelRef}
          className="mt-8 flex justify-center py-4 text-sm text-ink-700"
          aria-live="polite"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
              Loading more reviews…
            </span>
          ) : (
            <span className="sr-only">More reviews available</span>
          )}
        </div>
      )}
    </div>
  );
}
