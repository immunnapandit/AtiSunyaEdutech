"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Palette, Code2, Brain, Target, Cloud, Shield, ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { categories } from "@/data/courses";

const icons = { palette: Palette, code: Code2, brain: Brain, target: Target, cloud: Cloud, shield: Shield };

export function Categories() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Browse by discipline"
          title="Six paths. One standard of rigor."
          description="Every track is built and taught by someone who has shipped the work professionally — not just studied it."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = icons[cat.icon as keyof typeof icons];
            const large = i === 0 || i === 3;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={large ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <Link
                  href="/courses"
                  className="group flex h-full flex-col justify-between rounded-2xl border border-navy-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted hover:border-royal/20"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-navy/20 transition-all duration-300 group-hover:text-navy group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-navy">{cat.name}</h3>
                    <p className="mt-1 text-sm text-navy-400">{cat.count} courses</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
