import type { Metadata } from "next";
import { FaqSection } from "@/components/sections/faq-section";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about courses, certifications, and billing.",
};

export default function FaqPage() {
  return (
    <div className="pt-20">
      <FaqSection />
    </div>
  );
}
