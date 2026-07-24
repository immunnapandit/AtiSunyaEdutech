"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { adminApiRequest } from "@/lib/admin-api";

type AdminCourse = {
  slug: string;
  title: string;
  category: string;
  price: number;
  featured: boolean;
  published: boolean;
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function load() {
    adminApiRequest<{ courses: AdminCourse[] }>("/courses")
      .then((data) => setCourses(data.courses))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load courses."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(slug: string) {
    if (!window.confirm(`Delete course "${slug}"? This cannot be undone.`)) return;

    try {
      await adminApiRequest(`/courses/${slug}`, { method: "DELETE" });
      setCourses((current) => current.filter((course) => course.slug !== slug));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete course.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Courses</h1>
          <p className="mt-1 text-sm text-navy-400">Create, edit, and publish courses.</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" /> New course
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist-50 text-xs font-bold uppercase tracking-wide text-navy-400">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {loading && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-navy-400">
                  Loading courses...
                </td>
              </tr>
            )}
            {!loading && courses.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-navy-400">
                  No courses yet. Create your first one.
                </td>
              </tr>
            )}
            {courses.map((course) => (
              <tr key={course.slug}>
                <td className="px-6 py-4 font-semibold text-navy">{course.title}</td>
                <td className="px-6 py-4 text-navy-500">{course.category}</td>
                <td className="px-6 py-4 text-navy-500">
                  INR {course.price?.toLocaleString("en-IN") ?? 0}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      course.published ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {course.published ? "Published" : "Draft"}
                  </span>
                  {course.featured && (
                    <span className="ml-2 inline-flex rounded-full bg-royal-50 px-3 py-1 text-xs font-bold text-royal-700">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/courses/${course.slug}`}
                      aria-label={`Edit ${course.title}`}
                      className="rounded-lg p-2 text-navy-500 hover:bg-brand-50 hover:text-brand"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(course.slug)}
                      aria-label={`Delete ${course.title}`}
                      className="rounded-lg p-2 text-navy-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
