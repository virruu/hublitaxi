"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Check } from "@/components/Icons";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const turnstileEnabled = Boolean(siteKey);

  const field =
    "w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30";
  const label = "mb-1.5 block text-xs font-semibold text-ink-700";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          location,
          rating,
          text,
          website,
          turnstileToken,
        }),
      });

      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(
        data.message ??
          "Thank you! Your review will appear after we verify it."
      );
      setName("");
      setLocation("");
      setRating(5);
      setText("");
      setWebsite("");
      setTurnstileToken("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-center">
        <Check className="mx-auto h-10 w-10 text-green-600" />
        <p className="mt-4 text-sm font-medium text-green-900">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-3xl border border-ink-900/10 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="review-name">
            Your name
          </label>
          <input
            id="review-name"
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First name or full name"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
          />
        </div>
        <div>
          <label className={label} htmlFor="review-location">
            City / area
          </label>
          <input
            id="review-location"
            className={field}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Hubli"
            required
            minLength={2}
            maxLength={80}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="review-rating">
            Rating
          </label>
          <select
            id="review-rating"
            className={field}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="review-text">
            Your experience
          </label>
          <textarea
            id="review-text"
            className={`${field} min-h-[120px] resize-y`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell us about your trip — pickup, driver, car cleanliness, fare, etc."
            required
            minLength={20}
            maxLength={1000}
          />
          <p className="mt-1 text-xs text-ink-700">
            {text.length}/1000 characters (minimum 20)
          </p>
        </div>
      </div>

      {/* Honeypot — hidden from users, bots often fill it */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="review-website">Website</label>
        <input
          id="review-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {turnstileEnabled ? (
        <div className="mt-5">
          <Turnstile
            siteKey={siteKey!}
            onSuccess={setTurnstileToken}
            onExpire={() => setTurnstileToken("")}
            options={{ theme: "light", size: "normal" }}
          />
        </div>
      ) : (
        <p className="mt-5 text-xs text-ink-700">
          Security check is enabled in production after Turnstile is configured.
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        className="btn-primary mt-6 w-full"
        disabled={
          status === "loading" ||
          (turnstileEnabled && !turnstileToken) ||
          text.length < 20
        }
      >
        {status === "loading" ? "Submitting…" : "Submit review"}
      </button>

      <p className="mt-4 text-center text-xs text-ink-700">
        Reviews are moderated before publishing. We never show your phone number
        or email.
      </p>
    </form>
  );
}
