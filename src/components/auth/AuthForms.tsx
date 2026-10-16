"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { EASE_OUT } from "@/components/motion/Reveal";
import { ApiError } from "@/lib/api";

const fieldClass =
  "w-full rounded-[10px] border border-[#CCB4DD] bg-white px-4 py-3 font-['Lato'] text-[15px] text-[#1e0a39] outline-none placeholder:text-[#918993] focus:border-[#5A0C91]";
const labelClass = "mb-2 block font-['Lato'] text-[14px] font-bold text-[#1F0A33]";

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <input
        className={fieldClass}
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        required
      />
    </div>
  );
}

function Errors({ messages }: { messages: string[] }) {
  if (messages.length === 0) return null;
  return (
    <motion.ul
      className="rounded-[10px] bg-[#fdeaea] px-4 py-3 font-['Lato'] text-[13px] leading-[20px] text-[#9b1c1c]"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      role="alert"
    >
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </motion.ul>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <motion.button
      className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#5A0C91] px-[26px] font-['Lato'] text-[15px] font-bold text-white shadow-[0_8px_14px_rgb(79_0_124_/_22%)] disabled:opacity-70"
      type="submit"
      disabled={loading}
      whileHover={loading ? undefined : { y: -2 }}
      whileTap={loading ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
    >
      {loading ? "Please wait…" : label}
    </motion.button>
  );
}

export function AuthForms() {
  const { login, register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const [signIn, setSignIn] = useState({ username: "", password: "" });
  const [signUp, setSignUp] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handle = async (action: () => Promise<void>) => {
    setLoading(true);
    setErrors([]);
    setNotice(null);
    try {
      await action();
    } catch (error) {
      setErrors(error instanceof ApiError ? error.messages : ["Something went wrong. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const onSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    void handle(async () => {
      await login(signIn);
      router.push(next);
    });
  };

  const onSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    if (signUp.password1 !== signUp.password2) {
      setErrors(["The two passwords do not match."]);
      return;
    }
    void handle(async () => {
      const signedIn = await register(signUp);
      if (signedIn) router.push(next);
      else setNotice("Check your inbox — we've sent a link to confirm your email address.");
    });
  };

  return (
    <div className="rounded-[20px] border border-[#e8e3db] bg-white p-8 shadow-[0_7px_16px_rgb(50_32_18_/_8%)] max-[700px]:p-6">
      <div className="relative mb-7 flex gap-1 rounded-full bg-[#f3eef8] p-1">
        {(["signin", "signup"] as const).map((value) => (
          <button
            className="relative flex-1 rounded-full py-2.5 font-['Lato'] text-[14px] font-bold"
            type="button"
            aria-pressed={mode === value}
            onClick={() => {
              setMode(value);
              setErrors([]);
              setNotice(null);
            }}
            key={value}
          >
            {mode === value && (
              <motion.span
                className="absolute inset-0 rounded-full bg-white shadow-[0_2px_8px_rgb(31_10_51_/_10%)]"
                layoutId="auth-tab"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                aria-hidden="true"
              />
            )}
            <span className={`relative ${mode === value ? "text-[#5A0C91]" : "text-[#6b646a]"}`}>
              {value === "signin" ? "Sign in" : "Create account"}
            </span>
          </button>
        ))}
      </div>

      {notice && (
        <p className="mb-5 rounded-[10px] bg-[#EFE7F4] px-4 py-3 font-['Lato'] text-[13px] leading-[20px] text-[#5A0C91]">
          {notice}
        </p>
      )}

      <AnimatePresence mode="wait">
        {mode === "signin" ? (
          <motion.form
            className="flex flex-col gap-5"
            key="signin"
            onSubmit={onSignIn}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            <Errors messages={errors} />
            <Field
              id="username"
              label="Username"
              value={signIn.username}
              onChange={(value) => setSignIn({ ...signIn, username: value })}
              placeholder="Your username"
              autoComplete="username"
            />
            <Field
              id="password"
              label="Password"
              type="password"
              value={signIn.password}
              onChange={(value) => setSignIn({ ...signIn, password: value })}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <SubmitButton loading={loading} label="Sign in" />
            <p className="font-['Lato'] text-[13px] text-[#6b646a]">
              Forgot your password?{" "}
              <Link className="font-bold text-[#5A0C91] underline" href="/reset-password">
                Reset it here
              </Link>
              .
            </p>
          </motion.form>
        ) : (
          <motion.form
            className="flex flex-col gap-5"
            key="signup"
            onSubmit={onSignUp}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            <Errors messages={errors} />
            <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
              <Field
                id="first_name"
                label="First name"
                value={signUp.first_name}
                onChange={(value) => setSignUp({ ...signUp, first_name: value })}
                placeholder="Ada"
                autoComplete="given-name"
              />
              <Field
                id="last_name"
                label="Last name"
                value={signUp.last_name}
                onChange={(value) => setSignUp({ ...signUp, last_name: value })}
                placeholder="Obi"
                autoComplete="family-name"
              />
            </div>
            <Field
              id="signup_username"
              label="Username"
              value={signUp.username}
              onChange={(value) => setSignUp({ ...signUp, username: value })}
              placeholder="adaobi"
              autoComplete="username"
            />
            <Field
              id="email"
              label="Email address"
              type="email"
              value={signUp.email}
              onChange={(value) => setSignUp({ ...signUp, email: value })}
              placeholder="example@gmail.com"
              autoComplete="email"
            />
            <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
              <Field
                id="password1"
                label="Password"
                type="password"
                value={signUp.password1}
                onChange={(value) => setSignUp({ ...signUp, password1: value })}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <Field
                id="password2"
                label="Confirm password"
                type="password"
                value={signUp.password2}
                onChange={(value) => setSignUp({ ...signUp, password2: value })}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
            <SubmitButton loading={loading} label="Create account" />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
