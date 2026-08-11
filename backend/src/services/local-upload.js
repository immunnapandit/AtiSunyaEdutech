import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadsRoot = path.resolve(__dirname, "../../uploads");

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf"
]);

export async function saveLocalUpload(req, { folder = "atisunya" } = {}) {
  const contentType = req.headers["content-type"] || "";
  const boundary = getBoundary(contentType);

  if (!boundary) {
    const error = new Error("Upload must use multipart/form-data.");
    error.statusCode = 400;
    throw error;
  }

  const body = await readRequestBody(req);
  const filePart = parseMultipart(body, boundary).find((part) => part.filename);

  if (!filePart) {
    const error = new Error("No file was uploaded.");
    error.statusCode = 400;
    throw error;
  }

  if (!ALLOWED_MIME_TYPES.has(filePart.contentType)) {
    const error = new Error("Only images and PDF files can be uploaded.");
    error.statusCode = 400;
    throw error;
  }

  const uploadFolder = sanitizePathSegment(folder);
  const extension = getSafeExtension(filePart.filename, filePart.contentType);
  const publicId = `${uploadFolder}/${Date.now()}-${nanoid(8)}`;
  const relativePath = `${publicId}${extension}`;
  const absolutePath = path.join(uploadsRoot, relativePath);

  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, filePart.data);

  return {
    publicId,
    relativePath: relativePath.replaceAll("\\", "/"),
    format: extension.replace(".", ""),
    bytes: filePart.data.length,
    originalFilename: filePart.filename
  };
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_UPLOAD_BYTES) {
        req.destroy();
        const error = new Error("Upload file is too large. Maximum size is 25MB.");
        error.statusCode = 413;
        reject(error);
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function parseMultipart(body, boundary) {
  const boundaryBuffer = Buffer.from(`--${boundary}`);
  const parts = [];
  let start = body.indexOf(boundaryBuffer);

  while (start !== -1) {
    start += boundaryBuffer.length;
    if (body[start] === 45 && body[start + 1] === 45) break;
    if (body[start] === 13 && body[start + 1] === 10) start += 2;

    const next = body.indexOf(boundaryBuffer, start);
    if (next === -1) break;

    let part = body.subarray(start, next);
    if (part.at(-2) === 13 && part.at(-1) === 10) {
      part = part.subarray(0, -2);
    }

    const headerEnd = part.indexOf(Buffer.from("\r\n\r\n"));
    if (headerEnd !== -1) {
      const headers = part.subarray(0, headerEnd).toString("utf8");
      const data = part.subarray(headerEnd + 4);
      const disposition = /content-disposition:\s*form-data;([^\r\n]+)/i.exec(headers)?.[1] || "";
      const filename = /filename="([^"]*)"/i.exec(disposition)?.[1];
      const contentType = /content-type:\s*([^\r\n]+)/i.exec(headers)?.[1]?.trim().toLowerCase();

      parts.push({
        filename: filename ? path.basename(filename) : "",
        contentType: contentType || "application/octet-stream",
        data
      });
    }

    start = next;
  }

  return parts;
}

function getBoundary(contentType) {
  return /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType)?.[1] || /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType)?.[2];
}

function sanitizePathSegment(value) {
  return String(value || "atisunya")
    .replace(/[^a-zA-Z0-9/_-]/g, "")
    .replace(/^\/+|\/+$/g, "") || "atisunya";
}

function getSafeExtension(filename, contentType) {
  const extension = path.extname(filename).toLowerCase();
  if (extension && /^[a-z0-9.]+$/.test(extension)) return extension;

  if (contentType === "application/pdf") return ".pdf";
  if (contentType === "image/svg+xml") return ".svg";
  return `.${contentType.split("/")[1] || "bin"}`;
}
