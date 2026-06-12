/** GA4 Measurement ID (G-XXXXXXXXXX). Set in Netlify env vars. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function isAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtagEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || !window.gtag) {
    return;
  }
  window.gtag("event", eventName, params);
}

/** Manual page_view for App Router client navigations. */
export function trackPageView(url: string) {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || !window.gtag) {
    return;
  }
  window.gtag("config", GA_MEASUREMENT_ID!, { page_path: url });
}

/** GA4 recommended event — phone or WhatsApp contact click. */
export function trackContact(method: "Phone" | "WhatsApp", linkLocation: string) {
  gtagEvent("contact", {
    method,
    link_location: linkLocation,
  });
}

/** GA4 recommended event — booking form submitted (opens WhatsApp). */
export function trackBookingLead(params: {
  tripType: string;
  service: string;
  vehicle: string;
  hasPhone: boolean;
}) {
  gtagEvent("generate_lead", {
    lead_source: "booking_form_whatsapp",
    trip_type: params.tripType,
    service: params.service,
    vehicle: params.vehicle,
    has_phone: params.hasPhone,
  });
}

/** Custom event — customer review form submitted successfully. */
export function trackReviewSubmit(rating: number) {
  gtagEvent("submit_review", {
    form_name: "customer_review",
    rating,
  });
}
