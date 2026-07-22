import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("container-edge", className)}>{children}</div>;
}

export function Badge({
  children,
  className,
  tone = "royal",
}: {
  children: ReactNode;
  className?: string;
  tone?: "royal" | "cyan" | "navy" | "signal";
}) {
  const tones = {
    royal: "bg-royal-50 text-royal-700 border-royal-100",
    cyan: "bg-cyan-100/60 text-cyan-600 border-cyan-100",
    navy: "bg-navy/5 text-navy border-navy/10",
    signal: "bg-signal-100 text-signal-600 border-signal-100",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({
  children,
  className,
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("eyebrow-text", align === "center" && "justify-center", className)}>
      <span className="h-px w-8 bg-brand-600/50" aria-hidden="true" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow align={align} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "text-2xl font-semibold leading-snug text-balance md:text-3xl",
          tone === "light" ? "text-navy" : "text-white"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-7 text-balance",
            tone === "light" ? "text-navy-400" : "text-white/75"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Divider({ className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-px w-full bg-navy-100", className)} />;
}
