import express from "express";
import { readDb } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

export const dashboardRouter = express.Router();

dashboardRouter.get("/", requireAuth, async (req, res) => {
  const db = await readDb();
  const user = db.users.find((item) => item.id === req.user.sub);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const enrollments = Array.isArray(user.enrollments) ? user.enrollments : [];
  const enrolledCourses = enrollments
    .map((enrollment) => {
      const course = db.courses.find((item) => item.slug === enrollment.courseSlug);
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
        status: enrollment.paymentStatus === "paid" ? "Active" : "Payment pending",
        nextMilestone: enrollment.paymentStatus === "paid"
          ? "Continue your first lesson"
          : "Complete payment to unlock the course"
      };
    })
    .filter(Boolean);

  const certificates = Array.isArray(user.certificates)
    ? user.certificates
        .map((slug) => db.courses.find((course) => course.slug === slug))
        .filter(Boolean)
    : [];

  return res.json({
    user: { id: user.id, name: user.name, email: user.email },
    stats: {
      coursesInProgress: enrolledCourses.length,
      certificatesEarned: certificates.length,
      assignmentsDue: 3,
      studyStreak: "14 days"
    },
    enrolledCourses,
    certificates,
    upcoming: [
      { title: "Live session: Azure architecture review", time: "Today, 6:00 PM" },
      { title: "Capstone review with mentor", time: "Fri, 4:30 PM" }
    ],
    activity: [
      "Submitted assignment: CRM workflow review",
      "Completed lesson: Azure identity basics",
      "Joined live session: Copilot adoption Q&A"
    ]
  });
});
