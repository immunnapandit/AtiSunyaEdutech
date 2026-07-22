import express from "express";
import { Category, Course, User } from "../models/index.js";
import { requireAuth } from "../middleware/auth.js";
import { createRazorpayOrder, verifyRazorpaySignature } from "../services/razorpay.js";
import { sendPurchaseConfirmation, sendPurchaseNotification } from "../services/notification-service.js";
import { env } from "../config/env.js";

export const coursesRouter = express.Router();

async function buildEnrollmentResponse({ course, user, slug, billingDetails = {} }) {
  const existingEnrollment = user.enrollments.find((enrollment) => enrollment.courseSlug === slug);

  if (existingEnrollment?.paymentStatus === "paid") {
    return {
      alreadyEnrolled: true,
      payload: {
        message: `You are already enrolled in ${course.title}.`,
        enrolled: true,
        course: { slug: course.slug, title: course.title },
        payment: { status: "paid" }
      }
    };
  }

  const amount = Number(course.price || 0) * 100;
  const order = await createRazorpayOrder({
    amount,
    receipt: `${course.slug.slice(0, 20)}-${Date.now()}`.slice(0, 40),
    notes: {
      courseSlug: course.slug,
      userId: user.id,
      userEmail: user.email,
      courseTitle: course.title
    }
  });

  const enrollment = existingEnrollment || {
    courseSlug: slug,
    progress: 0,
    enrolledAt: new Date()
  };

  enrollment.progress = Number(enrollment.progress || 0);
  enrollment.paymentStatus = "pending";
  enrollment.orderId = order.id;
  enrollment.billingDetails = billingDetails;
  enrollment.updatedAt = new Date();

  if (!existingEnrollment) {
    user.enrollments.push(enrollment);
  }

  await user.save();

  return {
    alreadyEnrolled: false,
    payload: {
      message: `Payment required to enroll in ${course.title}.`,
      enrolled: false,
      course: { slug: course.slug, title: course.title, price: course.price },
      payment: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency || "INR",
        key: env.razorpay.keyId,
        mode: order.mode,
        callbackUrl: `${env.appBaseUrl.replace(/\/$/, "")}/courses/${course.slug}`
      }
    }
  };
}

coursesRouter.get("/", async (req, res) => {
  const { category, difficulty, featured, search } = req.query;
  const query = { published: true };

  if (category) {
    query.category = new RegExp(`^${escapeRegex(String(category))}$`, "i");
  }
  if (difficulty) {
    query.difficulty = new RegExp(`^${escapeRegex(String(difficulty))}$`, "i");
  }
  if (featured === "true") {
    query.featured = true;
  }
  if (search) {
    const term = new RegExp(escapeRegex(String(search)), "i");
    query.$or = [{ title: term }, { category: term }, { description: term }, { instructor: term }];
  }

  const [courses, categories] = await Promise.all([
    Course.find(query).sort({ createdAt: 1 }).lean({ virtuals: false }),
    Category.find().sort({ name: 1 }).lean()
  ]);

  return res.json({ courses: courses.map(serializeCourse), categories: categories.map(serializeCategory) });
});

coursesRouter.get("/:slug", async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug, published: true }).lean();

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  return res.json({ course: serializeCourse(course) });
});

coursesRouter.post("/:slug/enroll", requireAuth, async (req, res) => {
  const { course, user, errorResponse } = await loadCourseAndUser(req, res);
  if (errorResponse) return errorResponse;

  const { payload } = await buildEnrollmentResponse({ course, user, slug: req.params.slug });
  return res.json(payload);
});

coursesRouter.post("/:slug/checkout", requireAuth, async (req, res) => {
  const { course, user, errorResponse } = await loadCourseAndUser(req, res);
  if (errorResponse) return errorResponse;

  const { payload } = await buildEnrollmentResponse({
    course,
    user,
    slug: req.params.slug,
    billingDetails: req.body || {}
  });
  return res.json(payload);
});

coursesRouter.post("/:slug/verify-payment", requireAuth, async (req, res) => {
  const { course, user, errorResponse } = await loadCourseAndUser(req, res);
  if (errorResponse) return errorResponse;

  const enrollment = user.enrollments.find((item) => item.courseSlug === req.params.slug);
  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found." });
  }

  const { orderId, paymentId, signature } = req.body || {};
  const isValid = verifyRazorpaySignature({ orderId, paymentId, signature });

  if (!isValid) {
    return res.status(400).json({ message: "Payment verification failed." });
  }

  enrollment.paymentStatus = "paid";
  enrollment.paymentId = paymentId;
  enrollment.orderId = orderId;
  enrollment.progress = 5;
  await user.save();

  const payment = { status: "paid", orderId, paymentId };
  const [adminNotification, studentNotification] = await Promise.all([
    sendPurchaseNotification({ user, course, enrollment, payment }),
    sendPurchaseConfirmation({ user, course, enrollment, payment })
  ]);

  return res.json({
    message: `Payment successful. You are now enrolled in ${course.title}.`,
    enrolled: true,
    course: { slug: course.slug, title: course.title },
    payment,
    notification: {
      admin: adminNotification,
      student: studentNotification
    }
  });
});

async function loadCourseAndUser(req, res) {
  const course = await Course.findOne({ slug: req.params.slug, published: true });

  if (!course) {
    return { errorResponse: res.status(404).json({ message: "Course not found." }) };
  }

  const user = await User.findById(req.user.sub);
  if (!user) {
    return { errorResponse: res.status(404).json({ message: "User not found." }) };
  }

  return { course, user };
}

export function serializeCourse(course) {
  return {
    slug: course.slug,
    title: course.title,
    category: course.category,
    difficulty: course.difficulty,
    duration: course.duration,
    studentsCount: course.studentsCount,
    instructor: course.instructor,
    instructorAvatar: course.instructorAvatar,
    rating: course.rating,
    reviewCount: course.reviewCount,
    price: course.price,
    originalPrice: course.originalPrice,
    thumbnail: course.thumbnail,
    image: course.image,
    banner: course.banner,
    thumbnailGradient: course.thumbnailGradient,
    description: course.description,
    curriculum: course.curriculum || [],
    faqs: course.faqs || [],
    seo: course.seo || {},
    featured: Boolean(course.featured)
  };
}

export function serializeCategory(category) {
  return { name: category.name, count: category.count, icon: category.icon };
}

export function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
