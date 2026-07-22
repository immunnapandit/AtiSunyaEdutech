import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections = [
  {
    heading: "1. Information we collect",
    body: "We collect information you provide directly — such as your name, email, and payment details when you enroll in a course — along with usage data like course progress and login activity to improve your learning experience.",
  },
  {
    heading: "2. How we use your information",
    body: "We use your information to deliver course content, issue certificates, personalize recommendations, process payments, and communicate updates about your enrollment.",
  },
  {
    heading: "3. Sharing your information",
    body: "We do not sell your personal information. We share limited data with payment processors and, where you opt in, with corporate learning partners for certification verification.",
  },
  {
    heading: "4. Data retention",
    body: "We retain your account and course records for as long as your account is active, and as needed to comply with legal obligations or resolve disputes.",
  },
  {
    heading: "5. Your rights",
    body: "You may request access to, correction of, or deletion of your personal data at any time by contacting privacy@atisunyaedutech.com.",
  },
  {
    heading: "6. Contact",
    body: "Questions about this policy can be directed to privacy@atisunyaedutech.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-display-md font-semibold text-navy">Privacy Policy</h1>
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
