import { env } from "../config/env.js";
import { sendGraphMail } from "./graph-mail.js";

export async function sendContactNotification(contact) {
  return safeSend({
    to: env.graph.adminEmail,
    subject: `New contact enquiry: ${contact.subject}`,
    replyTo: [contact.email],
    html: layoutHtml({
      title: "New Contact Enquiry",
      preview: `${contact.name} sent a message from the contact page.`,
      rows: [
        ["Name", contact.name],
        ["Email", contact.email],
        ["Subject", contact.subject],
        ["Message", contact.message]
      ]
    })
  });
}

export async function sendContactConfirmation(contact) {
  return safeSend({
    to: contact.email,
    subject: "We received your AtiSunya Edutech enquiry",
    html: layoutHtml({
      title: "Thanks For Contacting Us",
      preview: "Your enquiry has reached the AtiSunya Edutech team.",
      rows: [
        ["Name", contact.name],
        ["Subject", contact.subject],
        ["Message", contact.message],
        ["Next step", "Our team will review your enquiry and contact you soon."]
      ]
    })
  });
}

export async function sendQuoteNotification(quote) {
  return safeSend({
    to: env.graph.adminEmail,
    subject: `Corporate training inquiry: ${quote.subject}`,
    replyTo: [quote.email],
    html: layoutHtml({
      title: "Corporate Training Inquiry",
      preview: `${quote.name} requested corporate training details.`,
      rows: [
        ["Name", quote.name],
        ["Email", quote.email],
        ["Phone", quote.phone || "Not provided"],
        ["Requirement", quote.subject],
        ["Subscribed", quote.subscribe ? "Yes" : "No"],
        ["Message", quote.message]
      ]
    })
  });
}

export async function sendQuoteConfirmation(quote) {
  return safeSend({
    to: quote.email,
    subject: "We received your corporate training inquiry",
    html: layoutHtml({
      title: "Training Inquiry Received",
      preview: "Your corporate training request has reached AtiSunya Edutech.",
      rows: [
        ["Name", quote.name],
        ["Requirement", quote.subject],
        ["Message", quote.message],
        ["Next step", "Our training team will contact you with suitable options."]
      ]
    })
  });
}

export async function sendPasswordResetEmail({ email, resetToken }) {
  const resetUrl = `${env.appBaseUrl.replace(/\/$/, "")}/forgot-password?token=${encodeURIComponent(resetToken)}`;

  return safeSend({
    to: email,
    subject: "Reset your AtiSunya Edutech password",
    html: layoutHtml({
      title: "Reset Your Password",
      preview: "Use the link below to continue your password reset.",
      rows: [
        ["Email", email],
        ["Reset link", `<a href="${escapeAttribute(resetUrl)}">${escapeHtml(resetUrl)}</a>`]
      ]
    })
  });
}

export async function sendNewsletterConfirmation(subscriber) {
  return safeSend({
    to: subscriber.email,
    subject: "You're subscribed to AtiSunya Edutech",
    html: layoutHtml({
      title: "Subscription Confirmed",
      preview: "You will receive AtiSunya Edutech learning updates.",
      rows: [
        ["Email", subscriber.email],
        ["Name", subscriber.name || "Not provided"]
      ]
    })
  });
}


export async function sendPurchaseNotification({ user, course, enrollment, payment }) {
  const billing = enrollment.billingDetails || {};
  const recipients = uniqueRecipients([env.graph.accountsEmail, env.graph.adminEmail]);

  return safeSend({
    to: recipients,
    subject: `New course enrollment: ${course.title}`,
    replyTo: user.email ? [user.email] : [],
    html: layoutHtml({
      title: "New Course Enrollment",
      preview: `${user.name} completed payment for ${course.title}.`,
      rows: [
        ["Student", user.name],
        ["Email", user.email || billing.emailAddress || "Not provided"],
        ["Phone", user.phone || billing.phoneNumber || "Not provided"],
        ["Course", course.title],
        ["Category", course.category],
        ["Amount", formatInr(course.price)],
        ["Payment ID", payment.paymentId || "Not provided"],
        ["Order ID", payment.orderId || enrollment.orderId || "Not provided"],
        ["Payment method", billing.paymentMethod || "Razorpay"],
        ["Billing name", [billing.firstName, billing.lastName].filter(Boolean).join(" ") || "Not provided"],
        ["Billing address", formatAddress(billing)],
        ["Note", billing.note || "None"]
      ]
    })
  });
}

export async function sendPurchaseConfirmation({ user, course, enrollment, payment }) {
  const to = user.email || enrollment.billingDetails?.emailAddress;

  if (!to) {
    return { sent: false, skipped: true, reason: "Student email is not available." };
  }

  return safeSend({
    to,
    subject: `Enrollment confirmed: ${course.title}`,
    html: layoutHtml({
      title: "Enrollment Confirmed",
      preview: `Your payment for ${course.title} was successful.`,
      rows: [
        ["Name", user.name],
        ["Course", course.title],
        ["Amount", formatInr(course.price)],
        ["Payment ID", payment.paymentId || "Not provided"],
        ["Next step", "Our team will contact you with course access and onboarding details."]
      ]
    })
  });
}
async function safeSend(payload) {
  try {
    return await sendGraphMail(payload);
  } catch (error) {
    console.error("[mail] Delivery failed:", error.message);
    return { sent: false, skipped: false, reason: error.message };
  }
}

function layoutHtml({ title, preview, rows }) {
  const contentRows = rows
    .map(([label, value]) => {
      const safeValue = String(value).startsWith("<a ")
        ? value
        : escapeHtml(String(value)).replaceAll("\n", "<br />");

      return `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#64748b;font-weight:700;width:150px;">${escapeHtml(label)}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#0f172a;">${safeValue}</td>
        </tr>`;
    })
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <span style="display:none;visibility:hidden;opacity:0;height:0;width:0;">${escapeHtml(preview)}</span>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#0f172a;color:#ffffff;padding:24px 28px;">
                <div style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#38bdf8;">AtiSunya Edutech</div>
                <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;">${escapeHtml(title)}</h1>
              </td>
            </tr>
            <tr>
              <td>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${contentRows}</table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}


function uniqueRecipients(recipients) {
  return [...new Set(recipients.filter(Boolean))];
}

function formatInr(amount) {
  return `INR ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function formatAddress(billing) {
  const lines = [
    billing.addressLine1,
    billing.addressLine2,
    billing.state,
    billing.country,
    billing.postalCode
  ].filter(Boolean);

  return lines.length > 0 ? lines.join(", ") : "Not provided";
}
function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
