import { z } from "zod";

const emailSchema = z.string().trim().email().transform((email) => email.toLowerCase());

const authIdentifierFields = {
  identifier: z.string().trim().optional(),
  email: z.string().trim().optional()
};

export const signupSchema = z.object({
  name: z.string().trim().min(2),
  ...authIdentifierFields,
  password: z.string().min(6)
}).transform(normalizeAuthPayload);

export const loginSchema = z.object({
  ...authIdentifierFields,
  password: z.string().min(1)
}).transform(normalizeAuthPayload);

export const forgotPasswordSchema = z.object({
  ...authIdentifierFields
}).transform(normalizeAuthPayload);

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: emailSchema,
  subject: z.string().trim().min(1, "Subject is required."),
  message: z.string().trim().min(1, "Message is required.")
});

export const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  phone: z.string().trim().optional().or(z.literal("")),
  email: emailSchema,
  subject: z.string().trim().min(1, "Training requirement is required."),
  message: z.string().trim().min(1, "Message is required."),
  subscribe: z.boolean().optional().default(false)
});

export const newsletterSchema = z.object({
  name: z.string().trim().optional().or(z.literal("")),
  email: emailSchema
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

function normalizeAuthPayload(data, ctx) {
  const rawIdentifier = data.identifier || data.email;
  const parsedIdentifier = parseIdentifier(rawIdentifier);

  if (!parsedIdentifier) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["identifier"],
      message: "Enter a valid email address or mobile number."
    });
    return z.NEVER;
  }

  return {
    ...data,
    email: parsedIdentifier.type === "email" ? parsedIdentifier.value : undefined,
    phone: parsedIdentifier.type === "phone" ? parsedIdentifier.value : undefined,
    identifier: parsedIdentifier.value,
    identifierType: parsedIdentifier.type
  };
}

function parseIdentifier(value = "") {
  const identifier = String(value).trim();

  if (!identifier) {
    return null;
  }

  const emailResult = emailSchema.safeParse(identifier);
  if (emailResult.success) {
    return { type: "email", value: emailResult.data };
  }

  const phone = normalizePhone(identifier);
  if (phone) {
    return { type: "phone", value: phone };
  }

  return null;
}

function normalizePhone(value) {
  const compact = value.replace(/[\s()-]/g, "");

  if (!/^\+?\d{8,15}$/.test(compact)) {
    return null;
  }

  if (compact.startsWith("+")) {
    return compact;
  }

  return compact.length === 10 ? `+91${compact}` : `+${compact}`;
}
