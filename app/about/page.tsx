import type { Metadata } from "next";
import { Container, SectionHeading, Eyebrow } from "@/components/ui/primitives";
import { Stats } from "@/components/sections/stats";

export const metadata: Metadata = {
  title: "About",
  description: "The story, mission, and people behind Atisunya Edutech.",
};

export default function AboutPage() {
  return (
    <div className="pt-32">
      <Container className="max-w-3xl">
        <Eyebrow>Our story</Eyebrow>
        <h1 className="mt-3 text-display-md md:text-display-lg font-extrabold text-navy text-balance">
          We got tired of watching good people finish courses and still feel unprepared.
        </h1>
        <p className="mt-6 text-lg text-navy-400 text-balance">
          Atisunya Edutech started in 2019 with a simple observation: the gap
          between &quot;completed a course&quot; and &quot;ready for the job&quot; was almost
          never about content. It was about who was teaching, what they&apos;d
          actually built, and whether anyone was going to look closely at
          your work and tell you the truth about it.
        </p>
        <p className="mt-4 text-lg text-navy-400 text-balance">
          So we built a platform where every instructor is a practitioner
          first, every course ends in a real project, and every certificate
          means something to the hiring managers who see it. Today, over
          48,000 learners have gone through our programs â€” many of them now
          teaching, hiring, or mentoring the next cohort themselves.
        </p>
      </Container>

      <div className="mt-20">
        <Stats />
      </div>

      <div className="py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="A few principles we don't compromise on"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                title: "Practitioners over presenters",
                body: "If you haven't shipped it, you don't teach it here.",
              },
              {
                title: "Feedback over automation",
                body: "A real person reviews your capstone. Every time.",
              },
              {
                title: "Outcomes over completions",
                body: "We track what happens after graduation, not just at it.",
              },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-navy-100 p-6">
                <h3 className="text-base font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-navy-400">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

