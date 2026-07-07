"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Users, Clock, ArrowUpRight, MessageCircleMore } from "lucide-react";
import { Course } from "@/types";
import { Badge } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";
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
      className="h-full"
    >
      <div className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[24px] border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        course.featured ? "border-brand/20 ring-1 ring-brand/5" : "border-navy-100"
      )}>
        {course.featured && (
          <div className="absolute left-0 top-3 z-10 overflow-hidden rounded-br-[18px] bg-brand px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white shadow-sm">
            Featured course
          </div>
        )}
        <Link href={`/courses/${course.slug}`} className="block">
          <div
            className={cn(
              "relative flex h-28 items-end overflow-hidden rounded-t-[24px] bg-gradient-to-br p-3",
              course.thumbnailGradient
            )}
          >
            <div className="absolute inset-0 opacity-25 mix-blend-overlay grain-noise" />
            <div className="relative flex w-full items-start justify-between gap-2">
              <Badge
                tone={difficultyTone[course.difficulty]}
                className={cn(
                  "shadow-sm text-[10px] uppercase tracking-[0.24em]",
                  course.featured ? "bg-white/95 text-navy" : "bg-white/90"
                )}
              >
                {course.difficulty}
              </Badge>
            </div>
            <div className={cn(
              "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/90 text-navy transition-all duration-300",
              course.featured ? "text-brand" : "text-navy"
            )}>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-royal">
              {course.category}
            </p>
            <Link href={`/courses/${course.slug}`} className="mt-2 block">
              <h3 className="text-base font-semibold leading-tight text-navy transition-colors group-hover:text-royal">
                {course.title}
              </h3>
            </Link>
            <p className="mt-2 text-sm leading-6 text-navy-500 line-clamp-2">{course.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-[12px] text-navy-500">
            <span className="flex items-center gap-2 rounded-full border border-navy-100 bg-slate-50 px-3 py-1.5">
              <Clock className="h-3.5 w-3.5" /> {course.duration}
            </span>
            <span className="flex items-center gap-2 rounded-full border border-navy-100 bg-slate-50 px-3 py-1.5">
              <Users className="h-3.5 w-3.5" /> {course.studentsCount.toLocaleString()} learners
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-navy-100 bg-slate-50 p-3 text-sm text-navy-500 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-50 text-[11px] font-semibold text-royal-700">
                {course.instructorAvatar}
              </span>
              <div>
                <p className="font-semibold text-navy">{course.instructor}</p>
                <p className="text-xs text-navy-400">Instructor</p>
              </div>
            </div>
            <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy shadow-sm">
              <Star className="h-3.5 w-3.5 fill-signal text-signal" />
              {course.rating}
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-navy-500">Starting at</p>
              <p className="text-lg font-bold text-navy">${course.price}</p>
              {course.originalPrice && (
                <p className="text-[11px] text-navy-400 line-through">${course.originalPrice}</p>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <LinkButton
                href="/contact"
                variant="outline"
                size="sm"
                className="!px-3 !py-2 text-xs"
              >
                <MessageCircleMore className="h-3.5 w-3.5" />
                Enquiry now
              </LinkButton>
              <LinkButton href={`/courses/${course.slug}`} size="sm" className="!px-3 !py-2 text-xs">
                Enroll now
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
