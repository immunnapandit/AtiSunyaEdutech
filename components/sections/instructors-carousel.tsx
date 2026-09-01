"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Linkedin, MoveRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { instructors } from "@/data/testimonials";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

function InstructorPhoto({ image, name, avatar }: { image?: string; name: string; avatar: string }) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <span className="relative flex h-full w-full items-center justify-center overflow-hidden bg-brand-50 text-2xl font-bold text-brand">
      {(!image || hasImageError) && avatar}
      {image && !hasImageError && (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 82vw, 310px"
          quality={100}
          className="object-cover object-center transition duration-500 group-hover:scale-105"
          onError={() => setHasImageError(true)}
        />
      )}
    </span>
  );
}

export function InstructorsCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<(typeof instructors)[number] | null>(null);

  function move(direction: "previous" | "next") {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction === "next" ? rail.clientWidth * 0.85 : -rail.clientWidth * 0.85,
      behavior: "smooth",
    });
  }

  if (instructors.length === 0) return null;

  return (
    <section className="overflow-hidden bg-mist-50 py-16 md:py-20">
      <Container>
        <Reveal className="text-center md:text-left">
          <div className="max-w-2xl md:items-start">
            <Eyebrow align="center" className="md:justify-start">Meet Your Instructors</Eyebrow>
            <h2 className="heading-section mt-4 text-navy">
              Learn from Microsoft-focused training teams
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-navy-400">
              Practical guidance from specialists who help turn concepts into skills you can use at work.
            </p>
          </div>

        </Reveal>

        <div className="relative mt-10">
          <button
            type="button"
            onClick={() => move("previous")}
            aria-label="Show previous instructors"
            className="absolute left-[calc(50%-50vw+0.75rem)] top-1/2 z-10 inline-flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border-2 border-navy-100 bg-white text-navy shadow-lifted transition hover:border-brand hover:bg-brand hover:text-white focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => move("next")}
            aria-label="Show next instructors"
            className="absolute right-[calc(50%-50vw+0.75rem)] top-1/2 z-10 inline-flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border-2 border-navy-100 bg-white text-navy shadow-lifted transition hover:border-brand hover:bg-brand hover:text-white focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={railRef}
            className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {instructors.map((instructor) => (
              <article
                key={instructor.slug}
                className="group relative w-[82vw] shrink-0 snap-start pb-4 sm:w-[310px]"
              >
                <button
                  type="button"
                  onClick={() => setSelectedInstructor(instructor)}
                  className="relative block h-[350px] w-full overflow-hidden rounded-[1.5rem] bg-brand-50 text-left shadow-soft transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lifted focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-4"
                  aria-label={`View ${instructor.name}'s profile`}
                >
                  <InstructorPhoto image={instructor.image} name={instructor.name} avatar={instructor.avatar} />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </button>

                {instructor.linkedin && (
                  <a
                    href={instructor.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${instructor.name}'s LinkedIn profile`}
                    className="absolute right-3 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-100 bg-white text-brand shadow-soft transition hover:scale-110 hover:bg-brand hover:text-white focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}

                <div className="relative -mt-20 mx-4 min-h-[180px] rounded-2xl bg-white px-5 pb-5 pt-6 text-center shadow-lifted">
                  <h3 className="text-xl font-bold text-navy">{instructor.name}</h3>
                  <p className="mt-1 text-sm font-medium text-navy-400">{instructor.role}</p>
                  <div className="mt-5 border-t border-dashed border-navy-100 pt-4">
                    <div className="flex flex-wrap justify-center gap-2">
                      {instructor.expertise.slice(0, 2).map((skill) => (
                        <span key={skill} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedInstructor(instructor)}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-600"
                  >
                    View profile <MoveRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>

      {selectedInstructor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/55 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="instructor-profile-title"
          onClick={() => setSelectedInstructor(null)}
        >
          <article
            className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[0.9fr_1.1fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-[280px] bg-brand-50 md:min-h-[460px]">
              <InstructorPhoto image={selectedInstructor.image} name={selectedInstructor.name} avatar={selectedInstructor.avatar} />
            </div>
            <div className="p-8 md:p-10">
              <button
                type="button"
                onClick={() => setSelectedInstructor(null)}
                aria-label="Close instructor profile"
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-mist-50 text-navy transition hover:bg-brand hover:text-white focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand">Instructor profile</p>
              <h3 id="instructor-profile-title" className="mt-3 text-3xl font-bold text-navy">{selectedInstructor.name}</h3>
              <p className="mt-2 font-semibold text-brand">{selectedInstructor.role}</p>
              <p className="mt-6 leading-7 text-navy-400">{selectedInstructor.bio}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {selectedInstructor.expertise.map((skill) => (
                  <span key={skill} className="rounded-full bg-mist-50 px-4 py-2 text-sm font-semibold text-navy-500">{skill}</span>
                ))}
              </div>
              {selectedInstructor.linkedin && (
                <a
                  href={selectedInstructor.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
                >
                  <Linkedin className="h-4 w-4" /> View LinkedIn profile
                </a>
              )}
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
