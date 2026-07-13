"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/features/newsletter-form";
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
            instructors â€” nothing you&apos;ll want to unsubscribe from.
          </p>
          <NewsletterForm />
        </motion.div>
      </Container>
    </section>
  );
}

