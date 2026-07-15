import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Folder, User } from "lucide-react";
import { Container } from "@/components/ui/primitives";

const sidePosts = [
  { month: "JAN", day: "20", title: "Choosing the right Microsoft training path for your team" },
  { month: "FEB", day: "26", title: "How hands-on labs improve Microsoft service adoption" },
  { month: "JAN", day: "28", title: "What teams need before a Dynamics 365 rollout" },
];

const articleCards = [
  {
    title: "Building enterprise-ready skills with Azure and Power Platform",
    date: "28 JANUARY, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Why corporate Microsoft training works best with real use cases",
    date: "28 JANUARY, 2026",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85",
  },
];

function Meta() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase text-navy-400">
      <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> By Admin</span>
      <span className="flex items-center gap-1.5"><Folder className="h-3.5 w-3.5" /> Microsoft Training</span>
    </div>
  );
}

function DateBadge({ month, day }: { month: string; day: string }) {
  return (
    <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-signal text-navy">
      <span className="text-sm font-bold leading-none">{month}</span>
      <span className="text-2xl font-bold leading-none">{day}</span>
    </span>
  );
}

export function LatestNews() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-base font-bold text-royal-700">
            <span className="h-px w-12 bg-royal-700" />
            Microsoft Insights
            <span className="h-px w-12 bg-royal-700" />
          </div>
          <h2 className="mt-4 heading-section text-navy">
            Corporate Training Insights
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-lifted">
            {sidePosts.map((post, index) => (
              <article key={post.title} className={index === 0 ? "pb-6" : "border-t border-navy-100 py-6 last:pb-0"}>
                <div className="flex gap-4">
                  <DateBadge month={post.month} day={post.day} />
                  <div>
                    <Meta />
                    <h3 className="mt-3 text-xl font-bold leading-snug text-navy">{post.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {articleCards.map((article) => (
            <article key={article.title} className="overflow-hidden rounded-lg bg-white shadow-lifted">
              <div className="relative h-56">
                <Image src={article.image} alt={article.title} fill sizes="(min-width: 1024px) 30vw, 92vw" className="object-cover" />
                <span className="absolute -bottom-4 left-6 rounded-full bg-signal px-6 py-2 text-sm font-bold text-navy">{article.date}</span>
              </div>
              <div className="p-6 pt-10">
                <Meta />
                <h3 className="mt-5 text-xl font-bold leading-snug text-navy">{article.title}</h3>
                <Link href="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase text-navy transition-colors hover:text-royal-700">
                  Read Insight
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

