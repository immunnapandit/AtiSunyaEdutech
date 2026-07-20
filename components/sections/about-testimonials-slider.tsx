"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import type { Testimonial } from "@/types";

const formatRating = (rating: number) =>
  new Intl.NumberFormat("en", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(rating);

export function AboutTestimonialsSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) /
        testimonials.length
      : 0;

  const scroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const distance = Math.max(track.clientWidth * 0.82, 360);
    track.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isPaused || testimonials.length < 2) return;

    const id = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;

      const card = track.querySelector<HTMLElement>(
        '[data-testimonial-card="true"]',
      );
      if (!card) return;

      const computedStyle = window.getComputedStyle(track);
      const gapValue = Number.parseFloat(
        computedStyle.columnGap || computedStyle.gap || "0",
      );
      const step = card.offsetWidth + gapValue;
      const maxScrollLeft = track.scrollWidth - track.clientWidth - 4;

      if (track.scrollLeft + step >= maxScrollLeft) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      track.scrollBy({ left: step, behavior: "smooth" });
    }, 3200);

    return () => window.clearInterval(id);
  }, [isPaused, testimonials.length]);

  return (
    <section className="relative overflow-hidden bg-mist-50 py-20 sm:py-24">
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Testimonials
            </p>
            <h2 className="mt-3 text-[1.875rem] font-bold leading-[1.15] tracking-normal text-navy sm:text-[2.5rem] sm:leading-[1.1] lg:text-[3.5rem] lg:leading-[1.05]">
              What learners say about Atisunya Edutech
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-navy-400 sm:text-lg">
              Career switchers, product teams, and cloud professionals use our
              live cohorts to build practical skills with expert feedback.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-end">
            <div className="rounded-lg border border-navy-100 bg-white px-5 py-4 shadow-soft">
              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold leading-none text-navy">
                  {formatRating(averageRating)}
                </p>
                <div>
                  <div className="flex items-center gap-0.5 text-brand">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-navy-400">
                    Average learner rating
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll testimonials left"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-100 bg-white text-navy shadow-soft transition hover:border-brand/40 hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll testimonials right"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-100 bg-white text-navy shadow-soft transition hover:border-brand/40 hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-12">
        

          <div
            ref={trackRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 scroll-smooth [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                data-testimonial-card="true"
                className="flex min-h-[360px] min-w-[300px] snap-start flex-col rounded-lg border border-navy-100 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lifted sm:min-w-[390px] sm:p-7 lg:min-w-[420px]"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand ring-1 ring-brand-100">
                      {testimonial.avatar}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold leading-tight text-navy">
                        {testimonial.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-brand">
                        {testimonial.role}
                      </p>
                      <p className="mt-0.5 text-sm text-navy-400">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 shrink-0 text-brand/20" />
                </div>

                <blockquote className="mt-7 flex-1">
                  <p className="text-base font-medium leading-8 text-navy-600 sm:text-[1.05rem]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>

                <div className="mt-7 flex flex-col gap-4 border-t border-navy-100 pt-5">
                  <div className="flex items-center gap-1 text-brand">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`h-4 w-4 ${
                          starIndex < testimonial.rating
                            ? "fill-current"
                            : "fill-transparent text-navy-100"
                        }`}
                      />
                    ))}
                  </div>

                  {testimonial.outcome ? (
                    <p className="w-fit rounded-full bg-mist-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-navy-600">
                      {testimonial.outcome}
                    </p>
                  ) : (
                    <p className="text-sm font-semibold text-navy-400">
                      Verified Atisunya learner
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll testimonials left"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-100 bg-white text-navy shadow-soft"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll testimonials right"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-100 bg-white text-navy shadow-soft"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}
