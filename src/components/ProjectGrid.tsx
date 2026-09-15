"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/Reveal";
import type { Project } from "@/lib/projects";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  // Staggered by grid position, so every filter result animates in as a set.
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: index * 0.08 },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

export function ProjectGrid({ projects }: { projects: Project[] }) {
  // Cards are driven by explicit state instead of inheriting the grid's whileInView:
  // an inherited reveal only reaches cards mounted at that moment, so cards added
  // later by a filter change stayed stuck at opacity 0.
  const [revealed, setRevealed] = useState(false);

  return (
    // Design: hero -> 74px -> frame, 44px frame padding -> cards (118px).
    // Below: 64px frame padding + 80px to the footer = 144px; the footer's own mt-[100px] covers 100 of it.
    <section
      className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[118px] pb-[44px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
      aria-label="Projects"
    >
      <p className="sr-only" aria-live="polite">
        {`Showing ${projects.length} projects`}
      </p>
      <motion.div
        className="relative grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
        viewport={{ once: true, amount: 0.15 }}
        onViewportEnter={() => setRevealed(true)}
      >
        {/* popLayout lifts leaving cards out of the flow so the rest glide into place. */}
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <motion.article
              className="h-full"
              layout
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={revealed ? "show" : "hidden"}
              exit="exit"
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              key={project.slug}
            >
              {/* Hover lives on an inner layer so it never waits on the stagger delay above. */}
              <motion.div
                className="group h-full overflow-hidden rounded-[14px] border border-[#e8e3db] bg-white shadow-[0_7px_16px_rgb(50_32_18_/_8%)] transition-shadow duration-300 hover:shadow-[0_16px_30px_rgb(50_32_18_/_12%)]"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              >
                <div
                  className={`h-[170px] ${project.cover}`}
                  role="img"
                  aria-label={`${project.title} cover placeholder`}
                />
                <div className="px-5 pt-4 pb-5">
                  <h3 className="font-['Baloo_2'] text-[16px] leading-tight font-bold text-[#1F0A33]">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 font-['Lato'] text-[13px] leading-[18px] text-[#4A4A4A]">
                    {project.location}
                  </p>
                  <a
                    className="mt-3.5 inline-flex items-center gap-1 font-['Lato'] text-[13px] leading-[18px] font-bold text-[#5A0C91]"
                    href={`#${project.slug}`}
                  >
                    View project
                    <span
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
