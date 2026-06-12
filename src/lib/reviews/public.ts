import "server-only";

import testimonials from "@/data/testimonials.json";
import { getApprovedReviewRatings, getApprovedReviewsPage } from "@/lib/reviews/store";
import type { PublicReview } from "@/lib/reviews/types";

export function getSeededReviews(): PublicReview[] {
  return testimonials.map((t, i) => ({
    id: `seed-${i}`,
    name: t.name,
    location: t.location,
    rating: t.rating,
    text: t.text,
    created_at: "",
  }));
}

export type ReviewsPageResult = {
  reviews: PublicReview[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
};

export async function getCustomerReviewsPage(
  offset: number,
  limit: number
): Promise<ReviewsPageResult> {
  const { reviews, total } = await getApprovedReviewsPage(offset, limit);
  return {
    reviews,
    total,
    offset,
    limit,
    hasMore: offset + reviews.length < total,
  };
}

/** Customer reviews first (newest), then seeded testimonials — for home browse. */
export async function getHomeReviewsPage(
  offset: number,
  limit: number
): Promise<ReviewsPageResult> {
  const seeded = getSeededReviews();
  const customerTotal = (await getApprovedReviewRatings()).length;
  const total = customerTotal + seeded.length;
  const result: PublicReview[] = [];

  if (offset < customerTotal) {
    const takeFromCustomer = Math.min(limit, customerTotal - offset);
    const { reviews } = await getApprovedReviewsPage(offset, takeFromCustomer);
    result.push(...reviews);
  }

  const filled = result.length;
  if (filled < limit) {
    const seededOffset = Math.max(0, offset - customerTotal);
    const takeFromSeeded = Math.min(limit - filled, seeded.length - seededOffset);
    result.push(...seeded.slice(seededOffset, seededOffset + takeFromSeeded));
  }

  return {
    reviews: result,
    total,
    offset,
    limit,
    hasMore: offset + result.length < total,
  };
}
