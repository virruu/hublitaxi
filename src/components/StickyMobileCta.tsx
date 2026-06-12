import { site, telLink, whatsappLink } from "@/data/site";
import { Phone, WhatsApp } from "@/components/Icons";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-px border-t border-ink-900/10 bg-ink-900/10 lg:hidden">
      <a
        href={telLink}
        className="flex items-center justify-center gap-2 bg-ink-900 py-3.5 text-sm font-semibold text-white"
        data-analytics="call"
        data-analytics-location="sticky_mobile"
      >
        <Phone className="h-4 w-4" />
        Call now
      </a>
      <a
        href={whatsappLink(
          `Hi ${site.name}, I'd like to book a taxi.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-white"
        data-analytics="whatsapp"
        data-analytics-location="sticky_mobile"
      >
        <WhatsApp className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
}
