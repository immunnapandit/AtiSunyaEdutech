import { NextResponse } from "next/server";
import { mctRegistrationSchema } from "@/lib/validations/mct-registration";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const certificate = formData.get("certificate");
    const resume = formData.get("resume");

    const rawData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      countryCity: formData.get("countryCity"),
      jobTitle: formData.get("jobTitle"),
      organization: formData.get("organization"),
      experienceYears: formData.get("experienceYears"),
      linkedin: formData.get("linkedin"),
      mctStatus: formData.get("mctStatus"),
      mctId: formData.get("mctId"),
      mctYear: formData.get("mctYear"),
      otherCertifications: formData.get("otherCertifications"),
      technologies: formData.getAll("technologies"),
      trainingExperienceYears: formData.get("trainingExperienceYears"),
      priorTraining: formData.get("priorTraining"),
      trainingMode: formData.get("trainingMode"),
      preferredLocation: formData.get("preferredLocation"),
      availability: formData.get("availability"),
      message: formData.get("message"),
      consent: formData.get("consent") === "true",
    };
    const parsed = mctRegistrationSchema.safeParse(rawData);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please correct the highlighted fields", fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Replace this with database/storage/email integrations when those services are selected.
    console.info("MCT registration received", {
      email: parsed.data.email,
      technologies: parsed.data.technologies,
      resumeUploaded: resume instanceof File && resume.size > 0,
      certificateUploaded: certificate instanceof File && certificate.size > 0,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process MCT registration", error);
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
  }
}
