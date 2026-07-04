import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/features/auth-shell";
import { Button } from "@/components/ui/button";

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
      <form className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-navy" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-sm focus:border-royal focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-navy" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-sm focus:border-royal focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-navy" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-sm focus:border-royal focus:outline-none"
          />
        </div>
        <Button type="submit" size="lg" className="w-full justify-center">
          Create account
        </Button>
        <p className="text-center text-xs text-navy-400">
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
      </form>
    </AuthShell>
  );
}
