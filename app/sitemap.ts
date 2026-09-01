import type { MetadataRoute } from "next";
import { apiRequest } from "@/lib/api";

const BASE_URL = "https://atisunyaedutech.com";

const staticRoutes = [
  "",
  "/about",
  "/courses",
  "/live-training",
  "/training",
  "/instructors",
  "/pricing",
  "/blog",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms-conditions",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const [courses, posts] = await Promise.all([
    apiRequest<{ courses: { slug: string }[] }>("/courses").catch(() => ({ courses: [] })),
    apiRequest<{ posts: { slug: string }[] }>("/blog").catch(() => ({ posts: [] })),
  ]);

  for (const course of courses.courses) {
    entries.push({ url: `${BASE_URL}/courses/${course.slug}`, lastModified: new Date() });
  }

  for (const post of posts.posts) {
    entries.push({ url: `${BASE_URL}/blog/${post.slug}`, lastModified: new Date() });
  }

  return entries;
}
