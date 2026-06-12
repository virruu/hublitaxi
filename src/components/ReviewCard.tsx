import { ReviewStars } from "@/components/ReviewStars";

type ReviewCardProps = {
  name: string;
  location: string;
  rating: number;
  text: string;
  onClick?: () => void;
  compact?: boolean;
};

export function ReviewCard({
  name,
  location,
  rating,
  text,
  onClick,
  compact = false,
}: ReviewCardProps) {
  const className =
    "flex w-full flex-col rounded-3xl border border-ink-900/10 bg-white p-6 text-left shadow-sm transition hover:border-brand-500/30 hover:shadow-md";

  const content = (
    <>
      <ReviewStars rating={rating} />
      <blockquote
        className={`mt-4 flex-1 text-sm leading-relaxed text-ink-700 ${
          compact ? "line-clamp-4" : ""
        }`}
      >
        “{text}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
          {name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink-900">{name}</span>
          <span className="block text-xs text-ink-700">{location}</span>
        </span>
      </figcaption>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return <figure className={className}>{content}</figure>;
}
