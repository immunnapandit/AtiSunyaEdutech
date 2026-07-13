"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";

const courseImages: Record<string, string> = {
  "product-design-systems":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85",
  "full-stack-react-nextjs":
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=85",
  "applied-machine-learning":
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85",
  "product-management-foundations":
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",
  "cloud-architecture-aws":
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",
  "brand-and-visual-identity":
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
};

const tabs = [
  "Dynamics 365",
  "Azure Cloud",
  "Power Platform",
  "Microsoft AI",
] as const;

export function FeaturedCourses() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Dynamics 365");
  const featured = useMemo(() => {
    const matching = courses.filter((course) => course.category === activeTab);
    const fallback = courses.filter((course) => course.featured);

    return [...matching, ...fallback]
      .filter((course, index, list) => list.findIndex((item) => item.slug === course.slug) === index)
      .slice(0, 6);
  }, [activeTab]);

  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[2.1rem] font-bold leading-tight text-navy sm:text-[2.65rem] md:text-[3rem]">
            Microsoft Training Programs
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "h-12 rounded-full px-6 text-sm font-extrabold transition-colors sm:px-8 sm:text-base",
                activeTab === tab
                  ? "bg-signal text-navy shadow-soft"
                  : "bg-transparent text-navy hover:bg-mist-100 hover:text-royal-700"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group overflow-hidden rounded-lg border border-navy-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-royal/30 hover:shadow-lifted"
            >
              <div className="relative h-48 overflow-hidden bg-mist-100">
                <Image
                  src={courseImages[course.slug] ?? courseImages["product-design-systems"]}
                  alt={course.title}
                  fill
                  sizes="(min-width: 1280px) 31vw, (min-width: 768px) 45vw, 92vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-50 text-xs font-extrabold text-royal-700 shadow-soft">
                    {course.instructorAvatar}
                  </span>
                  <span className="text-sm font-extrabold text-navy">{course.instructor}</span>
                </div>

                <h3 className="mt-4 min-h-[3.25rem] text-lg font-bold leading-snug text-navy transition-colors group-hover:text-royal-700">
                  {course.title}
                </h3>
              </div>

              <div className="flex items-center justify-between border-t border-navy-100 px-5 py-4">
                <span className="flex items-center gap-1.5 text-base font-extrabold text-signal">
                  <Star className="h-5 w-5 fill-current" />
                  {course.rating}
                  <span className="text-navy-400">({course.reviewCount})</span>
                </span>
                <span className="text-base font-bold text-navy-400">
                  Program Fee: <strong className="text-xl text-navy">${course.price}.00</strong>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}



