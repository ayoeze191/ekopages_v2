"use client";

import { useState } from "react";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ProjectsHero } from "@/components/ProjectsHero";
import { projects, type ProjectFilter } from "@/lib/projects";

/** Owns the filter so the hero's chips and the grid below stay in sync. */
export function ProjectsView() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All projects");
  const visibleProjects =
    activeFilter === "All projects"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <>
      <ProjectsHero activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <ProjectGrid projects={visibleProjects} />
    </>
  );
}
