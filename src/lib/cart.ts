import { api } from "@/lib/api";

/** A row in the basket. Product details are fetched separately, as in v1. */
export type CartItem = { id: number; product: number; quantity: number };

/**
 * Signed-in shoppers use cart/*; guests use unregistered-cart/{session_id}/*,
 * keyed by the eko_session_id cookie. Same split v1 used.
 */
export function cartPaths(isAuthenticated: boolean, sessionId: string) {
  return isAuthenticated
    ? {
        list: "cart/list/",
        create: "cart/create/",
        item: (cartItemId: number) => `cart/cart-item/${cartItemId}/`,
        total: "cart/total/",
      }
    : {
        list: `unregistered-cart/list/${sessionId}/`,
        create: `unregistered-cart/create/${sessionId}/`,
        item: (cartItemId: number) => `unregistered-cart/cart-item/${sessionId}/${cartItemId}/`,
        total: `unregistered-cart/total/${sessionId}/`,
      };
}

/** The two cart endpoints disagree on envelope shape, so normalise both. */
function normaliseList(payload: unknown): CartItem[] {
  if (Array.isArray(payload)) return payload as CartItem[];
  if (payload && typeof payload === "object") {
    const data = (payload as { data?: unknown }).data;
    if (Array.isArray(data)) return data as CartItem[];
    if (data && typeof data === "object") {
      const list = (data as { list?: unknown }).list;
      if (Array.isArray(list)) return list as CartItem[];
    }
  }
  return [];
}

function normaliseTotal(payload: unknown): number {
  if (typeof payload === "number") return payload;
  if (payload && typeof payload === "object") {
    const data = (payload as { data?: unknown; total?: unknown }).data ?? payload;
    const total = (data as { total?: unknown }).total;
    if (typeof total === "number") return total;
    if (typeof total === "string") return Number(total) || 0;
  }
  return 0;
}

export async function fetchCart(isAuthenticated: boolean, sessionId: string) {
  const paths = cartPaths(isAuthenticated, sessionId);
  const [listPayload, totalPayload] = await Promise.all([
    api(paths.list, { auth: isAuthenticated }),
    api(paths.total, { auth: isAuthenticated }).catch(() => null),
  ]);
  return {
    items: normaliseList(listPayload).filter((item) => item.quantity > 0),
    total: normaliseTotal(totalPayload),
  };
}

export const addCartItem = (isAuthenticated: boolean, sessionId: string, productId: number) =>
  api(cartPaths(isAuthenticated, sessionId).create, {
    method: "POST",
    body: { product: productId },
    auth: isAuthenticated,
  });

export const updateCartItem = (
  isAuthenticated: boolean,
  sessionId: string,
  cartItemId: number,
  quantity: number,
) =>
  api(cartPaths(isAuthenticated, sessionId).item(cartItemId), {
    method: "PATCH",
    body: { quantity },
    auth: isAuthenticated,
  });

export const removeCartItem = (isAuthenticated: boolean, sessionId: string, cartItemId: number) =>
  api(cartPaths(isAuthenticated, sessionId).item(cartItemId), {
    method: "DELETE",
    auth: isAuthenticated,
  });
