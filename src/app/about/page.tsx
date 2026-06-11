import type { Metadata } from "next";
import { site } from "@/data/site";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name}, Hubli's trusted local and outstation taxi service with professional drivers and transparent fares.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink-900 text-white">
        <div className="container-px py-12 lg:py-16">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            About {site.name}
          </h1>
          <p className="mt-4 max-w-2xl text-gray-300">
            We are a Hubli-based taxi service on a mission to make travel across
            Hubli–Dharwad and beyond safe, comfortable and affordable. From quick
            city rides to long outstation trips, thousands of riders trust us for
            punctual pickups, clean cars and honest, fixed fares.
          </p>
        </div>
      </section>
      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
