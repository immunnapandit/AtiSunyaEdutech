"use client";

import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

const aboutImage = "/images/Edutech-img.jpg";

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal className="relative">
            <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl bg-mist-100 shadow-lifted ring-1 ring-navy-100">
              <div className="aspect-[4/5]">
                <img
                  src={aboutImage}
                  alt="Professionals working during an Atisunya Edutech training session"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="pt-2" delay={0.08}>
            <p className="text-sm font-extrabold text-brand-600">
              ABOUT ATISUNYA EDUTECH
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#17162d] sm:text-4xl lg:text-5xl">
              Microsoft training built for real business teams.
            </h2>
            <p className="mt-6 text-base leading-7 text-[#5f6278]">
              Atisunya Edutech helps professionals and organizations adopt the
              Microsoft ecosystem with confidence. Our programs cover Dynamics
              365, Azure, Power Platform, Copilot, AI services, data platforms,
              integrations, and role-based corporate enablement.
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
                className="inline-flex h-[52px] items-center justify-center rounded-full bg-brand px-8 py-4 text-sm font-extrabold text-white hover:bg-brand-600"
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
