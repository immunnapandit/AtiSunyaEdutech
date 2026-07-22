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

export function createUploadSignature({ folder = "atisunya" } = {}) {
  ensureConfigured();

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { folder, timestamp };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, env.cloudinary.apiSecret);

  return {
    cloudName: env.cloudinary.cloudName,
    apiKey: env.cloudinary.apiKey,
    timestamp,
    folder,
    signature,
    uploadUrl: `https://api.cloudinary.com/v1_1/${env.cloudinary.cloudName}/auto/upload`
  };
}

export async function deleteAsset(publicId) {
  ensureConfigured();
  return cloudinary.uploader.destroy(publicId, { invalidate: true });
}
