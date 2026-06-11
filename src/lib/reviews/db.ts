import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { PublicReview, Review, ReviewStatus } from "@/lib/reviews/types";

type ReviewRow = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  status: ReviewStatus;
  created_at: string;
};

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  if (!adminClient) {
    adminClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return adminClient;
}

function toPublicReview(row: ReviewRow): PublicReview {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    rating: row.rating,
    text: row.text,
    created_at: row.created_at,
  };
}

export async function getApprovedReviews(limit = 50): Promise<PublicReview[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, location, rating, text, status, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data.map(toPublicReview);
}

export async function getPendingReviews(): Promise<Review[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, location, rating, text, status, created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data as Review[];
}

export async function insertReview(input: {
  name: string;
  location: string;
  rating: number;
  text: string;
  ipHash: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "Reviews are not configured yet" };
  }

  const { error } = await supabase.from("reviews").insert({
    name: input.name,
    location: input.location,
    rating: input.rating,
    text: input.text,
    status: "pending",
    ip_hash: input.ipHash,
  });

  if (error) return { ok: false, error: "Could not save review" };
  return { ok: true };
}

export async function updateReviewStatus(
  id: string,
  status: "approved" | "rejected"
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const { error } = await supabase
    .from("reviews")
    .update({ status })
    .eq("id", id)
    .eq("status", "pending");

  return !error;
}
