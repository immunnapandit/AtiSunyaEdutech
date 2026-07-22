"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { adminApiRequest } from "@/lib/admin-api";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type Section = { heading: string; body: string };
type Seo = { title: string; description: string; keywords: string[] };

export type BlogFormValues = {
  slug: string;
  headline: string;
  creator: string;
  category: string;
  tags: string[];
  summary: string;
  readingTime: string;
  thumbnailGradient: string;
  featuredImage: string;
  sections: Section[];
  seo: Seo;
  published: boolean;
};

const emptyPost: BlogFormValues = {
  slug: "",
  headline: "",
  creator: "Atisunya Team",
  category: "General",
  tags: [],
  summary: "",
  readingTime: "",
  thumbnailGradient: "",
  featuredImage: "",
  sections: [],
  seo: { title: "", description: "", keywords: [] },
  published: true,
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10";
const labelClass = "text-sm font-semibold text-navy";

export function BlogForm({
  mode,
  initialValues,
}: {
  mode: "create" | "edit";
  initialValues?: Partial<BlogFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<BlogFormValues>({ ...emptyPost, ...initialValues });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function updateSection(index: number, patch: Partial<Section>) {
    setValues((current) => ({
      ...current,
      sections: current.sections.map((section, i) => (i === index ? { ...section, ...patch } : section)),
    }));
  }

  function addSection() {
    setValues((current) => ({ ...current, sections: [...current.sections, { heading: "", body: "" }] }));
  }

  function removeSection(index: number) {
    setValues((current) => ({ ...current, sections: current.sections.filter((_, i) => i !== index) }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...values,
      sections: values.sections.filter((section) => section.heading.trim() || section.body.trim()),
    };

    try {
      if (mode === "create") {
        await adminApiRequest("/blog", { method: "POST", body: JSON.stringify(payload) });
      } else {
        await adminApiRequest(`/blog/${initialValues?.slug}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save blog post.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}

      <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-bold text-navy">Basic details</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="slug">Slug *</label>
            <input
              id="slug"
              required
              value={values.slug}
              onChange={(event) => update("slug", event.target.value.trim().toLowerCase())}
              placeholder="choosing-the-right-certification"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="headline">Headline *</label>
            <input
              id="headline"
              required
              value={values.headline}
              onChange={(event) => update("headline", event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="creator">Author</label>
            <input
              id="creator"
              value={values.creator}
              onChange={(event) => update("creator", event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="category">Category</label>
            <input
              id="category"
              value={values.category}
              onChange={(event) => update("category", event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="readingTime">Reading time</label>
            <input
              id="readingTime"
              value={values.readingTime}
              onChange={(event) => update("readingTime", event.target.value)}
              placeholder="5 min read"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="tags">Tags (comma separated)</label>
            <input
              id="tags"
              value={values.tags.join(", ")}
              onChange={(event) =>
                update("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))
              }
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="summary">Summary</label>
            <textarea
              id="summary"
              rows={3}
              value={values.summary}
              onChange={(event) => update("summary", event.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-bold text-navy">Media</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <ImageUploadField
            label="Featured image"
            value={values.featuredImage}
            onChange={(url) => update("featuredImage", url)}
            folder="atisunya/blog"
          />
          <div>
            <label className={labelClass} htmlFor="thumbnailGradient">Thumbnail gradient (CSS background)</label>
            <input
              id="thumbnailGradient"
              value={values.thumbnailGradient}
              onChange={(event) => update("thumbnailGradient", event.target.value)}
              placeholder="linear-gradient(135deg, #eef2ff, #e0f2fe)"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">Body sections</h2>
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand/20 bg-brand/5 px-3 py-1.5 text-xs font-bold text-brand hover:bg-brand/10"
          >
            <Plus className="h-3.5 w-3.5" /> Add section
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {values.sections.length === 0 && (
            <p className="text-sm text-navy-400">No sections yet. Add one to write the article body.</p>
          )}
          {values.sections.map((section, index) => (
            <div key={index} className="rounded-xl border border-navy-100 bg-mist-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <input
                  value={section.heading}
                  onChange={(event) => updateSection(index, { heading: event.target.value })}
                  placeholder="Section heading"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  aria-label="Remove section"
                  className="shrink-0 rounded-lg p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                rows={5}
                value={section.body}
                onChange={(event) => updateSection(index, { body: event.target.value })}
                placeholder="Section body"
                className={`${inputClass} mt-3`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-bold text-navy">SEO</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="seoTitle">Meta title</label>
            <input
              id="seoTitle"
              value={values.seo.title}
              onChange={(event) => update("seo", { ...values.seo, title: event.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="seoKeywords">Keywords (comma separated)</label>
            <input
              id="seoKeywords"
              value={values.seo.keywords.join(", ")}
              onChange={(event) =>
                update("seo", {
                  ...values.seo,
                  keywords: event.target.value.split(",").map((keyword) => keyword.trim()).filter(Boolean),
                })
              }
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="seoDescription">Meta description</label>
            <textarea
              id="seoDescription"
              rows={2}
              value={values.seo.description}
              onChange={(event) => update("seo", { ...values.seo, description: event.target.value })}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
        <label className="flex items-center gap-2 text-sm font-semibold text-navy">
          <input
            type="checkbox"
            checked={values.published}
            onChange={(event) => update("published", event.target.checked)}
            className="h-4 w-4 rounded border-navy-100 text-brand focus:ring-brand"
          />
          Published (visible on the site)
        </label>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="rounded-xl border border-navy-100 px-6 py-3 text-sm font-bold text-navy-500 hover:bg-mist-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {loading ? "Saving..." : mode === "create" ? "Publish post" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
