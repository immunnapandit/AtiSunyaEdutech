import express from "express";
import { Course, User } from "../models/index.js";

export const certificatesRouter = express.Router();

certificatesRouter.get("/verify/:certificateId", async (req, res) => {
  const certificateId = String(req.params.certificateId || "").trim().toUpperCase();

  if (!certificateId) {
    return res.status(400).json({ valid: false, message: "Certificate ID is required." });
  }

  const user = await User.findOne({ "certificates.certificateId": certificateId }).lean();

  if (!user) {
    return res.json({ valid: false });
  }

  const certificate = (user.certificates || []).find((c) => c.certificateId === certificateId);
  const course = await Course.findOne({ slug: certificate.courseSlug }).lean();

  return res.json({
    valid: true,
    certificate: {
      certificateId: certificate.certificateId,
      issuedAt: certificate.issuedAt,
      studentName: user.name,
      courseTitle: course?.title || certificate.courseSlug
    }
  });
});
