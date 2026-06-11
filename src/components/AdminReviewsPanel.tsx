"use client";

import { useCallback, useEffect, useState } from "react";
import type { Review } from "@/lib/reviews/types";

export function AdminReviewsPanel() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pending, setPending] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPending = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/reviews");
      if (res.status === 401) {
        setAuthed(false);
        setError("Session expired. Please sign in again.");
        return;
      }
      if (!res.ok) {
        setError("Could not load pending reviews.");
        return;
      }
      const data = (await res.json()) as { pending: Review[] };
      setPending(data.pending);
      setAuthed(true);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPending();
  }, [loadPending]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Invalid password.");
        return;
      }
      setPassword("");
      await loadPending();
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const moderate = async (id: string, status: "approved" | "rejected") => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        setError("Could not update review.");
        return;
      }
      await loadPending();
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/reviews", { method: "DELETE" });
    setAuthed(false);
    setPending([]);
  };

  if (!authed) {
    return (
      <form
        onSubmit={login}
        className="mx-auto max-w-sm rounded-3xl border border-ink-900/10 bg-white p-6 shadow-card"
      >
        <h2 className="text-lg font-bold">Admin sign in</h2>
        <p className="mt-2 text-sm text-ink-700">
          Approve or reject customer reviews before they go live.
        </p>
        <label className="mt-4 block text-xs font-semibold text-ink-700" htmlFor="admin-pass">
          Password
        </label>
        <input
          id="admin-pass"
          type="password"
          className="mt-1.5 w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        {error && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn-primary mt-4 w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">
          Pending reviews ({pending.length})
        </h2>
        <button type="button" className="btn-outline" onClick={logout}>
          Sign out
        </button>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {loading && pending.length === 0 ? (
        <p className="text-sm text-ink-700">Loading…</p>
      ) : pending.length === 0 ? (
        <p className="rounded-2xl border border-ink-900/10 bg-white p-6 text-sm text-ink-700">
          No reviews waiting for approval.
        </p>
      ) : (
        <ul className="space-y-4">
          {pending.map((review) => (
            <li
              key={review.id}
              className="rounded-2xl border border-ink-900/10 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink-900">
                    {review.name}{" "}
                    <span className="font-normal text-ink-700">
                      · {review.location}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-ink-700">
                    {review.rating}/5 ·{" "}
                    {new Date(review.created_at).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-xl bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                    disabled={loading}
                    onClick={() => moderate(review.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                    disabled={loading}
                    onClick={() => moderate(review.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                “{review.text}”
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
