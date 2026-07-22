import { Hero } from "@/components/sections/hero";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { AboutSection } from "@/components/sections/about-us";
import { StrengthNumbers, HowItWorks } from "@/components/sections/learning-flow";
import { TrustedPartners } from "@/components/sections/trusted-partners";
import { RequestQuote } from "@/components/sections/request-quote";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { LatestNews } from "@/components/sections/latest-news";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedCourses />
      <StrengthNumbers />
      <TrustedPartners />
      <HowItWorks />
      <TestimonialsSection />
      <LatestNews />
      <RequestQuote />
    </>
  );
}
