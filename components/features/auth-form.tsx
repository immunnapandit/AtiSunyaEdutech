"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest, formToObject } from "@/lib/api";

type Mode = "login" | "signup" | "forgot-password";

const inputClass =
  "mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-sm focus:border-royal focus:outline-none";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const form = event.currentTarget;
    const payload = formToObject(form);

    try {
      if (mode === "signup") {
        const data = await apiRequest<{ token: string }> ("/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        localStorage.setItem("atisunya_token", data.token);
        const redirectTo = new URLSearchParams(window.location.search).get("redirect") || "/dashboard";
        router.push(redirectTo);
        return;
      }

      if (mode === "login") {
        const data = await apiRequest<{ token: string }> ("/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        localStorage.setItem("atisunya_token", data.token);
        const redirectTo = new URLSearchParams(window.location.search).get("redirect") || "/dashboard";
        router.push(redirectTo);
        return;
      }

      const data = await apiRequest<{ message: string }>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setMessage(data.message);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {mode === "signup" && (
        <div>
          <label className="text-sm font-semibold text-navy" htmlFor="name">
            Full name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
      )}

      <div>
        <label className="text-sm font-semibold text-navy" htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>

      {mode !== "forgot-password" && (
        <div>
          <label className="text-sm font-semibold text-navy" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className={inputClass}
          />
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      {message && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{message}</p>}

      <Button type="submit" size="lg" className="w-full justify-center" disabled={loading}>
        {loading
          ? "Please wait..."
          : mode === "login"
            ? "Log in"
            : mode === "signup"
              ? "Create account"
              : "Send reset link"}
      </Button>
    </form>
  );
}
