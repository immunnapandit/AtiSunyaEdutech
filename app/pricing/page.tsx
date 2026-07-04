import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";
import { FaqSection } from "@/components/sections/faq-section";
import { cn } from "@/lib/utils";
import { PricingPlan } from "@/types";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for individual learners and teams.",
};

const plans: PricingPlan[] = [
  {
    name: "Self-Paced",
    price: 39,
    billingCycle: "month",
    description: "For learners who want full flexibility.",
    features: [
      "Access to 60+ self-paced courses",
      "Certificate on completion",
      "Community forum access",
      "Course update access",
    ],
    cta: "Start learning",
  },
  {
    name: "Live Cohort",
    price: 89,
    billingCycle: "month",
    description: "For learners who want structure and accountability.",
    features: [
      "Everything in Self-Paced",
      "Weekly live instructor sessions",
      "Capstone project review",
      "Private cohort community",
      "Priority instructor feedback",
    ],
    highlighted: true,
    cta: "Join a cohort",
  },
  {
    name: "Corporate",
    price: 0,
    billingCycle: "month",
    description: "For teams of 5 or more. Custom pricing.",
    features: [
      "Everything in Live Cohort",
      "Team progress dashboard",
      "Custom learning paths",
      "Dedicated account manager",
      "Centralized billing",
    ],
    cta: "Talk to sales",
  },
];

export default function PricingPage() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Pick the pace that fits your life"
          description="Every plan includes real projects, verifiable certificates, and a 14-day money-back guarantee."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-2xl border p-8",
                plan.highlighted
                  ? "border-royal bg-navy-gradient text-white shadow-lifted lg:-translate-y-4"
                  : "border-navy-100 bg-white"
              )}
            >
              <h3 className={cn("text-base font-bold", plan.highlighted ? "text-white" : "text-navy")}>
                {plan.name}
              </h3>
              <p className={cn("mt-1 text-sm", plan.highlighted ? "text-white/60" : "text-navy-400")}>
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                {plan.price > 0 ? (
                  <>
                    <span className="text-4xl font-extrabold">${plan.price}</span>
                    <span className={cn("text-sm", plan.highlighted ? "text-white/50" : "text-navy-400")}>
                      /{plan.billingCycle}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-extrabold">Custom</span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plan.highlighted ? "text-cyan-400" : "text-cyan-600"
                      )}
                    />
                    <span className={plan.highlighted ? "text-white/80" : "text-navy-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <LinkButton
                href={plan.name === "Corporate" ? "/contact" : "/signup"}
                variant={plan.highlighted ? "secondary" : "outline"}
                className="mt-8 w-full justify-center"
              >
                {plan.cta}
              </LinkButton>
            </div>
          ))}
        </div>
      </Container>

      <div className="mt-12">
        <FaqSection />
      </div>
    </div>
  );
}
