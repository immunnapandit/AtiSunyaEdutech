import express from "express";
import { verifyRazorpayWebhookSignature, fetchRazorpayOrder } from "../services/razorpay.js";
import { sendPaymentWebhookNotification, sendPurchaseNotification, sendPurchaseConfirmation } from "../services/notification-service.js";
import { Course, User } from "../models/index.js";

export const paymentsRouter = express.Router();

paymentsRouter.post("/webhook/razorpay", async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const isValid = verifyRazorpayWebhookSignature({ rawBody: req.rawBody, signature });

  if (!isValid) {
    return res.status(400).json({ message: "Invalid webhook signature." });
  }

  const event = req.body?.event;
  const payment = req.body?.payload?.payment?.entity;

  if (payment && (event === "payment.captured" || event === "order.paid")) {
    await sendPaymentWebhookNotification({ event, payment });
    await markEnrollmentPaidFromWebhook(payment);
  }

  return res.json({ received: true });
});

async function markEnrollmentPaidFromWebhook(payment) {
  const order = await fetchRazorpayOrder(payment.order_id);
  const { userId, courseSlug } = order.notes || {};

  if (!userId || !courseSlug) {
    return;
  }

  const user = await User.findById(userId);
  const enrollment = user?.enrollments.find((item) => item.courseSlug === courseSlug);

  if (!enrollment || enrollment.paymentStatus === "paid") {
    return;
  }

  enrollment.paymentStatus = "paid";
  enrollment.paymentId = payment.id;
  enrollment.orderId = payment.order_id;
  enrollment.paidAt = new Date();
  enrollment.progress = enrollment.progress || 5;
  await user.save();

  const course = await Course.findOne({ slug: courseSlug }).lean();
  if (course) {
    const paymentDetails = { status: "paid", orderId: payment.order_id, paymentId: payment.id };
    await Promise.all([
      sendPurchaseNotification({ user, course, enrollment, payment: paymentDetails }),
      sendPurchaseConfirmation({ user, course, enrollment, payment: paymentDetails })
    ]);
  }
}
