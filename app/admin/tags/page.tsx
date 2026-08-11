"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminApiRequest } from "@/lib/admin-api";

type TagType = "role" | "subject";

type AdminTag = {
  _id: string;
  type: TagType;
  name: string;
};

const inputClass =
  "h-11 w-full rounded-xl border border-navy-100 bg-white px-4 text-sm text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10";

const tabs: { type: TagType; label: string; description: string }[] = [
  { type: "role", label: "Roles", description: "Options shown in the \"Roles\" filter on the courses page." },
  { type: "subject", label: "Subjects", description: "Options shown in the \"Subjects\" filter on the courses page." },
];

export default function AdminTagsPage() {
  const [activeType, setActiveType] = useState<TagType>("role");
  const [tags, setTags] = useState<AdminTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");

  function load(type: TagType) {
    setLoading(true);
    adminApiRequest<{ tags: AdminTag[] }>(`/tags?type=${type}`)
      .then((data) => setTags(data.tags))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load tags."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load(activeType);
  }, [activeType]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setError("");

    try {
      await adminApiRequest("/tags", {
        method: "POST",
        body: JSON.stringify({ type: activeType, name: name.trim() }),
      });
      setName("");
      load(activeType);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create tag.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(tag: AdminTag) {
    if (!window.confirm(`Delete "${tag.name}"? Courses using it will no longer match this filter.`)) {
      return;
    }

    try {
      await adminApiRequest(`/tags/${tag._id}`, { method: "DELETE" });
      setTags((current) => current.filter((item) => item._id !== tag._id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete tag.");
    }
  }

  const activeTab = tabs.find((tab) => tab.type === activeType)!;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-navy">Filter tags</h1>
        <p className="mt-1 text-sm text-navy-400">
          Manage the Role and Subject options admins can assign to a course, and users can filter by on the
          courses page.
        </p>
      </div>

      <div className="mt-6 inline-flex rounded-xl border border-navy-100 bg-white p-1 shadow-soft">
        {tabs.map((tab) => (
          <button
            key={tab.type}
            type="button"
            onClick={() => setActiveType(tab.type)}
            className={cn(
              "rounded-lg px-5 py-2 text-sm font-bold transition",
              activeType === tab.type ? "bg-brand text-white" : "text-navy-500 hover:bg-brand-50 hover:text-brand"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-navy-400">{activeTab.description}</p>

      {error && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}

      <form
        onSubmit={handleCreate}
        className="mt-6 flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-soft sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="text-sm font-semibold text-navy" htmlFor="tagName">
            {activeTab.label.slice(0, -1)} name *
          </label>
          <input
            id="tagName"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={activeType === "role" ? "Administrator" : "Cloud"}
            className={`${inputClass} mt-1.5`}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          {saving ? "Adding..." : `Add ${activeTab.label.slice(0, -1).toLowerCase()}`}
        </button>
      </form>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist-50 text-xs font-bold uppercase tracking-wide text-navy-400">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {loading && (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-navy-400">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && tags.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-navy-400">
                  No {activeTab.label.toLowerCase()} yet. Add one above.
                </td>
              </tr>
            )}
            {tags.map((tag) => (
              <tr key={tag._id}>
                <td className="px-6 py-4 font-semibold text-navy">{tag.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleDelete(tag)}
                      aria-label={`Delete ${tag.name}`}
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
