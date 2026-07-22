import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { faqs } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about courses, certifications, and billing.",
};

export default function FaqPage() {
  return (
    <div className="pt-32 pb-24">
      <Container className="max-w-3xl">
        <SectionHeading
          as="h1"
          align="center"
          className="mx-auto"
          eyebrow="Help"
          title="Frequently Asked Questions"
          description="Answers to common questions about courses, certifications, and billing."
        />

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border border-navy-100 bg-white p-6 shadow-soft [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-navy">
                {faq.question}
                <span className="shrink-0 text-xl text-brand transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-navy-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </div>
  );
}
