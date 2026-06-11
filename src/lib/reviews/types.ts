export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  status: ReviewStatus;
  created_at: string;
};

export type PublicReview = Pick<
  Review,
  "id" | "name" | "location" | "rating" | "text" | "created_at"
>;

export type ReviewSubmission = {
  name: string;
  location: string;
  rating: number;
  text: string;
  website?: string;
  turnstileToken: string;
};
