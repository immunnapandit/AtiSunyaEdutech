import { Testimonial, Instructor, FAQItem } from "@/types";

export const testimonials: Testimonial[] = [
  {
    name: "Rizwan Ul Haq",
    role: "MCT Certified Trainer",
    company: "Dubai",
    avatar: "RH",
    quote:
      "AtiSunya training program played a key role in my journey to becoming a Microsoft Certified Trainer. The mentorship and practical approach truly made a difference.",
    rating: 5,
  },
  {
    name: "Nishit Parikh",
    role: "MCT Certified Trainer",
    company: "Australia",
    avatar: "NP",
    quote:
      "I had an excellent experience with AtiSunya. With their clear guidance and professional support, I successfully received my Microsoft Certified Trainer (MCT) certificate.",
    rating: 5,
  },
];

export const instructors: Instructor[] = [
  {
    slug: "dynamics-365-training-team",
    name: "Dynamics 365 Training Team",
    role: "Functional Training",
    company: "AtiSunya Edutech",
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
    company: "AtiSunya Edutech",
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
    company: "AtiSunya Edutech",
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
    company: "AtiSunya Edutech",
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
      "Create an account or log in, open the course page, and select Enroll Now. Once your payment is confirmed, the course will appear on your dashboard.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "We use Razorpay for payments. You can pay by card, UPI, or wallet, depending on what's available.",
  },
  {
    question: "When will the course appear on my dashboard?",
    answer:
      "Only courses you've paid for appear on your dashboard. Pending or failed payments won't show up as enrollments.",
  },
  {
    question: "Do you provide corporate Microsoft training?",
    answer:
      "Yes. AtiSunya Edutech offers Microsoft training for Azure, Dynamics 365, Power Platform, Copilot, AI, and security.",
  },
  {
    question: "How can I contact the team after enrollment?",
    answer:
      "After you pay, AtiSunya gets your enrollment and payment details. Our team will then contact you using the details you gave at checkout.",
  },
];
