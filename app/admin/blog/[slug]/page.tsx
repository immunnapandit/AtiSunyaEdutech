"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogForm, type BlogFormValues } from "@/components/admin/blog-form";
import { adminApiRequest } from "@/lib/admin-api";

export default function EditBlogPostPage() {
  const params = useParams<{ slug: string }>();
  const [initialValues, setInitialValues] = useState<Partial<BlogFormValues> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApiRequest<{ post: Partial<BlogFormValues> }>(`/blog/${params.slug}`)
      .then((data) =>
        setInitialValues({
          ...data.post,
          tags: data.post.tags ?? [],
          sections: data.post.sections ?? [],
          seo: {
            title: data.post.seo?.title ?? "",
            description: data.post.seo?.description ?? "",
            keywords: data.post.seo?.keywords ?? [],
          },
        })
      )
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load blog post."));
  }, [params.slug]);

  if (error) {
    return <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>;
  }

  if (!initialValues) {
    return <p className="text-sm text-navy-400">Loading blog post...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Edit blog post</h1>
      <p className="mt-1 text-sm text-navy-400">{initialValues.headline}</p>
      <div className="mt-8">
        <BlogForm mode="edit" initialValues={initialValues} />
      </div>
    </div>
  );
}
