import { NavLink } from "@/types";

export const SITE = {
  name: "Atisunya Edutech",
  tagline: "Learn. Build. Transform.",
  description:
    "Industry-focused courses, live training, and mentorship from practitioners who've shipped the real thing.",
};

export const MAIN_NAV: NavLink[] = [
  { label: "Courses", href: "/courses", description: "Browse the full catalog" },
  { label: "Live Training", href: "/live-training", description: "Cohort-based, instructor-led" },
  { label: "Certifications", href: "/certifications", description: "Get industry-recognized" },
  { label: "Corporate", href: "/corporate-training", description: "Upskill your team" },
  { label: "Instructors", href: "/instructors", description: "Meet the practitioners" },
  { label: "Pricing", href: "/pricing" },
];

export const FOOTER_LINKS = {
  Platform: [
    { label: "Courses", href: "/courses" },
    { label: "Live Training", href: "/live-training" },
    { label: "Certifications", href: "/certifications" },
    { label: "Corporate Training", href: "/corporate-training" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Instructors", href: "/instructors" },
    { label: "Student Success", href: "/student-success" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ],
};

export const COMPANY_LOGOS = [
  "Verixon",
  "Northwind Labs",
  "Cobalt Systems",
  "Fennel Health",
  "Marlowe Bank",
  "Trellis Cloud",
  "Hearth Analytics",
  "Ossoro",
];
