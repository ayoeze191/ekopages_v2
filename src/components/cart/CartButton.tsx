"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export function CartButton() {
  const { count } = useCart();

  return (
    <Link
      className="relative grid h-10 w-10 place-items-center rounded-full text-[#1F0A33] transition-colors hover:bg-[#1F0A33]/5"
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.55L20.5 8H6" />
        <circle cx="10" cy="20" r="1.3" />
        <circle cx="17.5" cy="20" r="1.3" />
      </svg>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#5A0C91] px-1 font-['Lato'] text-[11px] font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            aria-hidden="true"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
