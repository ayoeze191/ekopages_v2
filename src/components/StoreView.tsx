"use client";

import { useState } from "react";
import { StoreGrid } from "@/components/StoreGrid";
import { StoreHero } from "@/components/StoreHero";
import { storeFilterCategory, type Product, type StoreFilter } from "@/lib/products";

/** Owns the filter so the hero's chips and the product grid stay in sync. */
export function StoreView({ products }: { products: Product[] }) {
  const [activeFilter, setActiveFilter] = useState<StoreFilter>("All");
  const category = storeFilterCategory[activeFilter];
  const visibleProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <>
      <StoreHero activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <StoreGrid products={visibleProducts} />
    </>
  );
}
