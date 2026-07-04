"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-mist-50">
      <Container>
        <SectionHeading
          eyebrow="Student outcomes"
          title="Told in their own words"
          description="Every quote here is from a learner who finished the program — not a marketing focus group."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-soft"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-3.5 w-3.5 ${
                      idx < t.rating ? "fill-signal text-signal" : "text-navy-100"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-navy-600">
                "{t.quote}"
              </p>

              {t.outcome && (
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-cyan-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {t.outcome}
                </div>
              )}

              <div className="mt-5 flex items-center gap-3 border-t border-navy-100 pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-50 text-xs font-bold text-royal-700">
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-navy-400">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
