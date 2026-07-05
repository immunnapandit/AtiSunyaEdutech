import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-600 shadow-glow hover:shadow-lifted",
  secondary:
    "bg-royal text-white hover:bg-royal-600 shadow-glow hover:shadow-lifted",
  outline:
    "border border-brand/20 text-brand bg-white hover:border-brand/40 hover:bg-brand-50",
  ghost: "text-navy hover:bg-brand-50",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-sm rounded-xl gap-2",
  lg: "px-8 py-4 text-base rounded-xl gap-2",
};

const baseStyles =
  "inline-flex items-center justify-center font-semibold font-body transition-all duration-300 ease-out active:scale-[0.98] whitespace-nowrap";

export function Button({
  variant = "primary",
  size = "md",
  withArrow,
  children,
  className,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
      {withArrow && <ArrowUpRight className="h-4 w-4" />}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  withArrow,
  children,
  className,
}: BaseProps & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
    >
      {children}
      {withArrow && <ArrowUpRight className="h-4 w-4" />}
    </Link>
  );
}
