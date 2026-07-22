"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { apiRequest, formToObject } from "@/lib/api";

export function NewsletterForm({
  variant = "dark",
}: {
  variant?: "dark" | "footer";
}) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const form = event.currentTarget;

    try {
      const data = await apiRequest<{ message: string }>("/newsletter", {
        method: "POST",
        body: JSON.stringify(formToObject(form)),
      });
      setMessage(data.message);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Subscription failed.");
    } finally {
      setLoading(false);
    }
  }

  if (variant === "footer") {
    return (
      <form className="rounded-lg bg-white p-6 shadow-soft md:p-8" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_170px] lg:items-end">
          <input name="name" type="text" placeholder="Your Full Name" aria-label="Your Full Name" className="h-12 w-full border-0 border-b border-navy-100 bg-transparent px-0 text-base font-medium text-navy outline-none placeholder:text-navy-400/60 focus:border-brand" />
          <input name="email" type="email" required placeholder="Your Email Address" aria-label="Your Email Address" className="h-12 w-full border-0 border-b border-navy-100 bg-transparent px-0 text-base font-medium text-navy outline-none placeholder:text-navy-400/60 focus:border-brand" />
          <button type="submit" disabled={loading} className="h-12 rounded-md bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-70">
            {loading ? "Sending..." : "Subscribe"}
          </button>
        </div>
        {(message || error) && <p className={`mt-4 text-sm font-semibold ${message ? "text-green-700" : "text-red-700"}`}>{message || error}</p>}
      </form>
    );
  }

  return (
    <form className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
      <input
        name="email"
        type="email"
        required
        placeholder="you@email.com"
        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-navy transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? "Sending..." : "Subscribe"} <ArrowRight className="h-4 w-4" />
      </button>
      {(message || error) && <p className={`sm:absolute sm:top-full sm:mt-3 text-sm font-semibold ${message ? "text-cyan-100" : "text-red-200"}`}>{message || error}</p>}
    </form>
  );
}
