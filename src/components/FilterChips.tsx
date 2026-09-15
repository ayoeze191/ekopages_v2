"use client";

import { motion } from "framer-motion";
import { heroRise } from "@/components/PageHero";

type FilterChipsProps<T extends string> = {
  options: readonly T[];
  active: T;
  onChange: (option: T) => void;
  /** Accessible name for the group, e.g. "Filter projects". */
  label: string;
  /** Must be unique per chip group so the sliding pill only moves within its own group. */
  layoutId: string;
};

/** The pill filters that sit under a PageHero. Joins the hero's entrance stagger. */
export function FilterChips<T extends string>({
  options,
  active,
  onChange,
  label,
  layoutId,
}: FilterChipsProps<T>) {
  return (
    <motion.div
      className="mt-6 flex flex-wrap gap-2.5"
      role="group"
      aria-label={label}
      variants={heroRise}
    >
      {options.map((option) => {
        const isActive = option === active;
        return (
          <motion.button
            className="relative h-9 rounded-full border border-white/25 bg-white/10 px-4 font-['Lato'] text-[13px] font-bold transition-colors hover:bg-white/20"
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            whileTap={{ scale: 0.96 }}
            key={option}
          >
            {/* One shared pill that slides to whichever chip is active. */}
            {isActive && (
              <motion.span
                className="absolute -inset-px rounded-full bg-white"
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                aria-hidden="true"
              />
            )}
            <span
              className={`relative transition-colors duration-200 ${isActive ? "text-[#1F0A33]" : "text-white"}`}
            >
              {option}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
