"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Award, BadgeCheck, Loader2, Search, ShieldAlert } from "lucide-react";
import { apiRequest } from "@/lib/api";

type VerifyResponse = {
  valid: boolean;
  certificate?: {
    certificateId: string;
    issuedAt: string;
    studentName: string;
    courseTitle: string;
  };
};

const inputClass =
  "w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10";

export function VerifyCertificateClient({ initialId = "" }: { initialId?: string }) {
  const [certificateId, setCertificateId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [error, setError] = useState("");

  async function verify(id: string) {
    const trimmed = id.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await apiRequest<VerifyResponse>(`/certificates/verify/${encodeURIComponent(trimmed)}`);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not verify this certificate right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialId) {
      verify(initialId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    verify(certificateId);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
          <input
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter Certificate ID, e.g. AE-XXXXXXXXXX"
            className={`${inputClass} pl-11`}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !certificateId.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {error && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}

      {result && result.valid && result.certificate && (
        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
              <BadgeCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-green-700">Valid certificate</p>
              <p className="text-xs text-green-600">Issued by AtiSunya Edutech</p>
            </div>
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-navy-400">Student name</dt>
              <dd className="mt-1 text-base font-bold text-navy">{result.certificate.studentName}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-navy-400">Course</dt>
              <dd className="mt-1 text-base font-bold text-navy">{result.certificate.courseTitle}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-navy-400">Issued on</dt>
              <dd className="mt-1 text-sm font-semibold text-navy-600">
                {new Date(result.certificate.issuedAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-navy-400">Certificate ID</dt>
              <dd className="mt-1 text-sm font-semibold text-navy-600">{result.certificate.certificateId}</dd>
            </div>
          </dl>
        </div>
      )}

      {result && !result.valid && (
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-6">
          <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-bold text-red-700">No certificate found</p>
            <p className="mt-1 text-sm text-red-600">
              We couldn&apos;t find a certificate with this ID. Please double-check the ID and try again.
            </p>
          </div>
        </div>
      )}

      {!result && !error && (
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-navy-100 bg-mist-50 p-6 text-sm text-navy-500">
          <Award className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <p>
            Every AtiSunya Edutech certificate carries a unique Certificate ID and a QR code. Enter the ID
            printed on the certificate above to confirm it was genuinely issued by us.
          </p>
        </div>
      )}
    </div>
  );
}
