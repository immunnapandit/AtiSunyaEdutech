import crypto from "node:crypto";
import express from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { env } from "../config/env.js";
import { requireAdmin } from "../middleware/admin.js";
import {
  BlogPost,
  Category,
  Contact,
  Course,
  Faq,
  Instructor,
  Media,
  Newsletter,
  Quote,
  Testimonial,
  User
} from "../models/index.js";
import { createUploadSignature, deleteAsset } from "../services/cloudinary.js";
import { serializeBlogPost } from "./content.js";
import { serializeCourse } from "./courses.js";
import { validate } from "../utils/validation.js";

export const adminRouter = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many login attempts. Try again later." }
});

adminRouter.post("/login", loginLimiter, (req, res) => {
  const { email, password } = req.body || {};

  if (!env.admin.email || !env.admin.password) {
    return res.status(503).json({ message: "Admin login is not configured on the server." });
  }

  const emailMatches = safeEquals(String(email || "").toLowerCase(), env.admin.email.toLowerCase());
  const passwordMatches = safeEquals(String(password || ""), env.admin.password);

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ message: "Invalid admin credentials." });
  }

  const token = jwt.sign({ sub: "admin", scope: "admin-panel", email: env.admin.email }, env.jwtSecret, {
    expiresIn: "12h"
  });

  return res.json({ token, admin: { email: env.admin.email } });
});

adminRouter.use(requireAdmin);

adminRouter.get("/stats", async (_req, res) => {
  const [users, courses, blogs, contacts, quotes, subscribers, enrollmentAgg] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments(),
    BlogPost.countDocuments(),
    Contact.countDocuments(),
    Quote.countDocuments(),
    Newsletter.countDocuments(),
    User.aggregate([
      { $unwind: "$enrollments" },
      { $match: { "enrollments.paymentStatus": "paid" } },
      { $count: "total" }
    ])
  ]);

  return res.json({
    stats: {
      totalUsers: users,
      totalCourses: courses,
      totalBlogs: blogs,
      totalEnrollments: enrollmentAgg[0]?.total || 0,
      totalContacts: contacts,
      totalQuotes: quotes,
      totalSubscribers: subscribers
    }
  });
});

const seoSchema = z
  .object({
    title: z.string().trim().optional().default(""),
    description: z.string().trim().optional().default(""),
    keywords: z.array(z.string().trim()).optional().default([])
  })
  .optional()
  .default({});

const courseSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  title: z.string().trim().min(2),
  category: z.string().trim().min(1),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).default("Beginner"),
  duration: z.string().trim().optional().default(""),
  studentsCount: z.coerce.number().min(0).optional().default(0),
  instructor: z.string().trim().optional().default(""),
  instructorAvatar: z.string().trim().optional().default(""),
  rating: z.coerce.number().min(0).max(5).optional().default(0),
  reviewCount: z.coerce.number().min(0).optional().default(0),
  price: z.coerce.number().min(0),
  originalPrice: z.coerce.number().min(0).optional().nullable(),
  image: z.string().trim().optional().default(""),
  banner: z.string().trim().optional().default(""),
  thumbnailGradient: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
  curriculum: z
    .array(z.object({ title: z.string().trim().min(1), lessons: z.array(z.string().trim()).default([]) }))
    .optional()
    .default([]),
  faqs: z
    .array(z.object({ question: z.string().trim().min(1), answer: z.string().trim().min(1) }))
    .optional()
    .default([]),
  seo: seoSchema,
  featured: z.coerce.boolean().optional().default(false),
  published: z.coerce.boolean().optional().default(true)
});

adminRouter.get("/courses", async (_req, res) => {
  const courses = await Course.find().sort({ createdAt: 1 }).lean();
  return res.json({ courses: courses.map((course) => ({ ...serializeCourse(course), published: course.published })) });
});

adminRouter.get("/courses/:slug", async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug }).lean();
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }
  return res.json({ course: { ...serializeCourse(course), published: course.published } });
});

adminRouter.post("/courses", validate.bind(null, courseSchema), async (req, res) => {
  const existing = await Course.findOne({ slug: req.body.slug });
  if (existing) {
    return res.status(409).json({ message: "A course with this slug already exists." });
  }

  const course = await Course.create(req.body);
  return res.status(201).json({ course: { ...serializeCourse(course), published: course.published } });
});

adminRouter.put("/courses/:slug", validate.bind(null, courseSchema.partial()), async (req, res) => {
  if (req.body.slug && req.body.slug !== req.params.slug) {
    const clash = await Course.findOne({ slug: req.body.slug });
    if (clash) {
      return res.status(409).json({ message: "A course with the new slug already exists." });
    }
  }

  const course = await Course.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  return res.json({ course: { ...serializeCourse(course), published: course.published } });
});

