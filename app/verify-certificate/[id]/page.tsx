import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { VerifyCertificateClient } from "@/components/features/verify-certificate-client";

export const metadata: Metadata = {
  title: "Verify Certificate",
  description: "Verify the authenticity of an AtiSunya Edutech course completion certificate.",
};

export default async function VerifyCertificateByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="pt-32 pb-24">
      <Container className="max-w-2xl">
        <SectionHeading
          as="h1"
          align="center"
          className="mx-auto"
          eyebrow="Certificate Verification"
          title="Verify a Certificate"
          description="Enter the Certificate ID printed on any AtiSunya Edutech certificate to confirm it is genuine."
        />

        <div className="mt-12">
          <VerifyCertificateClient initialId={decodeURIComponent(id)} />
        </div>
      </Container>
    </div>
  );
}
