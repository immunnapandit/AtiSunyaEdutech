"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MCT_TECHNOLOGIES,
  mctRegistrationSchema,
  type MCTRegistrationInput,
} from "@/lib/validations/mct-registration";

const inputClass =
  "w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-navy-400 focus:border-brand focus:ring-2 focus:ring-brand/10";

type MCTRegistrationFormValues = z.input<typeof mctRegistrationSchema>;

export function MCTRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [certificate, setCertificate] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MCTRegistrationFormValues, unknown, MCTRegistrationInput>({
    resolver: zodResolver(mctRegistrationSchema),
  });

  async function onSubmit(data: MCTRegistrationInput) {
    setServerError(null);
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) value.forEach((item) => formData.append(key, item));
        else formData.append(key, String(value));
      }
      if (resume) formData.append("resume", resume);
      if (certificate) formData.append("certificate", certificate);

      const response = await fetch("/api/mct-registration", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6 text-center md:p-8">
        <h2 className="text-2xl font-bold text-navy">Thank you for registering with AtiSunya Edutech.</h2>
        <p className="mt-3 text-navy-400">
          We have received your MCT trainer profile. Our team will review your details and contact
          you regarding suitable training opportunities.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mct-registration-form space-y-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-lifted sm:p-8 lg:p-10">
      <FormSection title="Personal Details">
        <Field label="Full Name*" error={errors.fullName?.message}><input {...register("fullName")} className={inputClass} /></Field>
        <Field label="Email Address*" error={errors.email?.message}><input type="email" {...register("email")} className={inputClass} /></Field>
        <Field label="Mobile Number*" error={errors.mobile?.message}><input type="tel" {...register("mobile")} className={inputClass} /></Field>
        <Field label="Country / City*" error={errors.countryCity?.message}><input {...register("countryCity")} className={inputClass} /></Field>
      </FormSection>
      <FormSection title="Professional Details">
        <Field label="Current Job Title / Designation*" error={errors.jobTitle?.message}><input {...register("jobTitle")} className={inputClass} /></Field>
        <Field label="Organization / Company Name"><input {...register("organization")} className={inputClass} /></Field>
        <Field label="Years of Professional Experience*" error={errors.experienceYears?.message}><input type="number" min="0" {...register("experienceYears")} className={inputClass} /></Field>
        <Field label="LinkedIn Profile" error={errors.linkedin?.message}><input type="url" placeholder="https://linkedin.com/in/..." {...register("linkedin")} className={inputClass} /></Field>
      </FormSection>
      <FormSection title="MCT & Certification Details">
        <Field label="MCT Certification Status*" error={errors.mctStatus?.message}><select defaultValue="" {...register("mctStatus")} className={inputClass}><option value="" disabled>Select</option><option value="active">Current / Active MCT</option><option value="other">Other</option></select></Field>
        <Field label="MCT ID / Credential Number (Optional)" error={errors.mctId?.message}><input {...register("mctId")} className={inputClass} /></Field>
        <Field label="MCT Certification / Renewal Year (Optional)" error={errors.mctYear?.message}><input inputMode="numeric" {...register("mctYear")} className={inputClass} /></Field>
        <Field label="Other Microsoft Certifications (Optional)" error={errors.otherCertifications?.message}><input {...register("otherCertifications")} className={inputClass} /></Field>
        <fieldset className="sm:col-span-2"><legend className="mb-2 text-sm font-semibold text-navy">Microsoft Technologies / Courses You Can Deliver*</legend><div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">{MCT_TECHNOLOGIES.map((technology) => <label key={technology} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-navy-600 hover:bg-mist-50"><input type="checkbox" value={technology} {...register("technologies")} className="h-4 w-4 rounded border-navy-200 text-brand focus:ring-brand" />{technology}</label>)}</div>{errors.technologies && <p className="mt-2 text-xs text-red-600">{errors.technologies.message}</p>}</fieldset>
      </FormSection>
      <FormSection title="Training Experience">
        <Field label="Years of Training Experience*" error={errors.trainingExperienceYears?.message}><input type="number" min="0" {...register("trainingExperienceYears")} className={inputClass} /></Field>
        <Field label="Courses / Technologies You Have Previously Trained On"><input {...register("priorTraining")} className={inputClass} /></Field>
        <Field label="Preferred Training Mode*" error={errors.trainingMode?.message}><select defaultValue="" {...register("trainingMode")} className={inputClass}><option value="" disabled>Select</option><option value="online">Online</option><option value="in-person">In-person</option><option value="both">Both</option></select></Field>
        <Field label="Preferred Training Location / Region"><input {...register("preferredLocation")} className={inputClass} /></Field>
        <Field label="Availability for Training"><input {...register("availability")} className={inputClass} /></Field>
        <Field label="Additional Information / Message" className="sm:col-span-2"><textarea {...register("message")} className={`${inputClass} min-h-28 resize-y`} /></Field>
      </FormSection>
      <FormSection title="Document Upload">
        <Field label="Upload Resume / Trainer Profile"><input type="file" accept=".pdf,.doc,.docx" onChange={(event) => setResume(event.target.files?.[0] ?? null)} className={inputClass} /></Field>
        <Field label="Upload MCT Certificate / Credential Proof (Optional)"><input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => setCertificate(event.target.files?.[0] ?? null)} className={inputClass} /></Field>
      </FormSection>
      <div><label className="flex items-start gap-3 rounded-xl bg-mist-50 p-4 text-sm leading-6 text-navy-600"><input type="checkbox" {...register("consent")} className="mt-1 h-4 w-4 rounded border-navy-200 text-brand focus:ring-brand" />I confirm that I am an MCT-certified professional and that the information provided above is accurate. I agree to be contacted by the AtiSunya Edutech team regarding training opportunities.*</label>{errors.consent && <p className="mt-2 text-xs text-red-600">{errors.consent.message}</p>}</div>
      {serverError && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{serverError}</p>}
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full justify-center sm:w-auto">{isSubmitting ? "Submitting..." : "Register as an MCT Trainer"}<MoveRight className="h-4 w-4" /></Button>
    </form>
  );
}

function FormSection({ title, children }: { title: string; children: ReactNode }) { return <section className="border-b border-navy-100 pb-7 last:border-b-0 last:pb-0"><h2 className="mb-4 text-lg font-bold text-navy">{title}</h2><div className="grid gap-4 sm:grid-cols-2">{children}</div></section>; }
function Field({ label, error, children, className = "" }: { label: string; error?: string; children: ReactNode; className?: string }) { return <label className={`block text-sm font-semibold text-navy ${className}`}><span className="mb-2 block">{label}</span>{children}{error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}</label>; }
