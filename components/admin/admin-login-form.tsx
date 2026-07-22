"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { adminApiRequest, setAdminToken } from "@/lib/admin-api";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate-400 transition-all duration-200 focus:border-royal-500 focus:ring-4 focus:ring-blue-100 focus:outline-none";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await adminApiRequest<{ token: string }>("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        skipAuthRedirect: true,
      });
      setAdminToken(data.token);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f9fc] px-4">
      <div className="w-full max-w-md rounded-2xl border border-navy-100 bg-white p-8 shadow-lifted">
        <div className="flex items-center gap-3 text-royal-700">
          <ShieldCheck className="h-6 w-6" />
          <span className="text-sm font-bold uppercase tracking-wide">Admin CMS</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-navy">Sign in to manage content</h1>
        <p className="mt-2 text-sm text-navy-400">
          Use your admin credentials to manage courses and blog posts.
        </p>

        <form className="mt-8" onSubmit={onSubmit}>
          <label className="block text-sm font-semibold text-navy" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />

          <label className="mt-5 block text-sm font-semibold text-navy" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClass}
          />

          {error && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
