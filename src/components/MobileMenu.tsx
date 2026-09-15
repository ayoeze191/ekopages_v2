"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { EASE_OUT } from "@/components/motion/Reveal";

type NavItem = { label: string; href: string };

const barSpring: Transition = { type: "spring", stiffness: 420, damping: 30 };

/** Hamburger + slide-down panel. Only rendered visible below the 700px mobile breakpoint. */
export function MobileMenu({ navigation }: { navigation: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const close = () => setOpen(false);

  // While open: Escape closes, and the page behind can't scroll.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Rotating a phone or widening a window past the breakpoint shouldn't leave a stale open menu.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 701px)");
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const bar = "absolute left-0 h-[2px] w-full rounded-full bg-[#1F0A33]";

  return (
    <div className="hidden justify-self-end max-[700px]:block">
      <button
        className="grid h-10 w-10 place-items-center rounded-full transition-colors active:bg-[#1F0A33]/5"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span className="relative block h-[14px] w-5" aria-hidden="true">
          <motion.span
            className={`${bar} top-0`}
            animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={barSpring}
          />
          <motion.span
            className={`${bar} top-[6px]`}
            animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.4 : 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className={`${bar} top-[12px]`}
            animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={barSpring}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Dims the page; tapping it closes the menu. */}
            <motion.div
              className="absolute inset-x-0 top-full h-[100dvh] bg-[#1F0A33]/30"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            />
            <motion.nav
              className="absolute inset-x-0 top-full border-b border-[#eee7de] bg-[#FAF7EF] px-4 pt-1 pb-6 shadow-[0_18px_30px_rgb(31_10_51_/_12%)]"
              id={panelId}
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
                }}
              >
                {navigation.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, y: -8 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
                    }}
                  >
                    <Link
                      className="flex items-center justify-between border-b border-[#eee7de] py-4 font-['Lato'] text-[16px] font-bold text-[#1F0A33]"
                      href={item.href}
                      onClick={close}
                    >
                      {item.label}
                      <span className="text-[#5A0C91]" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                className="mt-5 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.25 } }}
              >
                <span
                  className="inline-grid h-8 w-8 place-items-center rounded-full bg-[#620a9d] text-xs font-bold text-white"
                  aria-hidden="true"
                >
                  O
                </span>
                <span className="font-['Lato'] text-[14px] font-bold text-[#232323]">
                  Hello, Oyin
                </span>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
