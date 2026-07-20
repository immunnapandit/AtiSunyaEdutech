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
    <form
      className="rounded-[28px] bg-[#2B4DFF] p-6 shadow-xl md:p-8"
      onSubmit={onSubmit}
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Subscribe to Our
            <br />
            Newsletter
          </h2>
        </div>

        {/* Right Side */}
        <div className="flex overflow-hidden rounded-2xl bg-white p-2">
          <input
            name="email"
            type="email"
            required
            placeholder="Enter Your Email"
            aria-label="Email"
            className="flex-1 border-none px-6 text-lg text-slate-900 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#0A165E] px-8 py-4 font-bold text-white transition hover:bg-[#08124d]"
          >
            {loading ? "Sending..." : "Submit Now"}
          </button>
        </div>
      </div>

      {(message || error) && (
        <p
          className={`mt-4 text-sm font-semibold ${
            message ? "text-green-100" : "text-red-100"
          }`}
        >
          {message || error}
        </p>
      )}
    </form>
  );
 }}