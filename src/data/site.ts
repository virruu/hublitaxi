/**
 * Central business configuration.
 *
 * IMPORTANT: Update `phone` and `whatsapp` with the real business numbers.
 * They power the click-to-call buttons, WhatsApp booking deep links and the
 * LocalBusiness / TaxiService structured data used for SEO.
 */
export const site = {
  name: "Hubli Taxi",
  legalName: "Hubli Taxi Service",
  domain: "hublitaxi.com",
  url: "https://hublitaxi.com",
  tagline: "Hubli's Trusted Taxi & Outstation Cab Service",
  description:
    "Book reliable local, airport and outstation taxis in Hubli–Dharwad. Clean cars, professional drivers, transparent fares and 24/7 availability. Instant booking on call or WhatsApp.",
  // TODO: replace with the real numbers (E.164 for whatsapp, no spaces).
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  whatsapp: "919876543210",
  email: "bookings@hublitaxi.com",
  address: {
    street: "Station Road",
    city: "Hubballi (Hubli)",
    region: "Karnataka",
    postalCode: "580020",
    country: "IN",
  },
  geo: {
    lat: 15.3647,
    lng: 75.124,
  },
  hours: "24/7",
  rating: {
    value: "4.9",
    count: "1280",
  },
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
  },
};

export const whatsappLink = (message?: string) =>
  `https://wa.me/${site.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const telLink = `tel:${site.phoneHref}`;
