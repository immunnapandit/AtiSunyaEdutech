"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { adminApiRequest } from "@/lib/admin-api";

type AdminBlogPost = {
  slug: string;
  headline: string;
  category: string;
  creator: string;
  published: boolean;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function load() {
    adminApiRequest<{ posts: AdminBlogPost[] }>("/blog")
      .then((data) => setPosts(data.posts))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load blog posts."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(slug: string) {
    if (!window.confirm(`Delete blog post "${slug}"? This cannot be undone.`)) return;

    try {
      await adminApiRequest(`/blog/${slug}`, { method: "DELETE" });
      setPosts((current) => current.filter((post) => post.slug !== slug));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete blog post.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Blog</h1>
          <p className="mt-1 text-sm text-navy-400">Write, edit, and publish blog posts.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist-50 text-xs font-bold uppercase tracking-wide text-navy-400">
            <tr>
              <th className="px-6 py-4">Headline</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {loading && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-navy-400">
                  Loading posts...
                </td>
              </tr>
            )}
            {!loading && posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-navy-400">
                  No blog posts yet. Write your first one.
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.slug}>
                <td className="px-6 py-4 font-semibold text-navy">{post.headline}</td>
                <td className="px-6 py-4 text-navy-500">{post.category}</td>
                <td className="px-6 py-4 text-navy-500">{post.creator}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      post.published ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/blog/${post.slug}`}
                      aria-label={`Edit ${post.headline}`}
                      className="rounded-lg p-2 text-navy-500 hover:bg-brand-50 hover:text-brand"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.slug)}
                      aria-label={`Delete ${post.headline}`}
                      className="rounded-lg p-2 text-navy-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
