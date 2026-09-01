"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, ChevronRight, Search } from "lucide-react";
import { adminApiRequest } from "@/lib/admin-api";

type AdminStudent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  purchasedCount: number;
  certificatesCount: number;
  createdAt: string;
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<AdminStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      const query = search ? `?search=${encodeURIComponent(search)}` : "";
      adminApiRequest<{ students: AdminStudent[] }>(`/students${query}`)
        .then((data) => setStudents(data.students))
        .catch((err) => setError(err instanceof Error ? err.message : "Could not load students."))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Students</h1>
          <p className="mt-1 text-sm text-navy-400">
            View purchased courses and issue certificates.
          </p>
        </div>
      </div>

      <div className="mt-6 relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email, or phone"
          className="w-full rounded-xl border border-navy-100 bg-white py-3 pl-10 pr-4 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
        />
      </div>

      {error && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist-50 text-xs font-bold uppercase tracking-wide text-navy-400">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Purchased courses</th>
              <th className="px-6 py-4">Certificates</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {loading && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-navy-400">
                  Loading students...
                </td>
              </tr>
            )}
            {!loading && students.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-navy-400">
                  No students found.
                </td>
              </tr>
            )}
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 font-semibold text-navy">{student.name}</td>
                <td className="px-6 py-4 text-navy-500">{student.email || student.phone || "—"}</td>
                <td className="px-6 py-4 text-navy-500">{student.purchasedCount}</td>
                <td className="px-6 py-4">
                  {student.certificatesCount > 0 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      <Award className="h-3.5 w-3.5" /> {student.certificatesCount}
                    </span>
                  ) : (
                    <span className="text-navy-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end">
                    <Link
                      href={`/admin/students/${student.id}`}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold text-brand hover:bg-brand-50"
                    >
                      View <ChevronRight className="h-4 w-4" />
                    </Link>
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
