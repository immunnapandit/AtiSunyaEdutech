"use client";

import { motion } from "framer-motion";
import { Radio, Calendar, Video } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";

const upcoming = [
  { title: "Full-Stack Engineering with Next.js", date: "Jul 14", seats: 8 },
  { title: "Applied Machine Learning for Products", date: "Jul 21", seats: 3 },
  { title: "Cloud Architecture on AWS", date: "Aug 4", seats: 12 },
];

export function LiveTraining() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient py-24 md:py-32 text-white">
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-royal/20 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />

      <Container className="relative grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold">
            <Radio className="h-3.5 w-3.5 text-cyan-400" />
            Live Training
          </div>
          <h2 className="mt-5 text-display-md md:text-display-lg font-bold text-balance">
            Real-time cohorts, capped at 25 seats.
          </h2>
          <p className="mt-5 max-w-md text-white/60 text-balance">
            Small enough for the instructor to know your name, structured
            enough to keep you on pace. Every cohort ends with a live project
            review from a working practitioner.
          </p>
          <LinkButton href="/live-training" variant="secondary" size="lg" withArrow className="mt-8">
            View live schedule
          </LinkButton>
        </motion.div>

        <div className="space-y-4">
          {upcoming.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel-dark flex items-center justify-between rounded-2xl p-5"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Video className="h-5 w-5 text-cyan-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
                    <Calendar className="h-3.5 w-3.5" /> Starts {item.date}
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-lg bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-400">
                {item.seats} seats left
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
