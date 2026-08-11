export function getCloudinaryPdfDownloadUrl(url: string) {
  if (!url || !isCloudinaryPdfUrl(url)) return url;

  try {
    const parsed = new URL(url);
    parsed.pathname = parsed.pathname.replace(
      /\/(image|raw)\/upload\/(?!fl_attachment(?:[:/,]))/,
      "/$1/upload/fl_attachment/"
    );
    return parsed.toString();
  } catch {
    return url.replace(/\/(image|raw)\/upload\/(?!fl_attachment(?:[:/,]))/, "/$1/upload/fl_attachment/");
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
