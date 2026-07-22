"use client";

import { BookOpenCheck, Building2, ShieldCheck, Star } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

const outcomes = [
  {
    title: "Dynamics 365 implementation readiness",
    body: "Training focuses on business workflows, configuration confidence, and practical adoption steps for teams using Dynamics 365.",
    icon: Building2,
    tone: "bg-royal-50",
  },
  {
    title: "Azure and Power Platform enablement",
    body: "Learners work through Microsoft cloud, automation, app maker, analytics, and deployment topics with practical exercises.",
    icon: BookOpenCheck,
    tone: "bg-cyan-100/50",
  },
  {
    title: "Secure AI and compliance awareness",
    body: "Copilot, Azure AI, Microsoft Entra ID, and security topics are framed around governance, access, and responsible adoption.",
    icon: ShieldCheck,
    tone: "bg-signal-100/60",
  },
];

function RatingStars() {
  return (
    <div className="flex items-center gap-1 text-signal">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-5 w-5 fill-current" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow align="center">Training Outcomes</Eyebrow>
          <h2 className="heading-section mt-4 text-navy">
            Microsoft learning built for practical adoption
          </h2>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch" delay={0.1}>
          {outcomes.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem
                key={item.title}
                className="card-hover overflow-hidden rounded-lg bg-white shadow-lifted"
              >
                <div className={`flex items-center gap-4 ${item.tone} p-5`}>
                  <span className="flex h-16 w-16 items-center justify-center rounded-lg border-4 border-white bg-white text-brand">
                    <Icon className="h-8 w-8" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-navy-400">Atisunya Edutech</p>
                  </div>
                </div>
                <div className="p-6">
                  <RatingStars />
                  <p className="mt-5 text-base font-medium leading-7 text-navy-400">{item.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
