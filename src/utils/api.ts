import { BACKEND_URL } from "../hooks/useInitializeApp";

const API_KEY = import.meta.env.VITE_API_KEY as string;

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BACKEND_URL}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(API_KEY && { "x-api-key": API_KEY }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[api] ${res.status} ${res.statusText}`, body);
    throw new Error(`${res.status} ${res.statusText}: ${body}`);
  }

  const data: T = await res.json();
  return data;
}
