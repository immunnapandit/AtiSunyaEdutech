import type { Metadata } from "next";
import { Award, CalendarDays, CheckCircle2, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Atisunya Edutech learning dashboard.",
};

const progress = [
  { course: courses[1], percent: 68 },
  { course: courses[0], percent: 32 },
];

const upcoming = [
  { title: "Live session: Server Actions in Depth", time: "Today, 6:00 PM" },
  { title: "Capstone review with Rohan Verma", time: "Fri, 4:30 PM" },
];

export default function DashboardPage() {
  return (
    <div className="bg-mist-50 pt-28 pb-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-navy-400">Welcome back,</p>
            <h1 className="text-2xl font-bold text-navy">Priya Chandran</h1>
          </div>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-50 text-lg font-bold text-royal-700">
            PC
          </span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Courses in progress", value: "2" },
            { label: "Certificates earned", value: "5" },
            { label: "Assignments due", value: "3" },
            { label: "Study streak", value: "14 days" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-navy-100 bg-white p-5">
              <p className="text-xl font-bold text-navy">{s.value}</p>
              <p className="mt-1 text-xs text-navy-400">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-navy-100 bg-white p-6">
            <h2 className="text-sm font-bold text-navy">Continue learning</h2>
            <div className="mt-5 space-y-4">
              {progress.map(({ course, percent }) => (
                <div
                  key={course.slug}
                  className="flex items-center gap-4 rounded-xl border border-navy-100 p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-700">
                    <PlayCircle className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">{course.title}</p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-mist-100">
                      <div
                        className="h-full rounded-full bg-royal"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-navy-400">{percent}%</span>
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-sm font-bold text-navy">Certificates</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {courses.slice(4, 6).map((c) => (
                <div key={c.slug} className="flex items-center gap-3 rounded-xl border border-navy-100 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-100 text-signal-600">
                    <Award className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold text-navy-600">{c.title}</span>
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
                {upcoming.map((u) => (
                  <div key={u.title} className="rounded-xl bg-mist-50 p-3">
                    <p className="text-xs font-semibold text-navy">{u.title}</p>
                    <p className="mt-1 text-xs text-navy-400">{u.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <h2 className="text-sm font-bold text-navy">Recent activity</h2>
              <div className="mt-4 space-y-4">
                {[
                  "Submitted assignment: API design review",
                  "Completed lesson: Server-side caching",
                  "Joined live session: Design tokens Q&A",
                ].map((activity) => (
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
