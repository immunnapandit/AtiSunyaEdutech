"use client";

import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">New blog post</h1>
      <p className="mt-1 text-sm text-navy-400">Write and publish a new article.</p>
      <div className="mt-8">
        <BlogForm mode="create" />
      </div>
    </div>
  );
}
