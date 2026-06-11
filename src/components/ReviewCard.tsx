import { Star } from "@/components/Icons";

type ReviewCardProps = {
  name: string;
  location: string;
  rating: number;
  text: string;
};

export function ReviewCard({ name, location, rating, text }: ReviewCardProps) {
  return (
    <figure className="flex flex-col rounded-3xl border border-ink-900/10 bg-white p-6 shadow-sm">
      <div className="flex gap-0.5 text-brand-500">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
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
    </figure>
  );
}
