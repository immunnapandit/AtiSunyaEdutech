import crypto from "node:crypto";
import { env } from "../config/env.js";

export function isRazorpayConfigured() {
  return Boolean(env.razorpay.keyId && env.razorpay.keySecret);
}

export async function createRazorpayOrder({ amount, currency = "INR", receipt, notes = {} }) {
  if (!isRazorpayConfigured()) {
    throw new Error("Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET before accepting payments.");
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${env.razorpay.keyId}:${env.razorpay.keySecret}`).toString("base64")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount,
      currency,
      receipt,
      payment_capture: 1,
      notes
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Razorpay order creation failed with ${response.status}: ${details}`);
  }

  const data = await response.json();
  return {
    id: data.id,
    amount: data.amount,
    currency: data.currency,
    receipt: data.receipt,
    notes: data.notes,
    mode: "live"
  };
}

export function verifyRazorpaySignature({ orderId, paymentId, signature }) {
  if (!orderId || !paymentId || !signature || !isRazorpayConfigured()) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", env.razorpay.keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  const received = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  return received.length === expected.length && crypto.timingSafeEqual(received, expected);
}
