import express from "express";
import { Contact, Newsletter, Quote } from "../models/index.js";
import {
  sendContactConfirmation,
  sendContactNotification,
  sendNewsletterConfirmation,
  sendQuoteConfirmation,
  sendQuoteNotification
} from "../services/notification-service.js";
import { contactSchema, newsletterSchema, quoteSchema, validate } from "../utils/validation.js";

export const formsRouter = express.Router();

formsRouter.post("/contact", validate.bind(null, contactSchema), async (req, res) => {
  const contact = await Contact.create({ ...req.body, status: "new", source: "contact-page" });
  const [adminNotification, userConfirmation] = await Promise.all([
    sendContactNotification(contact),
    sendContactConfirmation(contact)
  ]);
  const notification = { admin: adminNotification, confirmation: userConfirmation };

  return res.status(201).json({
    message: "Thanks, we will contact you soon.",
    contact: { ...contact.toObject(), notification }
  });
});

formsRouter.post("/quotes", validate.bind(null, quoteSchema), async (req, res) => {
  const quote = await Quote.create({ ...req.body, status: "new", source: "corporate-training" });

  if (req.body.subscribe) {
    await upsertNewsletter(req.body.email, req.body.name);
  }
  const [adminNotification, userConfirmation] = await Promise.all([
    sendQuoteNotification(quote),
    sendQuoteConfirmation(quote)
  ]);
  const notification = { admin: adminNotification, confirmation: userConfirmation };

  return res.status(201).json({
    message: "Training inquiry received.",
    quote: { ...quote.toObject(), notification }
  });
});

formsRouter.post("/newsletter", validate.bind(null, newsletterSchema), async (req, res) => {
  const subscriber = await upsertNewsletter(req.body.email, req.body.name);
  const notification = await sendNewsletterConfirmation(subscriber);

  return res.status(201).json({
    message: "You are subscribed.",
    subscriber: { ...subscriber.toObject(), notification }
  });
});

async function upsertNewsletter(email, name = "") {
  return Newsletter.findOneAndUpdate(
    { email },
    { $set: name ? { name } : {}, $setOnInsert: { email } },
    { new: true, upsert: true }
  );
}
