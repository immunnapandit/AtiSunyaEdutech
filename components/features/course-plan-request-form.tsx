"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";

const inputClass =
  "mt-2 w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/10";

export function CoursePlanRequestForm({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [values, setValues] = useState({ name: "", email: "", country: "" });

  function openModal() {
    setMessage("");
    setError("");
    setOpen(true);
  }

  function closeModal() {
    if (loading) return;
    setOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await apiRequest<{ message: string }>(`/courses/${slug}/course-plan/request`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      setMessage(data.message || "The course plan has been sent to your email.");
      setValues({ name: "", email: "", country: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        size="lg"
        variant="secondary"
        className="w-full justify-center"
        onClick={openModal}
      >
        Download Course Plan
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/60" onClick={closeModal} />

          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-lifted sm:p-8">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-navy-400 hover:bg-mist-100 hover:text-navy"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-navy">Get the Course Content</h2>
            <p className="mt-2 text-sm text-navy-400">
              Fill in your details and the course content will be sent to your email address.
            </p>

            {message ? (
              <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {message}
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-semibold text-navy" htmlFor="courseplan-name">
                    Full name
                  </label>
                  <input
                    id="courseplan-name"
                    required
                    value={values.name}
                    onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy" htmlFor="courseplan-email">
                    Email address
                  </label>
                  <input
                    id="courseplan-email"
                    type="email"
                    required
                    value={values.email}
                    onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy" htmlFor="courseplan-country">
                    Country
                  </label>
                  <input
                    id="courseplan-country"
                    required
                    value={values.country}
                    onChange={(event) => setValues((current) => ({ ...current, country: event.target.value }))}
                    className={inputClass}
                  />
                </div>

                {error && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
                )}

                <Button type="submit" size="lg" className="w-full justify-center" disabled={loading}>
                  {loading ? "Sending..." : "Send Course Plan"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
