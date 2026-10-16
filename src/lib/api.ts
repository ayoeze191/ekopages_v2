import { API_BASE } from "@/lib/config";

/**
 * In the browser we go through our own /api/proxy route: the backend's CORS
 * allowlist only covers a couple of origins, so direct calls fail anywhere
 * else. On the server we talk to the API directly.
 */
const clientBase = () => (typeof window === "undefined" ? API_BASE : "/api/proxy");

/** Absolute on the server, proxied in the browser. */
export const apiUrl = (path: string) => `${clientBase()}/${path.replace(/^\//, "")}`;
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  getTokenExpiry,
  storeSession,
} from "@/lib/session";

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(status: number, payload: unknown, message?: string) {
    super(message ?? `Request failed (${status})`);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }

  /** Django/DRF returns {field: ["message"]} or {detail: "message"} — flatten it for forms. */
  get messages(): string[] {
    const payload = this.payload;
    if (typeof payload === "string") return [payload];
    if (!payload || typeof payload !== "object") return [this.message];
    const out: string[] = [];
    for (const value of Object.values(payload as Record<string, unknown>)) {
      if (typeof value === "string") out.push(value);
      else if (Array.isArray(value)) out.push(...value.map(String));
    }
    return out.length > 0 ? out : [this.message];
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** Attach the bearer token, refreshing it first when it has expired. */
  auth?: boolean;
  formData?: FormData;
};

let refreshInFlight: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    try {
      const response = await fetch(`${clientBase()}/auth/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });
      if (!response.ok) {
        clearSession();
        return null;
      }
      const data = await response.json();
      storeSession({ access: data.access, expiry: data.access_token_expiration ?? null });
      return data.access as string;
    } catch {
      return null;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

const tokenHasExpired = () => {
  const expiry = getTokenExpiry();
  if (!expiry) return false;
  const at = Date.parse(expiry);
  return Number.isFinite(at) && at <= Date.now();
};

export async function api<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false, formData } = options;
  const url = `${clientBase()}/${path.replace(/^\//, "")}`;

  const send = async (token: string | null) => {
    const headers: Record<string, string> = {};
    if (!formData) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(url, {
      method,
      headers,
      body: formData ?? (body === undefined ? undefined : JSON.stringify(body)),
      cache: "no-store",
    });
  };

  let token = auth ? getAccessToken() : null;
  if (auth && token && tokenHasExpired()) token = (await refreshAccessToken()) ?? token;

  let response = await send(token);
  // One retry: the token may have been revoked or expired without us knowing.
  if (auth && response.status === 401) {
    const fresh = await refreshAccessToken();
    if (fresh) response = await send(fresh);
  }

  const text = await response.text();
  let payload: unknown = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) throw new ApiError(response.status, payload);
  return payload as T;
}
