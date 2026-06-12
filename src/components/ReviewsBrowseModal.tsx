"use client";

import { useEffect, useRef } from "react";
import { ReviewsInfiniteList } from "@/components/ReviewsInfiniteList";
import { X } from "@/components/Icons";
import type { PublicReview } from "@/lib/reviews/types";

type ReviewsBrowseModalProps = {
  open: boolean;
  onClose: () => void;
  initialReviews: PublicReview[];
  total: number;
  averageRating: string;
  includeSeeded?: boolean;
  onReviewClick: (review: PublicReview) => void;
};

export function ReviewsBrowseModal({
  open,
  onClose,
  initialReviews,
  total,
  averageRating,
  includeSeeded = false,
  onReviewClick,
}: ReviewsBrowseModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-0 max-h-none max-w-none border-0 bg-transparent p-0 backdrop:bg-ink-900/60 open:block"
      onCancel={handleClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose();
      }}
    >
      <div
        role="document"
        className="mx-auto flex h-[min(90vh,900px)] w-full max-w-6xl flex-col rounded-t-3xl border border-ink-900/10 bg-white shadow-2xl sm:my-8 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink-900/10 px-5 py-5 sm:px-8">
          <div>
            <h2 className="text-xl font-extrabold text-ink-900 sm:text-2xl">
              All customer reviews
            </h2>
            <p className="mt-1 text-sm text-ink-700">
              Rated {averageRating}/5 · {total} review{total === 1 ? "" : "s"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-ink-700 hover:bg-gray-100"
            aria-label="Close reviews"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          <ReviewsInfiniteList
            initialReviews={initialReviews}
            total={total}
            includeSeeded={includeSeeded}
            onReviewClick={onReviewClick}
          />
        </div>
      </div>
    </dialog>
  );
}
