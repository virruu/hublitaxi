import type { Metadata } from "next";
import { AdminReviewsPanel } from "@/components/AdminReviewsPanel";

export const metadata: Metadata = {
  title: "Review moderation",
  robots: { index: false, follow: false },
};

export default function AdminReviewsPage() {
  return (
    <section className="section">
      <div className="container-px max-w-3xl">
        <h1 className="text-2xl font-black tracking-tight">Review moderation</h1>
        <p className="mt-2 text-sm text-ink-700">
          Approve genuine reviews before they appear on the website. Sign in with
          the password set as <code className="text-xs">ADMIN_REVIEW_PASSWORD</code>{" "}
          in your Netlify environment variables (no separate username).
        </p>
        <div className="mt-8">
          <AdminReviewsPanel />
        </div>
      </div>
    </section>
  );
}
