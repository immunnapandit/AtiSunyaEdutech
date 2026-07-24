"use client";

import { CourseForm } from "@/components/admin/course-form";

export default function NewCoursePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">New course</h1>
      <p className="mt-1 text-sm text-navy-400">Fill in the details below to publish a new course.</p>
      <div className="mt-8">
        <CourseForm mode="create" />
      </div>
    </div>
  );
}
