import { BookingForm } from "@/components/BookingForm";
import { site } from "@/data/site";
import { Star, Check } from "@/components/Icons";

const perks = ["24/7 availability", "Transparent fixed fares", "Verified drivers"];

type HeroProps = {
  ratingValue?: string;
  ratingCount?: number;
};

export function Hero({ ratingValue, ratingCount }: HeroProps) {
  const value = ratingValue ?? site.rating.value;
  const count = ratingCount ?? Number(site.rating.count);
  return (
    <section className="relative overflow-hidden bg-ink-900 text-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(245,180,0,0.35), transparent 40%), radial-gradient(circle at 80% 0%, rgba(245,180,0,0.18), transparent 35%)",
        }}
        aria-hidden
      />
      <div className="container-px relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-3">
  <span className="eyebrow">
    <Star className="h-3.5 w-3.5 text-brand-600" />
    Rated {value}/5 by {count} rider{count === 1 ? "" : "s"}
  </span>

  <span className="inline-flex items-center rounded-full bg-brand-500 px-4 py-2 text-sm font-bold text-ink-900 shadow-lg">
    🎉 ₹250 OFF + FREE Pickup
  </span>
</div>

<p className="mt-3 text-sm font-medium text-brand-300">
  On bookings above ₹2,000 • Limited-time offer
</p>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Hubli & Hubballi taxi service
            <span className="block text-brand-400">
Book your cab in under a minute.
</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-gray-300">
            Clean cars, professional drivers and honest fixed fares for local
            cabs, Hubballi Airport (HBX) transfers, railway pickups and
            outstation trips across Dharwad — 24/7.
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/20">
                  <Check className="h-3.5 w-3.5 text-brand-400" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
            {[
              ["50k+", "Rides completed"],
              ["100+", "Routes covered"],
              ["24/7", "Support"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <dt className="text-2xl font-black text-brand-400">{n}</dt>
                <dd className="mt-1 text-xs text-gray-400">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="book" className="animate-fade-up scroll-mt-24 text-ink-900">
          <div className="mb-3 text-center text-sm font-semibold text-white">
            Get a free quote in seconds
          </div>
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
