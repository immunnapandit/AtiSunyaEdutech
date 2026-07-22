const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
const ADMIN_TOKEN_KEY = "atisunya_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
}

type AdminRequestOptions = RequestInit & { skipAuthRedirect?: boolean };

export async function adminApiRequest<T>(path: string, options: AdminRequestOptions = {}): Promise<T> {
  const { skipAuthRedirect, headers, ...rest } = options;
  const token = getAdminToken();

  const response = await fetch(`${API_URL}/admin${path}`, {
    cache: "no-store",
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if ((response.status === 401 || response.status === 403) && !skipAuthRedirect) {
    clearAdminToken();
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed. Please try again.");
  }

  return data as T;
}
