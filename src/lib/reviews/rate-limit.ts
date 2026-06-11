import { createHash } from "crypto";
import { getSupabaseAdmin } from "@/lib/reviews/db";

const MAX_SUBMISSIONS_PER_DAY = 3;

export function hashClientIp(ip: string): string | null {
  const salt = process.env.IP_HASH_SALT;
  if (!salt) return null;
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}

export async function isRateLimited(ipHash: string | null): Promise<boolean> {
  if (!ipHash) return false;

  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count, error } = await supabase
    .from("reviews")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (error) return false;
  return (count ?? 0) >= MAX_SUBMISSIONS_PER_DAY;
}
