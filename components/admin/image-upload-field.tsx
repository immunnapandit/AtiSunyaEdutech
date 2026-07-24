"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { adminApiRequest } from "@/lib/admin-api";

type SignatureResponse = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
  uploadUrl: string;
};

type CloudinaryUploadResponse = {
  secure_url: string;
  public_id: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  original_filename?: string;
  error?: { message: string };
};

export function ImageUploadField({
  label,
  value,
  onChange,
  folder = "atisunya",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const signature = await adminApiRequest<SignatureResponse>("/media/sign", {
        method: "POST",
        body: JSON.stringify({ folder }),
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signature.apiKey);
      formData.append("timestamp", String(signature.timestamp));
      formData.append("signature", signature.signature);
      formData.append("folder", signature.folder);

      const uploadResponse = await fetch(signature.uploadUrl, {
        method: "POST",
        body: formData,
      });
      const uploadData: CloudinaryUploadResponse = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error?.message || "Image upload failed.");
      }

      onChange(uploadData.secure_url);

      await adminApiRequest("/media", {
        method: "POST",
        body: JSON.stringify({
          publicId: uploadData.public_id,
          url: uploadData.secure_url,
          format: uploadData.format,
          bytes: uploadData.bytes,
          width: uploadData.width,
          height: uploadData.height,
          folder: signature.folder,
          originalFilename: uploadData.original_filename,
        }),
      }).catch(() => {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="text-sm font-semibold text-navy">{label}</label>
      <div className="mt-1.5 flex items-start gap-4">
        {value ? (
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-navy-100 bg-mist-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label="Remove image"
              className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-red-600 shadow-sm hover:bg-white"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded-lg border border-dashed border-navy-200 bg-mist-50 text-navy-300">
            <ImagePlus className="h-6 w-6" />
          </div>
        )}

        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="block w-full text-sm text-navy-500 file:mr-4 file:rounded-lg file:border-0 file:bg-brand/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand/20"
          />
          {uploading && (
            <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-navy-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading...
            </p>
          )}
          {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Or paste an image URL"
            className="mt-2 w-full rounded-lg border border-navy-100 bg-white px-3 py-2 text-xs text-navy outline-none focus:border-brand"
          />
        </div>
      </div>
    </div>
  );
}
