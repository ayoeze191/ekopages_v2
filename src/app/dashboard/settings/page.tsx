"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Panel } from "@/components/dashboard/DashboardShell";
import { api, ApiError } from "@/lib/api";

const fieldClass =
  "w-full rounded-[10px] border border-[#CCB4DD] bg-white px-4 py-3 font-['Lato'] text-[15px] text-[#1e0a39] outline-none placeholder:text-[#918993] focus:border-[#5A0C91]";
const labelClass = "mb-2 block font-['Lato'] text-[14px] font-bold text-[#1F0A33]";
const buttonClass =
  "inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#5A0C91] px-6 font-['Lato'] text-[14px] font-bold text-white disabled:opacity-70";

function Feedback({ messages, tone }: { messages: string[]; tone: "ok" | "error" }) {
  if (messages.length === 0) return null;
  return (
    <motion.ul
      className={`mt-4 rounded-[10px] px-4 py-3 font-['Lato'] text-[13px] leading-[20px] ${
        tone === "ok" ? "bg-[#e7f5ec] text-[#247b53]" : "bg-[#fdeaea] text-[#9b1c1c]"
      }`}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      role="status"
    >
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </motion.ul>
  );
}

export default function SettingsPage() {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState({ first_name: "", last_name: "", username: "" });
  const [profileState, setProfileState] = useState<{ ok: string[]; error: string[] }>({ ok: [], error: [] });
  const [savingProfile, setSavingProfile] = useState(false);

  const [passwords, setPasswords] = useState({ new_password1: "", new_password2: "" });
  const [passwordState, setPasswordState] = useState<{ ok: string[]; error: string[] }>({ ok: [], error: [] });
  const [savingPassword, setSavingPassword] = useState(false);

  // Prefill from the signed-in user once it arrives; deferred so the state
  // update doesn't cascade a render from inside the effect.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    const prefill = async () => {
      await Promise.resolve();
      if (cancelled) return;
      setProfile({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        username: user.username ?? "",
      });
    };

    void prefill();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingProfile(true);
    setProfileState({ ok: [], error: [] });
    try {
      await api("auth/user/", { method: "PATCH", body: profile, auth: true });
      await refreshUser();
      setProfileState({ ok: ["Profile updated."], error: [] });
    } catch (error) {
      setProfileState({
        ok: [],
        error: error instanceof ApiError ? error.messages : ["Could not update your profile."],
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (passwords.new_password1 !== passwords.new_password2) {
      setPasswordState({ ok: [], error: ["The two passwords do not match."] });
      return;
    }
    setSavingPassword(true);
    setPasswordState({ ok: [], error: [] });
    try {
      await api("auth/password/change/", { method: "POST", body: passwords, auth: true });
      setPasswords({ new_password1: "", new_password2: "" });
      setPasswordState({ ok: ["Password changed."], error: [] });
    } catch (error) {
      setPasswordState({
        ok: [],
        error: error instanceof ApiError ? error.messages : ["Could not change your password."],
      });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Panel title="Profile">
        <form className="flex flex-col gap-5" onSubmit={saveProfile}>
          <div className="grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
            <div>
              <label className={labelClass} htmlFor="first_name">First name</label>
              <input
                className={fieldClass}
                id="first_name"
                value={profile.first_name}
                onChange={(event) => setProfile({ ...profile, first_name: event.target.value })}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="last_name">Last name</label>
              <input
                className={fieldClass}
                id="last_name"
                value={profile.last_name}
                onChange={(event) => setProfile({ ...profile, last_name: event.target.value })}
              />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="username">Username</label>
            <input
              className={fieldClass}
              id="username"
              value={profile.username}
              onChange={(event) => setProfile({ ...profile, username: event.target.value })}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">Email address</label>
            <input className={`${fieldClass} opacity-70`} id="email" value={user?.email ?? ""} readOnly />
            <p className="mt-2 font-['Lato'] text-[12px] text-[#6b646a]">
              Email changes are handled by our team — write to sales@ekopages.com.
            </p>
          </div>
          <div>
            <button className={buttonClass} type="submit" disabled={savingProfile}>
              {savingProfile ? "Saving…" : "Save changes"}
            </button>
          </div>
          <Feedback messages={profileState.ok} tone="ok" />
          <Feedback messages={profileState.error} tone="error" />
        </form>
      </Panel>

      <Panel title="Password">
        <form className="flex flex-col gap-5" onSubmit={savePassword}>
          <div className="grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
            <div>
              <label className={labelClass} htmlFor="new_password1">New password</label>
              <input
                className={fieldClass}
                id="new_password1"
                type="password"
                autoComplete="new-password"
                value={passwords.new_password1}
                onChange={(event) => setPasswords({ ...passwords, new_password1: event.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="new_password2">Confirm new password</label>
              <input
                className={fieldClass}
                id="new_password2"
                type="password"
                autoComplete="new-password"
                value={passwords.new_password2}
                onChange={(event) => setPasswords({ ...passwords, new_password2: event.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <button className={buttonClass} type="submit" disabled={savingPassword}>
              {savingPassword ? "Saving…" : "Change password"}
            </button>
          </div>
          <Feedback messages={passwordState.ok} tone="ok" />
          <Feedback messages={passwordState.error} tone="error" />
        </form>
      </Panel>
    </div>
  );
}
