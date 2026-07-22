import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Course pricing for Atisunya Edutech Microsoft training programs.",
};

const featuredCourses = courses.filter((course) => course.featured).slice(0, 3);

export default function PricingPage() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent course pricing"
          description="Individual course prices are shown before checkout. Corporate training is quoted based on team size, topics, and delivery format."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <div key={course.slug} className="flex flex-col rounded-lg border border-navy-100 bg-white p-8 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{course.category}</p>
              <h3 className="mt-3 text-xl font-bold text-navy">{course.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-navy-400">{course.description}</p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-3xl font-semibold text-navy">Rs. {course.price.toLocaleString("en-IN")}</span>
                {course.originalPrice ? (
                  <span className="pb-1 text-sm font-semibold text-navy-400 line-through">Rs. {course.originalPrice.toLocaleString("en-IN")}</span>
                ) : null}
              </div>

              <ul className="mt-6 space-y-3 text-sm text-navy-600">
                {[course.duration, course.difficulty, "Secure Razorpay checkout"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <LinkButton href={`/courses/${course.slug}`} variant="outline" className="mt-8 w-full justify-center">
                View course
              </LinkButton>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-navy-100 bg-mist-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-navy">Corporate Microsoft training</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-navy-400">
            For team training, Atisunya Edutech prepares pricing after reviewing audience size, Microsoft topics, session format, and delivery timeline.
          </p>
          <LinkButton href="/contact" className="mt-6 justify-center">
            Request a training plan
          </LinkButton>
        </div>
      </Container>
    </div>
  );
}
