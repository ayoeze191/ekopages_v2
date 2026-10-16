/**
 * Browser-side session storage, mirroring v1's keys so an existing v1 login
 * keeps working: eko_access / eko_refresh / eko_user, plus the eko_session_id
 * cookie that identifies a guest's cart.
 */
export const ACCESS_KEY = "eko_access";
export const REFRESH_KEY = "eko_refresh";
export const USER_KEY = "eko_user";
export const EXPIRY_KEY = "eko_exp";
export const GUEST_COOKIE = "eko_session_id";

export type EkoUser = {
  pk?: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string | null;
};

const canUseStorage = () => typeof window !== "undefined";

function read(key: string): string | null {
  if (!canUseStorage()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  if (!canUseStorage()) return;
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage — the session just won't persist.
  }
}

export const getAccessToken = () => read(ACCESS_KEY);
export const getRefreshToken = () => read(REFRESH_KEY);
export const getTokenExpiry = () => read(EXPIRY_KEY);

export function getStoredUser(): EkoUser | null {
  const raw = read(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as EkoUser;
  } catch {
    return null;
  }
}

export function storeSession(tokens: {
  access: string;
  refresh?: string;
  expiry?: string | null;
  user?: EkoUser | null;
}) {
  write(ACCESS_KEY, tokens.access);
  if (tokens.refresh) write(REFRESH_KEY, tokens.refresh);
  if (tokens.expiry !== undefined) write(EXPIRY_KEY, tokens.expiry);
  if (tokens.user !== undefined) write(USER_KEY, tokens.user ? JSON.stringify(tokens.user) : null);
}

export function clearSession() {
  [ACCESS_KEY, REFRESH_KEY, USER_KEY, EXPIRY_KEY].forEach((key) => write(key, null));
}

/**
 * Guests get a random id in a cookie; the unregistered-cart endpoints key a
 * basket off it, exactly as v1 did.
 */
export function getGuestSessionId(): string {
  if (!canUseStorage()) return "";
  const existing = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${GUEST_COOKIE}=`))
    ?.split("=")[1];
  if (existing) return existing;

  const id = Array.from(crypto.getRandomValues(new Uint8Array(12)))
    .map((byte) => byte.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 15);
  const expires = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${GUEST_COOKIE}=${id}; path=/; expires=${expires}; SameSite=Lax`;
  return id;
}
