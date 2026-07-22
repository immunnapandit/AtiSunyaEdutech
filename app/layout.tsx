import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/site-chrome";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atisunyaedutech.com"),
  title: {
    default: "Atisunya Edutech - Learn. Build. Transform.",
    template: "%s | Atisunya Edutech",
  },
  description:
    "Atisunya Edutech is a premium learning platform offering industry-focused courses, live training, certifications, corporate learning, and mentorship for the careers of tomorrow.",
  keywords: [
    "online courses",
    "live training",
    "certifications",
    "corporate training",
    "edtech",
    "career mentorship",
  ],
  openGraph: {
    title: "Atisunya Edutech - Learn. Build. Transform.",
    description:
      "Industry-focused courses, live training, and mentorship from practitioners who've shipped the real thing.",
    url: "https://atisunyaedutech.com",
    siteName: "Atisunya Edutech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atisunya Edutech - Learn. Build. Transform.",
    description:
      "Industry-focused courses, live training, and mentorship from practitioners who've shipped the real thing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
