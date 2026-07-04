import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/features/auth-shell";
import { Button } from "@/components/ui/button";

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
        <Button type="submit" size="lg" className="w-full justify-center">
          Send reset link
        </Button>
      </form>
    </AuthShell>
  );
}
