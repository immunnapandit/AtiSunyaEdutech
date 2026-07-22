"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { adminApiRequest } from "@/lib/admin-api";
import { ImageUploadField } from "@/components/admin/image-upload-field";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type CurriculumModule = { title: string; lessons: string[] };
type FaqEntry = { question: string; answer: string };
type Seo = { title: string; description: string; keywords: string[] };

export type CourseFormValues = {
  slug: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  studentsCount: number;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number | "";
  image: string;
  banner: string;
  thumbnailGradient: string;
  description: string;
  curriculum: CurriculumModule[];
  faqs: FaqEntry[];
  seo: Seo;
  featured: boolean;
  published: boolean;
};

const emptyCourse: CourseFormValues = {
  slug: "",
  title: "",
  category: "",
  difficulty: "Beginner",
  duration: "",
  studentsCount: 0,
  instructor: "",
  instructorAvatar: "",
  rating: 0,
  reviewCount: 0,
  price: 0,
  originalPrice: "",
  image: "",
  banner: "",
  thumbnailGradient: "",
  description: "",
  curriculum: [],
  faqs: [],
  seo: { title: "", description: "", keywords: [] },
  featured: false,
  published: true,
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10";
const labelClass = "text-sm font-semibold text-navy";

export function CourseForm({
  mode,
  initialValues,
}: {
  mode: "create" | "edit";
  initialValues?: Partial<CourseFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<CourseFormValues>({ ...emptyCourse, ...initialValues });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  useEffect(() => {
    adminApiRequest<{ categories: { name: string }[] }>("/categories")
      .then((data) => setCategories(data.categories))
      .catch(() => {});
  }, []);

  function update<K extends keyof CourseFormValues>(key: K, value: CourseFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function updateModule(index: number, patch: Partial<CurriculumModule>) {
    setValues((current) => ({
      ...current,
      curriculum: current.curriculum.map((module, i) => (i === index ? { ...module, ...patch } : module)),
    }));
  }

  function addModule() {
    setValues((current) => ({
      ...current,
      curriculum: [...current.curriculum, { title: "", lessons: [] }],
    }));
  }

  function removeModule(index: number) {
    setValues((current) => ({
      ...current,
      curriculum: current.curriculum.filter((_, i) => i !== index),
    }));
  }

  function updateFaq(index: number, patch: Partial<FaqEntry>) {
    setValues((current) => ({
      ...current,
      faqs: current.faqs.map((faq, i) => (i === index ? { ...faq, ...patch } : faq)),
    }));
  }

  function addFaq() {
    setValues((current) => ({ ...current, faqs: [...current.faqs, { question: "", answer: "" }] }));
  }

  function removeFaq(index: number) {
    setValues((current) => ({ ...current, faqs: current.faqs.filter((_, i) => i !== index) }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...values,
      originalPrice: values.originalPrice === "" ? undefined : Number(values.originalPrice),
      curriculum: values.curriculum
        .filter((module) => module.title.trim())
        .map((module) => ({ ...module, lessons: module.lessons.filter((lesson) => lesson.trim()) })),
      faqs: values.faqs.filter((faq) => faq.question.trim() && faq.answer.trim()),
    };

    try {
      if (mode === "create") {
        await adminApiRequest("/courses", { method: "POST", body: JSON.stringify(payload) });
      } else {
        await adminApiRequest(`/courses/${initialValues?.slug}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      }
      router.push("/admin/courses");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save course.");
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
            <label className={labelClass} htmlFor="title">Title *</label>
            <input
              id="title"
              required
              value={values.title}
              onChange={(event) => {
                const title = event.target.value;
                update("title", title);
                if (!slugTouched) {
                  update("slug", slugify(title));
                }
              }}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="slug">Slug *</label>
            <input
              id="slug"
              required
              value={values.slug}
              onChange={(event) => {
                setSlugTouched(true);
                update("slug", event.target.value.trim().toLowerCase());
              }}
              placeholder="microsoft-azure-fundamentals"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-navy-400">Auto-generated from the title. Edit only if you need a custom URL.</p>
          </div>
          <div>
            <label className={labelClass} htmlFor="category">Category *</label>
            <select
              id="category"
              required
              value={values.category}
              onChange={(event) => update("category", event.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
              {values.category && !categories.some((cat) => cat.name === values.category) && (
                <option value={values.category}>{values.category}</option>
              )}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              value={values.difficulty}
              onChange={(event) => update("difficulty", event.target.value as CourseFormValues["difficulty"])}
              className={inputClass}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="duration">Duration</label>
            <input
              id="duration"
              value={values.duration}
              onChange={(event) => update("duration", event.target.value)}
              placeholder="6 weeks"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="studentsCount">Students count</label>
            <input
              id="studentsCount"
              type="number"
              min={0}
              value={values.studentsCount}
              onChange={(event) => update("studentsCount", Number(event.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="instructor">Instructor</label>
            <input
              id="instructor"
              value={values.instructor}
              onChange={(event) => update("instructor", event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="instructorAvatar">Instructor initials</label>
            <input
              id="instructorAvatar"
              value={values.instructorAvatar}
              onChange={(event) => update("instructorAvatar", event.target.value)}
              placeholder="MS"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="rating">Rating (0-5)</label>
            <input
              id="rating"
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={values.rating}
              onChange={(event) => update("rating", Number(event.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="reviewCount">Review count</label>
            <input
              id="reviewCount"
              type="number"
              min={0}
              value={values.reviewCount}
              onChange={(event) => update("reviewCount", Number(event.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="price">Price (INR) *</label>
            <input
              id="price"
              type="number"
              min={0}
              required
              value={values.price}
              onChange={(event) => update("price", Number(event.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="originalPrice">Original price (INR)</label>
            <input
              id="originalPrice"
              type="number"
              min={0}
              value={values.originalPrice}
              onChange={(event) =>
                update("originalPrice", event.target.value === "" ? "" : Number(event.target.value))
              }
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-bold text-navy">Media & description</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <ImageUploadField
            label="Course image"
            value={values.image}
            onChange={(url) => update("image", url)}
            folder="atisunya/courses"
          />
          <ImageUploadField
            label="Banner image"
            value={values.banner}
            onChange={(url) => update("banner", url)}
            folder="atisunya/courses"
          />
          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="thumbnailGradient">Thumbnail gradient classes</label>
            <input
              id="thumbnailGradient"
              value={values.thumbnailGradient}
              onChange={(event) => update("thumbnailGradient", event.target.value)}
              placeholder="from-royal-100 via-royal/20 to-cyan-100"
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={4}
              value={values.description}
              onChange={(event) => update("description", event.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">Curriculum</h2>
          <button
            type="button"
            onClick={addModule}
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand/20 bg-brand/5 px-3 py-1.5 text-xs font-bold text-brand hover:bg-brand/10"
          >
            <Plus className="h-3.5 w-3.5" /> Add module
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {values.curriculum.length === 0 && (
            <p className="text-sm text-navy-400">No modules yet. Add one to outline the curriculum.</p>
          )}
          {values.curriculum.map((module, index) => (
            <div key={index} className="rounded-xl border border-navy-100 bg-mist-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <input
                  value={module.title}
                  onChange={(event) => updateModule(index, { title: event.target.value })}
                  placeholder="Module title"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeModule(index)}
                  className="shrink-0 rounded-lg p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <label className="mt-3 block text-xs font-semibold text-navy-400">
                Lessons (one per line)
              </label>
              <textarea
                rows={3}
                value={module.lessons.join("\n")}
                onChange={(event) => updateModule(index, { lessons: event.target.value.split("\n") })}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">FAQs</h2>
          <button
            type="button"
            onClick={addFaq}
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand/20 bg-brand/5 px-3 py-1.5 text-xs font-bold text-brand hover:bg-brand/10"
          >
            <Plus className="h-3.5 w-3.5" /> Add FAQ
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {values.faqs.length === 0 && <p className="text-sm text-navy-400">No FAQs yet.</p>}
          {values.faqs.map((faq, index) => (
            <div key={index} className="rounded-xl border border-navy-100 bg-mist-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <input
                  value={faq.question}
                  onChange={(event) => updateFaq(index, { question: event.target.value })}
                  placeholder="Question"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="shrink-0 rounded-lg p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                rows={2}
                value={faq.answer}
                onChange={(event) => updateFaq(index, { answer: event.target.value })}
                placeholder="Answer"
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

      <section className="flex items-center gap-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
        <label className="flex items-center gap-2 text-sm font-semibold text-navy">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(event) => update("featured", event.target.checked)}
            className="h-4 w-4 rounded border-navy-100 text-brand focus:ring-brand"
          />
          Featured course
        </label>
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
          onClick={() => router.push("/admin/courses")}
          className="rounded-xl border border-navy-100 px-6 py-3 text-sm font-bold text-navy-500 hover:bg-mist-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {loading ? "Saving..." : mode === "create" ? "Create course" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