adminRouter.delete("/courses/:slug", async (req, res) => {
  const course = await Course.findOneAndDelete({ slug: req.params.slug });
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  return res.json({ message: "Course deleted.", slug: req.params.slug });
});

const blogSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  headline: z.string().trim().min(2),
  creator: z.string().trim().optional().default("Atisunya Team"),
  category: z.string().trim().optional().default("General"),
  tags: z.array(z.string().trim()).optional().default([]),
  summary: z.string().trim().optional().default(""),
  readingTime: z.string().trim().optional().default(""),
  thumbnailGradient: z.string().trim().optional().default(""),
  featuredImage: z.string().trim().optional().default(""),
  sections: z
    .array(z.object({ heading: z.string().trim().default(""), body: z.string().trim().default("") }))
    .optional()
    .default([]),
  seo: seoSchema,
  published: z.coerce.boolean().optional().default(true),
  publishedAt: z.coerce.date().optional()
});

adminRouter.get("/blog", async (_req, res) => {
  const posts = await BlogPost.find().sort({ publishedAt: -1 }).lean();
  return res.json({ posts: posts.map((post) => ({ ...serializeBlogPost(post), published: post.published })) });
});

adminRouter.get("/blog/:slug", async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug }).lean();
  if (!post) {
    return res.status(404).json({ message: "Blog post not found." });
  }
  return res.json({ post: { ...serializeBlogPost(post), published: post.published } });
});

adminRouter.post("/blog", validate.bind(null, blogSchema), async (req, res) => {
  const existing = await BlogPost.findOne({ slug: req.body.slug });
  if (existing) {
    return res.status(409).json({ message: "A blog post with this slug already exists." });
  }

  const post = await BlogPost.create({ ...req.body, publishedAt: req.body.publishedAt || new Date() });
  return res.status(201).json({ post: { ...serializeBlogPost(post), published: post.published } });
});

adminRouter.put("/blog/:slug", validate.bind(null, blogSchema.partial()), async (req, res) => {
  if (req.body.slug && req.body.slug !== req.params.slug) {
    const clash = await BlogPost.findOne({ slug: req.body.slug });
    if (clash) {
      return res.status(409).json({ message: "A blog post with the new slug already exists." });
    }
  }

  const post = await BlogPost.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
  if (!post) {
    return res.status(404).json({ message: "Blog post not found." });
  }

  return res.json({ post: { ...serializeBlogPost(post), published: post.published } });
});

adminRouter.delete("/blog/:slug", async (req, res) => {
  const post = await BlogPost.findOneAndDelete({ slug: req.params.slug });
  if (!post) {
    return res.status(404).json({ message: "Blog post not found." });
  }

  return res.json({ message: "Blog post deleted.", slug: req.params.slug });
});

const categorySchema = z.object({
  name: z.string().trim().min(1),
  count: z.coerce.number().min(0).optional().default(0),
  icon: z.string().trim().optional().default("target")
});

adminRouter.get("/categories", async (_req, res) => {
  const categories = await Category.find().sort({ name: 1 }).lean();
  return res.json({ categories });
});

adminRouter.post("/categories", validate.bind(null, categorySchema), async (req, res) => {
  const category = await Category.findOneAndUpdate(
    { name: req.body.name },
    req.body,
    { new: true, upsert: true }
  );
  return res.status(201).json({ category });
});

adminRouter.delete("/categories/:id", async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found." });
  }
  return res.json({ message: "Category deleted." });
});

const testimonialSchema = z.object({
  name: z.string().trim().min(1),
  role: z.string().trim().optional().default(""),
  company: z.string().trim().optional().default(""),
  quote: z.string().trim().min(1),
  avatar: z.string().trim().optional().default(""),
  rating: z.coerce.number().min(0).max(5).optional().default(5),
  published: z.coerce.boolean().optional().default(true)
});

adminRouter.get("/testimonials", async (_req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
  return res.json({ testimonials });
});

adminRouter.post("/testimonials", validate.bind(null, testimonialSchema), async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  return res.status(201).json({ testimonial });
});

adminRouter.put("/testimonials/:id", validate.bind(null, testimonialSchema.partial()), async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!testimonial) {
    return res.status(404).json({ message: "Testimonial not found." });
  }
  return res.json({ testimonial });
});

adminRouter.delete("/testimonials/:id", async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    return res.status(404).json({ message: "Testimonial not found." });
  }
  return res.json({ message: "Testimonial deleted." });
});

