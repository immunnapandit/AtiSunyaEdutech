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

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-semibold uppercase tracking-[0.18em] text-royal", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
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
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 className="text-display-md md:text-display-lg font-bold text-balance">{title}</h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-navy-400 text-balance">{description}</p>
      )}
    </div>
  );
}

export function Divider({ className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-px w-full bg-navy-100", className)} />;
}
