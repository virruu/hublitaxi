import { z } from "zod";
import { sanitizeReviewText, sanitizeShortText } from "@/lib/reviews/sanitize";
import type { ReviewSubmission } from "@/lib/reviews/types";

const reviewSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(80, "Location is too long"),
  rating: z.coerce.number().int().min(1).max(5),
  text: z
    .string()
    .min(20, "Please write at least 20 characters about your trip")
    .max(1000, "Review is too long (max 1000 characters)"),
  website: z.string().optional(),
  turnstileToken: z.string().min(1, "Please complete the security check"),
});

export function parseReviewSubmission(
  body: unknown
):
  | { success: true; data: ReviewSubmission }
  | { success: false; error: string } {
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid submission",
    };
  }

  const { name, location, rating, text, website, turnstileToken } = parsed.data;

  if (website?.trim()) {
    return { success: false, error: "Submission rejected" };
  }

  return {
    success: true,
    data: {
      name: sanitizeShortText(name),
      location: sanitizeShortText(location),
      rating,
      text: sanitizeReviewText(text),
      turnstileToken,
    },
  };
}
