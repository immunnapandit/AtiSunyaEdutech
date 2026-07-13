import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpenText,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, learning tips, and Microsoft training guidance from Atisunya Edutech.",
};

const BLOGS_PER_PAGE = 6;

type BlogPageProps = {
  searchParams?: Promise<{
    page?: string | string[];
  }>;
};

function getPageHref(page: number) {
  return `/blog?page=${page}`;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const pageParam = Array.isArray(params?.page) ? params?.page[0] : params?.page;
  const requestedPage = Number(pageParam ?? "1");
  const totalPages = Math.ceil(blogPosts.length / BLOGS_PER_PAGE);
  const currentPage = Math.min(
    Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1),
    totalPages
  );
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const visiblePosts = blogPosts.slice(startIndex, startIndex + BLOGS_PER_PAGE);

  return (
    <div className="pt-site-header-loose pb-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="heading-hero mt-3 text-navy">
            Latest insights from Atisunya Edutech
          </h1>
          <p className="mt-4 text-base leading-7 text-navy-400 md:text-lg">
            Practical ideas for Microsoft learning, corporate enablement,
            certification planning, and applied project work.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.map((post) => (
            <article
              key={post.headline}
              className="overflow-hidden rounded-lg border border-navy-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lifted"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative flex h-56 overflow-hidden p-6"
                style={{ background: post.thumbnailGradient }}
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/50" />
                <div className="absolute -bottom-10 left-8 h-28 w-28 rounded-full bg-white/40" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand">
                  {post.category}
                </span>
                <div className="relative mt-auto flex items-end gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-royal-700 shadow-soft">
                    <BookOpenText className="h-7 w-7" />
                  </span>
                  <span className="max-w-[13rem] text-lg font-bold leading-snug text-navy">
                    {post.category} insight
                  </span>
                </div>
              </Link>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-navy-400">
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-royal-700" />
                    {post.publishedDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4 text-royal-700" />
                    {post.creator}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold leading-snug text-navy">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-brand"
                  >
                    {post.headline}
                  </Link>
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-navy-400">
                  {post.summary}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase text-royal-700 transition-colors hover:text-brand"
                >
                  Read Insight
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Blog pagination"
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href={getPageHref(Math.max(currentPage - 1, 1))}
              aria-disabled={currentPage === 1}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-bold text-navy transition-colors hover:border-brand hover:text-brand",
                currentPage === 1 &&
                  "pointer-events-none border-navy-100 text-navy-200"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Link>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <Link
                  key={page}
                  href={getPageHref(page)}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-lg border text-sm font-bold transition-colors hover:border-brand hover:text-brand",
                    page === currentPage
                      ? "border-brand bg-brand text-white hover:text-white"
                      : "border-navy-100 text-navy"
                  )}
                >
                  {page}
                </Link>
              )
            )}

            <Link
              href={getPageHref(Math.min(currentPage + 1, totalPages))}
              aria-disabled={currentPage === totalPages}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-bold text-navy transition-colors hover:border-brand hover:text-brand",
                currentPage === totalPages &&
                  "pointer-events-none border-navy-100 text-navy-200"
              )}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Link>
          </nav>
        )}
      </Container>
    </div>
  );
}