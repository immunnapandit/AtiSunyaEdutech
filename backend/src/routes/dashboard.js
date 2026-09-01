import express from "express";
import { CertificateSettings, Course, User } from "../models/index.js";
import { requireAuth } from "../middleware/auth.js";
import { serializeCourse } from "./courses.js";
import { generateCertificatePdf } from "../services/certificate-pdf.js";
import { env } from "../config/env.js";

export const dashboardRouter = express.Router();

dashboardRouter.get("/", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.sub).lean();

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const paidEnrollments = (user.enrollments || []).filter(
    (enrollment) => enrollment.paymentStatus === "paid"
  );
  const slugs = paidEnrollments.map((enrollment) => enrollment.courseSlug);
  const courses = await Course.find({ slug: { $in: slugs } }).lean();
  const courseBySlug = new Map(courses.map((course) => [course.slug, course]));

  const purchasedCourseSlugs = new Set(slugs);
  const enrolledCourses = paidEnrollments
    .map((enrollment) => {
      const course = courseBySlug.get(enrollment.courseSlug);
      if (!course) {
        return null;
      }

      return {
        slug: course.slug,
        title: course.title,
        description: course.description,
        category: course.category,
        duration: course.duration,
        price: course.price,
        progress: Number(enrollment.progress || 0),
        status: "Active",
        nextMilestone: enrollment.progress > 0 ? "Continue learning" : "Start your first lesson",
        enrolledAt: enrollment.enrolledAt || null,
        payment: {
          amount: enrollment.amount ?? course.price,
          currency: enrollment.currency || "INR",
          orderId: enrollment.orderId || null,
          paymentId: enrollment.paymentId || null,
          paidAt: enrollment.paidAt || null
        }
      };
    })
    .filter(Boolean);

  const certificates = (user.certificates || [])
    .filter((certificate) => purchasedCourseSlugs.has(certificate.courseSlug))
    .map((certificate) => {
      const course = courseBySlug.get(certificate.courseSlug);
      if (!course) return null;

      return {
        courseSlug: certificate.courseSlug,
        certificateId: certificate.certificateId,
        issuedAt: certificate.issuedAt,
        course: serializeCourse(course)
      };
    })
    .filter(Boolean);

  return res.json({
    user: { id: String(user._id), name: user.name, email: user.email || user.phone || "" },
    stats: {
      purchasedCourses: enrolledCourses.length,
      certificatesEarned: certificates.length
    },
    enrolledCourses,
    certificates,
    upcoming: [],
    activity: []
  });
});

dashboardRouter.get("/certificates/:slug", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.sub).lean();

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const certificate = (user.certificates || []).find((c) => c.courseSlug === req.params.slug);

  if (!certificate) {
    return res.status(404).json({ message: "Certificate not found." });
  }

  const course = await Course.findOne({ slug: req.params.slug }).lean();

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  const settings = (await CertificateSettings.findOne().lean()) || {};

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${course.slug}-certificate.pdf"`);

  await generateCertificatePdf(
    {
      studentName: user.name,
      courseTitle: course.title,
      certificateId: certificate.certificateId,
      issuedAt: certificate.issuedAt,
      signatureName: settings.signatureName,
      signatureTitle: settings.signatureTitle,
      signatureImage: settings.signatureImage,
      organizationName: settings.organizationName,
      verifyUrl: `${env.appBaseUrl.replace(/\/$/, "")}/verify-certificate/${certificate.certificateId}`
    },
    res
  );
});
