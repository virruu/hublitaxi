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

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <FaqJsonLd />
      <Hero />
      <Services />
      <PopularRoutes />
      <WhyChooseUs />
      <Fleet />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </>
  );
}
