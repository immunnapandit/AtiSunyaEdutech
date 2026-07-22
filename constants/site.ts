import { NavLink } from "@/types";

export const SITE = {
  name: "Atisunya Edutech",
  tagline: "Learn. Build. Transform.",
  description:
    "Industry-focused Microsoft courses, live training, certifications, corporate learning, and mentorship for the careers of tomorrow.",
};

export const MAIN_NAV: NavLink[] = [
  { label: "Courses", href: "/courses", description: "Browse Microsoft learning paths" },
  { label: "Live Training", href: "/live-training", description: "Instructor-led sessions" },
  { label: "Corporate Training", href: "/training", description: "Upskill your team" },
  { label: "Instructors", href: "/instructors", description: "Meet our training team" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  Platform: [
    { label: "Courses", href: "/courses" },
    { label: "Live Training", href: "/live-training" },
    { label: "Corporate Training", href: "/training" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Instructors", href: "/instructors" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ],
};

export const COMPANY_LOGOS: string[] = [];
