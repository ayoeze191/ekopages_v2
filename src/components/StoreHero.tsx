"use client";

import { FilterChips } from "@/components/FilterChips";
import { PageHero } from "@/components/PageHero";
import { storeFilters, type StoreFilter } from "@/lib/products";

type StoreHeroProps = {
  activeFilter: StoreFilter;
  onFilterChange: (filter: StoreFilter) => void;
};

export function StoreHero({ activeFilter, onFilterChange }: StoreHeroProps) {
  return (
    <PageHero
      eyebrow="Eko Store"
      title="Books that teach the SDGs, one story at a time"
      description="Illustrated by African artists, written to make sustainability feel personal for young readers."
    >
      <FilterChips
        options={storeFilters}
        active={activeFilter}
        onChange={onFilterChange}
        label="Filter products"
        layoutId="active-store-filter"
      />
    </PageHero>
  );
}
