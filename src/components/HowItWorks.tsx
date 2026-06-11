const steps = [
  {
    n: "01",
    title: "Tell us your trip",
    text: "Share your pickup, drop and time using the form, a quick call or WhatsApp.",
  },
  {
    n: "02",
    title: "Get an instant fare",
    text: "We confirm your car and a transparent fixed fare within minutes — no haggling.",
  },
  {
    n: "03",
    title: "Driver arrives on time",
    text: "Get driver details, track your ride and travel comfortably to your destination.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="section scroll-mt-20 bg-gray-50">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Booking takes less than a minute
          </h2>
        </div>

        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-3xl border border-ink-900/10 bg-white p-7"
            >
              <span className="text-4xl font-black text-brand-200">{s.n}</span>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-700">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
