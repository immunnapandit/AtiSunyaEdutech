import { z } from "zod";

export const MCT_TECHNOLOGIES = [
  "Azure",
  "Microsoft 365",
  "Power Platform",
  "Security",
  "AI / Machine Learning",
  "Data & Analytics",
  "Windows",
  "Other",
] as const;

export const mctRegistrationSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Enter a valid email"),
  mobile: z.string().trim().min(8, "Enter a valid mobile number"),
  countryCity: z.string().trim().min(2, "Country / City is required"),
  jobTitle: z.string().trim().min(2, "Job title is required"),
  organization: z.string().trim().optional(),
  experienceYears: z.coerce.number().min(0, "Enter years of experience"),
  linkedin: z.string().trim().url("Enter a valid LinkedIn URL").optional().or(z.literal("")),
  mctStatus: z.enum(["active", "other"]),
  mctId: z.string().trim().optional(),
  mctYear: z.string().trim().optional(),
  otherCertifications: z.string().trim().optional(),
  technologies: z.array(z.enum(MCT_TECHNOLOGIES)).min(1, "Select at least one"),
  trainingExperienceYears: z.coerce.number().min(0, "Enter years of training experience"),
  priorTraining: z.string().trim().optional(),
  trainingMode: z.enum(["online", "in-person", "both"]),
  preferredLocation: z.string().trim().optional(),
  availability: z.string().trim().optional(),
  message: z.string().trim().optional(),
  consent: z.literal(true, { error: "You must confirm this to submit" }),
});

export type MCTRegistrationInput = z.infer<typeof mctRegistrationSchema>;
