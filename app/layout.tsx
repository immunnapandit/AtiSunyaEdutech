import type { Metadata } from "next";
import { Cardo, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/site-chrome";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cardo = Cardo({
  subsets: ["latin"],
  variable: "--font-cardo",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atisunyaedutech.com"),
  title: {
    default: "AtiSunya Edutech - Learn. Build. Transform.",
    template: "%s | AtiSunya Edutech",
  },
  description:
    "AtiSunya Edutech offers Microsoft courses, live training, and certifications to help you build real skills for your career.",
  keywords: [
    "online courses",
    "live training",
    "certifications",
    "corporate training",
    "edtech",
    "career mentorship",
  ],
  openGraph: {
    title: "AtiSunya Edutech - Learn. Build. Transform.",
    description:
      "Microsoft courses, live training, and mentorship from real experts.",
    url: "https://atisunyaedutech.com",
    siteName: "AtiSunya Edutech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtiSunya Edutech - Learn. Build. Transform.",
    description:
      "Microsoft courses, live training, and mentorship from real experts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${josefinSans.variable} ${cardo.variable}`} data-scroll-behavior="smooth">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
