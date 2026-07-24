"use client";

import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Eyebrow } from "@/components/ui/primitives";

const aboutImage = "/images/Edutech-img.png";

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal className="relative">
            <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl bg-mist-100 shadow-lifted ring-1 ring-navy-100">
              <div className="relative aspect-[4/5]">
                <Image
                  src={aboutImage}
                  alt="Professionals working during an AtiSunya Edutech training session"
                  fill
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="pt-2" delay={0.08}>
            <Eyebrow>About AtiSunya Edutech</Eyebrow>
            <h2 className="heading-section mt-4 text-navy">
              Microsoft training built for real business teams.
            </h2>
            <p className="mt-6 text-base leading-7 text-navy-400">
              AtiSunya Edutech helps professionals and teams learn to use
              Microsoft tools with confidence. Our programs cover Dynamics
              365, Azure, Power Platform, Copilot, and AI, taught in a way
              that is easy to follow and apply at work.
            </p>

            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2" delay={0.12}>
              <StaggerItem className="flex items-center gap-4">
                <div className="rounded-md border border-slate-100 bg-white p-3 shadow-sm">
                  <Check className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Dynamics 365 Training</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-center gap-4">
                <div className="rounded-md border border-slate-100 bg-white p-3 shadow-sm">
                  <Check className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Azure Cloud Workshops</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-center gap-4">
                <div className="rounded-md border border-slate-100 bg-white p-3 shadow-sm">
                  <Check className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    Power Platform Programs
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-center gap-4">
                <div className="rounded-md border border-slate-100 bg-white p-3 shadow-sm">
                  <Check className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    Corporate Team Enablement
                  </p>
                </div>
              </StaggerItem>
            </Stagger>

            <div className="mt-8">
              <Link
                href="/courses"
                className="inline-flex h-[52px] items-center justify-center rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white hover:bg-brand-600"
              >
                View Training Programs
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}