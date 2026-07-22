import Image from "next/image";
import Link from "next/link";
import { ArrowUp, CalendarDays, Mail, MapPin, Phone } from "lucide-react";
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
  { label: "Email", href: "mailto:info@atisunya.co", icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#0A165E] text-white">
      <Container className="pt-16 xl:px-0">
        <NewsletterForm variant="footer" />

        <div className="grid grid-cols-1 gap-16 py-16 lg:grid-cols-[2fr_1fr_1fr_0.8fr]">
          <div>
            
           <div className="mt-7">
  {/* Atisunya Logo */}
  <Image
    src="/images/AtiSunyaLogo.png"
    alt="Atisunya"
    width={240}
    height={80}
    className="h-auto w-56 object-contain"
  />

  {/* Microsoft Partner Logo */}
  <Image
    src="/images/MicrosoftSilverPartner.png"
    alt="Microsoft Silver Partner"
    width={220}
    height={90}
    className="mt-5 h-auto w-52 object-contain"
  />

  {/* Company Description */}
 <p className="mt-6 text-base leading-16 text-white/90">
  AtiSunya Edutech is a Microsoft-focused learning platform delivering
  hands-on training in Dynamics 365, Azure, Power Platform, AI, and modern
  cloud technologies through expert-led programs and real-world projects.
</p>

  {/* Phone */}
  <div className="mt-7 flex items-center gap-3">
    <Phone className="h-5 w-5 text-white" />
    <span className="text-lg text-white">
      +91 80818 10673,
      +91 82991 56511
    </span>
  </div>

  {/* Email */}
  <div className="mt-5 flex items-center gap-3">
    <Mail className="h-5 w-5 text-white" />
    <span className="text-lg text-white">
      info@atisunya.co
    </span>
  </div>
</div>
          </div>

          <div>
            <FooterHeading>Training Provided</FooterHeading>
            <ul className="mt-7 space-y-3 text-base font-medium text-white/70">
              {courseLinks.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  <Link href="/courses" className="transition-colors hover:text-brand">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

<div>
  <FooterHeading>Quick Links</FooterHeading>

  <ul className="mt-7 space-y-5 text-lg text-white/70">
    <li>
      <Link href="/about" className="transition-colors hover:text-brand">
        About Us
      </Link>
    </li>

    <li>
      <Link href="/courses" className="transition-colors hover:text-brand">
        Courses
      </Link>
    </li>

    <li>
      <Link href="/blog" className="transition-colors hover:text-brand">
        Blogs
      </Link>
    </li>

    <li>
      <Link href="/contact" className="transition-colors hover:text-brand">
        Contact Us
      </Link>
    </li>
  </ul>
</div>
         <div>
  <FooterHeading>Information</FooterHeading>
<ul className="mt-7 space-y-5 text-lg text-white/70">
  <li>
    <Link href="/privacy-policy" className="transition-colors hover:text-brand">
      Privacy Policy
    </Link>
  </li>

  <li>
    <Link href="/terms-and-conditions" className="transition-colors hover:text-brand">
      Terms & Conditions
    </Link>
  </li>

  <li>
    <Link href="/faq" className="transition-colors hover:text-brand">
      FAQs
    </Link>
  </li>
</ul>
</div>
</div>
      </Container>
    
<div>
   <div className="border-t border-white/10 bg-[#0A165E] py-6">
  <Container>
    <div className="grid grid-cols-[2fr_1fr_1fr_0.8fr] items-center">
      
      <p className="text-sm font-medium text-white/60">
        © 2026 AtiSunya Edutech. All Rights Reserved.
      </p>

      <div></div>
      <div></div>

      <div className="flex justify-end gap-2">
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
      
      </div>

      <Link href="#top" aria-label="Back to top" className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-white transition-colors hover:bg-brand-600 xl:right-10">
        <ArrowUp className="h-5 w-5" />
      </Link>
    </footer>
  );
}

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-bold text-white">
      <span className="h-5 w-1.5 rounded-full bg-brand" />
      {children}
    </h2>
  );
}