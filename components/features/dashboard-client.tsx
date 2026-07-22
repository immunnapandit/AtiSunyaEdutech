"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpenCheck, CheckCircle2, GraduationCap, UserRound } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { apiRequest } from "@/lib/api";
import type { Course } from "@/types";

type DashboardData = {
  user: { name: string; email: string };
  stats: {
    purchasedCourses?: number;
    certificatesEarned: number;
  };
  enrolledCourses: {
    slug: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    price: number;
    progress: number;
    status: string;
    nextMilestone: string;
    enrolledAt?: string | null;
  }[];
  certificates: Course[];
};

const pageShell = "min-h-screen bg-[#f6f9fc] pt-[156px] pb-16 sm:pt-[170px] lg:pt-[178px]";

export function DashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("atisunya_token");
    const request = token
      ? apiRequest<DashboardData>("/dashboard", { token }).then(setData)
      : Promise.reject(new Error("Please log in to view your dashboard."));

    request
      .catch((err) => setError(err instanceof Error ? err.message : "Dashboard could not load."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={pageShell}>
        <Container>
          <div className="rounded-lg border border-navy-100 bg-white p-6 text-sm font-semibold text-navy-500 shadow-soft">
            Loading your dashboard...
          </div>
        </Container>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={pageShell}>
        <Container>
          <div className="mx-auto max-w-xl rounded-lg border border-navy-100 bg-white p-8 text-center shadow-soft">
            <UserRound className="mx-auto h-10 w-10 text-brand" />
            <h1 className="mt-4 text-2xl font-bold text-navy">Dashboard</h1>
            <p className="mt-3 text-sm font-medium text-navy-400">{error}</p>
            <Link href="/login" className="mt-6 inline-flex rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white">
              Log in
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const purchasedCourses = data.enrolledCourses.length;
  const hasCourses = purchasedCourses > 0;
  const initials = data.user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={pageShell}>
      <Container>
        <section className="flex flex-col gap-5 border-b border-navy-100 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Learning Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Welcome, {data.user.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-navy-500">
              Your purchased courses will appear here. Keep learning from one clean place.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-navy-100 bg-white px-4 py-3 shadow-soft">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
              {initials || "U"}
            </span>
            <div>
              <p className="text-sm font-bold text-navy">{data.user.name}</p>
              <p className="text-xs font-medium text-navy-400">{data.user.email}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-navy-100 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand">
                <BookOpenCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-bold text-navy">{purchasedCourses}</p>
                <p className="text-sm font-medium text-navy-400">Purchased courses</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-navy-100 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-bold text-navy">{data.certificates.length}</p>
                <p className="text-sm font-medium text-navy-400">Certificates earned</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-navy-100 bg-white p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-navy">My courses</h2>
              <p className="mt-1 text-sm text-navy-400">Only courses you have successfully purchased are shown here.</p>
            </div>
            <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-600">
              Browse courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {hasCourses ? (
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {data.enrolledCourses.map((course) => (
                <article key={course.slug} className="rounded-lg border border-navy-100 p-5 transition-shadow hover:shadow-lifted">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{course.category}</p>
                      <h3 className="mt-2 text-lg font-bold leading-7 text-navy">{course.title}</h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      {course.status}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-navy-500">{course.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-navy-500">
                    <span className="rounded-full border border-navy-100 px-3 py-1">{course.duration}</span>
                    <span className="rounded-full border border-navy-100 px-3 py-1">INR {course.price.toLocaleString("en-IN")}</span>
                    <span className="rounded-full border border-navy-100 px-3 py-1">{course.progress}% complete</span>
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-mist-100">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${course.progress}%` }} />
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-center gap-2 text-sm font-medium text-navy-500">
                      <CheckCircle2 className="h-4 w-4 text-brand" /> {course.nextMilestone}
                    </p>
                    <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-600">
                      Open course <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-navy-100 bg-[#f8fbff] px-6 py-12 text-center">
              <BookOpenCheck className="mx-auto h-12 w-12 text-brand" />
              <h3 className="mt-5 text-xl font-bold text-navy">No purchased courses yet</h3>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-navy-500">
                Once you buy a course, it will appear here with your progress and quick access to continue learning.
              </p>
              <Link href="/courses" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600">
                Explore courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
