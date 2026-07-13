"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import { BookOpenCheck, ChevronRight, GraduationCap, MonitorPlay, ShieldCheck, Trophy, UserPlus } from "lucide-react";
import { Container } from "@/components/ui/primitives";

const numberCards = [
  { icon: GraduationCap, value: 1200, suffix: "+", label: "Professionals trained" },
  { icon: ShieldCheck, value: 320, suffix: "+", label: "Microsoft modules" },
  { icon: Trophy, value: 1340, suffix: "+", label: "Corporate batches" },
];

const highlightStat = {
  value: 2400,
  suffix: "+",
  label: "Corporate batches",
  compact: true,
};

const workSteps = [
  { icon: UserPlus, title: "Sign up", description: "Share your team role, Microsoft stack, and training goals." },
  { icon: ShieldCheck, title: "Choose service track", description: "Select Dynamics 365, Azure, Power Platform, Copilot, or security tracks." },
  { icon: BookOpenCheck, title: "Attend workshops", description: "Learn through instructor-led sessions, labs, demos, and business use cases." },
  { icon: MonitorPlay, title: "Enable your team", description: "Close the program with practical readiness, assessments, and adoption guidance." },
];

function SectionKicker({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-extrabold text-royal-700">
      <span>{children}</span>
      <span className="h-px w-10 bg-royal-700" />
    </div>
  );
}

function formatCount(value: number, options: { suffix?: string; compact?: boolean }) {
  if (options.compact) {
    const compactValue = value / 1000;
    const decimals = compactValue >= 1 ? 1 : 0;

    return `${compactValue.toLocaleString("en-IN", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    })}k${options.suffix ?? ""}`;
  }

  return `${Math.round(value).toLocaleString("en-IN", {
    useGrouping: false,
  })}${options.suffix ?? ""}`;
}

function CountUpNumber({
  value,
  suffix,
  compact,
  className,
}: {
  value: number;
  suffix?: string;
  compact?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.7 });
  const prefersReducedMotion = useReducedMotion();
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentValue(value);
      return;
    }

    if (!isInView) {
      setCurrentValue(0);
      return;
    }

    let frameId = 0;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCurrentValue(value * easedProgress);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, prefersReducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      {formatCount(currentValue, { suffix, compact })}
    </span>
  );
}

export function StrengthNumbers() {
  return (
    <section className="relative overflow-hidden bg-mist-100 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-[22%] top-8 h-[420px] w-[620px] rounded-[48%] bg-[radial-gradient(circle,#d9e2ed_2px,transparent_3px)] [background-size:16px_16px]" />
        <div className="absolute right-[12%] top-14 h-[320px] w-[420px] rounded-[45%] bg-[radial-gradient(circle,#d9e2ed_2px,transparent_3px)] [background-size:16px_16px]" />
      </div>

      <Container className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_390px] lg:items-center">
        <div>
          <SectionKicker>Impact</SectionKicker>
          <h2 className="mt-4 text-[2.1rem] font-extrabold leading-tight text-navy sm:text-[2.65rem] md:text-[3rem]">
            Microsoft Training Outcomes
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-navy-400">
            Atisunya Edutech helps teams adopt Microsoft services with structured corporate training, hands-on labs, and role-based enablement.
          </p>

          <div className="mt-9 inline-flex items-center gap-4 rounded-md bg-signal px-6 py-4 text-navy shadow-soft">
            <strong className="text-3xl font-extrabold sm:text-4xl">
              <CountUpNumber
                value={highlightStat.value}
                suffix={highlightStat.suffix}
                compact={highlightStat.compact}
              />
            </strong>
            <span className="max-w-[140px] text-base font-extrabold leading-tight">{highlightStat.label}</span>
          </div>
        </div>

        <div className="space-y-4">
          {numberCards.map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-soft">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-signal text-navy">
                <item.icon className="h-8 w-8" strokeWidth={1.8} />
              </span>
              <span>
                <strong className="block text-2xl font-extrabold text-navy">
                  <CountUpNumber value={item.value} suffix={item.suffix} />
                </strong>
                <span className="mt-0.5 block text-sm font-semibold text-navy-400">{item.label}</span>
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div>
            <SectionKicker>Training flow</SectionKicker>
            <h2 className="mt-4 text-[2.1rem] font-extrabold leading-tight text-navy sm:text-[2.65rem] md:text-[3rem]">
              How corporate training works
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-navy-400 lg:pt-2">
            We align training with your business roles, deliver practical Microsoft workshops, and support teams with real adoption use cases.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {workSteps.map((step, index) => (
            <article key={step.title} className="relative rounded-lg bg-mist-100 px-5 py-8 text-center shadow-soft">
              <span className="absolute left-1/2 top-7 flex h-9 w-9 translate-x-7 items-center justify-center rounded-full bg-navy text-sm font-extrabold text-white">
                {index + 1}
              </span>
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-lg bg-signal text-navy">
                <step.icon className="h-10 w-10" strokeWidth={1.8} />
              </span>
              <h3 className="mt-6 text-xl font-extrabold text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-navy-400">{step.description}</p>
              <Link href="/courses" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-navy transition-colors hover:text-royal-700">
                View Track
                <ChevronRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

