"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Award, ArrowLeft, Mail, Phone, CalendarDays, CheckCircle2 } from "lucide-react";
import { adminApiRequest } from "@/lib/admin-api";

type PurchasedCourse = {
  slug: string;
  title: string;
  category: string;
  price: number;
  paidAt: string | null;
  orderId: string | null;
  paymentId: string | null;
  certificate: { certificateId: string; issuedAt: string } | null;
};

type StudentDetail = {
  student: {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
  };
  purchasedCourses: PurchasedCourse[];
};

export default function AdminStudentDetailPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busySlug, setBusySlug] = useState<string | null>(null);

  function load() {
    adminApiRequest<StudentDetail>(`/students/${params.id}`)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load student."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function issueCertificate(courseSlug: string) {
    setBusySlug(courseSlug);
    setError("");
    try {
      await adminApiRequest(`/students/${params.id}/certificates`, {
        method: "POST",
        body: JSON.stringify({ courseSlug }),
      });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not issue certificate.");
    } finally {
      setBusySlug(null);
    }
  }

  async function revokeCertificate(courseSlug: string) {
    if (!window.confirm("Revoke this certificate? The student will no longer be able to download it.")) return;

    setBusySlug(courseSlug);
    setError("");
    try {
      await adminApiRequest(`/students/${params.id}/certificates/${courseSlug}`, { method: "DELETE" });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not revoke certificate.");
    } finally {
      setBusySlug(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-navy-400">Loading student...</p>;
  }

  if (error && !data) {
    return <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>;
  }

  if (!data) return null;

  const { student, purchasedCourses } = data;

  return (
    <div>
      <Link href="/admin/students" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-500 hover:text-brand">
        <ArrowLeft className="h-4 w-4" /> Back to students
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
        <div>
          <h1 className="text-2xl font-bold text-navy">{student.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-navy-500">
            {student.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" /> {student.email}
              </span>
            )}
            {student.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" /> {student.phone}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> Joined {formatDate(student.createdAt)}
            </span>
          </div>
        </div>
        <div className="rounded-xl bg-brand-50 px-4 py-3 text-center">
          <p className="text-2xl font-bold text-brand">{purchasedCourses.length}</p>
          <p className="text-xs font-semibold text-navy-400">Purchased courses</p>
        </div>
      </div>

      {error && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist-50 text-xs font-bold uppercase tracking-wide text-navy-400">
            <tr>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Purchased on</th>
              <th className="px-6 py-4">Certificate</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {purchasedCourses.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-navy-400">
                  This student hasn&apos;t purchased any courses yet.
                </td>
              </tr>
            )}
            {purchasedCourses.map((course) => (
              <tr key={course.slug}>
                <td className="px-6 py-4">
                  <p className="font-semibold text-navy">{course.title}</p>
                  <p className="text-xs text-navy-400">{course.category}</p>
                </td>
                <td className="px-6 py-4 text-navy-500">{formatDate(course.paidAt)}</td>
                <td className="px-6 py-4">
                  {course.certificate ? (
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Issued
                      </span>
                      <p className="mt-1 text-xs text-navy-400">
                        {course.certificate.certificateId} · {formatDate(course.certificate.issuedAt)}
                      </p>
                    </div>
                  ) : (
                    <span className="text-navy-400">Not issued</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end">
                    {course.certificate ? (
                      <button
                        type="button"
                        disabled={busySlug === course.slug}
                        onClick={() => revokeCertificate(course.slug)}
                        className="rounded-lg px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        Revoke
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={busySlug === course.slug}
                        onClick={() => issueCertificate(course.slug)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-50"
                      >
                        <Award className="h-4 w-4" />
                        {busySlug === course.slug ? "Issuing..." : "Issue Certificate"}
                      </button>
                    )}
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

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", { dateStyle: "medium" });
}
