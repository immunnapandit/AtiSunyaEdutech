"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const PAY_NOW_URL = "https://www.atisunya.co/pay-now";

export function CourseEnrollAction(_props: { slug: string; title: string }) {
  const [loading, setLoading] = useState(false);

  function handleClick() {
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
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Enroll now"}
      </Button>

      <p className="text-center text-xs font-medium text-navy-400">
        Secure checkout powered by AtiSunya
      </p>
    </div>
  );
}
