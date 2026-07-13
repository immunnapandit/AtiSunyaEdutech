import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/features/auth-form";
import { AuthShell } from "@/components/features/auth-shell";

export const metadata: Metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a link to set a new one."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/login" className="font-semibold text-royal">
            Back to log in
          </Link>
        </>
      }
    >
      <AuthForm mode="forgot-password" />
    </AuthShell>
  );
}
