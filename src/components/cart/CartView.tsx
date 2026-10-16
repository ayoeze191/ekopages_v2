"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { EASE_OUT } from "@/components/motion/Reveal";
import { formatPrice } from "@/lib/products";

function QuantityStepper({
  quantity,
  disabled,
  onChange,
}: {
  quantity: number;
  disabled: boolean;
  onChange: (next: number) => void;
}) {
  const button =
    "grid h-8 w-8 place-items-center rounded-full border border-[#CCB4DD] font-['Lato'] text-[16px] font-bold text-[#5A0C91] disabled:opacity-40";
  return (
    <div className="flex items-center gap-3">
      <button
        className={button}
        type="button"
        onClick={() => onChange(quantity - 1)}
        disabled={disabled || quantity <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="min-w-6 text-center font-['Lato'] text-[15px] font-bold text-[#1F0A33]">
        {quantity}
      </span>
      <button
        className={button}
        type="button"
        onClick={() => onChange(quantity + 1)}
        disabled={disabled}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export function CartView() {
  const { items, products, total, loading, busy, setQuantity, remove } = useCart();

  if (loading && items.length === 0) {
    return (
      <p className="py-10 text-center font-['Lato'] text-[14px] text-[#6b646a]">Loading your cart…</p>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[20px] border border-[#e8e3db] bg-white px-8 py-14 text-center shadow-[0_7px_16px_rgb(50_32_18_/_8%)]">
        <p className="font-['Baloo_2'] text-[20px] font-bold text-[#1F0A33]">Your cart is empty</p>
        <p className="mt-2 font-['Lato'] text-[15px] text-[#4A4A4A]">
          Browse the store and add a book or two.
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
    <div className="grid grid-cols-[1fr_360px] items-start gap-10 max-[900px]:grid-cols-1">
      <ul className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => {
            const product = products.get(item.product);
            const isBusy = busy.has(item.id);
            return (
              <motion.li
                className="flex items-center gap-5 rounded-[16px] border border-[#e8e3db] bg-white p-4 shadow-[0_7px_16px_rgb(50_32_18_/_8%)] max-[560px]:flex-col max-[560px]:items-start"
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: isBusy ? 0.6 : 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                <div className="relative h-[90px] w-[90px] shrink-0 overflow-hidden rounded-[12px] bg-[#efe7f4]">
                  {product && (
                    <Image
                      className="object-cover"
                      src={product.image}
                      alt=""
                      fill
                      sizes="90px"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="font-['Baloo_2'] text-[16px] leading-tight font-bold text-[#1F0A33]">
                    {product?.name ?? `Product #${item.product}`}
                  </h2>
                  {product?.author && (
                    <p className="mt-1 font-['Lato'] text-[13px] text-[#4A4A4A]">
                      Written by {product.author}
                    </p>
                  )}
                  {product && (
                    <p className="mt-2 font-['Lato'] text-[14px] font-bold text-[#5A0C91]">
                      {formatPrice(product.price)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-3 max-[560px]:w-full max-[560px]:flex-row max-[560px]:items-center max-[560px]:justify-between">
                  <QuantityStepper
                    quantity={item.quantity}
                    disabled={isBusy}
                    onChange={(next) => void setQuantity(item.id, next)}
                  />
                  <button
                    className="font-['Lato'] text-[13px] font-bold text-[#9b1c1c] disabled:opacity-40"
                    type="button"
                    onClick={() => void remove(item.id)}
                    disabled={isBusy}
                  >
                    Remove
                  </button>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      <motion.aside
        className="rounded-[20px] border border-[#e8e3db] bg-white p-7 shadow-[0_7px_16px_rgb(50_32_18_/_8%)]"
        layout
      >
        <h2 className="font-['Baloo_2'] text-[20px] leading-tight font-bold text-[#1e0a39]">
          Order summary
        </h2>
        <dl className="mt-5 flex items-center justify-between font-['Lato'] text-[15px] text-[#4A4A4A]">
          <dt>Subtotal</dt>
          <dd className="font-bold text-[#1F0A33]">{formatPrice(String(total))}</dd>
        </dl>
        <p className="mt-2 font-['Lato'] text-[13px] leading-[20px] text-[#6b646a]">
          Shipping is calculated at checkout.
        </p>
        <Link
          className="mt-6 flex min-h-[50px] items-center justify-center rounded-full bg-[#5A0C91] font-['Lato'] text-[15px] font-bold text-white shadow-[0_8px_14px_rgb(79_0_124_/_22%)] transition hover:-translate-y-0.5"
          href="/checkout"
        >
          Checkout
        </Link>
        <Link
          className="mt-3 flex min-h-[44px] items-center justify-center font-['Lato'] text-[14px] font-bold text-[#5A0C91]"
          href="/store"
        >
          Continue shopping
        </Link>
      </motion.aside>
    </div>
  );
}
