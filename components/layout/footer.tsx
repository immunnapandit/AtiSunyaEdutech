import Image from "next/image";
import Link from "next/link";
import { ArrowUp, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { NewsletterForm } from "@/components/features/newsletter-form";
import { Container } from "@/components/ui/primitives";

const courseLinks = ["Branding design", "UI/UX designing", "Make Elements", "Business", "Graphics design"];
const blogLinks = ["Big Ideas Of Business Branding Info.", "UI/UX Ideas Of Business Branding Info."];
const tweets = ["Learning updates from Atisunya Edutech", "New cohorts and course notes"];
const socials = [Facebook, Twitter, Instagram, Youtube];

export function Footer() {
  return (
    <footer className="relative border-t border-navy-100 bg-mist-100 text-navy">
      <Container className="pt-16">
        <NewsletterForm variant="footer" />

        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="mt-7 space-y-5 text-base font-medium leading-7 text-navy-400">
              <li className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-brand" /><span>420 Love Street 133/2 Street<br />New York</span></li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-brand" /><span>info.contact@gmail.com</span></li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-brand" /><span>012 345 678 9101</span></li>
            </ul>
          </div>

          <div>
            <FooterHeading>Course</FooterHeading>
            <ul className="mt-7 space-y-3 text-base font-medium text-navy-400">
              {courseLinks.map((item) => (
                <li key={item} className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-brand" /><Link href="/courses" className="transition-colors hover:text-brand">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>News & Blog</FooterHeading>
            <ul className="mt-7 space-y-6">
              {blogLinks.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
                  <div>
                    <Link href="/blog" className="text-base font-extrabold leading-snug text-navy transition-colors hover:text-royal-700">{item}</Link>
                    <span className="mt-2 flex items-center gap-2 text-xs font-medium text-navy-400"><CalendarDays className="h-3.5 w-3.5" /> December 7, 2026</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Twitter Feed</FooterHeading>
            <ul className="mt-7 space-y-6">
              {tweets.map((tweet) => (
                <li key={tweet} className="flex gap-3">
                  <Twitter className="mt-1 h-4 w-4 shrink-0 text-brand" />
                  <div>
                    <p className="text-base font-medium leading-7 text-navy-400">{tweet}</p>
                    <span className="mt-1 block text-xs font-medium text-navy-400">9 Hours ago</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-navy-100 py-6">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/atisunyaedutechlogo.png" alt="Atisunya Edutech" width={48} height={48} className="h-10 w-10 object-contain" />
            <span className="text-xl font-extrabold uppercase tracking-wide text-navy">Atisunya</span>
          </Link>
          <p className="text-sm font-medium text-navy-400">Copyright 2026 by atisunyaedutech.com</p>
          <div className="flex items-center gap-2">
            {socials.map((Icon, index) => (
              <a key={index} href="#" aria-label={`Social ${index + 1}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 text-navy-400 transition-colors hover:border-brand hover:text-brand">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Container>
      </div>

      <Link href="#top" aria-label="Back to top" className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center bg-brand text-white transition-colors hover:bg-brand-600 xl:right-10">
        <ArrowUp className="h-5 w-5" />
      </Link>
    </footer>
  );
}

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-3 text-2xl font-extrabold text-navy">
      <span className="h-5 w-1.5 rounded-full bg-brand" />
      {children}
    </h2>
  );
}
