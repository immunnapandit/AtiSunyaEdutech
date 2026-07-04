"use client";

import { motion } from "framer-motion";
import { Users2, BadgeCheck, Briefcase, Infinity as InfinityIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";

const points = [
  {
    icon: Users2,
    title: "Instructors who still ship",
    description:
      "Every instructor works or has recently worked at the companies whose problems they teach you to solve.",
  },
  {
    icon: Briefcase,
    title: "Projects, not just quizzes",
    description:
      "Capstones are reviewed line-by-line and go straight into your portfolio — several are deployed to real users.",
  },
  {
    icon: BadgeCheck,
    title: "Certifications that hold weight",
    description:
      "140+ hiring partners recognize Atisunya credentials during technical screening, not just HR review.",
  },
  {
    icon: InfinityIcon,
    title: "Lifetime access, real updates",
    description:
      "Course content is revised as tools and frameworks change — you keep access to every update, forever.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-24 md:py-32">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>Why Atisunya</Eyebrow>
          <h2 className="mt-3 text-display-md md:text-display-lg font-bold text-navy text-balance">
            Built for people who need this to actually work.
          </h2>
          <p className="mt-5 max-w-md text-lg text-navy-400 text-balance">
            Most platforms optimize for course completions. We optimize for
            what happens six months after — a new title, a shipped project, a
            confident interview.
          </p>
          <div className="mt-8 flex -space-x-3">
            {["MK", "RV", "AI", "KM", "DN"].map((initials) => (
              <span
                key={initials}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-royal-50 text-xs font-bold text-royal-700"
              >
                {initials}
              </span>
            ))}
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-navy text-xs font-bold text-white">
              +32
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100/60 text-cyan-600">
                <point.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-navy">{point.title}</h3>
              <p className="mt-2 text-sm text-navy-400 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
