import { NextResponse } from "next/server";
import { REVIEWS_PAGE_SIZE } from "@/lib/reviews/constants";
import {
  getCustomerReviewsPage,
  getHomeReviewsPage,
} from "@/lib/reviews/public";
import { insertReview } from "@/lib/reviews/store";
import { isTurnstileEnabled } from "@/lib/reviews/config";
import { parseReviewSubmission } from "@/lib/reviews/validate";
import { verifyTurnstileToken } from "@/lib/reviews/turnstile";
import { getClientIp, hashClientIp, isRateLimited } from "@/lib/reviews/rate-limit";

function parsePagination(url: URL) {
  const offset = Math.max(0, Number(url.searchParams.get("offset") ?? 0) || 0);
  const limit = Math.min(
    50,
    Math.max(1, Number(url.searchParams.get("limit") ?? REVIEWS_PAGE_SIZE) || REVIEWS_PAGE_SIZE)
  );
  const includeSeeded = url.searchParams.get("includeSeeded") === "true";
  return { offset, limit, includeSeeded };
}

export async function GET(request: Request) {
  const { offset, limit, includeSeeded } = parsePagination(new URL(request.url));
  const page = includeSeeded
    ? await getHomeReviewsPage(offset, limit)
    : await getCustomerReviewsPage(offset, limit);

  return NextResponse.json(page, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" && !isTurnstileEnabled()) {
    return NextResponse.json(
      { error: "Reviews are temporarily unavailable." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = parseReviewSubmission(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const clientIp = getClientIp(request);
  const ipHash = clientIp ? hashClientIp(clientIp) : null;

  if (await isRateLimited(ipHash)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again tomorrow." },
      { status: 429 }
    );
  }

  const captchaOk = await verifyTurnstileToken(
    parsed.data.turnstileToken,
    clientIp
  );
  if (!captchaOk) {
    return NextResponse.json(
      { error: "Security check failed. Please try again." },
      { status: 403 }
    );
  }

  const result = await insertReview({
    name: parsed.data.name,
    location: parsed.data.location,
    rating: parsed.data.rating,
    text: parsed.data.text,
    ipHash,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you! Your review was submitted and will appear after we verify it.",
  });
}
