"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/primitives";

const stats = [
  { value: 48000, suffix: "+", label: "Learners trained" },
  { value: 96, suffix: "%", label: "Course completion" },
  { value: 140, suffix: "+", label: "Hiring partners" },
  { value: 4.8, suffix: "/5", decimals: 1, label: "Learner rating" },
];

type Stat = (typeof stats)[number];

function formatStatValue(value: number, stat: Stat) {
  const formatted = value.toLocaleString("en-IN", {
    maximumFractionDigits: stat.decimals ?? 0,
    minimumFractionDigits: stat.decimals ?? 0,
  });

  return `${formatted}${stat.suffix}`;
}

function AnimatedStat({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.45 });
  const prefersReducedMotion = useReducedMotion();
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || !isInView) {
      return;
    }

    let frameId = 0;
    const duration = 1300;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCurrentValue(stat.value * easedProgress);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, prefersReducedMotion, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-2xl border border-navy-100 bg-white px-5 py-7 text-center shadow-soft"
    >
      <p className="text-display-sm font-semibold leading-none text-navy md:text-display-md">
        {formatStatValue(prefersReducedMotion ? stat.value : currentValue, stat)}
      </p>
      <p className="mt-3 text-sm font-medium text-navy-400">{stat.label}</p>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="border-y border-navy-100 bg-[#f8faff] py-16 sm:py-20">
      <Container className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <AnimatedStat key={stat.label} stat={stat} index={i} />
        ))}
      </Container>
    </section>
  );
}
