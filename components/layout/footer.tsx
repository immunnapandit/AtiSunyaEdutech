import Image from "next/image";
import Link from "next/link";
import { ArrowUp, CalendarDays, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { NewsletterForm } from "@/components/features/newsletter-form";
import { Container } from "@/components/ui/primitives";

const courseLinks = [
  "Dynamics 365 Training",
  "Azure Administration",
  "Power Platform Apps",
  "Microsoft Copilot & AI",
  "Security & Compliance",
];

const blogLinks = [
  { title: "Choosing the right Microsoft training path", href: "/blog/right-certification-path", date: "04 March, 2026" },
  { title: "How corporate training improves when teams build together", href: "/blog/corporate-training-outcomes", date: "16 April, 2026" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com", icon: Youtube },
  { label: "Email", href: "mailto:info@atisunya.co", icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-navy-100 bg-mist-100 text-navy">
      <Container className="pt-16">
        <NewsletterForm variant="footer" />

        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="mt-7 space-y-5 text-base font-medium leading-7 text-navy-400">
              <li className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand" />
                <span>India based Microsoft training studio<br />Online and corporate delivery</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <Link href="mailto:info@atisunya.co" className="transition-colors hover:text-brand">info@atisunya.co</Link>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand" />
                <Link href="tel:+918081810673" className="transition-colors hover:text-brand">+91 80-8181-0673</Link>
              </li>
            </ul>
          </div>

          <div>
            <FooterHeading>Courses</FooterHeading>
            <ul className="mt-7 space-y-3 text-base font-medium text-navy-400">
              {courseLinks.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  <Link href="/courses" className="transition-colors hover:text-brand">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Insights</FooterHeading>
            <ul className="mt-7 space-y-6">
              {blogLinks.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <div>
                    <Link href={item.href} className="text-base font-bold leading-snug text-navy transition-colors hover:text-royal-700">{item.title}</Link>
                    <span className="mt-2 flex items-center gap-2 text-xs font-medium text-navy-400"><CalendarDays className="h-3.5 w-3.5" /> {item.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Corporate Training</FooterHeading>
            <div className="mt-7 space-y-4 text-base leading-7 text-navy-400">
              <p>Custom Microsoft training for teams adopting Azure, Dynamics 365, Power Platform, Copilot, AI, and security workflows.</p>
              <Link href="/contact" className="inline-flex rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600">
                Request a training plan
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-navy-100 py-6">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/atisunyaedutechlogo.png" alt="Atisunya Edutech" width={48} height={48} className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold uppercase tracking-wide text-navy">Atisunya</span>
          </Link>
          <p className="text-sm font-medium text-navy-400">Copyright 2026 by atisunyaedutech.com</p>
          <div className="flex items-center gap-2">
            {socials.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} aria-label={item.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 text-navy-400 transition-colors hover:border-brand hover:text-brand">
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </Container>
      </div>

      <Link href="#top" aria-label="Back to top" className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-white transition-colors hover:bg-brand-600 xl:right-10">
        <ArrowUp className="h-5 w-5" />
      </Link>
    </footer>
  );
}

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-bold text-navy">
      <span className="h-5 w-1.5 rounded-full bg-brand" />
      {children}
    </h2>
  );
}