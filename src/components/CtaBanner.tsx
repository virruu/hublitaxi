import { site, telLink, whatsappLink } from "@/data/site";
import { Phone, WhatsApp } from "@/components/Icons";

export function CtaBanner() {
  return (
    <section className="section">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-500 px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, #000 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight text-ink-900 sm:text-4xl">
              Ready to ride? Book your Hubli taxi now.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-900/80">
              Instant confirmation, fixed fares and a driver at your doorstep.
              Available 24/7.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={telLink}
                className="btn-dark w-full sm:w-auto"
                data-analytics="call"
                data-analytics-location="cta_banner"
              >
                <Phone className="h-4 w-4" />
                Call {site.phone}
              </a>
              <a
                href={whatsappLink(`Hi ${site.name}, I'd like to book a taxi.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
                data-analytics="whatsapp"
                data-analytics-location="cta_banner"
              >
                <WhatsApp className="h-5 w-5" />
                Book on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
