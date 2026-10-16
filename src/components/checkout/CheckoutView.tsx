"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useCart } from "@/components/cart/CartProvider";
import { ApiError } from "@/lib/api";
import {
  COUNTRIES,
  emptyBilling,
  fetchSavedBilling,
  fetchShippingLocations,
  saveBilling,
  startPayment,
  STATES,
  type BillingDetails,
  type ShippingLocation,
} from "@/lib/checkout";
import { formatPrice } from "@/lib/products";
import { getGuestSessionId } from "@/lib/session";

const fieldClass =
  "w-full rounded-[10px] border border-[#CCB4DD] bg-white px-4 py-3 font-['Lato'] text-[15px] text-[#1e0a39] outline-none placeholder:text-[#918993] focus:border-[#5A0C91]";
const labelClass = "mb-2 block font-['Lato'] text-[14px] font-bold text-[#1F0A33]";

export function CheckoutView() {
  const { isAuthenticated, status } = useAuth();
  const { items, products, total, loading: cartLoading } = useCart();
  const [billing, setBilling] = useState<BillingDetails>(emptyBilling);
  const [locations, setLocations] = useState<ShippingLocation[]>([]);
  const [shippingId, setShippingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const found = await fetchShippingLocations();
      if (cancelled) return;
      setLocations(found);
      setShippingId((current) => current ?? found[0]?.id ?? null);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Prefill a returning customer's saved address.
  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    const load = async () => {
      const saved = await fetchSavedBilling();
      if (cancelled || !saved) return;
      setBilling((current) => ({ ...current, ...saved }));
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [status]);

  const selected = locations.find((location) => location.id === shippingId);
  const shippingCost = selected ? Number(selected.price) || 0 : 0;
  const grandTotal = total + shippingCost;

  const set = (key: keyof BillingDetails) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setBilling((current) => ({ ...current, [key]: event.target.value }));

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors([]);
    if (!shippingId) {
      setErrors(["Pick a delivery location first."]);
      return;
    }
    setSubmitting(true);
    try {
      const sessionId = getGuestSessionId();
      const payload = { ...billing, shipping_location: shippingId };
      await saveBilling(isAuthenticated, sessionId, payload);
      const url = await startPayment(isAuthenticated, sessionId, payload);
      window.location.assign(url);
    } catch (error) {
      setErrors(
        error instanceof ApiError
          ? error.messages
          : [error instanceof Error ? error.message : "Payment could not be started."],
      );
      setSubmitting(false);
    }
  };

  if (!cartLoading && items.length === 0) {
    return (
      <div className="rounded-[20px] border border-[#e8e3db] bg-white px-8 py-14 text-center shadow-[0_7px_16px_rgb(50_32_18_/_8%)]">
        <p className="font-['Baloo_2'] text-[20px] font-bold text-[#1F0A33]">
          There is nothing to check out
        </p>
        <Link
          className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#5A0C91] px-[26px] font-['Lato'] text-[15px] font-bold text-white"
          href="/store"
        >
          Go to Eko Store
        </Link>
      </div>
    );
  }

  return (
    <form className="grid grid-cols-[1fr_380px] items-start gap-10 max-[900px]:grid-cols-1" onSubmit={onSubmit}>
      <div className="rounded-[20px] border border-[#e8e3db] bg-white p-8 shadow-[0_7px_16px_rgb(50_32_18_/_8%)] max-[700px]:p-6">
        <h2 className="font-['Baloo_2'] text-[24px] leading-tight font-bold text-[#1e0a39]">
          Billing details
        </h2>

        {errors.length > 0 && (
          <ul
            className="mt-5 rounded-[10px] bg-[#fdeaea] px-4 py-3 font-['Lato'] text-[13px] leading-[20px] text-[#9b1c1c]"
            role="alert"
          >
            {errors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )}

        <div className="mt-6 grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
          <div>
            <label className={labelClass} htmlFor="First_name">First name</label>
            <input className={fieldClass} id="First_name" value={billing.First_name} onChange={set("First_name")} placeholder="e.g. Richard" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="Last_name">Last name</label>
            <input className={fieldClass} id="Last_name" value={billing.Last_name} onChange={set("Last_name")} placeholder="e.g. Daniels" required />
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass} htmlFor="Company_name">Company name (optional)</label>
          <input className={fieldClass} id="Company_name" value={billing.Company_name} onChange={set("Company_name")} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
          <div>
            <label className={labelClass} htmlFor="country">Country</label>
            <select className={fieldClass} id="country" value={billing.country} onChange={set("country")}>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="state">State</label>
            <select className={fieldClass} id="state" value={billing.state} onChange={set("state")}>
              {STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass} htmlFor="street_address">Street address</label>
          <input className={fieldClass} id="street_address" value={billing.street_address} onChange={set("street_address")} placeholder="House number and street name" required />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
          <div>
            <label className={labelClass} htmlFor="apartment">Apartment, suite or unit (optional)</label>
            <input className={fieldClass} id="apartment" value={billing.apartment} onChange={set("apartment")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="city">Town / city</label>
            <input className={fieldClass} id="city" value={billing.city} onChange={set("city")} required />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
          <div>
            <label className={labelClass} htmlFor="phone_number">Phone number</label>
            <input className={fieldClass} id="phone_number" type="tel" value={billing.phone_number} onChange={set("phone_number")} required />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">Email address</label>
            <input className={fieldClass} id="email" type="email" value={billing.email} onChange={set("email")} required={!isAuthenticated} />
          </div>
        </div>

        <fieldset className="mt-8">
          <legend className="mb-3 font-['Baloo_2'] text-[18px] font-bold text-[#1e0a39]">
            Delivery location
          </legend>
          <div className="grid max-h-[260px] grid-cols-2 gap-2 overflow-y-auto pr-1 max-[560px]:grid-cols-1">
            {locations.map((location) => (
              <label
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-[10px] border px-4 py-3 font-['Lato'] text-[14px] transition-colors ${
                  shippingId === location.id
                    ? "border-[#5A0C91] bg-[#f6f1fa] text-[#1F0A33]"
                    : "border-[#e8e3db] text-[#4A4A4A]"
                }`}
                key={location.id}
              >
                <span className="flex items-center gap-2">
                  <input
                    className="accent-[#5A0C91]"
                    type="radio"
                    name="shipping_location"
                    value={location.id}
                    checked={shippingId === location.id}
                    onChange={() => setShippingId(location.id)}
                  />
                  {location.location}
                </span>
                <span className="font-bold">{formatPrice(location.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <motion.aside
        className="rounded-[20px] border border-[#e8e3db] bg-white p-7 shadow-[0_7px_16px_rgb(50_32_18_/_8%)]"
        layout
      >
        <h2 className="font-['Baloo_2'] text-[20px] leading-tight font-bold text-[#1e0a39]">
          Your order
        </h2>
        <ul className="mt-5 flex flex-col gap-3">
          {items.map((item) => {
            const product = products.get(item.product);
            return (
              <li className="flex justify-between gap-4 font-['Lato'] text-[14px] text-[#4A4A4A]" key={item.id}>
                <span>
                  {product?.name ?? `Product #${item.product}`}
                  <span className="text-[#6b646a]"> × {item.quantity}</span>
                </span>
                {product && <span className="font-bold text-[#1F0A33]">{formatPrice(product.price)}</span>}
              </li>
            );
          })}
        </ul>
        <dl className="mt-5 border-t border-[#e8e3db] pt-4 font-['Lato'] text-[14px] text-[#4A4A4A]">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-bold text-[#1F0A33]">{formatPrice(String(total))}</dd>
          </div>
          <div className="mt-2 flex justify-between">
            <dt>Shipping{selected ? ` — ${selected.location}` : ""}</dt>
            <dd className="font-bold text-[#1F0A33]">{formatPrice(String(shippingCost))}</dd>
          </div>
          <div className="mt-4 flex justify-between border-t border-[#e8e3db] pt-4 font-['Baloo_2'] text-[18px] font-bold text-[#1F0A33]">
            <dt>Total</dt>
            <dd className="text-[#5A0C91]">{formatPrice(String(grandTotal))}</dd>
          </div>
        </dl>
        <motion.button
          className="mt-6 flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#5A0C91] font-['Lato'] text-[15px] font-bold text-white shadow-[0_8px_14px_rgb(79_0_124_/_22%)] disabled:opacity-70"
          type="submit"
          disabled={submitting}
          whileHover={submitting ? undefined : { y: -2 }}
          whileTap={submitting ? undefined : { scale: 0.98 }}
        >
          {submitting ? "Starting payment…" : "Place order"}
        </motion.button>
        <p className="mt-3 font-['Lato'] text-[12px] leading-[18px] text-[#6b646a]">
          You&apos;ll be taken to our payment provider to complete the order.
        </p>
      </motion.aside>
    </form>
  );
}
