"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <Reveal className="relative flex items-center justify-center">
            <div className="relative w-full max-w-[560px]">
              <div className="absolute -left-8 -top-10 z-10 h-[420px] w-[420px] overflow-hidden rounded-full border-8 border-white bg-gray-100 shadow-lg sm:-left-14 sm:-top-16 lg:h-[520px] lg:w-[520px]">
                <img
                  src="/images/about1"
                  alt="Corporate Microsoft training session"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="relative ml-auto z-20 h-[360px] w-[320px] overflow-hidden rounded-[28px] border-8 border-white bg-gray-100 shadow-xl sm:h-[420px] sm:w-[360px] lg:h-[480px] lg:w-[420px]">
                <img
                  src="/images/about2"
                  alt="Microsoft training instructor"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="absolute left-6 bottom-6 z-30 hidden min-w-[160px] rounded-xl bg-white p-3 shadow-md sm:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">🎓</span>
                  <div>
                    <p className="text-sm font-semibold">Microsoft</p>
                    <p className="text-xs text-slate-500">Training Advisor</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="pt-2" delay={0.08}>
            <p className="text-sm font-extrabold text-brand-600">ABOUT ATISUNYA EDUTECH</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#17162d] sm:text-4xl lg:text-5xl">
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
                  <Check className="text-brand h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Dynamics 365 Training</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-center gap-4">
                <div className="rounded-md border border-slate-100 bg-white p-3 shadow-sm">
                  <Check className="text-brand h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Azure Cloud Workshops</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-center gap-4">
                <div className="rounded-md border border-slate-100 bg-white p-3 shadow-sm">
                  <Check className="text-brand h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Power Platform Programs</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-center gap-4">
                <div className="rounded-md border border-slate-100 bg-white p-3 shadow-sm">
                  <Check className="text-brand h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Corporate Team Enablement</p>
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

