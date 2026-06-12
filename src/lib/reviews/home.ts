import { site } from "@/data/site";
import { HOME_PREVIEW_COUNT } from "@/lib/reviews/constants";
import { getHomeReviewsPage, getSeededReviews } from "@/lib/reviews/public";
import { getApprovedReviewRatings } from "@/lib/reviews/store";
import type { PublicReview } from "@/lib/reviews/types";

export type HomeReview = PublicReview;

export type HomeReviewStats = {
  reviews: HomeReview[];
  totalCount: number;
  averageRating: string;
};

export async function getHomeReviews(): Promise<HomeReviewStats> {
  const seeded = getSeededReviews();
  const customerRatings = await getApprovedReviewRatings();
  const allRatings = [...customerRatings, ...seeded.map((s) => s.rating)];

  if (allRatings.length === 0) {
    return {
      reviews: [],
      totalCount: Number(site.rating.count),
      averageRating: site.rating.value,
    };
  }

  const { reviews } = await getHomeReviewsPage(0, HOME_PREVIEW_COUNT);
  const totalCount = allRatings.length;
  const average =
    allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length;

  return {
    reviews,
    totalCount,
    averageRating: average.toFixed(1),
  };
}
