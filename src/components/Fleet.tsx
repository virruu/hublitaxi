import Image from "next/image";
import fleet from "@/data/fleet.json";
import { inr } from "@/lib/format";
import { Users, Luggage, Snowflake } from "@/components/Icons";

export function Fleet() {
  return (
    <section id="fleet" className="section scroll-mt-20">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our fleet</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pick the right car for your trip
          </h2>
          <p className="mt-4 text-ink-700">
            Well-maintained, sanitised vehicles with air-conditioning and
            professional drivers.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((car) => (
            <div
              key={car.slug}
              className="group overflow-hidden rounded-3xl border border-ink-900/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                <Image
                  src={car.image}
                  alt={`${car.name} taxi`}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold">{car.name}</h3>
                  <span className="text-sm font-bold text-brand-700">
                    {inr(car.perKm)}
                    <span className="text-xs font-medium text-ink-700">/km</span>
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-700">{car.example}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-ink-700">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-4 w-4" /> {car.seats}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Luggage className="h-4 w-4" /> {car.luggage}
                  </span>
                  {car.ac && (
                    <span className="inline-flex items-center gap-1">
                      <Snowflake className="h-4 w-4" /> AC
                    </span>
                  )}
                </div>
                <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-xs font-medium text-brand-800">
                  Best for: {car.best}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
