import express from "express";
import { readDb, writeDb } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { createRazorpayOrder, verifyRazorpaySignature } from "../services/razorpay.js";
import { sendGraphMail } from "../services/graph-mail.js";
import { env } from "../config/env.js";

export const coursesRouter = express.Router();

async function buildEnrollmentResponse({ db, course, user, slug, billingDetails = {} }) {
  const enrollments = Array.isArray(user.enrollments) ? user.enrollments : [];
  const existingEnrollment = enrollments.find((enrollment) => enrollment.courseSlug === slug);

  if (existingEnrollment) {
    if (existingEnrollment.paymentStatus === "paid") {
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
    return {
      alreadyEnrolled: false,
      payload: {
        message: `You have a pending payment for ${course.title}. Complete checkout to finish enrollment.`,
        enrolled: false,
        course: { slug: course.slug, title: course.title, price: course.price },
        payment: {
          orderId: existingEnrollment.orderId,
          amount,
          currency: "INR",
          key: env.razorpay.keyId,
          mode: env.razorpay.keyId && env.razorpay.keySecret ? "live" : "demo",
          callbackUrl: `${env.appBaseUrl.replace(/\/$/, "")}/courses/${course.slug}`
        }
      }
    };
  }

  const amount = Number(course.price || 0) * 100;
  const order = await createRazorpayOrder({
    amount,
    receipt: `${course.slug}-${Date.now()}`,
    notes: {
      courseSlug: course.slug,
      userId: user.id,
      userEmail: user.email,
      courseTitle: course.title
    }
  });

  enrollments.push({
    courseSlug: slug,
    progress: 5,
    paymentStatus: "pending",
    orderId: order.id,
    enrolledAt: new Date().toISOString(),
    billingDetails
  });
  user.enrollments = enrollments;
  await writeDb(db);

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
  const db = await readDb();
  const { category, difficulty, featured, search } = req.query;

  let results = db.courses;
  if (category) {
    results = results.filter((course) => course.category.toLowerCase() === String(category).toLowerCase());
  }
  if (difficulty) {
    results = results.filter((course) => course.difficulty.toLowerCase() === String(difficulty).toLowerCase());
  }
  if (featured === "true") {
    results = results.filter((course) => course.featured);
  }
  if (search) {
    const term = String(search).toLowerCase();
    results = results.filter((course) =>
      [course.title, course.category, course.description, course.instructor].some((value) =>
        value.toLowerCase().includes(term)
      )
    );
  }

  return res.json({ courses: results, categories: db.categories });
});

coursesRouter.get("/:slug", async (req, res) => {
  const db = await readDb();
  const course = db.courses.find((item) => item.slug === req.params.slug);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  return res.json({ course });
});

coursesRouter.post("/:slug/enroll", requireAuth, async (req, res) => {
  const db = await readDb();
  const course = db.courses.find((item) => item.slug === req.params.slug);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  const user = db.users.find((item) => item.id === req.user.sub);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const { alreadyEnrolled, payload } = await buildEnrollmentResponse({
    db,
    course,
    user,
    slug: req.params.slug
  });

  if (alreadyEnrolled) {
    return res.json(payload);
  }

  return res.json(payload);
});

coursesRouter.post("/:slug/checkout", requireAuth, async (req, res) => {
  const db = await readDb();
  const course = db.courses.find((item) => item.slug === req.params.slug);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  const user = db.users.find((item) => item.id === req.user.sub);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const { alreadyEnrolled, payload } = await buildEnrollmentResponse({
    db,
    course,
    user,
    slug: req.params.slug,
    billingDetails: req.body || {}
  });

  if (alreadyEnrolled) {
    return res.json(payload);
  }

  return res.json(payload);
});

coursesRouter.post("/:slug/verify-payment", requireAuth, async (req, res) => {
  const db = await readDb();
  const course = db.courses.find((item) => item.slug === req.params.slug);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  const user = db.users.find((item) => item.id === req.user.sub);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const enrollment = (user.enrollments || []).find((item) => item.courseSlug === req.params.slug);
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
  await writeDb(db);

  await sendGraphMail({
    to: [user.email, env.graph.adminEmail || "info@atisunya.co"],
    subject: `New course purchase: ${course.title}`,
    replyTo: [user.email],
    html: `<div><h2>New Course Purchase</h2><p><strong>Student:</strong> ${user.name} (${user.email})</p><p><strong>Course:</strong> ${course.title}</p><p><strong>Amount:</strong> ${course.price} INR</p><p><strong>Payment ID:</strong> ${paymentId}</p></div>`
  });

  return res.json({
    message: `Payment successful. You are now enrolled in ${course.title}.`,
    enrolled: true,
    course: { slug: course.slug, title: course.title },
    payment: { status: "paid", paymentId }
  });
});
