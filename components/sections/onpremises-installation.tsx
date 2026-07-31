"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  useInView,
  useReducedMotion,
  motion,
} from "framer-motion";
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
const slides = [
  {
    eyebrow: "ON-PREMISES DEPLOYMENT",
    title: "D365 Finance & Operations, Installed On-Premises",
    description1:
      "Full setup and configuration handled end-to-end by certified consultants.",
    description2:
      "Covers server provisioning, database configuration, and a secure, production-ready go-live.",
    price: 100000,
    button: "Request Installation",
  },
  {
    eyebrow: "BUSINESS CENTRAL DEPLOYMENT",
    title: "Dynamics 365 Business Central Implementation",
    description1:
      "Complete Business Central implementation including setup, configuration, user roles, and data migration.",
    description2:
      "Delivered by certified consultants with deployment, customization, training, and production go-live support.",
    price: 80000,
    button: "Request Implementation",
  },
];

export function OnPremisesInstallation() {
  const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/Onpremises.jpg"
        alt="Engineer inspecting an on-premises server rack for a Dynamics 365 Finance & Operations installation"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[62%_center]"
      />
      

      <Container className="flex min-h-[420px] items-center py-16 sm:min-h-[480px] md:py-20 lg:min-h-[560px]">
    <div className="max-w-md min-h-[520px] rounded-2xl bg-navy/70 p-7 backdrop-blur-md sm:p-9">
  <motion.div
    key={currentSlide}
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Eyebrow className="!text-white" lineClassName="!bg-white/60">
      {slides[currentSlide].eyebrow}
    </Eyebrow>

    <h2 className="heading-section mt-4 text-white">
      {slides[currentSlide].title}
    </h2>

    <p className="mt-4 text-sm leading-6 text-white/80">
      {slides[currentSlide].description1}
    </p>

    <p className="mt-2 text-sm leading-6 text-white/80">
      {slides[currentSlide].description2}
    </p>

    <div className="mt-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
        Installation Charge
      </p>

      <span className="mt-2 block text-4xl font-semibold text-white sm:text-5xl">
        ₹{slides[currentSlide].price.toLocaleString("en-IN")}
      </span>
    </div>

    <LinkButton
      href="/contact"
      className="mt-8 !bg-cyan hover:!bg-cyan-600"
      withArrow
    >
      {slides[currentSlide].button}
    </LinkButton>
  </motion.div>
</div>
      </Container>
    </section>
  );
}
