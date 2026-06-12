import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PopularRoutes } from "@/components/PopularRoutes";
import { Fleet } from "@/components/Fleet";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { LocalBusinessJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { getHomeReviews } from "@/lib/reviews/home";

export const revalidate = 60;

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
      <Faq />
      <CtaBanner />
    </>
  );
}