const faqSchema = z.object({
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
  order: z.coerce.number().optional().default(0)
});

adminRouter.get("/faqs", async (_req, res) => {
  const faqs = await Faq.find().sort({ order: 1, createdAt: 1 }).lean();
  return res.json({ faqs });
});

adminRouter.post("/faqs", validate.bind(null, faqSchema), async (req, res) => {
  const faq = await Faq.create(req.body);
  return res.status(201).json({ faq });
});

adminRouter.put("/faqs/:id", validate.bind(null, faqSchema.partial()), async (req, res) => {
  const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!faq) {
    return res.status(404).json({ message: "FAQ not found." });
  }
  return res.json({ faq });
});

adminRouter.delete("/faqs/:id", async (req, res) => {
  const faq = await Faq.findByIdAndDelete(req.params.id);
  if (!faq) {
    return res.status(404).json({ message: "FAQ not found." });
  }
  return res.json({ message: "FAQ deleted." });
});

const instructorSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(1),
  role: z.string().trim().optional().default(""),
  company: z.string().trim().optional().default(""),
  bio: z.string().trim().optional().default(""),
  avatar: z.string().trim().optional().default(""),
  image: z.string().trim().optional().default(""),
  studentsCount: z.coerce.number().min(0).optional().default(0),
  coursesCount: z.coerce.number().min(0).optional().default(0),
  rating: z.coerce.number().min(0).max(5).optional().default(0),
  expertise: z.array(z.string().trim()).optional().default([])
});

adminRouter.get("/instructors", async (_req, res) => {
  const instructors = await Instructor.find().sort({ createdAt: 1 }).lean();
  return res.json({ instructors });
});

adminRouter.post("/instructors", validate.bind(null, instructorSchema), async (req, res) => {
  const existing = await Instructor.findOne({ slug: req.body.slug });
  if (existing) {
    return res.status(409).json({ message: "An instructor with this slug already exists." });
  }
  const instructor = await Instructor.create(req.body);
  return res.status(201).json({ instructor });
});

adminRouter.put("/instructors/:slug", validate.bind(null, instructorSchema.partial()), async (req, res) => {
  const instructor = await Instructor.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
  if (!instructor) {
    return res.status(404).json({ message: "Instructor not found." });
  }
  return res.json({ instructor });
});

adminRouter.delete("/instructors/:slug", async (req, res) => {
  const instructor = await Instructor.findOneAndDelete({ slug: req.params.slug });
  if (!instructor) {
    return res.status(404).json({ message: "Instructor not found." });
  }
  return res.json({ message: "Instructor deleted." });
});

adminRouter.get("/leads", async (_req, res) => {
  const [contacts, quotes, subscribers] = await Promise.all([
    Contact.find().sort({ createdAt: -1 }).limit(100).lean(),
    Quote.find().sort({ createdAt: -1 }).limit(100).lean(),
    Newsletter.find().sort({ createdAt: -1 }).limit(200).lean()
  ]);
  return res.json({ contacts, quotes, subscribers });
});

adminRouter.post("/media/sign", (req, res) => {
  try {
    const signature = createUploadSignature({ folder: sanitizeFolder(req.body?.folder) });
    return res.json(signature);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
});

const mediaRecordSchema = z.object({
  publicId: z.string().trim().min(1),
  url: z.string().trim().url(),
  format: z.string().trim().optional(),
  bytes: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  folder: z.string().trim().optional(),
  originalFilename: z.string().trim().optional()
});

adminRouter.post("/media", validate.bind(null, mediaRecordSchema), async (req, res) => {
  const media = await Media.findOneAndUpdate(
    { publicId: req.body.publicId },
    req.body,
    { new: true, upsert: true }
  );
  return res.status(201).json({ media });
});

adminRouter.get("/media", async (_req, res) => {
  const media = await Media.find().sort({ createdAt: -1 }).limit(200).lean();
  return res.json({ media });
});

adminRouter.delete("/media/:id", async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) {
    return res.status(404).json({ message: "Media not found." });
  }

  try {
    await deleteAsset(media.publicId);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }

  await media.deleteOne();
  return res.json({ message: "Media deleted." });
});

function sanitizeFolder(folder) {
  const cleaned = String(folder || "atisunya").replace(/[^a-zA-Z0-9/_-]/g, "");
  return cleaned || "atisunya";
}

function safeEquals(a, b) {
  const bufferA = Buffer.from(String(a));
  const bufferB = Buffer.from(String(b));

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  return crypto.timingSafeEqual(bufferA, bufferB);
}
