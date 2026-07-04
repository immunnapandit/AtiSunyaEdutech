import { Compass } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-20">
      <Container className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-50 text-royal-700">
          <Compass className="h-7 w-7" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-royal">
          404
        </p>
        <h1 className="mt-3 text-display-md font-extrabold text-navy text-balance">
          This page took a different learning path.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-navy-400">
          The page you're looking for doesn't exist or may have moved. Let's
          get you back on track.
        </p>
        <LinkButton href="/" size="lg" className="mt-8">
          Back to home
        </LinkButton>
      </Container>
    </div>
  );
}
