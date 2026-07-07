import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";
import {
  Award,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Cloud,
  Cpu,
  ShieldCheck,
  Sparkle,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate Training",
  description:
    "Atisunya Edutech corporate training for Microsoft Azure, Power Platform, Dynamics 365, AI, security, and enterprise cloud adoption.",
};

const highlights = [
  {
    title: "Teams that deliver",
    body: "Design training around the roles, tools, and goals that matter for your business.",
    icon: Users,
  },
  {
    title: "Hands-on labs",
    body: "Practical exercises and real business scenarios to build confidence on day one.",
    icon: Cloud,
  },
  {
    title: "Business outcomes",
    body: "Focus on adoption, automation, governance, and the skills your project sponsors care about.",
    icon: ShieldCheck,
  },
];

const tracks = [
  {
    title: "Azure Cloud Adoption",
    body: "From fundamentals to secure architecture, governance, and landing zone best practices.",
    icon: Cloud,
  },
  {
    title: "Copilot + AI Readiness",
    body: "Enable business teams to apply Copilot, Azure AI, and responsible AI patterns.",
    icon: Cpu,
  },
  {
    title: "Power Platform Enablement",
    body: "Power BI, Power Apps, Power Automate and Dataverse training for digital transformation.",
    icon: Briefcase,
  },
  {
    title: "Security & Compliance",
    body: "Identity, access control, threat protection and compliance for modern cloud operations.",
    icon: ShieldCheck,
  },
];

const benefits = [
  "Custom learning paths for administrators, analysts, developers and business users",
  "Instructor-led delivery with live sessions, labs, recordings and post-training support",
  "Assessments, certificates, adoption guidance and executive reporting",
  "Flexible on-site or virtual delivery to fit your program timeline",
];

const processSteps = [
  {
    title: "Plan",
    body: "Define the right learning journey for your teams, projects, and Microsoft stack.",
  },
  {
    title: "Deliver",
    body: "Teach with live sessions, labs, demos, and role-specific reinforcement.",
  },
  {
    title: "Assess",
    body: "Validate knowledge with projects, quizzes, and real business outcomes.",
  },
  {
    title: "Enable",
    body: "Support adoption with guides, follow-up coaching, and operational handoffs.",
  },
];

export default function CorporateTrainingPage() {
  return (
    <div className="pt-32">
      <section className="relative overflow-hidden bg-[#eef6ff] pb-16 pt-10 sm:pb-20">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <Container className="relative grid gap-10 lg:grid-cols-[0.95fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">
              Corporate Training
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-navy sm:text-5xl">
              Microsoft training designed for teams that need to move faster.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-navy-500 sm:text-lg">
              Accelerate cloud adoption, AI readiness, and business outcomes with
              corporate learning programs built around your Microsoft stack,
              team structure, and enterprise goals.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LinkButton href="/contact" className="bg-brand text-white hover:bg-brand-600">
                Request a training plan
              </LinkButton>
              <Link
                href="/courses"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-brand/20 bg-white px-6 text-sm font-semibold text-navy shadow-soft transition hover:border-brand hover:bg-brand-50"
              >
                Explore training tracks
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { value: "1200+", label: "Professionals trained" },
                { value: "35+", label: "Corporate cohorts" },
                { value: "4.9/5", label: "Satisfaction rating" },
                { value: "On demand", label: "Custom scheduling" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-navy-100 bg-white p-5">
                  <p className="text-3xl font-extrabold text-navy">{item.value}</p>
                  <p className="mt-2 text-sm font-semibold text-navy-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-brand/10 bg-white shadow-soft">
            <Image
              src="/images/contactbanner.png"
              alt="Team working together during corporate training"
              width={920}
              height={640}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-6 bottom-6 rounded-3xl bg-navy/90 p-6 text-white shadow-xl sm:w-[320px]">
              <p className="text-sm uppercase tracking-[0.28em] text-brand-200">Trusted by enterprise teams</p>
              <p className="mt-3 text-2xl font-bold">Practical learning for real business outcomes.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Why choose corporate training"
            title="Turn Microsoft skills into measurable team performance"
            description="Our corporate training programs are built to be actionable, relevant, and aligned with your organization’s strategy — not just course completion."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-navy-100 p-8 shadow-soft"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-navy-500">{item.body}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-mist-50 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_0.85fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Training tracks"
                title="Choose the Microsoft learning path that matches your team"
                description="From Azure adoption to Copilot enablement, our programs are designed for modern business teams and enterprise use cases."
              />
            </div>

            <div className="space-y-4 rounded-[2rem] border border-navy-100 bg-white p-8 shadow-soft">
              {benefits.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-brand" />
                  <p className="text-sm text-navy-500">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <article
                  key={track.title}
                  className="rounded-[1.75rem] border border-navy-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lifted"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{track.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-navy-400">{track.body}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="How it works"
                title="A practical process for team enablement"
                description="We work with your stakeholders to plan, deliver, assess, and support adoption across your Microsoft investments."
              />

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="rounded-[2rem] border border-navy-100 p-6 shadow-soft">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-navy-400">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 rounded-[2rem] bg-brand p-10 text-white shadow-soft">
              <div className="rounded-3xl bg-white/10 p-6">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-100">
                  Outcomes
                </span>
                <div className="mt-4 space-y-4 text-white">
                  <div>
                    <p className="text-4xl font-extrabold">92%</p>
                    <p className="text-sm text-white/80">of teams report faster project delivery.</p>
                  </div>
                  <div>
                    <p className="text-4xl font-extrabold">87%</p>
                    <p className="text-sm text-white/80">improved cloud adoption confidence.</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-brand-100">Ready for your team</p>
                <h3 className="mt-3 text-3xl font-extrabold text-white">
                  Build a measurable corporate learning program.
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/80">
                  We help you move beyond generic learning to training that actively supports your initiatives, governance, and business outcomes.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LinkButton href="/contact" className="bg-white text-brand hover:bg-brand-50">
                    Request a corporate plan
                  </LinkButton>
                  <Link
                    href="/courses"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Browse course catalog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

