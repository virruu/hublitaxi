import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  adminSessionCookieOptions,
  clearAdminSessionCookieOptions,
  createAdminSessionToken,
  isAdminRequest,
  verifyAdminPassword,
} from "@/lib/reviews/admin-auth";
import { getPendingReviews } from "@/lib/reviews/store";
import { isAdminConfigured } from "@/lib/reviews/config";

export async function GET(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }

  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pending = await getPendingReviews();
  return NextResponse.json({ pending });
}

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Session error" }, { status: 500 });
  }

  const cookieStore = await cookies();
  cookieStore.set(adminSessionCookieOptions(token));

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set(clearAdminSessionCookieOptions());
  return NextResponse.json({ ok: true });
}
