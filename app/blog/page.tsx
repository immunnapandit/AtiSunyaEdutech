import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpenText,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, learning tips, and career guidance from Atisunya Edutech.",
};

const BLOGS_PER_PAGE = 6;

const blogPosts = [
  {
    slug: "guided-projects-job-ready",
    creator: "Atisunya Team",
    publishedDate: "28 January, 2026",
    headline: "How guided projects help learners become job-ready faster",
    category: "Learning",
    thumbnailGradient: "linear-gradient(135deg, #e8f3ff 0%, #fff6cf 100%)",
  },
  {
    slug: "live-classes-mentor-feedback",
    creator: "Priya Sharma",
    publishedDate: "12 February, 2026",
    headline: "Building consistency with live classes and mentor feedback",
    category: "Mentorship",
    thumbnailGradient: "linear-gradient(135deg, #edf7ed 0%, #e8f3ff 100%)",
  },
  {
    slug: "right-certification-path",
    creator: "Rahul Mehta",
    publishedDate: "04 March, 2026",
    headline: "Choosing the right certification path for your next career move",
    category: "Careers",
    thumbnailGradient: "linear-gradient(135deg, #fff0e6 0%, #f0ecff 100%)",
  },
  {
    slug: "portfolio-that-gets-reviewed",
    creator: "Neha Kapoor",
    publishedDate: "18 March, 2026",
    headline: "What makes a course portfolio worth showing to employers",
    category: "Portfolio",
    thumbnailGradient: "linear-gradient(135deg, #f0ecff 0%, #e8f7f5 100%)",
  },
  {
    slug: "learning-schedule-that-sticks",
    creator: "Amit Verma",
    publishedDate: "02 April, 2026",
    headline: "Creating a weekly learning schedule that actually sticks",
    category: "Productivity",
    thumbnailGradient: "linear-gradient(135deg, #fff6cf 0%, #e8f7f5 100%)",
  },
  {
    slug: "corporate-training-outcomes",
    creator: "Atisunya Team",
    publishedDate: "16 April, 2026",
    headline: "How corporate training improves when teams build together",
    category: "Teams",
    thumbnailGradient: "linear-gradient(135deg, #e8f3ff 0%, #edf7ed 100%)",
  },
  {
    slug: "feedback-loop-for-beginners",
    creator: "Kavya Nair",
    publishedDate: "30 April, 2026",
    headline: "Why beginners need a real feedback loop, not only videos",
    category: "Feedback",
    thumbnailGradient: "linear-gradient(135deg, #e8f7f5 0%, #fff0e6 100%)",
  },
  {
    slug: "career-switch-learning-plan",
    creator: "Samar Singh",
    publishedDate: "14 May, 2026",
    headline: "A practical learning plan for switching into tech careers",
    category: "Careers",
    thumbnailGradient: "linear-gradient(135deg, #edf7ed 0%, #fff6cf 100%)",
  },
  {
    slug: "capstone-project-ideas",
    creator: "Isha Malhotra",
    publishedDate: "28 May, 2026",
    headline: "Capstone project ideas that prove real workplace ability",
    category: "Projects",
    thumbnailGradient: "linear-gradient(135deg, #f0ecff 0%, #e8f3ff 100%)",
  },
  {
    slug: "interview-prep-through-practice",
    creator: "Atisunya Team",
    publishedDate: "11 June, 2026",
    headline: "Preparing for interviews through practical course work",
    category: "Interviews",
    thumbnailGradient: "linear-gradient(135deg, #fff0e6 0%, #edf7ed 100%)",
  },
  {
    slug: "choosing-live-training",
    creator: "Meera Joshi",
    publishedDate: "25 June, 2026",
    headline: "When live training is better than self-paced learning",
    category: "Live Training",
    thumbnailGradient: "linear-gradient(135deg, #e8f7f5 0%, #f0ecff 100%)",
  },
  {
    slug: "mentor-comments-that-matter",
    creator: "Dev Arora",
    publishedDate: "06 July, 2026",
    headline: "How mentor comments turn assignments into stronger skills",
    category: "Mentorship",
    thumbnailGradient: "linear-gradient(135deg, #fff6cf 0%, #e8f3ff 100%)",
  },
];

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
    <div className="pt-32 pb-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-3 text-display-md font-extrabold text-navy text-balance md:text-display-lg">
            Latest insights from Atisunya Edutech
          </h1>
          <p className="mt-4 text-base text-navy-400 md:text-lg">
            Practical ideas for learning better, building stronger portfolios,
            and moving with confidence toward your next opportunity.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {visiblePosts.map((post) => (
            <article
              key={post.headline}
              className="overflow-hidden rounded-lg bg-white shadow-lifted"
            >
              <Link
                href={`/blog?post=${post.slug}`}
                className="relative flex h-56 overflow-hidden p-6 transition-transform duration-300 hover:scale-[1.02]"
                style={{ background: post.thumbnailGradient }}
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/50" />
                <div className="absolute -bottom-10 left-8 h-28 w-28 rounded-full bg-white/40" />
                <span className="absolute left-5 top-5 rounded-full bg-signal px-4 py-2 text-xs font-extrabold uppercase text-navy">
                  {post.category}
                </span>
                <div className="relative mt-auto flex items-end gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-royal-700 shadow-soft">
                    <BookOpenText className="h-7 w-7" />
                  </span>
                  <span className="max-w-[12rem] text-lg font-extrabold leading-snug text-navy">
                    {post.category} insights
                  </span>
                </div>
              </Link>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-navy-400">
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-royal-700" />
                    {post.publishedDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4 text-royal-700" />
                    {post.creator}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-extrabold leading-snug text-navy">
                  <Link
                    href={`/blog?post=${post.slug}`}
                    className="transition-colors hover:text-brand"
                  >
                    {post.headline}
                  </Link>
                </h2>
                <Link
                  href={`/blog?post=${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold uppercase text-royal-700 transition-colors hover:text-brand"
                >
                  Read More
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
                "inline-flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-extrabold text-navy transition-colors hover:border-brand hover:text-brand",
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
                    "inline-flex h-11 w-11 items-center justify-center rounded-lg border text-sm font-extrabold transition-colors hover:border-brand hover:text-brand",
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
                "inline-flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-extrabold text-navy transition-colors hover:border-brand hover:text-brand",
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
