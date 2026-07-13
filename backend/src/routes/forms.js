import express from "express";
import { nanoid } from "nanoid";
import { insert, readDb, updateById, writeDb } from "../db.js";
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
  const contact = await insert("contacts", {
    ...req.body,
    status: "new",
    source: "contact-page"
  });
  const [adminNotification, userConfirmation] = await Promise.all([
    sendContactNotification(contact),
    sendContactConfirmation(contact)
  ]);
  const notification = { admin: adminNotification, confirmation: userConfirmation };
  await updateById("contacts", contact.id, { notification });

  return res.status(201).json({
    message: "Thanks, we will contact you soon.",
    contact: { ...contact, notification }
  });
});

formsRouter.post("/quotes", validate.bind(null, quoteSchema), async (req, res) => {
  const quote = await insert("quotes", {
    ...req.body,
    status: "new",
    source: "corporate-training"
  });

  if (req.body.subscribe) {
    await upsertNewsletter(req.body.email, req.body.name);
  }
  const [adminNotification, userConfirmation] = await Promise.all([
    sendQuoteNotification(quote),
    sendQuoteConfirmation(quote)
  ]);
  const notification = { admin: adminNotification, confirmation: userConfirmation };
  await updateById("quotes", quote.id, { notification });

  return res.status(201).json({
    message: "Training inquiry received.",
    quote: { ...quote, notification }
  });
});

formsRouter.post("/newsletter", validate.bind(null, newsletterSchema), async (req, res) => {
  const subscriber = await upsertNewsletter(req.body.email, req.body.name);
  const notification = await sendNewsletterConfirmation(subscriber);

  return res.status(201).json({
    message: "You are subscribed.",
    subscriber: { ...subscriber, notification }
  });
});

async function upsertNewsletter(email, name = "") {
  const db = await readDb();
  const existing = db.newsletter.find((item) => item.email === email);

  if (existing) {
    existing.name = name || existing.name;
    existing.updatedAt = new Date().toISOString();
    await writeDb(db);
    return existing;
  }

  const subscriber = {
    id: nanoid(),
    email,
    name,
    createdAt: new Date().toISOString()
  };
  db.newsletter.push(subscriber);
  await writeDb(db);
  return subscriber;
}
