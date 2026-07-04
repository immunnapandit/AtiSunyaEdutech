import { Container, SectionHeading } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";
import { CourseCard } from "@/components/features/course-card";
import { courses } from "@/data/courses";

export function FeaturedCourses() {
  const featured = courses.filter((c) => c.featured);

  return (
    <section className="bg-mist-50 py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Featured this month"
            title="Courses worth clearing your calendar for"
          />
          <LinkButton href="/courses" variant="outline" withArrow>
            View all courses
          </LinkButton>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
