"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { clearSession, getAccessToken, getStoredUser, storeSession, type EkoUser } from "@/lib/session";

export type AuthStatus = "loading" | "authenticated" | "anonymous";

export type RegisterInput = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password1: string;
  password2: string;
  referral_code?: string;
};

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  access_token_expiration?: string;
  user: EkoUser;
};

type AuthValue = {
  user: EkoUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  /** Resolves true when the API signed the user straight in, false when it wants email verification. */
  register: (input: RegisterInput) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<EkoUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const refreshUser = useCallback(async () => {
    try {
      const fresh = await api<EkoUser>("auth/user/", { auth: true });
      setUser(fresh);
      storeSession({ access: getAccessToken() ?? "", user: fresh });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearSession();
        setUser(null);
        setStatus("anonymous");
      }
    }
  }, []);

  // Restore an existing session on load, then confirm it against the API.
  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      const hasToken = Boolean(getAccessToken());
      const stored = getStoredUser();
      // Yield first: setting state synchronously here would cascade an extra render.
      await Promise.resolve();
      if (cancelled) return;
      if (!hasToken) {
        setStatus("anonymous");
        return;
      }
      setUser(stored);
      setStatus("authenticated");
      await refreshUser();
    };

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, [refreshUser]);

  const login = useCallback(async (credentials: { username: string; password: string }) => {
    const data = await api<LoginResponse>("auth/login/", { method: "POST", body: credentials });
    storeSession({
      access: data.access_token,
      refresh: data.refresh_token,
      expiry: data.access_token_expiration ?? null,
      user: data.user,
    });
    setUser(data.user);
    setStatus("authenticated");
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const data = await api<Partial<LoginResponse>>("registration/", { method: "POST", body: input });
    if (data?.access_token && data.user) {
      storeSession({
        access: data.access_token,
        refresh: data.refresh_token,
        expiry: data.access_token_expiration ?? null,
        user: data.user,
      });
      setUser(data.user);
      setStatus("authenticated");
      return true;
    }
    // The backend sent a confirmation email instead of signing them in.
    return false;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api("auth/logout/", { method: "POST", auth: true });
    } catch {
      // Logging out locally matters more than the server acknowledging it.
    }
    clearSession();
    setUser(null);
    setStatus("anonymous");
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      status,
      isAuthenticated: status === "authenticated",
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, status, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}

export function displayName(user: EkoUser | null): string {
  if (!user) return "";
  return user.first_name?.trim() || user.username || user.email.split("@")[0];
}
