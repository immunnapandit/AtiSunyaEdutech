"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import { adminApiRequest } from "@/lib/admin-api";

type AdminCategory = {
  _id: string;
  name: string;
  count: number;
  icon: string;
};

const inputClass =
  "h-11 w-full rounded-xl border border-navy-100 bg-white px-4 text-sm text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  function load() {
    adminApiRequest<{ categories: AdminCategory[] }>("/categories")
      .then((data) => setCategories(data.categories))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load categories."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setError("");

    try {
      await adminApiRequest("/categories", {
        method: "POST",
        body: JSON.stringify({ name: name.trim(), icon: icon.trim() || undefined }),
      });
      setName("");
      setIcon("");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create category.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(category: AdminCategory) {
    if (!window.confirm(`Delete category "${category.name}"? Courses already using it will keep the name as text.`)) {
      return;
    }

    try {
      await adminApiRequest(`/categories/${category._id}`, { method: "DELETE" });
      setCategories((current) => current.filter((item) => item._id !== category._id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete category.");
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-navy">Categories</h1>
        <p className="mt-1 text-sm text-navy-400">
          These are the categories admins can assign to a course, and the exact options shown in the
          &quot;Products&quot; filter on the courses page.
        </p>
      </div>

      {error && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}

      <form
        onSubmit={handleCreate}
        className="mt-6 flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-soft sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="text-sm font-semibold text-navy" htmlFor="categoryName">
            Category name *
          </label>
          <input
            id="categoryName"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Dynamics 365"
            className={`${inputClass} mt-1.5`}
          />
        </div>
        <div className="flex-1">
          <label className="text-sm font-semibold text-navy" htmlFor="categoryIcon">
            Icon name (optional)
          </label>
          <input
            id="categoryIcon"
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
            placeholder="target"
            className={`${inputClass} mt-1.5`}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          {saving ? "Adding..." : "Add category"}
        </button>
      </form>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist-50 text-xs font-bold uppercase tracking-wide text-navy-400">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Icon</th>
              <th className="px-6 py-4">Courses</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {loading && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-navy-400">
                  Loading categories...
                </td>
              </tr>
            )}
            {!loading && categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-navy-400">
                  No categories yet. Add one above.
                </td>
              </tr>
            )}
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="px-6 py-4 font-semibold text-navy">{category.name}</td>
                <td className="px-6 py-4 text-navy-500">{category.icon}</td>
                <td className="px-6 py-4 text-navy-500">{category.count}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
                      aria-label={`Delete ${category.name}`}
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
