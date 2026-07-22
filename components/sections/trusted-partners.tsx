"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Eyebrow } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Partner = {
  name: string;
  tagline: string;
  logo: string;
};

const partners: Partner[] = [
  { name: "Microsoft", tagline: "Cloud Training Services", logo: "/images/logos/microsoft.svg" },
  { name: "Oracle", tagline: "Certified Training Partner", logo: "/images/logos/oracle.svg" },
  { name: "SAP", tagline: "Authorized Partner", logo: "/images/logos/sap.svg" },
  { name: "Cisco", tagline: "Platinum Learning Partner", logo: "/images/logos/cisco.svg" },
  { name: "AWS", tagline: "Cloud Training Partner", logo: "/images/logos/aws.svg" },
  { name: "Azure", tagline: "Solutions Partner", logo: "/images/logos/azure.svg" },
];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100",
        "bg-white shadow-soft transition duration-300 ease-out",
        "hover:-translate-y-1 hover:border-brand-100 hover:shadow-lifted"
      )}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-7 text-center">
        <Image
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={120}
          height={36}
          className="h-8 w-auto max-w-[120px] object-contain"
        />
        <p className="text-[11px] font-medium leading-snug text-navy-400">
          {partner.tagline}
        </p>
      </div>

      <div className="border-t border-navy-100 bg-mist-50 py-2.5 text-center transition-colors duration-300 group-hover:bg-brand-50">
        <span className="text-sm font-semibold text-navy">{partner.name}</span>
      </div>
    </div>
  );
}

export function TrustedPartners() {
  return (
    <section className="border-y border-navy-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12 lg:px-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow align="center">Accreditations &amp; Alliances</Eyebrow>
          <h2 className="heading-section mt-4 text-navy">
            Trusted by the World&apos;s Leading Technology &amp; Certification
            Partners
          </h2>
        </Reveal>

        <Stagger
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
          stagger={0.05}
        >
          {partners.map((partner) => (
            <StaggerItem key={partner.name} className="h-full">
              <PartnerCard partner={partner} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
