/**
 * Eko Pages store API — the same backend version one talks to.
 * v1: axios.create({ baseURL: "https://ekopages-production.up.railway.app/" })
 *     and the landing store dispatched get_products("All", "All") -> store/product_list/
 */
export const API_BASE = "https://ekopages-production.up.railway.app";

export type Product = {
  id: number;
  category: string;
  name: string;
  author: string;
  description: string;
  image: string;
  price: string;
  merch_size: string;
};

type ProductListResponse = {
  message?: string;
  data?: Product[];
};

/** GET store/product_list/ — every product, books and merch alike. */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/store/product_list/`, {
      // Re-fetch at most every 5 minutes; the catalogue rarely moves.
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];

    const payload: ProductListResponse = await response.json();
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    // The store is a marketing section — a backend outage shouldn't take the page down.
    return [];
  }
}

export const storeFilters = ["All", "Our Books", "Our Merch"] as const;
export type StoreFilter = (typeof storeFilters)[number];

/**
 * Mirrors v1's store tabs (product_list / book_list / merch_list). product_list already
 * carries each product's category, so filtering client-side needs no extra requests.
 */
export const storeFilterCategory: Record<StoreFilter, string | null> = {
  All: null,
  "Our Books": "books",
  "Our Merch": "merch",
};

/** "3500.00" -> "₦3,500" */
export function formatPrice(price: string): string {
  const amount = Number(price);
  if (!Number.isFinite(amount)) return `₦${price}`;
  return `₦${amount.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
}
