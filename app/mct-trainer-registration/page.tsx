import type { Metadata } from "next";
import Image from "next/image";
import { MCTRegistrationForm } from "@/components/sections/mct-trainer-form";
import { Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "MCT Trainer Registration",
  description:
    "Are you an MCT-certified professional interested in delivering training through AtiSunya Edutech? Register your details to explore training opportunities and collaborate with our team.",
};

export default function MCTTrainerRegistrationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-mist-50/40 to-white pb-16 pt-site-header-loose">
      <section className="mct-hero border-b border-navy-100">
        <div className="relative mx-auto grid min-h-[330px] max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-10 xl:px-12">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-lg font-bold text-brand">
                M
              </span>
              <Eyebrow className="text-[11px]" lineClassName="hidden">
                Join Our Trainer Network
              </Eyebrow>
            </div>
            <h1 className="font-body text-[2.5rem] font-bold leading-[1.08] tracking-[-0.045em] text-navy sm:text-[3.25rem]">
              MCT Trainer Registration
            </h1>
            <p className="mt-5 max-w-xl font-body text-[17px] leading-8 text-navy-600 sm:text-lg">
              Are you an MCT-certified professional interested in delivering training through AtiSunya
              Edutech? Register your details with us to explore training opportunities and collaborate
              with our team.
            </p>
          </div>
          <div className="mct-hero-image relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl border-4 border-white/80 shadow-lifted">
            <Image
              src="/images/mct-trainer-registration-hero.jpg"
              alt="Professionals collaborating in a training session"
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>
      <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
        <MCTRegistrationForm />
      </div>
    </main>
  );
}
