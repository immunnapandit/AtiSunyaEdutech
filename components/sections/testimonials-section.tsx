"use client";

import { Quote, Star } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-mist-50 py-16 md:py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow align="center">Success Stories</Eyebrow>
          <h2 className="heading-section mt-4 text-navy">
            Trainers Who Earned Their Microsoft Certification With Us
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2" delay={0.1}>
          {testimonials.map((testimonial) => (
            <StaggerItem
              key={testimonial.name}
              className="card-hover flex h-full flex-col rounded-lg border border-navy-100 bg-white p-8 shadow-soft"
            >
              <Quote className="h-10 w-10 shrink-0 text-brand/15" aria-hidden="true" />
              <p className="mt-4 flex-1 text-lg font-medium leading-8 text-navy-600">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="mt-7 flex items-center gap-4 border-t border-navy-100 pt-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand">
                  {testimonial.avatar}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-bold text-navy">{testimonial.name}</p>
                  <p className="text-sm font-medium text-navy-400">
                    {testimonial.role} &middot; {testimonial.company}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1 text-brand">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
