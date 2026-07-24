import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutClient } from "@/components/features/checkout-client";
import { apiRequest } from "@/lib/api";
import type { Course } from "@/types";

export const dynamic = "force-dynamic";

async function getCourse(slug: string): Promise<Course | null> {
  try {
    const data = await apiRequest<{ course: Course }>(`/courses/${slug}`);
    return data.course;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) return {};

  return {
    title: `Checkout • ${course.title}`,
    description: `Secure checkout for ${course.title}`,
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) notFound();

  return <CheckoutClient slug={course.slug} title={course.title} price={course.price} />;
}
