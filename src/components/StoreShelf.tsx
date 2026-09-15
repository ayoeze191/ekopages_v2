"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/components/motion/Reveal";
import { formatPrice, type Product } from "@/lib/products";

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={
          direction === "left"
            ? "M14.5 5.5 8 12l6.5 6.5"
            : "m9.5 5.5 6.5 6.5-6.5 6.5"
        }
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StoreShelf({ products }: { products: Product[] }) {
  const shelfRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") =>
    shelfRef.current?.scrollBy({
      left: direction === "left" ? -310 : 310,
      behavior: "smooth",
    });

  return (
    <div className="relative mt-6 pb-[7px] sm:mt-7">
      <button
        className="absolute top-[100px] left-0 z-10 grid h-[31px] w-[31px] -translate-x-1/2 place-items-center rounded-full border border-[#e8e3db] bg-white text-[#620a9d] shadow-sm max-[700px]:hidden"
        type="button"
        onClick={() => scroll("left")}
        aria-label="Previous books"
      >
        <Arrow direction="left" />
      </button>
      <motion.div
        ref={shelfRef}
        className="-mt-1.5 flex snap-x gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pt-1.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {products.map((product) => (
          <motion.article
            className="group w-[154px] shrink-0 snap-start overflow-hidden rounded-xl border border-[#e8e3db] bg-white shadow-[0_7px_16px_rgb(50_32_18_/_8%)] sm:w-[236px]"
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            key={product.id}
          >
            <div className="relative h-[111px] bg-[#efe7f4] sm:h-[142px]">
              <Image
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 154px, 236px"
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="truncate font-['Baloo_2'] text-[15px] font-bold text-[#1F0A33] sm:text-[15px]">
                {product.name}
              </h3>
              <p className="mt-2 leading-[100%] truncate text-[9px] font-['Lato'] text-[#4A4A4A] sm:text-[12px]">
                {product.author
                  ? `Written by ${product.author}`
                  : product.merch_size || " "}
              </p>
              <p className="font-['Lato'] mt-[14px] leading-[100%] text-sm font-bold text-[#5A0C91]">
                {formatPrice(product.price)}
              </p>
              <button
                className="mt-4 font-['Lato']  w-full rounded-md bg-[#620a9d] py-2.5 text-[13px] font-['Lato'] font-bold text-white transition hover:bg-[#7915b4] active:scale-[0.98]"
                type="button"
              >
                Buy now
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>
      <button
        className="absolute top-[100px] right-0 z-10 grid h-[31px] w-[31px] translate-x-1/2 place-items-center rounded-full border border-[#e8e3db] bg-white text-[#620a9d] shadow-sm max-[700px]:hidden"
        type="button"
        onClick={() => scroll("right")}
        aria-label="Next books"
      >
        <Arrow direction="right" />
      </button>
    </div>
  );
}
