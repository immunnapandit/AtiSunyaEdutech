import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about courses, certifications, and billing.",
};

export default function FaqPage() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-3xl rounded-3xl border border-navy-100 bg-white p-10 text-center shadow-soft">
        <h1 className="text-3xl font-extrabold text-navy">Frequently Asked Questions</h1>
        <p className="mt-4 text-base text-navy-500">
          This page is under revision. Check back soon for updated help content.
        </p>
      </div>
    </div>
  );
}
