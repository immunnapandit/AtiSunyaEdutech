import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/features/auth-shell";
import { Button } from "@/components/ui/button";

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
      <form className="space-y-4">
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
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-navy" htmlFor="password">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs font-semibold text-royal">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-sm focus:border-royal focus:outline-none"
          />
        </div>
        <Button type="submit" size="lg" className="w-full justify-center">
          Log in
        </Button>
      </form>
    </AuthShell>
  );
}
