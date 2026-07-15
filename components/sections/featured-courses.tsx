"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircleMore, Star } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";
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
            <div
              key={course.slug}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-royal/30 hover:shadow-lifted"
            >
              <Link href={`/courses/${course.slug}`} className="block">
                <div className="relative h-48 overflow-hidden bg-mist-100">
                  <Image
                    src={courseImages[course.slug] ?? courseImages["product-design-systems"]}
                    alt={course.title}
                    fill
                    sizes="(min-width: 1280px) 31vw, (min-width: 768px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-50 text-xs font-extrabold text-royal-700 shadow-soft">
                    {course.instructorAvatar}
                  </span>
                  <span className="text-sm font-extrabold text-navy">{course.instructor}</span>
                </div>

                <Link href={`/courses/${course.slug}`} className="mt-4 block">
                  <h3 className="min-h-[3.25rem] text-lg font-extrabold leading-snug text-navy transition-colors group-hover:text-royal-700">
                    {course.title}
                  </h3>
                </Link>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-navy-400">({course.reviewCount})</span>
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
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}



