export function getCloudinaryPdfDownloadUrl(url: string) {
  const normalizedUrl = normalizeCloudinaryUrl(url);
  if (!normalizedUrl || !isCloudinaryPdfUrl(normalizedUrl)) return normalizedUrl;

  try {
    const parsed = new URL(normalizedUrl);
    parsed.pathname = parsed.pathname.replace(
      /\/(image|raw)\/upload\/(?!fl_attachment(?:[:/,]))/,
      "/$1/upload/fl_attachment/"
    );
    return parsed.toString();
  } catch {
    return normalizedUrl.replace(/\/(image|raw)\/upload\/(?!fl_attachment(?:[:/,]))/, "/$1/upload/fl_attachment/");
  }
}

export function isCloudinaryPdfUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "res.cloudinary.com" && /\.pdf(?:$|[?#])/i.test(parsed.pathname);
  } catch {
    return /res\.cloudinary\.com\/.+\.pdf(?:$|[?#])/i.test(url);
  }
}

function normalizeCloudinaryUrl(url: string) {
  return url.replace(/^https:\/\/res\.doudinary\.com\//i, "https://res.cloudinary.com/");
}
