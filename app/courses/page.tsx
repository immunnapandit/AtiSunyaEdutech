import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { CourseCard } from "@/components/features/course-card";
import { courses, categories } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse industry-focused courses in product design, software engineering, data & AI, product management, cloud, and security.",
};

export default function CoursesPage() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <SectionHeading
          eyebrow="Full catalog"
          title="Find the course built for where you're headed"
          description="Every course includes real projects, instructor feedback, and a verifiable certificate on completion."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          <span className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white">
            All courses
          </span>
          {categories.map((cat) => (
            <span
              key={cat.name}
              className="rounded-full border border-navy-100 px-4 py-2 text-xs font-semibold text-navy-400 hover:border-royal/30 hover:text-navy transition-colors cursor-pointer"
            >
              {cat.name}
            </span>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
