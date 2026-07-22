import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";
import { Users, Video, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Live Training",
  description: "Live, instructor-led training at AtiSunya Edutech.",
};

const format = [
  { icon: Users, title: "Capped at 25 seats", body: "Small enough that instructors know your name and your project." },
  { icon: Video, title: "Weekly live sessions", body: "Real-time teaching plus recordings for every session, always." },
  { icon: Award, title: "Live capstone review", body: "Present your final project to your instructor and cohort." },
];

export default function LiveTrainingPage() {
  return (
    <div className="pt-32">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Live Training"
          title="Learn on a schedule, with people around you"
          description="Join a live class with other learners, and catch up anytime with the recordings."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {format.map((f) => (
            <div key={f.title} className="rounded-2xl border border-navy-100 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-50 text-royal-700">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm text-navy-400">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <LinkButton href="/courses" withArrow>
            Browse courses with live cohorts
          </LinkButton>
        </div>
      </Container>
    </div>
  );
}
