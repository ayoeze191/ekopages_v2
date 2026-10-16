import { api } from "@/lib/api";

export type ShippingLocation = { id: number; location: string; price: string };

export type BillingDetails = {
  First_name: string;
  Last_name: string;
  Company_name: string;
  country: string;
  street_address: string;
  apartment: string;
  city: string;
  state: string;
  phone_number: string;
  email: string;
  order_notes: string;
};

export const emptyBilling: BillingDetails = {
  First_name: "",
  Last_name: "",
  Company_name: "",
  country: "Nigeria",
  street_address: "",
  apartment: "",
  city: "",
  state: "Lagos",
  phone_number: "",
  email: "",
  order_notes: "",
};

export const COUNTRIES = ["Nigeria", "Ghana", "Cameroon", "Australia"];
export const STATES = ["Lagos", "Oyo", "Ekiti", "Ondo", "Ogun"];

export async function fetchShippingLocations(): Promise<ShippingLocation[]> {
  try {
    const payload = await api<{ data?: ShippingLocation[] }>("checkout/shipping_locations/");
    return payload?.data ?? [];
  } catch {
    return [];
  }
}

/** Prefills the form for a signed-in shopper who has checked out before. */
export async function fetchSavedBilling(): Promise<Partial<BillingDetails> | null> {
  try {
    const payload = await api<{ data?: Partial<BillingDetails> }>("billing-details/billing-details/", {
      auth: true,
    });
    return payload?.data ?? null;
  } catch {
    return null;
  }
}

export function saveBilling(
  isAuthenticated: boolean,
  sessionId: string,
  details: BillingDetails & { shipping_location?: number | string },
) {
  return isAuthenticated
    ? api("billing-details/billing-details-update/", { method: "PATCH", body: details, auth: true })
    : api(`unregistered-billing-details/create-billing-details/address/${sessionId}/`, {
        method: "POST",
        body: details,
      });
}

type PaymentResponse = { data?: { data?: { authorization_url?: string } } };

/**
 * Mirrors v1: a signed-in shopper's cart is checked out first, then payment is
 * initialised; both paths return a Paystack authorization_url to redirect to.
 */
export async function startPayment(
  isAuthenticated: boolean,
  sessionId: string,
  payload: Record<string, unknown>,
): Promise<string> {
  if (isAuthenticated) {
    await api("checkout/cart/checkout/", { auth: true });
    const response = await api<PaymentResponse>("cart_payment/payment/", {
      method: "POST",
      body: payload,
      auth: true,
    });
    const url = response?.data?.data?.authorization_url;
    if (!url) throw new Error("No payment link was returned.");
    return url;
  }

  const response = await api<PaymentResponse>(`unregistered-cart-payment/payment/${sessionId}/`, {
    method: "POST",
    body: payload,
  });
  const url = response?.data?.data?.authorization_url;
  if (!url) throw new Error("No payment link was returned.");
  return url;
}

export function verifyPayment(isAuthenticated: boolean, sessionId: string, reference: string) {
  return isAuthenticated
    ? api(`cart_payment/payment/verify/${reference}`, { auth: true })
    : api(`unregistered-cart-payment/payment/verify/${reference}/${sessionId}`);
}
