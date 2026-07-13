import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/features/auth-form";
import { AuthShell } from "@/components/features/auth-shell";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to keep going where you left off."
      footer={
        <>
          New to Atisunya?{" "}
          <Link href="/signup" className="font-semibold text-royal">
            Create an account
          </Link>
        </>
      }
    >
      <div className="mb-3 flex justify-end">
        <Link href="/forgot-password" className="text-xs font-semibold text-royal">
          Forgot password?
        </Link>
      </div>
      <AuthForm mode="login" />
    </AuthShell>
  );
}
