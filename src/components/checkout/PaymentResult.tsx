"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useCart } from "@/components/cart/CartProvider";
import { verifyPayment } from "@/lib/checkout";
import { getGuestSessionId } from "@/lib/session";

type State = "verifying" | "confirmed" | "failed" | "missing";

export function PaymentResult() {
  const { isAuthenticated, status } = useAuth();
  const { refresh } = useCart();
  const searchParams = useSearchParams();
  // Paystack sends back both; either identifies the transaction.
  const reference = searchParams.get("reference") ?? searchParams.get("trxref");
  const [state, setState] = useState<State>(reference ? "verifying" : "missing");

  useEffect(() => {
    if (!reference || status === "loading") return;
    let cancelled = false;

    const verify = async () => {
      try {
        await verifyPayment(isAuthenticated, getGuestSessionId(), reference);
        if (cancelled) return;
        setState("confirmed");
        await refresh();
      } catch {
        if (!cancelled) setState("failed");
      }
    };

    void verify();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, reference, refresh, status]);

  const copy: Record<State, { title: string; body: string }> = {
    verifying: { title: "Confirming your payment…", body: "This only takes a moment." },
    confirmed: {
      title: "Payment confirmed",
      body: "Thank you! Your order is on its way and a receipt is in your inbox.",
    },
    failed: {
      title: "We couldn't confirm that payment",
      body: "If you were charged, email sales@ekopages.com with your reference and we'll sort it out.",
    },
    missing: {
      title: "No payment reference",
      body: "This page confirms an order after payment. Head back to the store to start one.",
    },
  };

  return (
    <motion.div
      className="mx-auto max-w-[620px] rounded-[20px] border border-[#e8e3db] bg-white px-8 py-12 text-center shadow-[0_7px_16px_rgb(50_32_18_/_8%)]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {state === "confirmed" && (
        <motion.span
          className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-[#EFE7F4] text-[#5A0C91]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
          aria-hidden="true"
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </motion.span>
      )}
      <h2 className="font-['Baloo_2'] text-[24px] leading-tight font-bold text-[#1F0A33]">
        {copy[state].title}
      </h2>
      <p className="mt-3 font-['Lato'] text-[15px] leading-[26px] text-[#4A4A4A]">{copy[state].body}</p>
      {reference && (
        <p className="mt-2 font-['Lato'] text-[13px] text-[#6b646a]">Reference: {reference}</p>
      )}
      <div className="mt-7 flex justify-center gap-3 max-[560px]:flex-col">
        <Link
          className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#5A0C91] px-[26px] font-['Lato'] text-[15px] font-bold text-white"
          href={isAuthenticated ? "/dashboard/orders" : "/store"}
        >
          {isAuthenticated ? "View my orders" : "Back to the store"}
        </Link>
        <Link
          className="inline-flex min-h-[50px] items-center justify-center rounded-full border-[2px] border-[#5A0C91] px-[26px] font-['Lato'] text-[15px] font-bold text-[#5A0C91]"
          href="/store"
        >
          Keep shopping
        </Link>
      </div>
    </motion.div>
  );
}
