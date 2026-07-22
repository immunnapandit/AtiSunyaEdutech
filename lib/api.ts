const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type ApiOptions = RequestInit & {
  token?: string | null;
};

export async function apiRequest<T>(
  path: string,
  { token, headers, ...options }: ApiOptions = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: options.cache ?? "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed. Please try again.");
  }

  return data as T;
}

export function formToObject(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form).entries());
}
