import { Shield, Wallet, Clock, Star, Users, MapPin } from "@/components/Icons";

const items = [
  {
    icon: Wallet,
    title: "Transparent fixed fares",
    text: "Know your price upfront. No surge pricing, no hidden charges, no surprises at the end of the trip.",
  },
  {
    icon: Clock,
    title: "Always on time, 24/7",
    text: "Early-morning airport runs or midnight pickups — we are available round the clock and arrive on schedule.",
  },
  {
    icon: Shield,
    title: "Safe & verified drivers",
    text: "Police-verified, experienced drivers and sanitised, well-maintained cars for a safe journey every time.",
  },
  {
    icon: Star,
    title: "Top-rated service",
    text: "Thousands of happy riders rate us 4.9/5 for punctuality, cleanliness and courteous drivers.",
  },
  {
    icon: MapPin,
    title: "100+ routes covered",
    text: "From local Hubli–Dharwad rides to Goa, Bangalore, Hampi and beyond — we go where you need to go.",
  },
  {
    icon: Users,
    title: "Cars for every group",
    text: "Sedans, SUVs, Innova Crysta and Tempo Travellers for solo riders, families and large groups.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section bg-ink-900 text-white">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Why HubliTaxi</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            The most reliable way to travel
          </h2>
          <p className="mt-4 text-gray-300">
            We obsess over the details so your ride is comfortable, safe and
            stress-free.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-ink-900">
                <it.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
