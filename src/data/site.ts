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
  /** Open Graph / social share image (1200×630). Replace file at this path. */
  ogImage: "/images/og.jpg",
  phone: "+91 88844 77116",
  phoneHref: "+918884477116",
  whatsapp: "918884477116",
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
    count: "1270",
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
