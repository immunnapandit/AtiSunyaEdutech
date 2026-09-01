import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { instructors } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Training Teams",
  description: "Microsoft training teams at AtiSunya Edutech.",
};

export default function InstructorsPage() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Training teams"
          title="Microsoft-focused learning support"
          description="AtiSunya Edutech organizes learning around Microsoft cloud, business apps, AI, analytics, and security topics."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <div key={instructor.slug} className="rounded-lg border border-navy-100 bg-white p-6 shadow-soft">
              <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-brand-50 text-sm font-bold text-brand">
                {instructor.image ? (
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center">{instructor.avatar}</span>
                )}
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy">{instructor.name}</h3>
              <p className="mt-1 text-sm font-semibold text-brand">{instructor.role}</p>
              <p className="mt-4 text-sm leading-6 text-navy-400">{instructor.bio}</p>
              <div className="mt-5 space-y-2">
                {instructor.expertise.map((skill) => (
                  <p key={skill} className="flex items-center gap-2 text-xs font-semibold text-navy-500">
                    <CheckCircle2 className="h-4 w-4 text-brand" />
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
