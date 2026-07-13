"use client";

import { useState } from "react";
import { Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest, formToObject } from "@/lib/api";

const fieldStyles =
  "w-full border-0 border-b border-navy-100 bg-transparent px-0 py-2.5 text-sm font-medium text-navy placeholder:text-navy-400 transition-colors duration-300 hover:border-brand focus:border-brand focus:outline-none md:text-base";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;

    try {
      const data = await apiRequest<{ message: string }>("/contact", {
        method: "POST",
        body: JSON.stringify(formToObject(form)),
      });
      setStatus("success");
      setMessage(data.message);
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Message could not be sent.");
    }
  }

  return (
    <form
      className="relative flex h-full flex-col rounded-[22px] border border-brand/10 bg-mist-50/90 p-5 shadow-soft md:p-7"
      onSubmit={onSubmit}
    >
      <div className="absolute inset-0 -z-10 rounded-[22px] bg-[radial-gradient(circle_at_top_right,rgba(4,102,200,0.13),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.94),rgba(238,243,250,0.9))]" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy md:text-3xl">Get in Touch</h2>
          <p className="mt-2 text-sm leading-6 text-navy-400 md:text-base">
            Share your enquiry. We respect your time and never spam.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-brand shadow-soft">
          <Clock3 className="h-3.5 w-3.5" />
          24h response
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input name="name" type="text" required placeholder="Full Name*" className={fieldStyles} />
        <input name="email" type="email" required placeholder="Email Address*" className={fieldStyles} />
        <input name="subject" type="text" required placeholder="Subject *" className={`${fieldStyles} md:col-span-2`} />
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Your Message*"
          className={`${fieldStyles} min-h-36 resize-y md:col-span-2`}
        />
      </div>

      {message && (
        <p
          className={`mt-5 rounded-xl px-4 py-3 text-sm font-semibold ${
            status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </p>
      )}

      <div className="mt-auto pt-6">
        <Button type="submit" size="md" withArrow className="rounded-full px-8" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
