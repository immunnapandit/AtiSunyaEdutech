"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";

const INSTALLATION_PRICE = 100000;

function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.6, once: true });
  const prefersReducedMotion = useReducedMotion();
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || !isInView) {
      return;
    }

    let frameId = 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCurrentValue(Math.round(value * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, prefersReducedMotion, value]);

  const displayValue = prefersReducedMotion ? value : currentValue;

  return (
    <span ref={ref}>
      &#8377;{displayValue.toLocaleString("en-IN")}
    </span>
  );
}

export function OnPremisesInstallation() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/Onpremises.jpg"
        alt="Engineer inspecting an on-premises server rack for a Dynamics 365 Finance & Operations installation"
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[62%_center]"
      />

      <Container className="flex min-h-[420px] items-center py-16 sm:min-h-[480px] md:py-20 lg:min-h-[560px]">
        <Reveal className="max-w-md rounded-2xl bg-navy/70 p-7 backdrop-blur-md sm:p-9">
          <Eyebrow className="!text-white" lineClassName="!bg-white/60">
            On-Premises Deployment
          </Eyebrow>
          <h2 className="heading-section mt-4 text-white">
            D365 Finance &amp; Operations, Installed On-Premises
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/80">
            Full setup and configuration handled end-to-end by certified consultants.
          </p>
          <p className="mt-2 text-sm leading-6 text-white/80">
            Covers server provisioning, database configuration, and a secure, production-ready go-live.
          </p>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              Installation Charge
            </p>
            <span className="mt-2 block text-4xl font-semibold text-white sm:text-5xl">
              <AnimatedPrice value={INSTALLATION_PRICE} />
            </span>
          </div>

          <LinkButton
            href="/contact"
            className="mt-8 !bg-cyan hover:!bg-cyan-600"
            withArrow
          >
            Request Installation
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
