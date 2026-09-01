import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { NewsletterForm } from "@/components/features/newsletter-form";
import { Container } from "@/components/ui/primitives";

const courseLinks = [
  "Dynamics 365 Training",
  "Azure Administration",
  "Power Platform Apps",
  "Microsoft Copilot & AI",
  "Security & Compliance",
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const informationLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "FAQs", href: "/faq" },
];

const socials = [{ label: "Email", href: "mailto:info@atisunya.co", icon: Mail }];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#0A165E] text-white">
      <Container className="pt-16 xl:px-0">
        <NewsletterForm variant="footer" />

        <div className="grid grid-cols-1 gap-16 py-16 lg:grid-cols-[2fr_1fr_1fr_0.8fr]">
          <div>
            <div className="mt-7">
              <Image
                src="/images/AtiSunyaLogo.png"
                alt="AtiSunya"
                width={240}
                height={80}
                className="h-auto w-56 object-contain"
              />

              <Image
                src="/images/MicrosoftSilverPartner.png"
                alt="Microsoft Silver Partner"
                width={220}
                height={90}
                className="mt-5 h-auto w-52 object-contain"
              />

              <p className="mt-6 text-base leading-7 text-white/90">
                AtiSunya Edutech teaches Microsoft skills like Dynamics 365,
                Azure, Power Platform, and AI. Our training is hands-on and
                led by real experts.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-white" />
                <span className="text-lg text-white">+91 80818 10673, +91 82991 56511</span>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-white" />
                <span className="text-lg text-white">info@atisunya.co</span>
              </div>
            </div>
          </div>

          <div>
            <FooterHeading>Training Provided</FooterHeading>
            <ul className="mt-7 space-y-4 pl-[1.125rem] text-base font-medium text-white/90">
              {courseLinks.map((item) => (
                <li key={item}>
                  <Link href="/courses" className="transition-colors hover:text-brand">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="mt-7 space-y-4 pl-[1.125rem] text-base font-medium text-white/90">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Information</FooterHeading>
            <ul className="mt-7 space-y-4 pl-[1.125rem] text-base font-medium text-white/90">
              {informationLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-[#0A165E] py-6">
        <Container>
          <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-sm font-medium text-white/60">
              © 2026 AtiSunya Edutech. All Rights Reserved.
            </p>

            <div className="flex gap-2">
              {socials.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      <Link
        href="#top"
        aria-label="Back to top"
        className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-white transition-colors hover:bg-brand-600 xl:right-10"
      >
        <ArrowUp className="h-5 w-5" />
      </Link>
    </footer>
  );
}

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-3 text-lg font-bold text-white">
      <span className="h-5 w-1.5 rounded-full bg-brand" />
      {children}
    </h2>
  );
}
