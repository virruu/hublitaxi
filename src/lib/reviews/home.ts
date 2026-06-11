import testimonials from "@/data/testimonials.json";
import { site } from "@/data/site";
import { getApprovedReviews } from "@/lib/reviews/store";
import type { PublicReview } from "@/lib/reviews/types";

export type HomeReview = PublicReview;

export type HomeReviewStats = {
  reviews: HomeReview[];
  totalCount: number;
  averageRating: string;
};

export async function getHomeReviews(): Promise<HomeReviewStats> {
  const customerReviews = await getApprovedReviews(500);
  const seeded: HomeReview[] = testimonials.map((t, i) => ({
    id: `seed-${i}`,
    name: t.name,
    location: t.location,
    rating: t.rating,
    text: t.text,
    created_at: "",
  }));

  const reviews = [...customerReviews, ...seeded];

  if (reviews.length === 0) {
    return {
      reviews: [],
      totalCount: Number(site.rating.count),
      averageRating: site.rating.value,
    };
  }

  const totalCount = reviews.length;
  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return {
    reviews,
    totalCount,
    averageRating: average.toFixed(1),
  };
}
