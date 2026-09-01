import { Hero } from "@/components/sections/hero";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { AboutSection } from "@/components/sections/about-us";
import { TrainingFormats } from "@/components/sections/training-formats";
import { OnPremisesInstallation } from "@/components/sections/onpremises-installation";
import { StrengthNumbers } from "@/components/sections/learning-flow";
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
      <TrainingFormats />
      <OnPremisesInstallation />
      <StrengthNumbers />
      <TrustedPartners />
      <TestimonialsSection />
      <LatestNews />
      <RequestQuote />
    </>
  );
}
