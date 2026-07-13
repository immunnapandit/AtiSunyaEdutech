"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { ArrowUp, Mail, MapPin, Phone, Send } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { apiRequest, formToObject } from "@/lib/api";

const contactItems = [
  { icon: MapPin, title: "Training Office", lines: ["Corporate Microsoft Training", "Online & On-site Delivery"] },
  { icon: Phone, title: "Training Support", lines: ["+0029129102320", "+000 2324 39493"] },
  { icon: Mail, title: "Business Email", lines: ["training@atisunya.com", "corporate@atisunya.com"] },
];

const inputClass =
  "h-14 w-full rounded-md border border-navy-100 bg-white px-4 text-sm font-semibold text-navy outline-none transition-colors placeholder:text-navy-400/60 focus:border-brand";

export function RequestQuote() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const values = formToObject(form);

    try {
      const data = await apiRequest<{ message: string }>("/quotes", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subscribe: values.subscribe === "on",
        }),
      });
      setStatus("success");
      setMessage(data.message);
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Inquiry could not be sent.");
    }
  }

  return (
    <section className="relative bg-white py-16 md:py-20">
      <div className="absolute inset-x-0 bottom-0 top-[190px] bg-cover bg-center" style={{ backgroundImage: "url('/images/contactbanner.png')" }} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 top-[190px] bg-navy/90" aria-hidden="true" />

      <Container className="relative grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
        <form className="border-t-[5px] border-brand bg-white p-6 shadow-lifted sm:p-8 lg:p-10" onSubmit={onSubmit}>
          <h2 className="text-[2rem] font-bold leading-tight text-navy sm:text-[2.65rem] md:text-[3rem]">
            Request Corporate Training
          </h2>
          <p className="mt-3 text-base font-medium text-navy-400">
            Tell us which Microsoft services your team wants to learn, and we will suggest the right training plan.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <input className={inputClass} type="text" name="name" placeholder="Full name" aria-label="Full name" />
            <input className={inputClass} type="tel" name="phone" placeholder="Phone Number" aria-label="Phone Number" />
            <input className={inputClass} type="email" name="email" placeholder="Business Email" aria-label="Business Email" />
            <input className={inputClass} type="text" name="subject" placeholder="Training Requirement" aria-label="Training Requirement" />
          </div>

          <textarea
            className="mt-4 min-h-[132px] w-full rounded-md border border-navy-100 bg-white px-4 py-4 text-sm font-semibold text-navy outline-none transition-colors placeholder:text-navy-400/60 focus:border-brand"
            name="message"
            placeholder="Tell us about your team size, preferred Microsoft services, and training timeline"
            aria-label="Tell us about your team size, preferred Microsoft services, and training timeline"
          />

          {message && (
            <p className={`mt-4 rounded-md px-4 py-3 text-sm font-bold ${status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {message}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-sm font-semibold text-navy">
              <input type="checkbox" name="subscribe" className="h-5 w-5 rounded border-navy-400 text-brand focus:ring-brand" />
              Send me Microsoft training updates
            </label>
            <button type="submit" disabled={status === "loading"} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand px-7 text-sm font-extrabold text-white transition-colors hover:bg-brand-600 disabled:opacity-70 sm:min-w-[180px]">
              {status === "loading" ? "Sending..." : "Send Inquiry"}
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div className="space-y-6 py-8 text-white lg:pb-10">
          {contactItems.map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                <item.icon className="h-8 w-8" strokeWidth={1.8} />
              </span>
              <span>
                <strong className="block text-xl font-extrabold">{item.title}</strong>
                {item.lines.map((line) => (
                  <span key={line} className="mt-1 block text-sm font-bold leading-snug text-white/85">
                    {line}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </Container>

      <Link href="#top" aria-label="Back to top" className="absolute bottom-6 right-6 hidden h-11 w-11 items-center justify-center bg-brand text-white transition-colors hover:bg-brand-600 md:flex xl:right-10">
        <ArrowUp className="h-5 w-5" />
      </Link>
    </section>
  );
}

