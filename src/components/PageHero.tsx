"use client";

import { motion, type Variants } from "framer-motion";
import { EASE_OUT } from "@/components/motion/Reveal";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/** One beat of the hero's entrance. Give extra children (e.g. filter chips) these variants to join the stagger. */
export const heroRise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

/**
 * The purple banner that opens inner pages (Projects, Services).
 * Line heights follow the Figma text styles (1.2x), which is what makes the
 * Services hero measure exactly 204px tall.
 */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="bg-[linear-gradient(115deg,#5A0C91_0%,#3B0766_55%,#1F0A33_100%)] text-white">
      <motion.div
        className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-10 pb-14 max-[700px]:w-[calc(100%-2rem)]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="font-['Lato'] text-[14px] leading-[1.2] text-[#FFFFFF]"
          variants={heroRise}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="mt-4 font-['Baloo_2'] text-[36px] leading-[1.2] font-bold max-[700px]:text-[28px]"
          variants={heroRise}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mt-2 font-['Lato'] text-[16px] leading-[24px] text-white/80"
          variants={heroRise}
        >
          {description}
        </motion.p>
        {children}
      </motion.div>
    </section>
  );
}
