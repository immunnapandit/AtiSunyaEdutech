import Link from "next/link";
import { GraduationCap, ShieldCheck } from "lucide-react";
import { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px] rounded-3xl bg-white p-7 border border-slate-100 shadow-[0_-8px_30px_rgba(15,23,42,0.08),0_20px_45px_rgba(15,23,42,0.12)]">

          {/* Logo */}

         

          {/* Heading */}

          <h1 className="mt-8 text-center text-4xl font-bold text-navy">
            {title}
          </h1>

          <p className="mt-3 text-center text-lg text-navy-400">
            {subtitle}
          </p>

          {/* Form */}

          <div className="mt-10">
            {children}
          </div>

          {/* Footer */}

          <div className="mt-8 text-center text-sm text-navy-400">
            {footer}
          </div>

          {/* Bottom */}

          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-navy-400">
            <ShieldCheck className="h-5 w-5 text-royal-600" />
            <span>Your data is safe with us.</span>
          </div>

        </div>
      </div>
    </div>
  );
}