import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Badge } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";
import { courses } from "@/data/courses";
import Image from "next/image";
import {
  Star,
  Clock,
  Users,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  FolderOpen,
  Globe,
  CalendarDays,
} from "lucide-react";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
  };
}

const curriculum = [
  "Foundations & environment setup",
  "Core concepts through applied exercises",
  "Building your first production-grade project",
  "Peer review & instructor feedback session",
  "Capstone project development",
  "Final review & certification",
];

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <div className="pt-48 pb-24 md:pt-56">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="royal">{course.category}</Badge>
            <Badge tone="cyan">{course.difficulty}</Badge>
          </div>
          <h1 className="mt-4 text-display-md md:text-display-lg font-extrabold text-navy text-balance">
            {course.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-navy-400">{course.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-navy-400">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-signal text-signal" />
              <strong className="text-navy">{course.rating}</strong> ({course.reviewCount} reviews)
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" /> {course.studentsCount.toLocaleString()} students
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" /> {course.difficulty}
            </span>
          </div>

          <div className="relative mt-8 h-[380px] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={course.image}
              alt={course.title}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-right"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-navy-100 p-4 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-royal-50">
                <GraduationCap className="h-6 w-6 text-royal-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-navy-400">Instructor</p>
                <p className="font-semibold text-navy">{course.instructor}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-navy-100 p-4 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-royal-50">
                <FolderOpen className="h-6 w-6 text-royal-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-navy-400">Category</p>
                <p className="font-semibold text-navy">{course.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-navy-100 p-4 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-royal-50">
                <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-navy-400">Rating</p>
                <p className="font-semibold text-navy">
                  {course.rating} ({course.reviewCount})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-navy-100 p-4 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-royal-50">
                <Users className="h-6 w-6 text-royal-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-navy-400">Students</p>
                <p className="font-semibold text-navy">
                  {course.studentsCount.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-navy-100 p-4 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-royal-50">
                <Globe className="h-6 w-6 text-royal-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-navy-400">Language</p>
                <p className="font-semibold text-navy">English</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-navy-100 p-4 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-royal-50">
                <CalendarDays className="h-6 w-6 text-royal-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-navy-400">Updated</p>
                <p className="font-semibold text-navy">July 2026</p>
              </div>
            </div>
          </div>

          <section className="mt-12 w-full text-left">
            <h2 className="text-xl font-bold text-navy">What you&apos;ll cover</h2>

            <div className="mt-5 space-y-3">
              {curriculum.map((item, i) => (
                <div
                  key={item}
                  className="flex min-h-[80px] w-full items-center gap-4 rounded-xl border border-navy-100 bg-white px-6 py-5 transition hover:shadow-md"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-royal-50 text-xs font-bold text-royal-700">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-navy-600">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-[24px] border border-navy-100 p-6 shadow-lifted lg:sticky lg:top-28">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-navy">
              Rs. {course.price.toLocaleString("en-IN")}
            </span>
            {course.originalPrice && (
              <span className="text-base text-navy-400 line-through">
                Rs. {course.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <LinkButton href="/contact" variant="outline" size="lg" className="w-full justify-center">
              Enquiry now
            </LinkButton>
            <LinkButton href="/signup" size="lg" className="w-full justify-center">
              Enroll now
            </LinkButton>
          </div>
          <p className="mt-3 text-center text-xs text-navy-400">
            14-day money-back guarantee
          </p>

          <ul className="mt-6 space-y-3 border-t border-navy-100 pt-6 text-sm text-navy-400">
            {[
              "Lifetime access to course updates",
              "Verifiable certificate on completion",
              "Direct instructor feedback",
              "Private cohort community",
            ].map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-600 shrink-0" />
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3 border-t border-navy-100 pt-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-royal-50 text-xs font-bold text-royal-700">
              {course.instructorAvatar}
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">{course.instructor}</p>
              <p className="text-xs text-navy-400">Course instructor</p>
            </div>
          </div>
        </aside>
      </Container>
    </div>
  );
}

