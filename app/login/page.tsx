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
    
      <AuthForm mode="login" />
    </AuthShell>
  );
}
