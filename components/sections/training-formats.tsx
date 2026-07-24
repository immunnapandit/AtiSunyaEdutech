"use client";

import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

const trainingFormats = [
  {
    image: "/images/OneToOneTraining.png",
    title: "1-to-1 Training",
    description:
      "One-on-one sessions with a personal Microsoft trainer, planned around your schedule and goals.",
  },
  {
    image: "/images/CustomizeTraining.png",
    title: "Customized Training",
    description:
      "Training built around your team's tools and daily work, so it fits how you actually do your job.",
  },
  {
    image: "/images/DestinationTraining.png",
    title: "Destination Training",
    description:
      "On-site training at a place of your choice, away from daily distractions.",
  },
  {
    image: "/images/Prerequisite.png",
    title: "Pre-Requisite Session",
    description:
      "A short session that teaches the basics you need before the main training begins.",
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
            AtiSunya Edutech offers Microsoft training in the format that
            works best for you, from one-on-one coaching to fully
            customized, on-site sessions.
          </p>
        </Reveal>

        <Stagger
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
          delay={0.1}
        >
          {trainingFormats.map((item) => (
            <StaggerItem
              key={item.title}
              className="card-hover group overflow-hidden rounded-lg border border-navy-100 bg-white shadow-soft"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-navy-400">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
