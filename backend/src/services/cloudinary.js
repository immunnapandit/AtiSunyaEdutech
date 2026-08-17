import { v2 as cloudinary } from "cloudinary";
import { env, isCloudinaryConfigured } from "../config/env.js";

let configured = false;

function ensureConfigured() {
  if (!isCloudinaryConfigured()) {
    const error = new Error("Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.");
    error.statusCode = 503;
    throw error;
  }

  if (!configured) {
    cloudinary.config({
      cloud_name: env.cloudinary.cloudName,
      api_key: env.cloudinary.apiKey,
      api_secret: env.cloudinary.apiSecret,
      secure: true
    });
    configured = true;
  }
}

export function createUploadSignature({ folder = "atisunya", resourceType = "auto" } = {}) {
  ensureConfigured();

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { folder, timestamp };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, env.cloudinary.apiSecret);

  return {
    cloudName: env.cloudinary.cloudName,
    apiKey: env.cloudinary.apiKey,
    timestamp,
    folder,
    resourceType,
    signature,
    uploadUrl: `https://api.cloudinary.com/v1_1/${env.cloudinary.cloudName}/${resourceType}/upload`
  };
}

export async function deleteAsset(publicId, { resourceType = "image" } = {}) {
  ensureConfigured();
  return cloudinary.uploader.destroy(publicId, { invalidate: true, resource_type: resourceType });
}

export function createSignedDownloadUrlFromCloudinaryUrl(url, { attachment = true, expiresInSeconds = 300 } = {}) {
  ensureConfigured();

  try {
    const parsed = new URL(url);
    // pathname after /upload/
    const match = parsed.pathname.match(/\/upload\/(?:v\d+\/)?(.+)$/);
    if (!match) throw new Error("Could not extract public id from Cloudinary URL");

    let publicIdWithExt = match[1];
    // remove query params if any (shouldn't be in pathname)
    // split extension
    const extMatch = publicIdWithExt.match(/(.+)\.([^.]+)$/);
    let publicId = publicIdWithExt;
    let format;
    if (extMatch) {
      publicId = extMatch[1];
      format = extMatch[2];
    }

    // decode folders
    publicId = decodeURIComponent(publicId);

    // determine resource type from path (raw for pdfs)
    const resourceType = /\.pdf$/i.test(parsed.pathname) ? "raw" : "image";

    // Use private_download_url to create a signed URL for delivery if available.
    // fall back to download_url if private_download_url is not present.
    const opts = { resource_type: resourceType };
    if (format) opts.format = format;
    if (attachment) opts.attachment = true;
    if (expiresInSeconds && typeof expiresInSeconds === "number") {
      opts.expires_at = Math.floor(Date.now() / 1000) + Number(expiresInSeconds);
    }

    if (cloudinary.utils && typeof cloudinary.utils.private_download_url === "function") {
      return cloudinary.utils.private_download_url(publicId, opts);
    }

    if (cloudinary.utils && typeof cloudinary.utils.download_url === "function") {
      return cloudinary.utils.download_url(publicId, opts);
    }

    // As a last resort, build the URL with fl_attachment parameter.
    const fallback = new URL(url);
    fallback.pathname = fallback.pathname.replace(/\/(image|raw)\/upload\/(?!fl_attachment(?:[:/,]))/, "/$1/upload/fl_attachment/");
    return fallback.toString();
  } catch (err) {
    throw err;
  }
}
