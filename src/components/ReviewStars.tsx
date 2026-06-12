import { Star } from "@/components/Icons";

type ReviewStarsProps = {
  rating: number;
  className?: string;
};

export function ReviewStars({ rating, className = "h-4 w-4" }: ReviewStarsProps) {
  return (
    <div className="flex gap-0.5 text-brand-500" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className={className} />
      ))}
    </div>
  );
}
