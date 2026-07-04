import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Atisunya Edutech team.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Eyebrow>Contact us</Eyebrow>
          <h1 className="mt-3 text-display-md font-extrabold text-navy text-balance">
            Let&apos;s talk about what you&apos;re trying to build.
          </h1>
          <p className="mt-4 text-navy-400">
            Questions about a course, a corporate program, or a partnership â€”
            our team typically replies within one business day.
          </p>

          <div className="mt-10 space-y-5">
            {[
              { icon: Mail, label: "hello@atisunyaedutech.com" },
              { icon: Phone, label: "+1 (415) 555-0138" },
              { icon: MapPin, label: "San Francisco, CA" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-50 text-royal-700">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-navy-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <form className="rounded-2xl border border-navy-100 p-8 shadow-soft">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-navy" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-sm focus:border-royal focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-navy" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-sm focus:border-royal focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-navy" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-sm focus:border-royal focus:outline-none"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-navy" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-sm focus:border-royal focus:outline-none"
            />
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full justify-center">
            Send message
          </Button>
        </form>
      </Container>
    </div>
  );
}

