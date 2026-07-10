import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpenText,
  GraduationCap,
  Target,
  Users,
} from "lucide-react";
import { Container, SectionHeading, Eyebrow } from "@/components/ui/primitives";
import { Stats } from "@/components/sections/stats";
import { SITE } from "@/constants/site";
import { testimonials } from "@/data/testimonials";
import { AboutTestimonialsSlider } from "@/components/sections/about-testimonials-slider";

export const metadata: Metadata = {
  title: "About",
  description: "The story, mission, and people behind Atisunya Edutech.",
};

const featureCards = [
  {
    title: "Industry-led learning",
    body: "Courses are built around practical skills, real projects, and job-ready outcomes.",
    icon: Users,
    href: "/courses",
  },
  {
    title: "Live mentorship",
    body: "Students learn with practitioners who answer questions, review work, and guide progress.",
    icon: BookOpenText,
    href: "/live-training",
  },
  {
    title: "Career-focused certificates",
    body: "Every course ends with proof of work that supports applications, interviews, and promotions.",
    icon: GraduationCap,
    href: "/pricing",
  },
  {
    title: "Support beyond class",
    body: "We stay focused on confidence, accountability, and the next career step after graduation.",
    icon: Target,
    href: "/faq",
  },
];

const instructors = [
  {
    name: "MD. Monaym Billah",
    role: "English Lecturer",
    courses: "54 Courses",
    students: "125 Students",
    image: "https://edplus-react.vercel.app/assets/img/teachers/ins/2.png",
  },
  {
    name: "MD. Monaym Billah",
    role: "English Lecturer",
    courses: "35 Courses",
    students: "125 Students",
    image: "https://edplus-react.vercel.app/assets/img/teachers/ins/3.png",
  },
  {
    name: "MD. Monaym Billah",
    role: "Web Developer",
    courses: "23 Courses",
    students: "125 Students",
    image: "https://edplus-react.vercel.app/assets/img/teachers/ins/4.png",
  },
  {
    name: "MD. Monaym Billah",
    role: "Web Developer",
    courses: "60 Courses",
    students: "125 Students",
    image: "https://edplus-react.vercel.app/assets/img/teachers/ins/1.png",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden pt-28 sm:pt-32">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-20 bg-[#f8faff]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[linear-gradient(180deg,rgba(76,60,255,0.72),rgba(76,60,255,0.72)),url('/images/contactbanner.png')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(31,41,55,0.35),rgba(31,41,55,0.45))]" />

        <Container className="relative flex min-h-[28rem] items-center justify-center py-16 text-center text-white">
          <div>
            <h1 className="text-display-md font-extrabold text-balance sm:text-display-lg lg:text-display-xl">
              About
            </h1>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft">
              <Link href="/" className="transition-opacity hover:opacity-90">
                Home
              </Link>
              <span className="text-white/70">›</span>
              <span>About</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((card, index) => (
              <article
                key={card.title}
                className="rounded-[1.75rem] border border-navy-100 bg-white p-7 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                  <card.icon className="h-9 w-9 text-brand" />
                </div>
                <h2 className="mt-6 text-2xl font-extrabold text-navy">
                  {index === 0 || index === 3
                    ? `Why Study at ${SITE.name}`
                    : card.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-navy-400 text-balance">
                  {card.body}
                </p>
                <Link
                  href={card.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-600"
                >
                  Learn More..
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#f5f7fb] py-20 sm:py-24">
        <div className="pointer-events-none absolute left-0 top-20 h-28 w-28 rounded-full border border-brand/15" />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 h-[300px] overflow-hidden rounded-[2rem] bg-white shadow-soft sm:h-[360px]">
                  <Image
                    src="/images/contactbanner.png"
                    alt="Students learning together"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="col-span-4 flex items-center justify-center rounded-[1.5rem] bg-white p-4 shadow-soft">
                  <div className="text-center">
                    <GraduationCap className="mx-auto h-10 w-10 text-brand" />
                    <p className="mt-3 text-lg font-bold text-navy">
                      Experience Advisor
                    </p>
                  </div>
                </div>
                <div className="col-span-12 -mt-6 ml-10 h-[260px] overflow-hidden rounded-[2rem] border-[10px] border-[#f5f7fb] shadow-soft sm:ml-16 sm:h-[320px]">
                  <Image
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=85"
                    alt="Students walking on campus"
                    width={1400}
                    height={900}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="absolute -bottom-5 left-0 text-[2.65rem] font-extrabold leading-none text-brand/70 sm:text-[3.5rem]"></div>
            </div>

            <div className="relative">
              <Eyebrow>About {SITE.name}</Eyebrow>
              <h2 className="mt-4 max-w-2xl text-display-md font-extrabold text-navy text-balance sm:text-display-lg">
                We create industry-focused learning experiences.
              </h2>
              <div className="mt-4 h-1 w-40 rounded-full bg-brand/30" />
              <p className="mt-8 max-w-2xl text-lg leading-8 text-navy-400 text-balance">
                {SITE.name} is driven by the transformative power of practical
                education and the limitless potential within each learner.
                Founded to bridge the gap between learning and doing, we stay
                committed to nurturing curiosity, promoting academic excellence,
                and building a community where skills turn into real career
                progress.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-white p-6 shadow-soft">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <BookOpenText className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold text-navy">
                    Our Mission
                  </h3>
                  <p className="mt-3 text-base leading-7 text-navy-400">
                    To help learners build practical skills, complete real
                    projects, and leave with confidence that holds up in
                    interviews, on the job, and in future growth.
                  </p>
                  <Link
                    href="/courses"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-600"
                  >
                    Learn More..
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="rounded-[1.5rem] bg-white p-6 shadow-soft">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100/70 text-cyan-600">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold text-navy">
                    Our Vision
                  </h3>
                  <p className="mt-3 text-base leading-7 text-navy-400">
                    To be the learning platform people trust when they want more
                    than completion - they want measurable growth, stronger
                    portfolios, and a better career path.
                  </p>
                  <Link
                    href="/about"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-600"
                  >
                    Learn More..
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href="/courses"
                  className="inline-flex h-14 items-center justify-center rounded-md bg-brand px-7 text-base font-extrabold text-white transition-transform hover:-translate-y-0.5 hover:bg-brand-600"
                >
                  View All Programs
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Stats />

      <AboutTestimonialsSlider testimonials={testimonials} />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Instructors"
            title="Our Expert Instructors"
            align="center"
            className="mx-auto"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {instructors.map((instructor) => (
              <article
                key={instructor.name}
                className="group overflow-hidden rounded-[1.5rem] bg-white shadow-soft"
              >
                <div className="relative h-[300px] bg-mist-100">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="border-t border-navy-100 p-5 text-center">
                  <h3 className="text-xl font-extrabold text-navy">
                    {instructor.name}
                  </h3>
                  <p className="mt-1 text-base text-navy-400">
                    {instructor.role}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm font-medium text-navy-400">
                    <span className="inline-flex items-center gap-1">
                      <Award className="h-4 w-4 text-brand" />
                      {instructor.courses}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-4 w-4 text-brand" />
                      {instructor.students}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Link
              href="/courses"
              className="group relative overflow-hidden rounded-[1.75rem] bg-brand px-8 py-10 text-white shadow-[0_24px_60px_rgba(76,60,255,0.28)] transition-transform hover:-translate-y-1"
            >
              <span className="relative z-10 block max-w-sm text-[2rem] font-extrabold leading-tight sm:text-[2.5rem]">
                Explore Courses
              </span>
              <p className="relative z-10 mt-4 max-w-md text-base leading-7 text-white/90">
                Discover practical learning paths built for learners who want
                skills they can use right away.
              </p>
              <span className="relative z-10 mt-6 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-extrabold text-navy transition-colors group-hover:bg-white/90">
                Browse Programs
              </span>
            </Link>

            <Link
              href="/signup"
              className="group relative overflow-hidden rounded-[1.75rem] bg-brand px-8 py-10 text-white shadow-[0_24px_60px_rgba(76,60,255,0.28)] transition-transform hover:-translate-y-1"
            >
              <span className="relative z-10 block max-w-sm text-[2rem] font-extrabold leading-tight sm:text-[2.5rem]">
                Become an Instructor
              </span>
              <p className="relative z-10 mt-4 max-w-md text-base leading-7 text-white/90">
                Join Atisunya Edutech and help learners build real-world
                confidence through practical teaching.
              </p>
              <span className="relative z-10 mt-6 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-extrabold text-navy transition-colors group-hover:bg-white/90">
                Register Now
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
