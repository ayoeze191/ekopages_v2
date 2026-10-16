"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

/**
 * "Buy now" adds the product to the basket and takes the shopper to the cart,
 * which is what v1's add-to-cart did before redirecting.
 */
export function AddToCartButton({
  productId,
  className,
  label = "Buy now",
}: {
  productId: number;
  className: string;
  label?: string;
}) {
  const { add, addingProduct } = useCart();
  const router = useRouter();
  const [failed, setFailed] = useState(false);
  const busy = addingProduct === productId;

  const onClick = async () => {
    setFailed(false);
    try {
      await add(productId);
      router.push("/cart");
    } catch {
      setFailed(true);
    }
  };

  return (
    <>
      <motion.button
        className={className}
        type="button"
        disabled={busy}
        onClick={() => void onClick()}
        whileTap={busy ? undefined : { scale: 0.98 }}
        aria-busy={busy}
      >
        {busy ? "Adding…" : label}
      </motion.button>
      {failed && (
        <span role="alert" className="mt-2 block font-['Lato'] text-[12px] text-[#9b1c1c]">
          Could not add that — please try again.
        </span>
      )}
    </>
  );
}
