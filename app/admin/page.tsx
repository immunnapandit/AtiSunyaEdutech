"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, BookOpenText, Newspaper, GraduationCap, Mail, FileText, Send } from "lucide-react";
import { adminApiRequest } from "@/lib/admin-api";

type Stats = {
  totalUsers: number;
  totalCourses: number;
  totalBlogs: number;
  totalEnrollments: number;
  totalContacts: number;
  totalQuotes: number;
  totalSubscribers: number;
};

const cards = [
  { key: "totalCourses", label: "Courses", icon: BookOpenText, href: "/admin/courses" },
  { key: "totalBlogs", label: "Blog posts", icon: Newspaper, href: "/admin/blog" },
  { key: "totalUsers", label: "Students", icon: Users },
  { key: "totalEnrollments", label: "Paid enrollments", icon: GraduationCap },
  { key: "totalContacts", label: "Contact messages", icon: Mail },
  { key: "totalQuotes", label: "Quote requests", icon: FileText },
  { key: "totalSubscribers", label: "Newsletter subscribers", icon: Send },
] as const;

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApiRequest<{ stats: Stats }>("/stats")
      .then((data) => setStats(data.stats))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load stats."));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-navy-400">Overview of your site content and activity.</p>

      {error && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const value = stats ? stats[card.key] : "—";
          const content = (
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition hover:shadow-lifted">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-3xl font-bold text-navy">{value}</p>
              <p className="mt-1 text-sm font-semibold text-navy-400">{card.label}</p>
            </div>
          );

          return "href" in card && card.href ? (
            <Link key={card.key} href={card.href}>
              {content}
            </Link>
          ) : (
            <div key={card.key}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
