"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Star, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";

const heroSlides = [
  {
    eyebrow: "Find Your Perfect Tutor",
    title: "Let's Learn About New Knowledge And Abilities",
    description:
      "We provide guided courses, live mentors, and practical projects to enhance your knowledge and skills with a relaxed learning journey.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
    stat: "25k+",
    statLabel: "Total Active Students",
  },
  {
    eyebrow: "Learn With Expert Mentors",
    title: "Build Real Skills With Live Training",
    description:
      "Join focused cohorts, practice with mentors, and turn every lesson into portfolio-ready proof of work.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
    stat: "96%",
    statLabel: "Course Completion Rate",
  },
  {
    eyebrow: "Upgrade Your Career Path",
    title: "Grow Confidence Through Projects",
    description:
      "Work on career-focused assignments, get actionable feedback, and prepare for opportunities with stronger practical clarity.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85",
    stat: "140+",
    statLabel: "Hiring Partners",
  },
];

const mentorAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&q=80",
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <section id="top" className="relative overflow-hidden bg-white pt-[152px]">
      <div className="relative mx-auto w-full overflow-hidden bg-brand-50 px-5 py-10 sm:px-8 md:px-12 lg:px-16 lg:py-12 2xl:max-w-[1768px] 2xl:rounded-[28px]">
          <div className="mx-auto grid max-w-[1420px] grid-cols-1 items-center gap-8 lg:min-h-[620px] lg:grid-cols-[0.92fr_1.08fr] xl:min-h-[660px]">
            <div className="relative z-10 max-w-[620px] py-2 lg:py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${slide.eyebrow}-${activeSlide}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-sm font-extrabold text-brand-600 sm:text-base">
                    {slide.eyebrow}
                  </p>

                  <h1 className="mt-5 max-w-2xl text-[2.55rem] font-extrabold leading-[1.14] text-[#17162d] sm:text-[3.35rem] lg:text-[3.9rem] xl:text-[4.35rem]">
                    <span>Let&apos;s Learn About</span>
                    <span className="relative mt-2 block w-fit">
                      New Knowledge
                      <svg
                        className="pointer-events-none absolute -left-3 -right-4 top-1/2 -z-0 h-[64px] w-[calc(100%+32px)] -translate-y-1/2 text-brand"
                        viewBox="0 0 520 110"
                        fill="none"
                        aria-hidden="true"
                      >
                        <ellipse
                          cx="260"
                          cy="55"
                          rx="250"
                          ry="40"
                          stroke="currentColor"
                          strokeWidth="7"
                        />
                      </svg>
                    </span>
                    <span className="mt-2 block">And Abilities</span>
                  </h1>

                  <p className="mt-6 max-w-xl text-base leading-8 text-[#5f6278] sm:text-lg">
                    {slide.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/courses"
                  className="inline-flex h-[52px] items-center justify-center rounded-full bg-brand px-8 py-4 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 hover:bg-brand-600 sm:text-base"
                >
                  Get Started
                </Link>
                <button className="inline-flex items-center gap-3 text-sm font-semibold text-[#55576d] transition-colors hover:text-brand sm:text-base">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand text-brand sm:h-14 sm:w-14">
                    <Play className="h-5 w-5 fill-current" />
                  </span>
                  Watch Our Video
                </button>
              </div>

              <div className="mt-6 flex items-center gap-2">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`Show hero slide ${index + 1}`}
                    onClick={() => setActiveSlide(index)}
                    className={cn(
                      "h-2.5 rounded-full transition-all",
                      index === activeSlide ? "w-10 bg-brand" : "w-2.5 bg-brand/20 hover:bg-brand"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="relative min-h-[430px] sm:min-h-[500px] lg:min-h-[600px] xl:min-h-[640px]">
              <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-brand sm:h-[440px] sm:w-[440px] lg:h-[560px] lg:w-[560px] xl:h-[620px] xl:w-[620px]" />
              <div className="absolute left-1/2 top-1/2 h-[285px] w-[285px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-brand sm:h-[360px] sm:w-[360px] lg:h-[460px] lg:w-[460px] xl:h-[510px] xl:w-[510px]" />
              <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-brand sm:h-[280px] sm:w-[280px] lg:h-[360px] lg:w-[360px] xl:h-[400px] xl:w-[400px]" />

              <div className="absolute left-[8%] top-[16%] hidden text-brand sm:block">
                <svg width="92" height="34" viewBox="0 0 92 34" fill="none" aria-hidden="true">
                  <path d="M2 23L11 13L20 23L29 13L38 23L47 13L56 23L65 13L74 23L83 13L90 20" stroke="currentColor" strokeWidth="7" />
                  <path d="M21 10L30 2L39 10L48 2L57 10L66 2L75 10" stroke="currentColor" strokeWidth="7" />
                </svg>
              </div>
              <div className="absolute right-0 top-[36%] hidden text-[#3d0048] md:block">
                <div className="grid grid-cols-3 gap-1.5">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <span key={index} className="h-0 w-0 border-x-[9px] border-b-[16px] border-x-transparent border-b-current" />
                  ))}
                </div>
              </div>
              <div className="absolute left-[2%] top-[47%] hidden grid-cols-5 gap-3 text-brand lg:grid">
                {Array.from({ length: 25 }).map((_, index) => (
                  <span key={index} className="h-1.5 w-1.5 rounded-full bg-current" />
                ))}
              </div>

              <div className="absolute inset-x-8 bottom-0 top-8 mx-auto max-w-[500px] overflow-hidden rounded-t-full lg:inset-x-10 xl:max-w-[540px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.image}
                    initial={{ opacity: 0, x: 48, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -48, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={activeSlide === 0}
                      sizes="(min-width: 1280px) 540px, (min-width: 1024px) 44vw, 86vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(238,252,249,0)_40%,#eef6ff_100%)]" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 top-8 z-20 flex w-[220px] items-center gap-3 rounded-lg bg-white p-4 shadow-lifted sm:right-2 sm:top-14 sm:w-[270px] sm:p-5 lg:right-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white sm:h-14 sm:w-14">
                  <UsersRound className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
                <span>
                  <strong className="block text-2xl font-extrabold text-[#17162d] sm:text-3xl">{slide.stat}</strong>
                  <span className="text-xs font-semibold text-[#66697d] sm:text-sm">{slide.statLabel}</span>
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute bottom-4 left-1/2 z-20 w-[240px] -translate-x-1/2 rounded-lg bg-white p-4 text-center shadow-lifted sm:bottom-6 sm:w-[290px] sm:p-5 lg:left-[28%] lg:translate-x-0"
              >
                <strong className="block text-3xl font-extrabold text-[#17162d] sm:text-4xl">200+</strong>
                <span className="mt-1 block text-sm font-semibold text-[#66697d] sm:text-base">Top Expert Mentors</span>
                <div className="mt-4 flex justify-center -space-x-3">
                  {mentorAvatars.map((avatar, index) => (
                    <span key={avatar} className="relative h-10 w-10 overflow-hidden rounded-full border-4 border-white bg-mist-100 shadow-soft sm:h-11 sm:w-11">
                      <Image
                        src={avatar}
                        alt={`Mentor ${index + 1}`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className="absolute bottom-10 right-0 hidden items-center gap-2 text-brand sm:flex">
                <Star className="h-5 w-5 fill-current" />
                <span className="h-0 w-0 border-y-[14px] border-l-[24px] border-y-transparent border-l-current" />
                <span className="h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-current" />
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}





