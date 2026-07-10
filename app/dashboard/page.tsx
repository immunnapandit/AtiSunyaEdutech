import type { Metadata } from "next";
import { DashboardClient } from "@/components/features/dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Atisunya Edutech learning dashboard.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
