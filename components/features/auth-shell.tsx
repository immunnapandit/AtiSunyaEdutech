import Link from "next/link";
import { GraduationCap } from "lucide-react";
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
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-24 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-navy">Atisunya Edutech</span>
          </Link>

          <h1 className="mt-10 text-2xl font-bold text-navy">{title}</h1>
          <p className="mt-2 text-sm text-navy-400">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <p className="mt-8 text-center text-sm text-navy-400">{footer}</p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-navy-gradient lg:block">
        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-royal/25 blur-3xl" />
        <div className="absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-cyan/15 blur-3xl" />
        <div className="relative flex h-full flex-col items-center justify-center px-16 text-center text-white">
          <p className="text-2xl font-bold text-balance">
            "The capstone review was more thorough than any code review I've
            had at work."
          </p>
          <p className="mt-4 text-sm text-white/50">
            Daniel Okafor · Full-Stack Developer, Hearth Analytics
          </p>
        </div>
      </div>
    </div>
  );
}
