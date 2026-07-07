import type { Metadata } from "next";
import { CoursesCatalog } from "@/components/sections/courses-catalog";

export const metadata: Metadata = {
  title: "Microsoft Courses",
  description:
    "Browse Microsoft modules and learning paths for Azure, Power BI, Microsoft AI, Dynamics 365, security, and cloud infrastructure.",
};

export default function CoursesPage() {
  return <CoursesCatalog />;
}

