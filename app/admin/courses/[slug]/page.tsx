"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CourseForm, type CourseFormValues } from "@/components/admin/course-form";
import { adminApiRequest } from "@/lib/admin-api";

export default function EditCoursePage() {
  const params = useParams<{ slug: string }>();
  const [initialValues, setInitialValues] = useState<Partial<CourseFormValues> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApiRequest<{ course: Partial<CourseFormValues> & { originalPrice?: number | null } }>(
      `/courses/${params.slug}`
    )
      .then((data) =>
        setInitialValues({
          ...data.course,
          originalPrice: data.course.originalPrice ?? "",
          curriculum: data.course.curriculum ?? [],
          faqs: data.course.faqs ?? [],
          seo: {
            title: data.course.seo?.title ?? "",
            description: data.course.seo?.description ?? "",
            keywords: data.course.seo?.keywords ?? [],
          },
        })
      )
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load course."));
  }, [params.slug]);

  if (error) {
    return <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>;
  }

  if (!initialValues) {
    return <p className="text-sm text-navy-400">Loading course...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Edit course</h1>
      <p className="mt-1 text-sm text-navy-400">{initialValues.title}</p>
      <div className="mt-8">
        <CourseForm mode="edit" initialValues={initialValues} />
      </div>
    </div>
  );
}
