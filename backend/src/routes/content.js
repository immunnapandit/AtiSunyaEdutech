import express from "express";
import { BlogPost, Faq, Instructor, Testimonial } from "../models/index.js";

export const contentRouter = express.Router();

contentRouter.get("/blog", async (req, res) => {
  const { category, search, page = "1", limit = "12" } = req.query;
  const query = { published: true, publishedAt: { $lte: new Date() } };

  if (category) {
    query.category = new RegExp(`^${escapeRegex(String(category))}$`, "i");
  }
  if (search) {
    const term = new RegExp(escapeRegex(String(search)), "i");
    query.$or = [{ headline: term }, { summary: term }, { category: term }, { creator: term }];
  }

  const pageNumber = Math.max(1, Number.parseInt(String(page), 10) || 1);
  const pageSize = Math.min(50, Math.max(1, Number.parseInt(String(limit), 10) || 12));

  const [posts, total, categories] = await Promise.all([
    BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean(),
    BlogPost.countDocuments(query),
    BlogPost.distinct("category", { published: true })
  ]);

  return res.json({
    posts: posts.map(serializeBlogPost),
    total,
    page: pageNumber,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    categories: categories.sort()
  });
});

contentRouter.get("/blog/:slug", async (req, res) => {
  const post = await BlogPost.findOne({
    slug: req.params.slug,
    published: true,
    publishedAt: { $lte: new Date() }
  }).lean();

  if (!post) {
    return res.status(404).json({ message: "Blog post not found." });
  }

  return res.json({ post: serializeBlogPost(post) });
});

contentRouter.get("/instructors", async (_req, res) => {
  const instructors = await Instructor.find().sort({ createdAt: 1 }).lean();
  return res.json({ instructors: instructors.map(serializeInstructor) });
});

contentRouter.get("/faqs", async (_req, res) => {
  const faqs = await Faq.find().sort({ order: 1, createdAt: 1 }).lean();
  return res.json({ faqs: faqs.map((faq) => ({ question: faq.question, answer: faq.answer })) });
});

contentRouter.get("/testimonials", async (_req, res) => {
  const testimonials = await Testimonial.find({ published: true }).sort({ createdAt: -1 }).lean();
  return res.json({
    testimonials: testimonials.map((item) => ({
      name: item.name,
      role: item.role,
      company: item.company,
      quote: item.quote,
      avatar: item.avatar,
      rating: item.rating
    }))
  });
});

export function serializeBlogPost(post) {
  return {
    slug: post.slug,
    headline: post.headline,
    creator: post.creator,
    category: post.category,
    tags: post.tags || [],
    summary: post.summary,
    readingTime: post.readingTime,
    thumbnailGradient: post.thumbnailGradient,
    featuredImage: post.featuredImage || "",
    sections: post.sections || [],
    seo: post.seo || {},
    publishedDate: formatDate(post.publishedAt),
    publishedAt: post.publishedAt
  };
}

function serializeInstructor(instructor) {
  return {
    slug: instructor.slug,
    name: instructor.name,
    role: instructor.role,
    company: instructor.company,
    bio: instructor.bio,
    avatar: instructor.avatar,
    image: instructor.image || "",
    studentsCount: instructor.studentsCount,
    coursesCount: instructor.coursesCount,
    rating: instructor.rating,
    expertise: instructor.expertise || []
  };
}

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
