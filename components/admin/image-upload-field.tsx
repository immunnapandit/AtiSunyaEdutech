"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { FileText, ImagePlus, Loader2, X } from "lucide-react";
import { adminApiRequest, getAdminToken } from "@/lib/admin-api";

type SignatureResponse = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  resourceType: "image" | "raw" | "video" | "auto";
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

type LocalUploadResponse = {
  publicId: string;
  url: string;
  format?: string;
  bytes?: number;
  resourceType?: "image" | "raw" | "video" | "auto";
  originalFilename?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export function ImageUploadField({
  label,
  value,
  onChange,
  folder = "atisunya",
  accept = "image/*",
  mediaType = "image",
  pastePlaceholder,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
  mediaType?: "image" | "pdf";
  pastePlaceholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const isPdf = mediaType === "pdf";

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (isPdf && file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a PDF file.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setUploading(true);
    setError("");

    try {
      const signature = await adminApiRequest<SignatureResponse>("/media/sign", {
        method: "POST",
        body: JSON.stringify({ folder, resourceType: isPdf ? "image" : "auto" }),
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
        throw new Error(uploadData.error?.message || `${isPdf ? "PDF" : "Image"} upload failed.`);
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
          resourceType: signature.resourceType,
          originalFilename: uploadData.original_filename,
        }),
      }).catch(() => {});
    } catch (err) {
      const message = err instanceof Error ? err.message : `${isPdf ? "PDF" : "Image"} upload failed.`;
      if (isCloudinaryConfigError(message)) {
        try {
          await uploadLocally(file);
        } catch (localUploadError) {
          setError(
            localUploadError instanceof Error
              ? localUploadError.message
              : `${isPdf ? "PDF" : "Image"} upload failed.`
          );
        }
      } else {
        setError(message);
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function uploadLocally(file: File) {
    const token = getAdminToken();
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/admin/media/upload?folder=${encodeURIComponent(folder)}`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const uploadData: LocalUploadResponse | { message?: string } = await response.json().catch(() => ({}));

    if (!response.ok || !("url" in uploadData)) {
      const errorMessage = "message" in uploadData ? uploadData.message : "";
      throw new Error(errorMessage || `${isPdf ? "PDF" : "Image"} upload failed.`);
    }

    onChange(uploadData.url);

    await adminApiRequest("/media", {
      method: "POST",
      body: JSON.stringify({
        publicId: uploadData.publicId,
        url: uploadData.url,
        format: uploadData.format,
        bytes: uploadData.bytes,
        folder,
        resourceType: uploadData.resourceType || "image",
        originalFilename: uploadData.originalFilename,
      }),
    }).catch(() => {});
  }

  return (
    <div>
      <label className="text-sm font-semibold text-navy">{label}</label>
      <div className="mt-1.5 flex items-start gap-4">
        {value ? (
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-navy-100 bg-mist-50">
            {isPdf ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-2 text-center text-navy-500">
                <FileText className="h-6 w-6 text-brand" />
                <span className="line-clamp-2 break-all text-[10px] font-semibold">
                  {getFileName(value)}
                </span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="h-full w-full object-cover" />
            )}
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label={`Remove ${isPdf ? "PDF" : "image"}`}
              className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-red-600 shadow-sm hover:bg-white"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded-lg border border-dashed border-navy-200 bg-mist-50 text-navy-300">
            {isPdf ? <FileText className="h-6 w-6" /> : <ImagePlus className="h-6 w-6" />}
          </div>
        )}

        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
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
          {!error && (
            <p className="mt-2 text-xs font-medium text-navy-400">
              {isPdf ? "Upload a PDF or paste a PDF URL below." : "Upload a file or paste a URL below."}
            </p>
          )}
          {isPdf && value && (
            <p className="mt-2 text-xs font-semibold text-navy-500">
              Uploaded file: {getFileName(value)}
            </p>
          )}
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={pastePlaceholder ?? `Or paste a ${isPdf ? "PDF" : "image"} URL`}
            className="mt-2 w-full rounded-lg border border-navy-100 bg-white px-3 py-2 text-xs text-navy outline-none focus:border-brand"
          />
        </div>
      </div>
    </div>
  );
}

function getFileName(url: string) {
  try {
    const path = new URL(url).pathname;
    const name = path.split("/").filter(Boolean).pop();
    return name ? decodeURIComponent(name) : "Uploaded PDF";
  } catch {
    const name = url.split("?")[0]?.split("/").filter(Boolean).pop();
    return name ? decodeURIComponent(name) : "Uploaded PDF";
  }
}

function isCloudinaryConfigError(message: string) {
  return /cloudinary is not configured|cloud_name is disabled|CLOUDINARY_/i.test(message);
}
