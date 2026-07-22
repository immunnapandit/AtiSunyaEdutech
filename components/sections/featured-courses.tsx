"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircleMore, Star } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { apiRequest } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Course } from "@/types";

const tabs = [
  "Dynamics 365",
  "Azure Cloud",
  "Power Platform",
  "Microsoft AI",
] as const;

export function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Dynamics 365");

  useEffect(() => {
    apiRequest<{ courses: Course[] }>("/courses")
      .then((data) => setCourses(data.courses))
      .catch(() => setCourses([]));
  }, []);

  const featured = useMemo(() => {
    const matching = courses.filter((course) => course.category === activeTab);
    const fallback = courses.filter((course) => course.featured);

    return [...matching, ...fallback]
      .filter((course, index, list) => list.findIndex((item) => item.slug === course.slug) === index)
      .slice(0, 6);
  }, [activeTab, courses]);

  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow align="center">Training Programs</Eyebrow>
          <h2 className="heading-section mt-4 text-navy">
            Microsoft Training Programs Built for Business Teams
          </h2>
          <p className="mt-4 text-base leading-7 text-navy-400 text-balance">
            Role-based tracks across the Microsoft ecosystem, delivered by practitioners who train teams for real deployments.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "h-12 rounded-full px-6 text-sm font-semibold transition-colors sm:px-8 sm:text-base",
                activeTab === tab
                  ? "bg-signal text-navy shadow-soft"
                  : "bg-transparent text-navy hover:bg-mist-100 hover:text-royal-700"
              )}
            >
              {tab}
            </button>
          ))}
        </Reveal>

        <Stagger key={activeTab} className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3" delay={0.05}>
          {featured.map((course) => (
            <StaggerItem
              key={course.slug}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-royal/30 hover:shadow-lifted"
            >
              <Link href={`/courses/${course.slug}`} className="block">
                <div className="relative h-48 overflow-hidden bg-mist-100">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(min-width: 1280px) 31vw, (min-width: 768px) 45vw, 92vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-royal-100 via-royal/20 to-cyan-100" />
                  )}
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-50 text-xs font-semibold text-royal-700 shadow-soft">
                    {course.instructorAvatar}
                  </span>
                  <span className="text-sm font-semibold text-navy">{course.instructor}</span>
                </div>

                <Link href={`/courses/${course.slug}`} className="mt-4 block">
                  <h3 className="min-h-[3.25rem] text-lg font-semibold leading-snug text-navy transition-colors group-hover:text-royal-700">
                    {course.title}
                  </h3>
                </Link>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-navy-400">
                    <Star className="h-4 w-4 fill-signal text-signal" />
                    {course.rating}
                    <span className="font-medium text-navy-400/70">({course.reviewCount})</span>
                  </span>
                  <span className="text-base font-bold text-navy-400">
                    Program Fee:{" "}
                    <strong className="text-xl text-navy">
                      Rs. {course.price.toLocaleString("en-IN")}.00
                    </strong>
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
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
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}



