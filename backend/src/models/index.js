import mongoose from "mongoose";

const { Schema } = mongoose;

const timestamps = { timestamps: true };

const enrollmentSchema = new Schema(
  {
    courseSlug: { type: String, required: true },
    progress: { type: Number, default: 0 },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    orderId: String,
    paymentId: String,
    billingDetails: Schema.Types.Mixed,
    enrolledAt: { type: Date, default: Date.now },
    updatedAt: Date
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true, index: true, sparse: true },
    phone: { type: String, trim: true, index: true, sparse: true },
    passwordHash: String,
    provider: String,
    providerId: String,
    role: { type: String, enum: ["student", "admin"], default: "student" },
    enrollments: { type: [enrollmentSchema], default: [] },
    certificates: { type: [String], default: [] }
  },
  timestamps
);

const curriculumModuleSchema = new Schema(
  {
    title: { type: String, required: true },
    lessons: { type: [String], default: [] }
  },
  { _id: false }
);

const faqEntrySchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { _id: false }
);

const seoSchema = new Schema(
  {
    title: String,
    description: String,
    keywords: { type: [String], default: [] }
  },
  { _id: false }
);

const courseSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    duration: { type: String, default: "" },
    studentsCount: { type: Number, default: 0 },
    instructor: { type: String, default: "" },
    instructorAvatar: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    price: { type: Number, required: true },
    originalPrice: Number,
    thumbnail: { type: String, default: "" },
    image: { type: String, default: "" },
    banner: { type: String, default: "" },
    thumbnailGradient: { type: String, default: "" },
    description: { type: String, default: "" },
    curriculum: { type: [curriculumModuleSchema], default: [] },
    faqs: { type: [faqEntrySchema], default: [] },
    seo: { type: seoSchema, default: () => ({}) },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true, index: true }
  },
  timestamps
);

const blogSectionSchema = new Schema(
  {
    heading: { type: String, default: "" },
    body: { type: String, default: "" }
  },
  { _id: false }
);

const blogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    headline: { type: String, required: true, trim: true },
    creator: { type: String, default: "Atisunya Team" },
    category: { type: String, default: "General", index: true },
    tags: { type: [String], default: [] },
    summary: { type: String, default: "" },
    readingTime: { type: String, default: "" },
    thumbnailGradient: { type: String, default: "" },
    featuredImage: { type: String, default: "" },
    sections: { type: [blogSectionSchema], default: [] },
    seo: { type: seoSchema, default: () => ({}) },
    published: { type: Boolean, default: true, index: true },
    publishedAt: { type: Date, default: Date.now }
  },
  timestamps
);

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
    icon: { type: String, default: "target" }
  },
  timestamps
);

const instructorSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, default: "" },
    company: { type: String, default: "" },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    image: { type: String, default: "" },
    studentsCount: { type: Number, default: 0 },
    coursesCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    expertise: { type: [String], default: [] }
  },
  timestamps
);

const faqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 }
  },
  timestamps
);

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "" },
    company: { type: String, default: "" },
    quote: { type: String, required: true },
    avatar: { type: String, default: "" },
    rating: { type: Number, default: 5 },
    published: { type: Boolean, default: true }
  },
  timestamps
);

const contactSchema = new Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String
  },
  timestamps
);

const quoteSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
    subject: String,
    message: String,
    subscribe: Boolean
  },
  timestamps
);

const newsletterSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, lowercase: true, trim: true }
  },
  timestamps
);

const resetRequestSchema = new Schema(
  {
    email: String,
    phone: String,
    token: { type: String, required: true, index: true }
  },
  timestamps
);

const mediaSchema = new Schema(
  {
    publicId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    format: String,
    bytes: Number,
    width: Number,
    height: Number,
    folder: String,
    originalFilename: String
  },
  timestamps
);

export const User = mongoose.model("User", userSchema);
export const Course = mongoose.model("Course", courseSchema);
export const BlogPost = mongoose.model("BlogPost", blogPostSchema);
export const Category = mongoose.model("Category", categorySchema);
export const Instructor = mongoose.model("Instructor", instructorSchema);
export const Faq = mongoose.model("Faq", faqSchema);
export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export const Contact = mongoose.model("Contact", contactSchema);
export const Quote = mongoose.model("Quote", quoteSchema);
export const Newsletter = mongoose.model("Newsletter", newsletterSchema);
export const ResetRequest = mongoose.model("ResetRequest", resetRequestSchema);
export const Media = mongoose.model("Media", mediaSchema);
