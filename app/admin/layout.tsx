"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BookOpenText, Newspaper, LogOut, ShieldCheck } from "lucide-react";
import { getAdminToken, clearAdminToken } from "@/lib/admin-api";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Courses", href: "/admin/courses", icon: BookOpenText },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecked(true);
      return;
    }

    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }

    setChecked(true);
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f9fc] text-sm font-semibold text-navy-400">
        Loading admin console...
      </div>
    );
  }

  function handleLogout() {
    clearAdminToken();
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#f6f9fc]">
      <aside className="flex w-64 shrink-0 flex-col border-r border-navy-100 bg-white">
        <div className="flex items-center gap-2 border-b border-navy-100 px-6 py-6">
          <ShieldCheck className="h-6 w-6 text-royal-700" />
          <span className="text-sm font-bold uppercase tracking-wide text-navy">Admin CMS</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          {navItems.map((item) => {
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                  active ? "bg-brand text-white" : "text-navy-500 hover:bg-brand-50 hover:text-brand"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-navy-100 px-3 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-navy-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-8">{children}</main>
    </div>
  );
}
