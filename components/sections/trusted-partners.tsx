"use client";

import type { IconType } from "react-icons";
import { SiCisco, SiSap } from "react-icons/si";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Eyebrow } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Partner = {
  name: string;
  tagline: string;
  icon?: IconType;
  mark?: string;
};

const partners: Partner[] = [
  { name: "Microsoft", tagline: "Cloud Training Services", mark: "Microsoft" },
  { name: "Oracle", tagline: "Certified Training Partner", mark: "ORACLE" },
  { name: "SAP", tagline: "Authorized Partner", icon: SiSap },
  { name: "Cisco", tagline: "Platinum Learning Partner", icon: SiCisco },
  { name: "AWS", tagline: "Cloud Training Partner", mark: "AWS" },
  { name: "Azure", tagline: "Solutions Partner", mark: "Azure" },
];

function PartnerCard({ partner }: { partner: Partner }) {
  const Icon = partner.icon;

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100",
        "bg-white shadow-soft transition duration-300 ease-out",
        "hover:-translate-y-1 hover:border-brand-100 hover:shadow-lifted"
      )}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-7 text-center">
        {Icon ? (
          <Icon
            className="h-9 w-9 text-navy-600 transition-colors duration-300 group-hover:text-brand-600"
            aria-hidden="true"
          />
        ) : (
          <span className="font-display text-lg font-bold tracking-tight text-navy-600 transition-colors duration-300 group-hover:text-brand-600">
            {partner.mark}
          </span>
        )}
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