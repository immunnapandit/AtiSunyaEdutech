"use client";

import { ListChecks, MapPin, Settings2, Users } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

const trainingFormats = [
  {
    icon: Users,
    title: "1-to-1 Training",
    description:
      "Dedicated one-on-one sessions paced to your schedule, role, and learning goals with a personal Microsoft trainer.",
  },
  {
    icon: Settings2,
    title: "Customized Training",
    description:
      "Curriculum tailored to your team's tools, workflows, and business use cases for training that fits how you actually work.",
  },
  {
    icon: MapPin,
    title: "Destination Training",
    description:
      "Immersive, on-site training delivered at a location of your choice for focused, distraction-free learning.",
  },
  {
    icon: ListChecks,
    title: "Pre-Requisite Session",
    description:
      "A foundational readiness session that builds the core concepts learners need before advanced training begins.",
  },
];

export function TrainingFormats() {
  return (
    <section className="relative overflow-hidden bg-mist-50 py-16 md:py-20">
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow align="center">Training Formats</Eyebrow>
          <h2 className="heading-section mt-4 text-navy">
            Flexible Training Built Around Your Team
          </h2>
          <p className="mt-4 text-base leading-7 text-navy-400 text-balance">
            Atisunya Edutech delivers Microsoft training in the format that
            fits your team best, from focused one-on-one coaching to fully
            customized, on-site programs.
          </p>
        </Reveal>

        <Stagger
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
          delay={0.1}
        >
          {trainingFormats.map((item) => (
            <StaggerItem
              key={item.title}
              className="card-hover group rounded-lg border border-navy-100 bg-white p-7 text-center shadow-soft"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-signal text-white transition-transform duration-300 group-hover:scale-105">
                <item.icon className="h-8 w-8" strokeWidth={1.8} />
              </span>
              <h3 className="mt-6 text-xl font-bold text-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-navy-400">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
