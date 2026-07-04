"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";
import { instructors } from "@/data/testimonials";

export function InstructorsPreview() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Learn from practitioners"
            title="The people teaching you have actually done the job"
          />
          <LinkButton href="/instructors" variant="outline" withArrow>
            Meet all instructors
          </LinkButton>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.slice(0, 3).map((instructor, i) => (
            <motion.div
              key={instructor.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-50 to-cyan-100 text-lg font-bold text-royal-700">
                  {instructor.avatar}
                </span>
                <div>
                  <h3 className="text-base font-bold text-navy">{instructor.name}</h3>
                  <p className="text-xs text-navy-400">{instructor.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-navy-400">{instructor.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {instructor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-mist-100 px-3 py-1 text-xs font-medium text-navy-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4 text-xs text-navy-400">
                <span>{instructor.studentsCount.toLocaleString()} students</span>
                <span className="flex items-center gap-1 font-semibold text-navy">
                  <Star className="h-3.5 w-3.5 fill-signal text-signal" />
                  {instructor.rating}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
