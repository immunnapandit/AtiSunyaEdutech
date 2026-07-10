"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function CourseEnrollAction({ slug }: { slug: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    router.push(`/checkout/${slug}`);
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="lg"
        className="w-full justify-center"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Preparing checkout..." : "Enroll now"}
      </Button>

      <p className="text-center text-xs font-medium text-navy-400">
        Secure checkout with Razorpay
      </p>
    </div>
  );
}
