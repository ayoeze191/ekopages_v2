"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE_OUT } from "@/components/motion/Reveal";

/** Counts from 0 up to `to` the first time it scrolls into view: 5000 -> "5,000+". */
export function CountUp({ to, suffix = "", duration = 1.4 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(count, (value) => `${Math.round(value).toLocaleString("en-US")}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, { duration, ease: EASE_OUT });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration, count]);

  return (
    <>
      {/* Screen readers and crawlers get the final figure, not the ticking one. */}
      <span className="sr-only">{`${to.toLocaleString("en-US")}${suffix}`}</span>
      <motion.span ref={ref} aria-hidden="true">
        {display}
      </motion.span>
    </>
  );
}
