"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

/** House easing: fast out, soft landing. Matches the home hero. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** A ~24px fade-up, shared by every reveal so the sections feel like one system. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const VIEWPORT = { once: true, amount: 0.2 };

const tags = {
  div: motion.div,
  article: motion.article,
  section: motion.section,
};

type BaseProps = HTMLMotionProps<"div"> & { as?: keyof typeof tags };

/** Fades its content up the first time it scrolls into view. */
export function Reveal({ as = "div", delay = 0, ...props }: BaseProps & { delay?: number }) {
  const Component = tags[as] as typeof motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: fadeUp.hidden,
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay } },
      }}
      {...props}
    />
  );
}

/** Staggers its RevealItem children in as the group scrolls into view. */
export function RevealGroup({
  as = "div",
  stagger = 0.1,
  delay = 0,
  ...props
}: BaseProps & { stagger?: number; delay?: number }) {
  const Component = tags[as] as typeof motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...props}
    />
  );
}

/** One beat of a RevealGroup's stagger. */
export function RevealItem({ as = "div", ...props }: BaseProps) {
  const Component = tags[as] as typeof motion.div;
  return <Component variants={fadeUp} {...props} />;
}

/**
 * For grids whose items change (filters). Each item animates itself in on mount,
 * staggered by its `custom` index; drive it with animate={revealed ? "show" : "hidden"}.
 * Inheriting a parent's whileInView instead only reaches items mounted at that
 * moment, which left filtered-in cards stuck at opacity 0.
 */
export const staggerCard: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: index * 0.08 },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};
