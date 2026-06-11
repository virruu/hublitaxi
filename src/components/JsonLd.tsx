import { site } from "@/data/site";
import faq from "@/data/faq.json";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Local business structured data for SEO.
 *
 * Note: We intentionally omit aggregateRating / Review markup. Google does not
 * support review snippets on TaxiService, and self-serving ratings on your own
 * LocalBusiness page are ineligible — that caused the Search Console error.
 * Star ratings remain visible in the page UI (Hero, Testimonials).
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/TaxiService",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    image: `${site.url}${site.ogImage}`,
    url: site.url,
    telephone: site.phoneHref,
    email: site.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: [
      { "@type": "City", name: "Hubli" },
      { "@type": "City", name: "Dharwad" },
      { "@type": "City", name: "Hubballi" },
      { "@type": "State", name: "Karnataka" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };
  return <JsonLd data={data} />;
}

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <JsonLd data={data} />;
}
