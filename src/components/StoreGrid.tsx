"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { staggerCard } from "@/components/motion/Reveal";
import { heartPath } from "@/components/ServiceIcon";
import { formatPrice, type Product } from "@/lib/products";

function SaveButton({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <motion.button
      className="absolute top-[13px] right-[13px] z-10 grid h-[29px] w-[29px] place-items-center rounded-full bg-white shadow-[0_2px_6px_rgb(31_10_51_/_16%)]"
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved items` : `Save ${title} for later`}
      onClick={() => setSaved((wasSaved) => !wasSaved)}
      whileTap={{ scale: 0.86 }}
      animate={saved ? { scale: [1, 1.25, 1] } : { scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <svg
        className="h-[13px] w-[14px]"
        viewBox="0 0 19 18"
        fill={saved ? "#5A0C91" : "none"}
        stroke="#5A0C91"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d={heartPath} />
      </svg>
    </motion.button>
  );
}

export function StoreGrid({ products }: { products: Product[] }) {
  // Same explicit reveal as the projects grid: cards filtered in later still animate.
  const [revealed, setRevealed] = useState(false);

  return (
    // Design: the grid frame is 1224 wide and the cards sit against its left edge,
    // 268.5 apart with a 42.5px visual gutter (Figma columns of 291 + 20px gap).
    <section
      className="mx-auto w-[calc(100%-3rem)] max-w-[1224px] pt-[120px] pb-[44px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
      aria-label="Products"
    >
      <p className="sr-only" aria-live="polite">
        {`Showing ${products.length} products`}
      </p>
      {products.length === 0 ? (
        <p className="py-10 text-center font-['Lato'] text-[14px] text-[#6b646a]">
          Our shelves are restocking — check back shortly.
        </p>
      ) : (
        <motion.div
          className="relative grid max-w-[1201.5px] grid-cols-4 gap-x-[42.5px] gap-y-[27px] max-[1100px]:grid-cols-3 max-[820px]:grid-cols-2 max-[560px]:grid-cols-1"
          viewport={{ once: true, amount: 0.1 }}
          onViewportEnter={() => setRevealed(true)}
        >
          <AnimatePresence mode="popLayout">
            {products.map((product, index) => (
              <motion.article
                className="h-full"
                layout
                custom={index}
                variants={staggerCard}
                initial="hidden"
                animate={revealed ? "show" : "hidden"}
                exit="exit"
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                key={product.id}
              >
                {/* Hover lives on an inner layer so it never waits on the stagger delay above. */}
                <motion.div
                  className="group flex h-full min-h-[378px] flex-col overflow-hidden rounded-2xl border border-[#EAE4DA] bg-white shadow-[0_8px_20px_rgb(50_32_18_/_8%)] transition-shadow duration-300 hover:shadow-[0_16px_30px_rgb(50_32_18_/_12%)]"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                >
                  <div className="relative h-[160px] shrink-0 bg-[#efe7f4]">
                    <Image
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 560px) 100vw, 268px"
                    />
                    <SaveButton title={product.name} />
                  </div>
                  {/* Body copy is centred in the card, as in the design. */}
                  <div className="flex flex-1 flex-col justify-center px-4 py-7">
                    <h3 className="font-['Baloo_2'] text-[15px] leading-[1.2] font-bold text-[#1F0A33]">
                      {product.name}
                    </h3>
                    <p className="mt-[9px] font-['Lato'] text-[12px] leading-[1.3] text-[#4A4A4A]">
                      {product.author
                        ? `Written by ${product.author}`
                        : product.merch_size
                          ? `Size ${product.merch_size}`
                          : " "}
                    </p>
                    <p className="mt-[13px] w-full rounded-full bg-[#EFE6F5] px-2.5 py-[3px] font-['Lato'] text-[11px] leading-[12px] font-bold text-[#5A0C91]">
                      {product.category === "books" ? "Books" : "Merch"}
                    </p>
                    <p className="mt-[14px] font-['Lato'] text-[14px] leading-[1.2] font-bold text-[#5A0C91]">
                      {formatPrice(product.price)}
                    </p>
                    <button
                      className="mt-[17px] h-9 w-full rounded-lg bg-[#5A0C91] font-['Lato'] text-[13px] font-bold text-white transition hover:bg-[#7915b4] active:scale-[0.98]"
                      type="button"
                    >
                      Buy now
                    </button>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
