import type { Metadata } from "next";
import Link from "next/link";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewsPageList } from "@/components/ReviewsPageList";
import { REVIEWS_PAGE_SIZE } from "@/lib/reviews/constants";
import { getCustomerReviewsPage } from "@/lib/reviews/public";
import { isAdminConfigured } from "@/lib/reviews/config";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: `Read and submit verified customer reviews for ${site.name}. Moderated for authenticity.`,
  alternates: { canonical: "/reviews" },
};

export const revalidate = 60;

export default async function ReviewsPage() {
  const { reviews, total } = await getCustomerReviewsPage(0, REVIEWS_PAGE_SIZE);
  const adminReady = isAdminConfigured();

  return (
    <>
      <section className="bg-ink-900 text-white">
        <div className="container-px py-12 lg:py-16">
          <nav className="text-xs text-gray-400">
            <Link href="/" className="hover:text-brand-400">
              Home
            </Link>{" "}
            / <span className="text-gray-300">Reviews</span>
          </nav>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Customer reviews
          </h1>
          <p className="mt-4 max-w-2xl text-gray-300">
            Share your experience with {site.name}. Every review is checked by
            our team before it appears on the site — no spam, no fake posts.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-extrabold">Leave a review</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-700">
              <li>✓ Moderated before publishing</li>
              <li>✓ Bot protection & rate limits</li>
              <li>✓ Plain text only — no links or HTML</li>
              <li>✓ We never publish your phone or email</li>
            </ul>
            {!adminReady && (
              <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Reviews can be submitted, but moderation is not configured yet.
                Set <code className="text-xs">ADMIN_REVIEW_PASSWORD</code> in
                Netlify env vars to enable the admin panel.
              </p>
            )}
          </div>
          <div>
            <ReviewForm />
          </div>
        </div>
      </section>

      {total > 0 && (
        <section className="section bg-gray-50">
          <div className="container-px">
            <h2 className="text-2xl font-extrabold">Verified rider reviews</h2>
            <p className="mt-2 text-sm text-ink-700">
              {total} verified review{total === 1 ? "" : "s"}. Scroll to load more.
            </p>
            <ReviewsPageList initialReviews={reviews} total={total} />
          </div>
        </section>
      )}
    </>
  );
}
