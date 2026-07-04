import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Terms & Conditions" };

const sections = [
  {
    heading: "1. Acceptance of terms",
    body: "By creating an account or enrolling in a course, you agree to be bound by these Terms & Conditions and our Privacy Policy.",
  },
  {
    heading: "2. Course access",
    body: "Enrollment grants you a personal, non-transferable license to access course content. Redistribution or resale of course materials is prohibited.",
  },
  {
    heading: "3. Payments and refunds",
    body: "Course fees are billed at the time of enrollment. Refund requests submitted within 14 days of purchase are honored in full, provided less than 25% of the course has been completed.",
  },
  {
    heading: "4. Certifications",
    body: "Certificates are issued upon meeting a course's completion requirements and represent successful completion of Atisunya coursework, not a guarantee of employment outcomes.",
  },
  {
    heading: "5. Code of conduct",
    body: "Live sessions and community spaces are expected to remain respectful and harassment-free. Violations may result in suspension of platform access without refund.",
  },
  {
    heading: "6. Changes to these terms",
    body: "We may update these terms from time to time. Continued use of the platform after changes take effect constitutes acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-display-md font-extrabold text-navy">Terms & Conditions</h1>
        <p className="mt-3 text-sm text-navy-400">Last updated: June 1, 2026</p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-lg font-bold text-navy">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-400">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
