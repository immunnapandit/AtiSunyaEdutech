"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/ui/primitives";

const testimonials = [
  {
    name: "Alex Feroundo",
    role: "IT Operations Lead",
    quote: "Atisunya helped our team understand Dynamics 365 workflows clearly. The hands-on demos made configuration and adoption much easier.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80",
    tone: "bg-royal-50",
  },
  {
    name: "Kallu Mastan",
    role: "Dynamics 365 Practice",
    quote: "The Azure and Power Platform sessions were practical, focused, and directly useful for our internal projects.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80",
    tone: "bg-cyan-100/50",
  },
  {
    name: "Devid Max",
    role: "Enterprise Learning Team",
    quote: "The Copilot and AI workshops gave our team confidence to evaluate use cases, governance, and implementation steps.",
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
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-royal-700">Client Feedback</p>
          <h2 className="mt-3 text-[2rem] font-extrabold leading-tight text-navy sm:text-[2.65rem] md:text-[3rem]">
            What <span className="text-royal-700 underline decoration-signal underline-offset-8">Teams Say</span>
          </h2>
        </div>

        <div className="mt-2 hidden justify-end gap-4 pr-8 lg:flex">
          <button className="flex h-11 w-11 items-center justify-center rounded border border-navy-100 bg-white text-navy shadow-soft transition-colors hover:bg-mist-100" aria-label="Previous client feedback">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded border border-navy-100 bg-white text-navy shadow-soft transition-colors hover:bg-mist-100" aria-label="Next client feedback">
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


