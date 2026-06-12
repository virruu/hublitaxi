import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PopularRoutes } from "@/components/PopularRoutes";
import { HomeSeoHub } from "@/components/HomeSeoHub";
import { Fleet } from "@/components/Fleet";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { LocalBusinessJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { getHomeReviews } from "@/lib/reviews/home";
import { site } from "@/data/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    absolute:
      "Hubli Taxi Service | Outstation Cabs, Airport & Local Rides 24/7",
  },
  description:
    "Book taxis in Hubli & Hubballi — local city cabs, HBX airport pickup, UBL railway transfers, and outstation trips to Goa, Bangalore, Pune, Hampi, Hyderabad, Mysore & more. Fixed fares, 24/7.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hubli Taxi Service | Outstation Cabs & Airport Transfers",
    description:
      "Local, airport and outstation taxi service in Hubli–Dharwad. Transparent fares, verified drivers, instant WhatsApp booking.",
    url: site.url,
  },
};

export default async function HomePage() {
  const reviewStats = await getHomeReviews();

  return (
    <>
      <LocalBusinessJsonLd />
      <FaqJsonLd />
      <Hero
        ratingValue={reviewStats.averageRating}
        ratingCount={reviewStats.totalCount}
      />
      <Services />
      <PopularRoutes />
      <WhyChooseUs />
      <Fleet />
      <HowItWorks />
      <Testimonials stats={reviewStats} />
      <HomeSeoHub />
      <Faq />
      <CtaBanner />
    </>
  );
}
