import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { PublicReview, Review } from "@/lib/reviews/types";

const BLOB_STORE = "hubli-reviews";
const BLOB_KEY = "all-reviews";
const FILE_PATH = path.join(process.cwd(), ".data", "reviews.json");

type ReviewRecord = Review & { ip_hash?: string | null };
type ReviewData = { reviews: ReviewRecord[] };

function isNetlifyRuntime() {
  return process.env.NETLIFY === "true";
}

function toPublicReview(row: ReviewRecord): PublicReview {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    rating: row.rating,
    text: row.text,
    created_at: row.created_at,
  };
}

async function readFileStore(): Promise<ReviewData> {
  try {
    const raw = await readFile(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as ReviewData;
    return Array.isArray(parsed.reviews) ? parsed : { reviews: [] };
  } catch {
    return { reviews: [] };
  }
}

async function writeFileStore(data: ReviewData): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf8");
}

async function readBlobStore(): Promise<ReviewData> {
  const { getStore } = await import("@netlify/blobs");
  const store = getStore(BLOB_STORE);
  const data = await store.get(BLOB_KEY, { type: "json" });
  if (data && typeof data === "object" && "reviews" in data) {
    return data as ReviewData;
  }
  return { reviews: [] };
}

async function writeBlobStore(data: ReviewData): Promise<void> {
  const { getStore } = await import("@netlify/blobs");
  const store = getStore(BLOB_STORE);
  await store.setJSON(BLOB_KEY, data);
}

async function readStore(): Promise<ReviewData> {
  if (isNetlifyRuntime()) {
    return readBlobStore();
  }

  try {
    return await readBlobStore();
  } catch {
    return readFileStore();
  }
}

async function writeStore(data: ReviewData): Promise<void> {
  if (isNetlifyRuntime()) {
    await writeBlobStore(data);
    return;
  }

  try {
    await writeBlobStore(data);
  } catch {
    await writeFileStore(data);
  }
}

export async function getApprovedReviews(limit = 500): Promise<PublicReview[]> {
  const { reviews } = await readStore();
  return reviews
    .filter((r) => r.status === "approved")
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, limit)
    .map(toPublicReview);
}

export async function getPendingReviews(): Promise<Review[]> {
  const { reviews } = await readStore();
  return reviews
    .filter((r) => r.status === "pending")
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    .map(({ ip_hash: _, ...review }) => review);
}

export async function insertReview(input: {
  name: string;
  location: string;
  rating: number;
  text: string;
  ipHash: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const data = await readStore();
    data.reviews.push({
      id: randomUUID(),
      name: input.name,
      location: input.location,
      rating: input.rating,
      text: input.text,
      status: "pending",
      ip_hash: input.ipHash,
      created_at: new Date().toISOString(),
    });
    await writeStore(data);
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not save review" };
  }
}

export async function updateReviewStatus(
  id: string,
  status: "approved" | "rejected"
): Promise<boolean> {
  try {
    const data = await readStore();
    const review = data.reviews.find((r) => r.id === id && r.status === "pending");
    if (!review) return false;
    review.status = status;
    await writeStore(data);
    return true;
  } catch {
    return false;
  }
}

export async function countRecentSubmissionsByIp(
  ipHash: string,
  sinceMs: number
): Promise<number> {
  const { reviews } = await readStore();
  return reviews.filter(
    (r) =>
      r.ip_hash === ipHash &&
      new Date(r.created_at).getTime() > sinceMs
  ).length;
}
