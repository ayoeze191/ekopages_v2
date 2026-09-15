"use client";

import { motion, type Variants } from "framer-motion";
import { EASE_OUT } from "@/components/motion/Reveal";
import { projectFilters, type ProjectFilter } from "@/lib/projects";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const riseUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

type ProjectsHeroProps = {
  activeFilter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
};

export function ProjectsHero({
  activeFilter,
  onFilterChange,
}: ProjectsHeroProps) {
  return (
    <section className="bg-[linear-gradient(115deg,#5A0C91_0%,#3B0766_55%,#1F0A33_100%)] text-white">
      <motion.div
        className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-10 pb-14 max-[700px]:w-[calc(100%-2rem)]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="font-['Lato'] text-[14px] leading-[20px] text-[#FFFFFF]"
          variants={riseUp}
        >
          Projects
        </motion.p>
        <motion.h1
          className="mt-4 font-['Baloo_2'] text-[36px] leading-tight font-bold max-[700px]:text-[28px]"
          variants={riseUp}
        >
          Sustainability projects making an impact right now
        </motion.h1>
        <motion.p
          className="mt-2 font-['Lato'] text-[16px] leading-[24px] text-white/80"
          variants={riseUp}
        >
          Every drive below is run with a partner school or community. See
          what&apos;s happening near you.
        </motion.p>
        <motion.div
          className="mt-6 flex flex-wrap gap-2.5"
          role="group"
          aria-label="Filter projects"
          variants={riseUp}
        >
          {projectFilters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <motion.button
                className="relative h-9 rounded-full border border-white/25 bg-white/10 px-4 font-['Lato'] text-[13px] font-bold transition-colors hover:bg-white/20"
                type="button"
                aria-pressed={isActive}
                onClick={() => onFilterChange(filter)}
                whileTap={{ scale: 0.96 }}
                key={filter}
              >
                {/* One shared pill that slides to whichever chip is active. */}
                {isActive && (
                  <motion.span
                    className="absolute -inset-px rounded-full bg-white"
                    layoutId="active-project-filter"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative transition-colors duration-200 ${isActive ? "text-[#1F0A33]" : "text-white"}`}
                >
                  {filter}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
