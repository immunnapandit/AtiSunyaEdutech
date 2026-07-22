import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Folder, User } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

type BlogPost = {
  slug: string;
  headline: string;
  creator: string;
  category: string;
  summary: string;
  thumbnailGradient: string;
  featuredImage: string;
  publishedAt: string;
};

function Meta({ creator, category }: { creator: string; category: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase text-navy-400">
      <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> By {creator}</span>
      <span className="flex items-center gap-1.5"><Folder className="h-3.5 w-3.5" /> {category}</span>
    </div>
  );
}

function DateBadge({ date }: { date: string }) {
  const parsed = date ? new Date(date) : null;
  const month = parsed ? parsed.toLocaleDateString("en-US", { month: "short" }).toUpperCase() : "";
  const day = parsed ? parsed.getDate().toString().padStart(2, "0") : "";

  return (
    <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-signal text-navy">
      <span className="text-sm font-bold leading-none">{month}</span>
      <span className="text-2xl font-bold leading-none">{day}</span>
    </span>
  );
}

export async function LatestNews() {
  const data = await apiRequest<{ posts: BlogPost[] }>("/blog?limit=5").catch(() => ({ posts: [] as BlogPost[] }));
  const posts = data.posts;

  if (posts.length === 0) {
    return null;
  }

  const sidePosts = posts.slice(0, 3);
  const articleCards = posts.slice(3, 5);

  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow align="center">Microsoft Insights</Eyebrow>
          <h2 className="mt-4 heading-section text-navy">
            Corporate Training Insights
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3" delay={0.1}>
          <StaggerItem className="card-hover rounded-lg bg-white p-6 shadow-lifted">
            {sidePosts.map((post, index) => (
              <article key={post.slug} className={index === 0 ? "pb-6" : "border-t border-navy-100 py-6 last:pb-0"}>
                <Link href={`/blog/${post.slug}`} className="flex gap-4">
                  <DateBadge date={post.publishedAt} />
                  <div>
                    <Meta creator={post.creator} category={post.category} />
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-navy transition-colors hover:text-brand">
                      {post.headline}
                    </h3>
                  </div>
                </Link>
              </article>
            ))}
          </StaggerItem>

          {articleCards.map((post) => (
            <StaggerItem key={post.slug} className="card-hover group overflow-hidden rounded-lg bg-white shadow-lifted">
              <Link href={`/blog/${post.slug}`} className="relative block h-56 overflow-hidden" style={{ background: post.thumbnailGradient }}>
                {post.featuredImage && (
                  <Image
                    src={post.featuredImage}
                    alt={post.headline}
                    fill
                    sizes="(min-width: 1024px) 30vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute -bottom-4 left-6 rounded-full bg-signal px-6 py-2 text-sm font-bold text-navy">
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase()}
                </span>
              </Link>
              <div className="p-6 pt-10">
                <Meta creator={post.creator} category={post.category} />
                <h3 className="mt-5 text-xl font-semibold leading-snug text-navy">
                  <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand">
                    {post.headline}
                  </Link>
                </h3>
                <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase text-navy transition-colors hover:text-royal-700">
                  Read Insight
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
