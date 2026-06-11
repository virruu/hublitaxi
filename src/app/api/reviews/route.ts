import { NextResponse } from "next/server";
import { getApprovedReviews, insertReview } from "@/lib/reviews/db";
import { isReviewsEnabled, isTurnstileEnabled } from "@/lib/reviews/config";
import { parseReviewSubmission } from "@/lib/reviews/validate";
import { verifyTurnstileToken } from "@/lib/reviews/turnstile";
import { getClientIp, hashClientIp, isRateLimited } from "@/lib/reviews/rate-limit";

export async function GET() {
  if (!isReviewsEnabled()) {
    return NextResponse.json({ reviews: [] });
  }

  const reviews = await getApprovedReviews();
  return NextResponse.json(
    { reviews },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}

export async function POST(request: Request) {
  if (!isReviewsEnabled()) {
    return NextResponse.json(
      { error: "Reviews are not available yet. Please try again later." },
      { status: 503 }
    );
  }

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
