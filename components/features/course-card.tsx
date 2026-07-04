"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Users, Clock, ArrowUpRight } from "lucide-react";
import { Course } from "@/types";
import { Badge } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const difficultyTone = {
  Beginner: "cyan",
  Intermediate: "royal",
  Advanced: "navy",
} as const;

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/courses/${course.slug}`}
        className="group block h-full rounded-2xl border border-navy-100 bg-white p-2 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lifted hover:border-royal/20"
      >
        <div
          className={cn(
            "relative flex h-40 items-end overflow-hidden rounded-xl bg-gradient-to-br p-4",
            course.thumbnailGradient
          )}
        >
          <div className="absolute inset-0 opacity-40 mix-blend-overlay grain-noise" />
          <Badge tone={difficultyTone[course.difficulty]} className="bg-white/80">
            {course.difficulty}
          </Badge>
          <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-navy/40 transition-all duration-300 group-hover:text-navy group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-royal">
            {course.category}
          </p>
          <h3 className="mt-1.5 text-base font-bold text-navy leading-snug">
            {course.title}
          </h3>

          <div className="mt-3 flex items-center gap-3 text-xs text-navy-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> {course.studentsCount.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-4">
            <div className="flex items-center gap-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-royal-50 text-[10px] font-bold text-royal-700">
                {course.instructorAvatar}
              </span>
              <span className="text-xs font-medium text-navy-400">{course.instructor}</span>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-navy">
              <Star className="h-3.5 w-3.5 fill-signal text-signal" />
              {course.rating}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-navy">${course.price}</span>
              {course.originalPrice && (
                <span className="text-xs text-navy-400 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            <span className="rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-royal">
              Enroll
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
