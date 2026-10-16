"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "@/components/ArrowRight";
import { staggerCard } from "@/components/motion/Reveal";
import type { Project } from "@/lib/projects";

/** The animated cards on their own, so detail pages can reuse them. */
export function ProjectCards({ projects }: { projects: Project[] }) {
  // Cards are driven by explicit state instead of inheriting the grid's whileInView:
  // an inherited reveal only reaches cards mounted at that moment, so cards added
  // later by a filter change stayed stuck at opacity 0.
  const [revealed, setRevealed] = useState(false);

  return (
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
            variants={staggerCard}
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
              <Link className="flex h-full flex-col" href={`/projects/${project.slug}`}>
                <div className="relative h-[170px] shrink-0 bg-[#efe7f4]">
                  <Image
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 560px) 100vw, 364px"
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                  <h3 className="font-['Baloo_2'] text-[16px] leading-tight font-bold text-[#1F0A33]">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 font-['Lato'] text-[13px] leading-[18px] text-[#4A4A4A]">
                    {project.summary}
                  </p>
                  <span className="mt-auto flex w-fit items-center gap-1 pt-3.5 font-['Lato'] text-[13px] leading-[18px] font-bold text-[#5A0C91]">
                    View project
                    <ArrowRight className="h-[13px] w-[13px] transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
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
      <ProjectCards projects={projects} />
    </section>
  );
}
