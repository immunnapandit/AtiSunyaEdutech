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
  ShoppingCart,
  UserRound,
  X,
  Youtube,
} from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/", hasDropdown: true },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses", hasDropdown: true },
  { label: "Pages", href: "/faq", hasDropdown: true },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "X", href: "#", text: "X" },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "YouTube", href: "#", icon: Youtube },
];

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
        <div className="container-edge flex min-h-[60px] items-center justify-between gap-4 text-sm font-semibold md:text-base">
          <div className="flex items-center">
            <Link
              href="/login"
              className="flex h-[60px] items-center gap-2 border-x border-white/15 px-4 transition-colors hover:bg-white/10 sm:px-5"
            >
              <UserRound className="h-5 w-5" />
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
                    className="flex h-[60px] w-14 items-center justify-center border-r border-white/15 transition-colors hover:bg-white/10"
                  >
                    {Icon ? (
                      <Icon className="h-4 w-4" />
                    ) : (
                      <span className="text-base font-bold">{link.text}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden items-center gap-7 lg:flex">
            <Link href="tel:+99925476854" className="flex items-center gap-2">
              <Headphones className="h-5 w-5" />
              <span>Call Us:+99925476854</span>
            </Link>
            <span className="h-9 w-px bg-white/25" />
            <Link
              href="mailto:example@eduplus.com"
              className="flex items-center gap-2"
            >
              <Mail className="h-5 w-5" />
              <span>Email Address:example@eduplus.com</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-edge flex min-h-[92px] items-center justify-between gap-6 py-4">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/atisunyaedutechlogo.png"
            alt="Atisunya Edutech"
            width={220}
            height={80}
            priority
            className="h-14 w-auto object-contain sm:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-base font-bold text-black transition-colors hover:text-brand"
            >
              <span>{link.label}</span>
              {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#f7f7f7] text-black transition-colors hover:bg-brand hover:text-white"
          >
            <Search className="h-7 w-7" />
          </button>
          <Link
            href="/courses"
            aria-label="Cart"
            className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#f7f7f7] text-black transition-colors hover:bg-brand hover:text-white"
          >
            <ShoppingCart className="h-7 w-7" />
            <span className="absolute -right-1 top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
              4
            </span>
          </Link>
          <LinkButton
            href="/signup"
            size="lg"
            className="rounded-[28px] bg-brand px-10 text-base shadow-none hover:bg-brand-600 hover:shadow-none"
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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-bold text-navy-600 hover:bg-mist-100"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </Link>
              ))}
              <div className="mt-2 grid gap-3 border-t border-navy-100 pt-4 text-sm font-semibold text-navy-400 lg:hidden">
                <Link href="tel:+99925476854" className="flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  <span>Call Us:+99925476854</span>
                </Link>
                <Link
                  href="mailto:example@eduplus.com"
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Address:example@eduplus.com</span>
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-[1fr_1fr_auto] items-center gap-3 border-t border-navy-100 pt-4">
                <button
                  type="button"
                  aria-label="Search"
                  className="flex h-11 items-center justify-center rounded-lg bg-mist-100 text-navy"
                >
                  <Search className="h-5 w-5" />
                </button>
                <Link
                  href="/courses"
                  aria-label="Cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 items-center justify-center rounded-lg bg-mist-100 text-navy"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Link>
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

