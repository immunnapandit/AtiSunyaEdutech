import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/features/auth-form";
import { AuthShell } from "@/components/features/auth-shell";

export const metadata: Metadata = { title: "Reset password" };

export default async function ForgotPasswordPage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  const footer = (
    <>
      Remembered it?{" "}
      <Link href="/login" className="font-semibold text-royal">
        Back to log in
      </Link>
    </>
  );

  if (token) {
    return (
      <AuthShell title="Choose a new password" subtitle="Enter a new password for your account." footer={footer}>
        <AuthForm mode="reset-password" resetToken={token} />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a link to set a new one."
      footer={footer}
    >
      <AuthForm mode="forgot-password" />
    </AuthShell>
  );
}
