"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/Reveal";

export type FaqItem = { question: string; answer: string[] };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#e8e3db] overflow-hidden rounded-[18px] border border-[#e8e3db] bg-white shadow-[0_7px_16px_rgb(50_32_18_/_8%)]">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        return (
          <div key={item.question}>
            <h3>
              <button
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left max-[700px]:px-5"
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span
                  className={`font-['Baloo_2'] text-[18px] leading-tight font-bold transition-colors duration-200 ${
                    isOpen ? "text-[#5A0C91]" : "text-[#1F0A33]"
                  }`}
                >
                  {item.question}
                </span>
                {/* The plus rotates into a cross while open. */}
                <motion.span
                  className="shrink-0 text-[#5A0C91]"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  aria-hidden="true"
                >
                  <svg
                    className="h-[18px] w-[18px]"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="M8 2.5v11M2.5 8h11" />
                  </svg>
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="overflow-hidden"
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <div className="flex flex-col gap-3 px-6 pb-6 max-[700px]:px-5">
                    {item.answer.map((paragraph) => (
                      <p
                        className="font-['Lato'] text-[15px] leading-[26px] text-[#4A4A4A]"
                        key={paragraph.slice(0, 24)}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
