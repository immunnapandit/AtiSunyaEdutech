"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import type { Testimonial } from "@/types";

export function AboutTestimonialsSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

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
    <section className="relative overflow-hidden bg-[#f6f8fd] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(1200px_700px_at_20%_0%,rgba(76,60,255,0.09),transparent_60%)]" />

      <Container className="relative">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              Testimonials
            </p>
            <h2 className="mt-3 max-w-[520px] text-[2.15rem] font-extrabold leading-[1.08] text-navy sm:text-[2.8rem]">
              People&apos;s Say About Our Atisunya Edutech
            </h2>
            <div className="mt-5 h-[3px] w-40 rounded-full bg-brand/60" />
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll testimonials left"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-100 bg-white text-navy shadow-soft transition-transform hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll testimonials right"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-100 bg-white text-navy shadow-soft transition-transform hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#f6f8fd] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#f6f8fd] to-transparent" />

          <div
            ref={trackRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <article className="relative min-w-[330px] snap-start overflow-hidden rounded-[1.5rem] bg-navy p-7 text-white shadow-[0_16px_36px_rgba(15,23,42,0.2)]">
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
              <div className="relative">
                <p className="text-[3.65rem] font-extrabold leading-none">
                  4.8
                </p>
                <div className="mt-3 flex items-center gap-1 text-signal">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mt-2 text-xl font-semibold">5 Star Rating</p>
              </div>
            </article>

            {testimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                data-testimonial-card="true"
                className="min-w-[320px] snap-start rounded-[1.5rem] border border-navy-100 bg-white p-7 shadow-soft sm:min-w-[390px] sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-50 text-base font-extrabold text-brand">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold leading-none text-navy sm:text-3xl">
                      {testimonial.name}
                    </h3>
                    <p className="mt-2 text-base font-semibold text-brand">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <p className="mt-8 text-[1.05rem] font-medium leading-8 text-navy-500 sm:text-[1.12rem]">
                  {testimonial.quote}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-signal">
                    {Array.from({ length: testimonial.rating }).map(
                      (_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="h-5 w-5 fill-current"
                        />
                      ),
                    )}
                  </div>
                  <Quote className="h-12 w-12 text-royal/20" />
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
