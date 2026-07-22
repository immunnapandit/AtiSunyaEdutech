import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  PhoneCall,
} from "lucide-react";
import { ContactForm } from "@/components/features/contact-form";
import { Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the AtiSunya Edutech team.",
};

const contactItems = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["AtiSunya Edutech", "India based online learning studio"],
  },
  {
    icon: Mail,
    title: "Email Address",
    lines: ["info@atisunya.co", "support@atisunyaedutech.com"],
  },
  {
    icon: PhoneCall,
    title: "Phone Number",
    lines: ["+91 80818 18673", "+91 82991 56511"],
  },
];

const quickSignals = [
  { icon: Clock3, label: "Reply within one business day" },
  { icon: CheckCircle2, label: "Course, career, and partnership guidance" },
  { icon: MessageCircle, label: "Clear next steps after every enquiry" },
];

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-white pt-[152px] md:pt-[152px]">
      <section className="relative isolate min-h-[300px] overflow-hidden bg-navy-900 md:min-h-[360px]">
        <Image
          src="/images/contactbanner.png"
          alt="Students collaborating on a laptop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/65" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,102,200,0.38),rgba(8,13,24,0.22),rgba(8,13,24,0.72))]" />
        <div className="absolute right-[12%] top-[58%] hidden grid-cols-2 gap-3 opacity-25 lg:grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={index}
              className="h-2.5 w-9 skew-x-[-20deg] rounded-sm bg-white"
            />
          ))}
        </div>

        <Container className="relative z-10 flex min-h-[300px] items-center justify-center text-center md:min-h-[360px]">
          <div className="max-w-3xl">
            <h1 className="text-display-sm font-semibold text-white md:text-display-md">
              Contact Us
            </h1>
            <div className="mx-auto mt-5 inline-flex items-center gap-2.5 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-glow">
              <Link href="/" className="transition-colors hover:text-brand-100">
                Home
              </Link>
              <ArrowRight className="h-4 w-4" />
              <span>Contact Us</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative py-12 md:py-14">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-mist-50 to-white" />
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-brand/5 blur-3xl" />
        <Container className="relative">
          <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Start the conversation
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold text-navy md:text-display-sm">
                We&apos;re always excited to hear from you!
              </h2>
              <div className="mt-4 h-1.5 w-36 rounded-full bg-brand" />
            </div>
            <p className="max-w-2xl text-base leading-7 text-navy-400 lg:justify-self-end">
              Tell us what you want to learn, build, or solve. AtiSunya helps
              with course paths, mentorship, corporate training, and partnership
              enquiries with clear next steps.
            </p>
          </div>

          <div className="rounded-[26px] border border-navy-100/80 bg-white p-4 shadow-lifted md:p-5">
            <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[0.86fr_1.14fr]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group relative flex min-h-[132px] overflow-hidden rounded-2xl border border-navy-100 bg-mist-50/70 p-4 transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-brand/25 hover:bg-white hover:shadow-glow"
                  >
                    <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-brand/8 transition duration-300 group-hover:scale-125" />
                    <div className="relative flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-dashed border-brand/45 bg-brand-50 text-brand transition duration-300 group-hover:bg-brand group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-navy">
                          {item.title}
                        </h3>
                        <div className="mt-2 space-y-1 text-sm leading-6 text-navy-400 md:text-base">
                          {item.lines.map((line) => (
                            <p
                              key={line}
                              className="origin-left break-words transition duration-300 hover:scale-[1.025] hover:text-brand"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>

              <div className="relative">
                <div className="absolute -left-5 -top-5 h-20 w-20 rounded-full bg-brand/10 blur-2xl" />
                <ContactForm />
                </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-mist-50 py-16 md:py-20">
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(120deg,rgba(4,102,200,0.08)_1px,transparent_1px),linear-gradient(60deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:42px_42px]" />
        <Container className="relative">
          <div className="grid grid-cols-1 overflow-hidden rounded-[24px] bg-white shadow-lifted lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative bg-navy p-7 text-white md:p-9">
              <div className="absolute right-6 top-6 h-16 w-16 rounded-full border border-white/10" />
              <div className="absolute bottom-8 right-10 h-10 w-10 rotate-45 rounded-xl border border-white/15 bg-white/[0.03]" />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand shadow-glow transition duration-300 hover:scale-105">
                  <Navigation className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-100">
                  Map location
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white md:text-display-sm">
                  Find AtiSunya on the map
                </h2>
                <p className="mt-4 text-base leading-7 text-white/72">
                  Our learning support works online across India. Use the map
                  below to open directions and connect with the AtiSunya team.
                </p>
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=AtiSunya%20Edutech%20India"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-brand-50"
                >
                  Open in Maps
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="group relative min-h-[300px] overflow-hidden bg-brand-50 md:min-h-[360px]">
              <iframe
                title="AtiSunya Edutech map location"
                src="https://www.google.com/maps?q=AtiSunya%20Edutech%20India&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[300px] w-full border-0 grayscale-[18%] transition duration-500 group-hover:scale-[1.015] group-hover:grayscale-0 md:min-h-[360px]"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/30 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

 
    </main>
  );
}
