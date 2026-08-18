"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Award, Eye, Loader2, Palette, ShieldCheck } from "lucide-react";
import { adminApiRequest, getAdminToken } from "@/lib/admin-api";
import { ImageUploadField } from "@/components/admin/image-upload-field";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type CertificateSettings = {
  signatureName: string;
  signatureTitle: string;
  signatureImage: string;
  organizationName: string;
};

const emptySettings: CertificateSettings = {
  signatureName: "",
  signatureTitle: "",
  signatureImage: "",
  organizationName: "AtiSunya Edutech",
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10";
const labelClass = "text-sm font-semibold text-navy";

export default function CertificateSettingsPage() {
  const [values, setValues] = useState<CertificateSettings>(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    adminApiRequest<{ settings: CertificateSettings }>("/settings/certificate")
      .then((data) => setValues({ ...emptySettings, ...data.settings }))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load settings."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await adminApiRequest("/settings/certificate", {
        method: "PUT",
        body: JSON.stringify(values),
      });
      setSuccess("Certificate settings saved. New certificates will use these details.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  async function handlePreview() {
    setPreviewing(true);
    setError("");
    try {
      const token = getAdminToken();
      const response = await fetch(`${API_URL}/admin/settings/certificate/preview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Could not generate preview.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate preview.");
    } finally {
      setPreviewing(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-navy-400">Loading certificate settings...</p>;
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Award className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-navy">Certificate Settings</h1>
          <p className="mt-1 text-sm text-navy-400">
            Control the signature and issuer details printed on every certificate — no code changes needed.
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}
      {success && (
        <p className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
        <div>
          <label className={labelClass}>Signature name</label>
          <input
            required
            value={values.signatureName}
            onChange={(e) => setValues({ ...values, signatureName: e.target.value })}
            className={inputClass}
            placeholder="e.g. Sangeeta"
          />
        </div>

        <div>
          <label className={labelClass}>Signature title / designation</label>
          <input
            value={values.signatureTitle}
            onChange={(e) => setValues({ ...values, signatureTitle: e.target.value })}
            className={inputClass}
            placeholder="e.g. Founder & Director"
          />
        </div>

        <ImageUploadField
          label="Signature image (optional — a scanned/handwritten signature looks best)"
          value={values.signatureImage}
          onChange={(url) => setValues({ ...values, signatureImage: url })}
          folder="atisunya/certificates"
        />

        <div>
          <label className={labelClass}>Organization name</label>
          <input
            value={values.organizationName}
            onChange={(e) => setValues({ ...values, organizationName: e.target.value })}
            className={inputClass}
            placeholder="AtiSunya Edutech"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-navy-100 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save settings"}
          </button>
          <button
            type="button"
            onClick={handlePreview}
            disabled={previewing}
            className="inline-flex items-center gap-2 rounded-xl border border-navy-100 px-5 py-2.5 text-sm font-bold text-navy transition hover:bg-mist-50 disabled:opacity-50"
          >
            {previewing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
            {previewing ? "Generating..." : "Preview sample certificate"}
          </button>
        </div>
      </form>

      <div className="mt-6 flex max-w-2xl items-start gap-3 rounded-2xl border border-navy-100 bg-mist-50 p-5 text-sm text-navy-500">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
        <p>
          Every certificate is generated fresh at download time with a QR code and Certificate ID that anyone
          can check on the public{" "}
          <span className="font-semibold text-navy">Verify Certificate</span> page — so changes you save here
          apply instantly to every certificate issued from now on.
        </p>
      </div>

      <div className="mt-8 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Palette className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-navy">Design reference (Adobe Express)</h2>
            <p className="mt-0.5 text-sm text-navy-400">
              A static design preview for visual inspiration only — it is not connected to certificate
              generation. Certificates are always produced by the live template above, using the settings you
              save here.
            </p>
          </div>
        </div>

        <div
          className="relative mt-4 w-full overflow-hidden rounded-2xl border border-navy-100 shadow-soft"
          style={{ height: 0, paddingTop: "56%" }}
        >
          <iframe
            src="https://new.express.adobe.com/embedLink/urn:aaid:sc:AP:3161afa5-3e17-509f-bdce-45afe33107d5?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other"
            loading="lazy"
            allowFullScreen
            allow="clipboard-write; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
