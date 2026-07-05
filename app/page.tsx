import { Hero } from "@/components/sections/hero";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { StrengthNumbers, HowItWorks } from "@/components/sections/learning-flow";
import { LayoutToolkit } from "@/components/sections/layout-toolkit";
import { RequestQuote } from "@/components/sections/request-quote";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { LatestNews } from "@/components/sections/latest-news";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <StrengthNumbers />
      <HowItWorks />
      <LayoutToolkit />
      <TestimonialsSection />
      <LatestNews />
      <RequestQuote />
    </>
  );
}
