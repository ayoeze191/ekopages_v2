"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { displayName, useAuth } from "@/components/auth/AuthProvider";
import { EASE_OUT } from "@/components/motion/Reveal";

const menuLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My courses", href: "/dashboard/courses" },
  { label: "My orders", href: "/dashboard/orders" },
  { label: "Settings", href: "/dashboard/settings" },
];

export function AccountMenu() {
  const { status, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Hold the slot while we read localStorage, so the header doesn't jump.
  if (status === "loading") {
    return <div className="h-8 w-[120px] justify-self-end max-[700px]:hidden" aria-hidden="true" />;
  }

  if (status === "anonymous") {
    return (
      <Link
        className="justify-self-end rounded-full border-[2px] border-[#5A0C91] px-[18px] py-2 font-['Lato'] text-[14px] font-bold text-[#5A0C91] transition hover:-translate-y-0.5 max-[700px]:hidden"
        href="/login"
      >
        Sign in
      </Link>
    );
  }

  const name = displayName(user);

  return (
    <div className="relative justify-self-end max-[700px]:hidden" ref={containerRef}>
      <button
        className="flex items-center gap-2 border-0 bg-transparent p-0"
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span
          className="inline-grid aspect-square h-8 w-8 place-items-center rounded-full bg-[#620a9d] text-xs font-bold text-white uppercase"
          aria-hidden="true"
        >
          {name.charAt(0)}
        </span>
        <span className="font-['Lato'] text-[14px] font-bold text-[#232323]">Hello, {name}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 z-50 mt-3 w-[200px] overflow-hidden rounded-[14px] border border-[#e8e3db] bg-white py-2 shadow-[0_18px_30px_rgb(31_10_51_/_12%)]"
            role="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            {menuLinks.map((link) => (
              <Link
                className="block px-4 py-2.5 font-['Lato'] text-[14px] text-[#1F0A33] transition-colors hover:bg-[#f6f1fa]"
                href={link.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
            <button
              className="mt-1 block w-full border-t border-[#e8e3db] px-4 pt-3 pb-2 text-left font-['Lato'] text-[14px] font-bold text-[#5A0C91]"
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                void logout();
              }}
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
