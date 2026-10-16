"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { api, ApiError } from "@/lib/api";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState("sending");
    setErrors([]);
    try {
      await api("auth/password/reset/", { method: "POST", body: { email } });
      setState("sent");
    } catch (error) {
      setErrors(error instanceof ApiError ? error.messages : ["Could not send the reset link."]);
      setState("idle");
    }
  };

  if (state === "sent") {
    return (
      <motion.div
        className="rounded-[20px] border border-[#e8e3db] bg-white p-8 text-center shadow-[0_7px_16px_rgb(50_32_18_/_8%)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-['Baloo_2'] text-[20px] font-bold text-[#1F0A33]">Check your inbox</h2>
        <p className="mt-3 font-['Lato'] text-[15px] leading-[26px] text-[#4A4A4A]">
          If an account exists for {email}, a reset link is on its way.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      className="rounded-[20px] border border-[#e8e3db] bg-white p-8 shadow-[0_7px_16px_rgb(50_32_18_/_8%)]"
      onSubmit={onSubmit}
    >
      <label className="mb-2 block font-['Lato'] text-[14px] font-bold text-[#1F0A33]" htmlFor="reset-email">
        Email address
      </label>
      <input
        className="w-full rounded-[10px] border border-[#CCB4DD] bg-white px-4 py-3 font-['Lato'] text-[15px] text-[#1e0a39] outline-none placeholder:text-[#918993] focus:border-[#5A0C91]"
        id="reset-email"
        type="email"
        value={email}
        placeholder="example@gmail.com"
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      {errors.length > 0 && (
        <ul className="mt-4 rounded-[10px] bg-[#fdeaea] px-4 py-3 font-['Lato'] text-[13px] text-[#9b1c1c]" role="alert">
          {errors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
      <button
        className="mt-6 inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#5A0C91] font-['Lato'] text-[15px] font-bold text-white disabled:opacity-70"
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
