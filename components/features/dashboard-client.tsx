"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Award, CalendarDays, CheckCircle2, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { apiRequest } from "@/lib/api";
import type { Course } from "@/types";

type DashboardData = {
  user: { name: string; email: string };
  stats: {
    coursesInProgress: number;
    certificatesEarned: number;
    assignmentsDue: number;
    studyStreak: string;
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
  }[];
  certificates: Course[];
  upcoming: { title: string; time: string }[];
  activity: string[];
};

export function DashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("atisunya_token");

    if (!token) {
      setLoading(false);
      setError("Please log in to view your dashboard.");
      return;
    }

    apiRequest<DashboardData>("/dashboard", { token })
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : "Dashboard could not load."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-mist-50 pt-28 pb-20">
        <Container>
          <div className="rounded-2xl border border-navy-100 bg-white p-6 text-sm font-semibold text-navy-400">
            Loading your dashboard...
          </div>
        </Container>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-mist-50 pt-28 pb-20">
        <Container>
          <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-soft">
            <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
            <p className="mt-3 text-sm font-medium text-navy-400">{error}</p>
            <Link href="/login" className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white">
              Log in
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const initials = data.user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-mist-50 pt-28 pb-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-navy-400">Welcome back,</p>
            <h1 className="text-2xl font-bold text-navy">{data.user.name}</h1>
          </div>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-50 text-lg font-bold text-royal-700">
            {initials}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Courses in progress", value: data.stats.coursesInProgress },
            { label: "Certificates earned", value: data.stats.certificatesEarned },
            { label: "Assignments due", value: data.stats.assignmentsDue },
            { label: "Study streak", value: data.stats.studyStreak },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-navy-100 bg-white p-5">
              <p className="text-xl font-bold text-navy">{stat.value}</p>
              <p className="mt-1 text-xs text-navy-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="rounded-2xl border border-navy-100 bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-navy">My enrolled courses</h2>
                <p className="mt-1 text-sm text-navy-400">Only the courses you enrolled are shown here.</p>
              </div>
              <Link href="/courses" className="text-sm font-semibold text-royal-700">
                Browse more
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {data.enrolledCourses.map((course) => (
                <div key={course.slug} className="rounded-2xl border border-navy-100 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-royal">{course.category}</p>
                      <h3 className="mt-1 text-base font-semibold text-navy">{course.title}</h3>
                      <p className="mt-2 text-sm text-navy-400">{course.description}</p>
                    </div>
                    <div className="rounded-full bg-mist-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                      {course.status}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-navy-400">
                    <span className="rounded-full border border-navy-100 px-3 py-1">{course.duration}</span>
                    <span className="rounded-full border border-navy-100 px-3 py-1">${course.price}</span>
                    <span className="rounded-full border border-navy-100 px-3 py-1">{course.progress}% complete</span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-mist-100">
                    <div className="h-full rounded-full bg-royal" style={{ width: `${course.progress}%` }} />
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-navy-400">{course.nextMilestone}</p>
                    <Link href={`/courses/${course.slug}`} className="inline-flex items-center text-sm font-semibold text-royal-700">
                      Continue learning <PlayCircle className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-sm font-bold text-navy">Certificates</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {data.certificates.map((course) => (
                <div key={course.slug} className="flex items-center gap-3 rounded-xl border border-navy-100 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-100 text-signal-600">
                    <Award className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold text-navy-600">{course.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <h2 className="flex items-center gap-2 text-sm font-bold text-navy">
                <CalendarDays className="h-4 w-4" /> Upcoming
              </h2>
              <div className="mt-4 space-y-3">
                {data.upcoming.map((item) => (
                  <div key={item.title} className="rounded-xl bg-mist-50 p-3">
                    <p className="text-xs font-semibold text-navy">{item.title}</p>
                    <p className="mt-1 text-xs text-navy-400">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <h2 className="text-sm font-bold text-navy">Recent activity</h2>
              <div className="mt-4 space-y-4">
                {data.activity.map((activity) => (
                  <div key={activity} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                    <p className="text-xs text-navy-400">{activity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
