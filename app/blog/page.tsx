import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronRight, User } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, learning tips, and career guidance from Atisunya Edutech.",
};

const blogPosts = [
  {
    creator: "Atisunya Team",
    publishedDate: "28 January, 2026",
    headline: "How guided projects help learners become job-ready faster",
    category: "Learning",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",
  },
  {
    creator: "Priya Sharma",
    publishedDate: "12 February, 2026",
    headline: "Building consistency with live classes and mentor feedback",
    category: "Mentorship",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85",
  },
  {
    creator: "Rahul Mehta",
    publishedDate: "04 March, 2026",
    headline: "Choosing the right certification path for your next career move",
    category: "Careers",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85",
  },
];

export default function BlogPage() {
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
          {blogPosts.map((post) => (
            <article
              key={post.headline}
              className="overflow-hidden rounded-lg bg-white shadow-lifted"
            >
              <Link href="/blog" className="relative block h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.headline}
                  fill
                  sizes="(min-width: 768px) 31vw, 92vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-signal px-4 py-2 text-xs font-extrabold uppercase text-navy">
                  {post.category}
                </span>
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
                  <Link href="/blog" className="transition-colors hover:text-brand">
                    {post.headline}
                  </Link>
                </h2>
                <Link
                  href="/blog"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold uppercase text-royal-700 transition-colors hover:text-brand"
                >
                  Read More
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
