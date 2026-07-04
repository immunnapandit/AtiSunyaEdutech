import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Categories } from "@/components/sections/categories";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { WhyChoose } from "@/components/sections/why-choose";
import { LiveTraining } from "@/components/sections/live-training";
import { Stats } from "@/components/sections/stats";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { InstructorsPreview } from "@/components/sections/instructors-preview";
import { FaqSection } from "@/components/sections/faq-section";
import { NewsletterCta } from "@/components/sections/newsletter-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Categories />
      <FeaturedCourses />
      <WhyChoose />
      <LiveTraining />
      <Stats />
      <TestimonialsSection />
      <InstructorsPreview />
      <FaqSection />
      <NewsletterCta />
    </>
  );
}
