import express from "express";
import { Course, User } from "../models/index.js";
import { requireAuth } from "../middleware/auth.js";
import { serializeCourse } from "./courses.js";

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
        paymentId: enrollment.paymentId || null
      };
    })
    .filter(Boolean);

  const certificates = (user.certificates || [])
    .filter((slug) => purchasedCourseSlugs.has(slug))
    .map((slug) => courseBySlug.get(slug))
    .filter(Boolean)
    .map(serializeCourse);

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
