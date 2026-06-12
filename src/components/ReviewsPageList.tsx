"use client";

import { useState } from "react";
import { ReviewDetailModal } from "@/components/ReviewDetailModal";
import { ReviewsInfiniteList } from "@/components/ReviewsInfiniteList";
import type { PublicReview } from "@/lib/reviews/types";

type ReviewsPageListProps = {
  initialReviews: PublicReview[];
  total: number;
};

export function ReviewsPageList({ initialReviews, total }: ReviewsPageListProps) {
  const [detailReview, setDetailReview] = useState<PublicReview | null>(null);

  return (
    <>
      <ReviewsInfiniteList
        initialReviews={initialReviews}
        total={total}
        onReviewClick={setDetailReview}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      />
      <ReviewDetailModal
        review={detailReview}
        onClose={() => setDetailReview(null)}
      />
    </>
  );
}
