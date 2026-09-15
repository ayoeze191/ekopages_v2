"use client";

import { FilterChips } from "@/components/FilterChips";
import { PageHero } from "@/components/PageHero";
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
      <FilterChips
        options={projectFilters}
        active={activeFilter}
        onChange={onFilterChange}
        label="Filter projects"
        layoutId="active-project-filter"
      />
    </PageHero>
  );
}
