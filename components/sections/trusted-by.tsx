import { Container } from "@/components/ui/primitives";
import { COMPANY_LOGOS } from "@/constants/site";

export function TrustedBy() {
  return (
    <section className="border-y border-navy-100 bg-mist-50 py-10">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-navy-400">
          Alumni now build at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {COMPANY_LOGOS.map((name) => (
            <span
              key={name}
              className="font-display text-lg font-bold text-navy-400/50 hover:text-navy transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
