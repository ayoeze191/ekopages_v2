"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function VerifyEmail({ token }: { token: string }) {
  const [state, setState] = useState<"verifying" | "done" | "failed">("verifying");

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      try {
        await api("registration/verify-email/", { method: "POST", body: { key: token } });
        if (!cancelled) setState("done");
      } catch {
        if (!cancelled) setState("failed");
      }
    };

    void verify();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const copy = {
    verifying: { title: "Confirming your email…", body: "One moment." },
    done: { title: "Email confirmed", body: "You can sign in and start learning." },
    failed: {
      title: "That link didn't work",
      body: "It may have expired or already been used. Try signing in, or request a new link.",
    },
  }[state];

  return (
    <motion.div
      className="mx-auto max-w-[560px] rounded-[20px] border border-[#e8e3db] bg-white px-8 py-12 text-center shadow-[0_7px_16px_rgb(50_32_18_/_8%)]"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="font-['Baloo_2'] text-[22px] font-bold text-[#1F0A33]">{copy.title}</h2>
      <p className="mt-3 font-['Lato'] text-[15px] leading-[26px] text-[#4A4A4A]">{copy.body}</p>
      <Link
        className="mt-7 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#5A0C91] px-[26px] font-['Lato'] text-[15px] font-bold text-white"
        href="/login"
      >
        Go to sign in
      </Link>
    </motion.div>
  );
}
