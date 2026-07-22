import { Testimonial, Instructor, FAQItem } from "@/types";

export const testimonials: Testimonial[] = [];

export const instructors: Instructor[] = [
  {
    slug: "dynamics-365-training-team",
    name: "Dynamics 365 Training Team",
    role: "Functional Training",
    company: "Atisunya Edutech",
    bio: "Delivers Dynamics 365 Sales, Customer Service, Finance, CRM customization, forms, views, security roles, workflows, and practical business process training.",
    avatar: "D365",
    studentsCount: 0,
    coursesCount: 2,
    rating: 0,
    expertise: ["Dynamics 365", "CRM", "Business Workflows"],
  },
  {
    slug: "azure-cloud-training-team",
    name: "Azure Cloud Training Team",
    role: "Cloud Training",
    company: "Atisunya Edutech",
    bio: "Supports learners and teams with Azure administration, architecture, DevOps, deployment workflows, identity, monitoring, and governance topics.",
    avatar: "AZ",
    studentsCount: 0,
    coursesCount: 2,
    rating: 0,
    expertise: ["Azure", "Azure DevOps", "Cloud Architecture"],
  },
  {
    slug: "power-platform-training-team",
    name: "Power Platform Training Team",
    role: "Low-Code and Analytics Training",
    company: "Atisunya Edutech",
    bio: "Guides practical learning across Power Apps, Power Automate, Dataverse, Power BI, Microsoft Fabric, and reporting workflows.",
    avatar: "PP",
    studentsCount: 0,
    coursesCount: 2,
    rating: 0,
    expertise: ["Power Platform", "Power BI", "Dataverse"],
  },
  {
    slug: "microsoft-ai-security-team",
    name: "Microsoft AI and Security Training Team",
    role: "AI, Copilot, and Security Training",
    company: "Atisunya Edutech",
    bio: "Covers Microsoft Copilot, Azure AI services, secure AI adoption, Microsoft Entra ID, security posture, compliance basics, and governance practices.",
    avatar: "AI",
    studentsCount: 0,
    coursesCount: 2,
    rating: 0,
    expertise: ["Microsoft Copilot", "Azure AI", "Security"],
  },
];

export const faqs: FAQItem[] = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Create an account or log in, open the course page, select Enroll Now, complete checkout through Razorpay, and the purchased course will appear in your dashboard after successful payment verification.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "Payments are processed through Razorpay. Available options can include card, UPI, and wallet depending on Razorpay availability and your selected payment method.",
  },
  {
    question: "When will the course appear on my dashboard?",
    answer:
      "Only successfully paid courses appear on the dashboard. Pending or failed payments are not shown as active enrollments.",
  },
  {
    question: "Do you provide corporate Microsoft training?",
    answer:
      "Yes. Atisunya Edutech provides Microsoft-focused corporate training for Azure, Dynamics 365, Power Platform, Copilot, AI services, and security workflows.",
  },
  {
    question: "How can I contact the team after enrollment?",
    answer:
      "After successful payment, Atisunya receives the enrollment and payment details. The team can then contact the learner using the billing details provided during checkout.",
  },
];
