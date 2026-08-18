"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";

const PAY_NOW_URL = "https://www.atisunya.co/pay-now";

export function CourseEnrollAction({ slug }: { slug: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("atisunya_token");
    if (!token) {
      setCheckingStatus(false);
      return;
    }

    apiRequest<{ enrolledCourses: { slug: string }[] }>("/dashboard", { token })
      .then((data) => {
        setIsEnrolled(data.enrolledCourses.some((course) => course.slug === slug));
      })
      .catch(() => {
        setIsEnrolled(false);
      })
      .finally(() => {
        setCheckingStatus(false);
      });
  }, [slug]);

  function handleClick() {
    if (isEnrolled) {
      router.push("/dashboard");
      return;
    }
    setLoading(true);
    window.location.href = PAY_NOW_URL;
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="lg"
        className="w-full justify-center"
        onClick={handleClick}
        disabled={loading || checkingStatus}
      >
        {checkingStatus
          ? "Checking..."
          : isEnrolled
            ? "Go to course"
            : loading
              ? "Redirecting..."
              : "Enroll now"}
      </Button>

      <p className="text-center text-xs font-medium text-navy-400">
        {isEnrolled ? "You are already enrolled in this course" : "Secure checkout powered by AtiSunya"}
      </p>
    </div>
  );
}
