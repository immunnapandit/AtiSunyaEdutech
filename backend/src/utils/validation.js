import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email().transform((email) => email.toLowerCase()),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().trim().email().transform((email) => email.toLowerCase()),
  password: z.string().min(1)
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email().transform((email) => email.toLowerCase())
});

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email().transform((email) => email.toLowerCase()),
  subject: z.string().trim().min(1, "Subject is required."),
  message: z.string().trim().min(1, "Message is required.")
});

export const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  phone: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email().transform((email) => email.toLowerCase()),
  subject: z.string().trim().min(1, "Training requirement is required."),
  message: z.string().trim().min(1, "Message is required."),
  subscribe: z.boolean().optional().default(false)
});

export const newsletterSchema = z.object({
  name: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email().transform((email) => email.toLowerCase())
});

export function validate(schema, req, res, next) {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Please check the submitted fields.",
      errors: parsed.error.flatten().fieldErrors
    });
  }

  req.body = parsed.data;
  return next();
}
