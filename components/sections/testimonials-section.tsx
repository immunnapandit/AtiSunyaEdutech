"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/ui/primitives";

const testimonials = [
  {
    name: "Alex Feroundo",
    role: "Founder",
    quote: "Atisunya helped me move from scattered lessons to a clear learning path. The mentor feedback made every project stronger.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80",
    tone: "bg-royal-50",
  },
  {
    name: "Kallu Mastan",
    role: "Mastan group",
    quote: "The course structure was practical, focused, and easy to follow. I could apply the concepts directly at work.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80",
    tone: "bg-cyan-100/50",
  },
  {
    name: "Devid Max",
    role: "Max iNC",
    quote: "Live sessions and assignments gave me confidence. The certificate felt earned because the projects were real.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=180&q=80",
    tone: "bg-signal-100/60",
  },
];

function RatingStars() {
  return (
    <div className="flex items-center gap-1 text-signal">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-5 w-5 fill-current" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="pointer-events-none absolute -left-28 top-16 h-[520px] w-[520px] rounded-full bg-royal-50/50" />
      <div className="pointer-events-none absolute -right-16 top-36 h-[320px] w-[320px] rounded-full bg-mist-100" />

      <Container className="relative">
        <div className="text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-royal-700">Testimonial</p>
          <h2 className="mt-3 text-[2rem] font-extrabold leading-tight text-navy sm:text-[2.65rem] md:text-[3rem]">
            What Says <span className="text-royal-700 underline decoration-signal underline-offset-8">Our Students</span>
          </h2>
        </div>

        <div className="mt-2 hidden justify-end gap-4 pr-8 lg:flex">
          <button className="flex h-11 w-11 items-center justify-center rounded border border-navy-100 bg-white text-navy shadow-soft transition-colors hover:bg-mist-100" aria-label="Previous testimonial">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded border border-navy-100 bg-white text-navy shadow-soft transition-colors hover:bg-mist-100" aria-label="Next testimonial">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
          {testimonials.map((item, index) => (
            <article key={item.name} className="overflow-hidden rounded-lg bg-white shadow-lifted">
              {index !== 1 && (
                <div className={`flex items-center gap-4 ${item.tone} p-5`}>
                  <Image src={item.avatar} alt={item.name} width={68} height={68} className="h-16 w-16 rounded-full border-4 border-white object-cover" />
                  <div>
                    <h3 className="text-xl font-extrabold text-navy">{item.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-navy-400">- {item.role}</p>
                  </div>
                </div>
              )}
              <div className="p-6">
                <RatingStars />
                <p className="mt-5 text-base font-medium leading-7 text-navy-400">{item.quote}</p>
              </div>
              {index === 1 && (
                <div className={`flex items-center gap-4 ${item.tone} p-5`}>
                  <Image src={item.avatar} alt={item.name} width={68} height={68} className="h-16 w-16 rounded-full border-4 border-white object-cover" />
                  <div>
                    <h3 className="text-xl font-extrabold text-navy">{item.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-navy-400">- {item.role}</p>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
