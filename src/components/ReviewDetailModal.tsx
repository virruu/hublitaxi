"use client";

import { useEffect, useRef } from "react";
import { ReviewStars } from "@/components/ReviewStars";
import { X } from "@/components/Icons";
import type { PublicReview } from "@/lib/reviews/types";

type ReviewDetailModalProps = {
  review: PublicReview | null;
  onClose: () => void;
};

export function ReviewDetailModal({ review, onClose }: ReviewDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (review) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [review]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  if (!review) return null;

  const dateLabel = review.created_at
    ? new Date(review.created_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[60] m-0 max-h-none max-w-none border-0 bg-transparent p-4 backdrop:bg-ink-900/60 open:flex open:items-center open:justify-center"
      onCancel={handleClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose();
      }}
    >
      <div
        role="document"
        className="relative w-full max-w-lg animate-fade-up rounded-3xl border border-ink-900/10 bg-white p-6 shadow-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 text-ink-700 hover:bg-gray-100"
          aria-label="Close review"
        >
          <X className="h-5 w-5" />
        </button>

        <ReviewStars rating={review.rating} className="h-5 w-5" />
        <blockquote className="mt-5 text-base leading-relaxed text-ink-700">
          “{review.text}”
        </blockquote>
        <div className="mt-6 flex items-center gap-3 border-t border-ink-900/10 pt-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
            {review.name.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-900">{review.name}</p>
            <p className="text-xs text-ink-700">{review.location}</p>
            {dateLabel && (
              <p className="mt-0.5 text-xs text-ink-700/80">{dateLabel}</p>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
