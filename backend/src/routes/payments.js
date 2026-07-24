import express from "express";
import { verifyRazorpayWebhookSignature } from "../services/razorpay.js";
import { sendPaymentWebhookNotification } from "../services/notification-service.js";

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
  }

  return res.json({ received: true });
});
