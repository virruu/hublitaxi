import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { isAdminConfigured } from "@/lib/reviews/config";

const COOKIE_NAME = "hubli_review_admin";
const SESSION_HOURS = 8;

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_REVIEW_PASSWORD;
  if (!expected) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function createAdminSessionToken(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;

  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = String(expiresAt);
  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token || !isAdminConfigured()) return false;

  const secret = process.env.ADMIN_SESSION_SECRET!;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expected = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminRequest(request: Request): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export function adminSessionCookieOptions(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  };
}

export function clearAdminSessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 0,
  };
}
