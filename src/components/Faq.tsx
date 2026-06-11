import faq from "@/data/faq.json";

export function Faq() {
  return (
    <section id="faq" className="section scroll-mt-20 bg-gray-50">
      <div className="container-px">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="max-w-md">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Questions, answered
            </h2>
            <p className="mt-4 text-ink-700">
              Everything you need to know before booking your ride. Still unsure?
              Just call or WhatsApp us — we are happy to help 24/7.
            </p>
          </div>

          <div className="divide-y divide-ink-900/10 overflow-hidden rounded-3xl border border-ink-900/10 bg-white">
            {faq.map((item, i) => (
              <details key={i} className="group p-5" {...(i === 0 ? { open: true } : {})}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink-900">
                  {item.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
