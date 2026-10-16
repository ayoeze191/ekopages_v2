"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { addCartItem, fetchCart, removeCartItem, updateCartItem, type CartItem } from "@/lib/cart";
import { getProducts, type Product } from "@/lib/products";
import { getGuestSessionId } from "@/lib/session";

type CartValue = {
  items: CartItem[];
  products: Map<number, Product>;
  total: number;
  count: number;
  loading: boolean;
  /** Cart-item ids currently being changed, so rows can show their own spinner. */
  busy: Set<number>;
  addingProduct: number | null;
  add: (productId: number) => Promise<void>;
  setQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  remove: (cartItemId: number) => Promise<void>;
  refresh: () => Promise<void>;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { status, isAuthenticated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Map<number, Product>>(new Map());
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<Set<number>>(new Set());
  const [addingProduct, setAddingProduct] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    if (status === "loading") return;
    setLoading(true);
    try {
      const { items: fetched, total: fetchedTotal } = await fetchCart(
        isAuthenticated,
        getGuestSessionId(),
      );
      setItems(fetched);
      setTotal(fetchedTotal);
    } catch {
      // An empty or unreachable basket shouldn't break the page.
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, status]);

  // One product fetch covers every row; the cart endpoints return ids only.
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const list = await getProducts();
      if (cancelled) return;
      setProducts(new Map(list.map((product) => [product.id, product])));
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    let cancelled = false;

    const load = async () => {
      // Yield first: refresh() flips loading state, which would cascade a render.
      await Promise.resolve();
      if (!cancelled) await refresh();
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [refresh, status]);

  const withBusy = useCallback(async (cartItemId: number, action: () => Promise<void>) => {
    setBusy((current) => new Set(current).add(cartItemId));
    try {
      await action();
    } finally {
      setBusy((current) => {
        const next = new Set(current);
        next.delete(cartItemId);
        return next;
      });
    }
  }, []);

  const add = useCallback(
    async (productId: number) => {
      setAddingProduct(productId);
      try {
        await addCartItem(isAuthenticated, getGuestSessionId(), productId);
        await refresh();
      } finally {
        setAddingProduct(null);
      }
    },
    [isAuthenticated, refresh],
  );

  const setQuantity = useCallback(
    async (cartItemId: number, quantity: number) => {
      if (quantity < 1) return;
      await withBusy(cartItemId, async () => {
        await updateCartItem(isAuthenticated, getGuestSessionId(), cartItemId, quantity);
        await refresh();
      });
    },
    [isAuthenticated, refresh, withBusy],
  );

  const remove = useCallback(
    async (cartItemId: number) => {
      await withBusy(cartItemId, async () => {
        await removeCartItem(isAuthenticated, getGuestSessionId(), cartItemId);
        await refresh();
      });
    },
    [isAuthenticated, refresh, withBusy],
  );

  const value = useMemo<CartValue>(
    () => ({
      items,
      products,
      total,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      loading,
      busy,
      addingProduct,
      add,
      setQuantity,
      remove,
      refresh,
    }),
    [items, products, total, loading, busy, addingProduct, add, setQuantity, remove, refresh],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
