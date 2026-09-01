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
    slug: "dr-umesh-pandit",
    name: "Dr Umesh Pandit",
    role: "Microsoft Certified Trainer",
    company: "AtiSunya Edutech",
    image: "/images/Umesh.jpg",
    linkedin: "https://www.linkedin.com/in/umeshpandit",
    bio: "Guides professionals and corporate teams with structured Microsoft technology learning, certification readiness, and practical classroom delivery.",
    avatar: "UP",
    studentsCount: 0,
    coursesCount: 0,
    rating: 0,
    expertise: ["Cloud readiness", "Dynamics 365 architecture", "Enterprise workshops"],
  },
  {
    slug: "atul-verma",
    name: "Atul Verma",
    role: "Microsoft Certified Trainer",
    company: "AtiSunya Edutech",
    image: "/images/Atul.jpg",
    linkedin: "https://www.linkedin.com/in/atulk-verma",
    bio: "Delivers Microsoft D365FO On-Premises training focused on setup, administration, upgrades, and practical ERP process enablement for SMB and partner teams.",
    avatar: "AV",
    studentsCount: 0,
    coursesCount: 0,
    rating: 0,
    expertise: ["On-premises setup", "Administration readiness", "ERP process mapping"],
  },
  {
    slug: "saroj-pandit",
    name: "Saroj Pandit",
    role: "Microsoft Certified Trainer",
    company: "AtiSunya Edutech",
    image: "/images/Saroj.jpeg",
    linkedin: "https://www.linkedin.com/in/sarojpandit",
    bio: "Supports learners with clear functional explanations, scenario-based workshops, and professional guidance for Microsoft certification pathways.",
    avatar: "SP",
    studentsCount: 0,
    coursesCount: 0,
    rating: 0,
    expertise: ["Functional discovery", "User adoption", "Scenario workshops"],
  },
  {
    slug: "sangeeta-verma",
    name: "Sangeeta Verma",
    role: "Microsoft Certified Trainer",
    company: "AtiSunya Edutech",
    image: "/images/Sangeeta.jpg",
    linkedin: "https://www.linkedin.com/in/sangeetavermasingh",
    bio: "Trains teams on customer engagement and Dynamics 365 Finance and Operations concepts, connecting CRM workflows with finance and operations process understanding.",
    avatar: "SV",
    studentsCount: 0,
    coursesCount: 0,
    rating: 0,
    expertise: ["CRM workflows", "Finance and operations", "Role-based enablement"],
  },
  {
    slug: "amit-pandit",
    name: "Amit Pandit",
    role: "Microsoft Certified Trainer",
    company: "AtiSunya Edutech",
    image: "/images/Amit.jpeg",
    linkedin: "https://www.linkedin.com/in/amitpanditax",
    bio: "Guides learners through supply chain management processes, functional consulting practices, and real-world Dynamics 365 SCM business scenarios.",
    avatar: "AP",
    studentsCount: 0,
    coursesCount: 0,
    rating: 0,
    expertise: ["Procurement and sourcing", "Inventory and warehouse", "Planning and production"],
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
