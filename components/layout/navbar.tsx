"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Facebook,
  Headphones,
  Linkedin,
  Mail,
  Menu,
  Search,
  UserRound,
  X,
  Youtube,
} from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/", hasDropdown:  false},
  { label: "About", href: "/about" },
  {
    label: "Training and Courses",
    href: "/courses",
    hasDropdown: true,
    children: [
      {
        label: "Corporate Training",
        href: "/training",
        description: "Team enablement programs for Microsoft cloud and AI.",
      },
      {
        label: "Microsoft Courses",
        href: "/courses",
        description: "Browse Microsoft modules and learning paths.",
      },
    ],
  },
  //{ label: "Pages", href: "/faq", hasDropdown: true },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "X", href: "#", text: "X" },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "YouTube", href: "#", icon: Youtube },
];

const headerContainer =
  "mx-auto w-full max-w-[1400px] px-5 md:px-8 lg:px-10";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full bg-white transition-shadow duration-300",
        scrolled
          ? "border-b border-navy-100 shadow-soft"
          : "border-b border-transparent"
      )}
    >
      <div className="bg-brand text-white">
        <div
          className={cn(
            headerContainer,
            "flex min-h-11 items-center justify-between gap-4 text-sm font-semibold"
          )}
        >
          <div className="flex items-center">
            <Link
              href="/login"
              className="flex h-11 items-center gap-2 border-x border-white/15 px-3 transition-colors hover:bg-white/10 sm:px-4"
            >
              <UserRound className="h-4 w-4" />
              <span>Register / Login</span>
            </Link>
            <div className="hidden items-center sm:flex">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="flex h-11 w-11 items-center justify-center border-r border-white/15 transition-colors hover:bg-white/10"
                  >
                    {Icon ? (
                      <Icon className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-bold">{link.text}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <Link href="tel:+99925476854" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              <span>Call Us:+(+91) 80-8181-0673, (+91) 82-9915-6511</span>
            </Link>
            <span className="h-6 w-px bg-white/25" />
            <Link
              href="mailto:info@atisunya.co"
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              <span>Email Address: info@atisunya.co</span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          headerContainer,
          "flex min-h-[78px] items-center justify-between gap-5 py-3"
        )}
      >
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/atisunyaedutechlogo.png"
            alt="Atisunya Edutech"
            width={220}
            height={80}
            priority
            className="h-12 w-auto object-contain sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                className="flex items-center gap-1.5 py-4 text-[15px] font-bold text-black transition-colors hover:text-brand"
              >
                <span>{link.label}</span>
                {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
              {link.children && (
                <div className="invisible absolute left-0 top-full w-72 translate-y-2 rounded-lg border border-navy-100 bg-white p-2 opacity-0 shadow-lifted transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-md px-4 py-3 transition-colors hover:bg-brand-50"
                    >
                      <span className="block text-sm font-bold text-navy">
                        {child.label}
                      </span>
                      <span className="mt-1 block text-xs font-medium leading-5 text-navy-400">
                        {child.description}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f7f7] text-black transition-colors hover:bg-brand hover:text-white"
          >
            <Search className="h-6 w-6" />
          </button>
          <LinkButton
            href="/signup"
            size="md"
            className="rounded-[24px] bg-brand px-8 text-[15px] shadow-none hover:bg-brand-600 hover:shadow-none"
          >
            Enroll Now
          </LinkButton>
        </div>

        <button
          aria-label="Toggle menu"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-navy xl:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-navy-100 bg-white xl:hidden"
          >
            <div className="container-edge flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-bold text-navy-600 hover:bg-mist-100"
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                  {link.children && (
                    <div className="ml-3 grid gap-1 border-l border-navy-100 pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm font-semibold text-navy-400 hover:bg-mist-100 hover:text-navy"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-2 grid gap-3 border-t border-navy-100 pt-4 text-sm font-semibold text-navy-400 lg:hidden">
                <Link href="tel:+99925476854" className="flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  <span>Call Us:+99925476854</span>
                </Link>
                <Link href="mailto:info@atisunya.co" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address: info@atisunya.co</span>
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-3 border-t border-navy-100 pt-4">
                <button
                  type="button"
                  aria-label="Search"
                  className="flex h-11 items-center justify-center rounded-lg bg-mist-100 text-navy"
                >
                  <Search className="h-5 w-5" />
                </button>
                <LinkButton
                  href="/signup"
                  size="md"
                  className="rounded-[24px] bg-brand shadow-none hover:bg-brand-600 hover:shadow-none"
                >
                  Enroll Now
                </LinkButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

