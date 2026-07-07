"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/primitives";

const stats = [
  { value: "48,000+", label: "Learners trained" },
  { value: "96%", label: "Course completion" },
  { value: "140+", label: "Hiring partners" },
  { value: "4.8/5", label: "Learner rating" },
];

export function Stats() {
  return (
    <section className="py-20 border-y border-navy-100">
      <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center md:text-left"
          >
            <p className="text-display-sm md:text-display-md font-extrabold text-navy">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-navy-400">{stat.label}</p>
          </motion.div>
        ))}
      </Container>
    </section>
  );
}
