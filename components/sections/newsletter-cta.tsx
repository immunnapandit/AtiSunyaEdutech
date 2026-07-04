"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/primitives";

export function NewsletterCta() {
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-navy-gradient px-8 py-16 text-center text-white md:px-16"
        >
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-royal/30 blur-3xl" />
          <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Mail className="h-5 w-5 text-cyan-400" />
          </span>
          <h2 className="relative mt-6 text-display-md md:text-display-lg font-bold text-balance">
            One email a week. Zero filler.
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-white/60">
            New course drops, live cohort openings, and career notes from our
            instructors — nothing you'll want to unsubscribe from.
          </p>
          <form className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-navy transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
