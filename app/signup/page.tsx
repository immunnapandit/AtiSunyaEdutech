import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/features/auth-form";
import { AuthShell } from "@/components/features/auth-shell";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start with any course, free to browse before you enroll."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-royal">
            Log in
          </Link>
        </>
      }
    >
      <AuthForm mode="signup" />
      <p className="mt-4 text-center text-xs text-navy-400">
        By signing up, you agree to our{" "}
        <Link href="/terms-conditions" className="underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </AuthShell>
  );
}
