"use client";

import { motion } from "framer-motion";
import { heroRise, PageHero } from "@/components/PageHero";
import { projectFilters, type ProjectFilter } from "@/lib/projects";

type ProjectsHeroProps = {
  activeFilter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
};

export function ProjectsHero({ activeFilter, onFilterChange }: ProjectsHeroProps) {
  return (
    <PageHero
      eyebrow="Projects"
      title="Sustainability projects making an impact right now"
      description="Every drive below is run with a partner school or community. See what's happening near you."
    >
      <motion.div
        className="mt-6 flex flex-wrap gap-2.5"
        role="group"
        aria-label="Filter projects"
        variants={heroRise}
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
    </PageHero>
  );
}
