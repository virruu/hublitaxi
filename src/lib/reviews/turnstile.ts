import { isTurnstileEnabled } from "@/lib/reviews/config";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<boolean> {
  if (!isTurnstileEnabled()) {
    return process.env.NODE_ENV !== "production";
  }

  const secret = process.env.TURNSTILE_SECRET_KEY!;
  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    }
  );

  if (!res.ok) return false;

  const data = (await res.json()) as TurnstileResponse;
  return data.success;
}
