"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest, formToObject } from "@/lib/api";
import { signInWithGoogle, signInWithMicrosoft } from "@/lib/social-auth";
import Image from "next/image";

import Link from "next/link";

type Mode = "login" | "signup" | "forgot-password";

const inputClass =
 "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate-400 transition-all duration-200 focus:border-royal-500 focus:ring-4 focus:ring-blue-100 focus:outline-none";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "microsoft" | null>(null);

  function completeAuth(token: string) {
    localStorage.setItem("atisunya_token", token);
    const redirectTo = new URLSearchParams(window.location.search).get("redirect") || "/dashboard";
    router.push(redirectTo);
  }

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
        completeAuth(data.token);
        return;
      }

      if (mode === "login") {
        const data = await apiRequest<{ token: string }> ("/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        completeAuth(data.token);
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

  async function handleGoogleSignIn() {
    setError("");
    setMessage("");
    setSocialLoading("google");

    try {
      const credential = await signInWithGoogle();
      const data = await apiRequest<{ token: string }>("/auth/google", {
        method: "POST",
        body: JSON.stringify({ credential }),
      });
      completeAuth(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed.");
    } finally {
      setSocialLoading(null);
    }
  }

  async function handleMicrosoftSignIn() {
    setError("");
    setMessage("");
    setSocialLoading("microsoft");

    try {
      const idToken = await signInWithMicrosoft();
      const data = await apiRequest<{ token: string }>("/auth/microsoft", {
        method: "POST",
        body: JSON.stringify({ idToken }),
      });
      completeAuth(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Microsoft sign-in failed.");
    } finally {
      setSocialLoading(null);
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      {mode === "signup" && (
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="name">
            Full name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="email">
          Email or mobile number
        </label>
      <input
  id="identifier"
  name="identifier"
  type="text"
  required
  placeholder="Enter your email or mobile number"
  className={inputClass}
/>
      </div>

      {mode !== "forgot-password" && (
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="password">
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

      {mode === "login" && (
  <div className="flex items-center justify-between text-sm">
    <label className="flex items-center gap-2 text-slate-600">
    <input
  type="checkbox"
  className="h-4 w-4 rounded-md border-slate-300 accent-blue-600 transition focus:ring-2 focus:ring-blue-200"
/>  
      Remember me
    </label>

    <Link
      href="/forgot-password"
     className="font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700"
    >
      Forgot password?
    </Link>
  </div>
)}

      {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      {message && <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{message}</p>}

      <Button
  type="submit"
  size="lg"
  disabled={loading}
  className="h-14 w-full rounded-2xl bg-royal text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
>
        {loading
          ? "Please wait..."
          : mode === "login"
            ? "Log in"
            : mode === "signup"
              ? "Create account"
              : "Send reset link"}
      </Button>

      {mode !== "forgot-password" && (
        <>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-slate-400">
                OR
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || socialLoading !== null}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Image
                src="/images/logos/google.svg"
                alt="Google"
                width={20}
                height={20}
              />
              <span>{socialLoading === "google" ? "Please wait..." : "Sign in with Google"}</span>
            </button>

            <button
              type="button"
              onClick={handleMicrosoftSignIn}
              disabled={loading || socialLoading !== null}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Image
                src="/images/logos/microsoft.svg"
                alt="Microsoft"
                width={20}
                height={20}
              />
              <span>{socialLoading === "microsoft" ? "Please wait..." : "Sign in with Microsoft"}</span>
            </button>
          </div>
        </>
      )}
    </form>
  );
}
