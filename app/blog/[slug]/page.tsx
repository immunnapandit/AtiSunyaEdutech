import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, User } from "lucide-react";
import { blogPosts, getBlogPost } from "@/data/blog-posts";
import { Container } from "@/components/ui/primitives";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return {
    title: post.headline,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <article className="pt-site-header-loose pb-24">
      <Container>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to insights
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.55fr)] lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand">
              {post.category}
            </span>
            <h1 className="heading-hero mt-5 text-navy">
              {post.headline}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-navy-400">
              {post.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-navy-400">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-brand" />
                {post.publishedDate}
              </span>
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4 text-brand" />
                {post.creator}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-brand" />
                {post.readingTime}
              </span>
            </div>
          </div>

          <div
            className="min-h-[260px] rounded-lg border border-navy-100 shadow-soft"
            style={{ background: post.thumbnailGradient }}
            aria-hidden="true"
          />
        </header>

        <div className="mx-auto mt-14 max-w-3xl space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold leading-snug text-navy">
                {section.heading}
              </h2>
              <p className="mt-4 text-base leading-8 text-navy-500">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}