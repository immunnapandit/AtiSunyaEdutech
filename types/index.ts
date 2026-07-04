export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Course {
  slug: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  duration: string;
  studentsCount: number;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  thumbnailGradient: string;
  description: string;
  featured?: boolean;
}

export interface Instructor {
  slug: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  avatar: string;
  studentsCount: number;
  coursesCount: number;
  rating: number;
  expertise: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  outcome?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  coverGradient: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  billingCycle: "month" | "year";
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}
