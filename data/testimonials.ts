import { Testimonial, Instructor, FAQItem } from "@/types";

export const testimonials: Testimonial[] = [
  {
    name: "Priya Chandran",
    role: "Senior Product Designer",
    company: "Northwind Labs",
    avatar: "PC",
    quote:
      "The design systems course changed how our whole team ships. I went from making one-off screens to building a token library that three squads now depend on.",
    rating: 5,
    outcome: "Promoted to Senior Designer within 4 months",
  },
  {
    name: "Sameer Joshi",
    role: "Backend Engineer",
    company: "Cobalt Systems",
    avatar: "SJ",
    quote:
      "I'd tried three other bootcamps before this. Atisunya was the first one where the projects actually resembled the mess of a real production codebase.",
    rating: 5,
    outcome: "Landed a role at Cobalt Systems",
  },
  {
    name: "Ritika Bansal",
    role: "Data Analyst",
    company: "Fennel Health",
    avatar: "RB",
    quote:
      "The live cohorts kept me accountable in a way self-paced videos never did. Office hours with Dr. Iyer alone were worth the tuition.",
    rating: 5,
  },
  {
    name: "Owen Fitzgerald",
    role: "Cloud Engineer",
    company: "Trellis Cloud",
    avatar: "OF",
    quote:
      "Passed the AWS Solutions Architect Professional exam on the first attempt. The labs mirrored the exam's scenario-based questions almost exactly.",
    rating: 5,
    outcome: "AWS certified in 9 weeks",
  },
  {
    name: "Neha Kulkarni",
    role: "Product Manager",
    company: "Marlowe Bank",
    avatar: "NK",
    quote:
      "Case studies were pulled from real launches, not hypotheticals. I use the prioritization framework from week 3 in every roadmap review now.",
    rating: 4,
  },
  {
    name: "Daniel Okafor",
    role: "Full-Stack Developer",
    company: "Hearth Analytics",
    avatar: "DO",
    quote:
      "Rohan's feedback on my capstone PR was more thorough than most code reviews I've gotten at work. That level of attention is rare at this price.",
    rating: 5,
    outcome: "Shipped capstone to 40k users",
  },
];

export const instructors: Instructor[] = [
  {
    slug: "meera-kapoor",
    name: "Meera Kapoor",
    role: "Principal Product Designer",
    company: "formerly at Verixon",
    bio: "Meera spent eight years leading design systems for Verixon's flagship products before turning to teaching full-time. She's obsessed with the invisible decisions that make interfaces feel inevitable.",
    avatar: "MK",
    studentsCount: 6400,
    coursesCount: 2,
    rating: 4.9,
    expertise: ["Design Systems", "Brand Identity", "Figma"],
  },
  {
    slug: "rohan-verma",
    name: "Rohan Verma",
    role: "Staff Software Engineer",
    company: "formerly at Trellis Cloud",
    bio: "Rohan built and scaled backend platforms serving millions of requests per day. He teaches the way he wishes someone had taught him — with real production constraints, not toy examples.",
    avatar: "RV",
    studentsCount: 8210,
    coursesCount: 1,
    rating: 4.8,
    expertise: ["Next.js", "System Design", "TypeScript"],
  },
  {
    slug: "ananya-iyer",
    name: "Dr. Ananya Iyer",
    role: "ML Research Lead",
    company: "formerly at Fennel Health",
    bio: "Ananya holds a PhD in applied statistics and spent six years shipping ML models into clinical products, where mistakes have real consequences. She teaches rigor without losing practicality.",
    avatar: "AI",
    studentsCount: 12170,
    coursesCount: 2,
    rating: 4.9,
    expertise: ["Machine Learning", "Python", "Data Analytics"],
  },
  {
    slug: "karan-mehta",
    name: "Karan Mehta",
    role: "Group Product Manager",
    company: "formerly at Marlowe Bank",
    bio: "Karan has launched twelve products across fintech and healthtech, three of which reached over a million users. He's known for turning fuzzy problems into shippable roadmaps.",
    avatar: "KM",
    studentsCount: 6720,
    coursesCount: 1,
    rating: 4.7,
    expertise: ["Product Strategy", "Roadmapping", "Discovery"],
  },
  {
    slug: "devika-nair",
    name: "Devika Nair",
    role: "Cloud Solutions Architect",
    company: "AWS-certified, formerly at Ossoro",
    bio: "Devika designs cloud infrastructure for companies operating at national scale. She holds five AWS certifications and has a gift for making distributed systems feel intuitive.",
    avatar: "DN",
    studentsCount: 4310,
    coursesCount: 1,
    rating: 4.8,
    expertise: ["AWS", "System Architecture", "DevOps"],
  },
  {
    slug: "arjun-singh",
    name: "Arjun Singh",
    role: "Security Engineering Lead",
    company: "formerly at Cobalt Systems",
    bio: "Arjun has led incident response for enterprise breaches and now focuses on teaching the fundamentals that prevent them in the first place.",
    avatar: "AS",
    studentsCount: 3860,
    coursesCount: 1,
    rating: 4.7,
    expertise: ["Cybersecurity", "Network Defense", "Incident Response"],
  },
];

export const faqs: FAQItem[] = [
  {
    question: "How are live cohorts different from self-paced courses?",
    answer:
      "Live cohorts run on a fixed schedule with weekly instructor-led sessions, real-time feedback, and a peer group moving through the material alongside you. Self-paced courses give you full flexibility with recorded lessons and async support — both include the same project work and certification.",
  },
  {
    question: "Will I get a certificate I can add to LinkedIn?",
    answer:
      "Yes. Every course includes a verifiable digital certificate with a unique credential ID you can share directly to LinkedIn or add to your resume. Certifications for select tracks are also recognized by our corporate hiring partners.",
  },
  {
    question: "What if I fall behind in a live cohort?",
    answer:
      "All live sessions are recorded and added to your dashboard within an hour. You can also switch into the next cohort's live sessions at no extra cost if your schedule changes mid-course.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes — if you're not satisfied within the first 14 days of a course, we offer a full refund, no questions asked. After that window, refunds are evaluated case by case.",
  },
  {
    question: "Can my company sponsor my enrollment?",
    answer:
      "Many learners use an employer education stipend. We provide itemized invoices and a manager-approval letter template on request, and our Corporate Training team can also set up team-wide billing directly.",
  },
  {
    question: "Do I need prior experience to start?",
    answer:
      "It depends on the track. Each course lists a difficulty level and any prerequisites on its details page — Beginner courses assume no prior background, while Advanced courses assume working proficiency in the relevant fundamentals.",
  },
];
