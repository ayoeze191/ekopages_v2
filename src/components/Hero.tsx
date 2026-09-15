"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const riseUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

function WaterDroplet() {
  return (
    <motion.svg
      className="absolute top-[8%] left-[9.5%] h-auto w-[162px]"
      width="163"
      height="163"
      viewBox="0 0 163 163"
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <g opacity="0.5">
        <path
          d="M81.4046 13.5684C47.4847 27.1363 27.1328 54.2722 27.1328 88.1921C27.1328 102.586 32.8507 116.39 43.0287 126.568C53.2066 136.746 67.0108 142.464 81.4046 142.464C95.7984 142.464 109.603 136.746 119.781 126.568C129.959 116.39 135.676 102.586 135.676 88.1921C135.676 54.2722 115.325 27.1363 81.4046 13.5684Z"
          stroke="white"
          strokeWidth="8.14077"
        />
      </g>
    </motion.svg>
  );
}

export function Hero() {
  return (
    <motion.section
      className="mx-auto my-[48px] grid min-h-[398px] w-[calc(100%-3rem)] max-w-[1180px] grid-cols-[1.13fr_1fr] overflow-hidden  max-[700px]:mt-8 max-[700px]:w-[calc(100%-2rem)] max-[700px]:grid-cols-1"
      id="top"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className=" px-[18px] py-[30px] max-[700px]:border-r-0 max-[700px]:px-[22px]">
        <motion.p
          className="mb-3 font-['Caveat'] text-[22px] leading-none text-[#dc8e1c]"
          variants={riseUp}
        >
          ✎ A story-first way to learn
        </motion.p>
        <motion.h1
          className="max-w-[610px] font-['Baloo_2'] text-[clamp(34px,3.18vw,46px)] leading-[59px] font-bold tracking-[-0.04em] max-[700px]:text-[clamp(34px,10vw,47px)]"
          variants={riseUp}
        >
          Sustainability lessons kids actually{" "}
          <em className="not-italic text-[#620a9d]">want</em> to finish.
        </motion.h1>
        <motion.p
          className="mt-[16px] font-['Lato'] mb-[26px] max-w-[535px] text-[1rem] leading-[1.65] text-[#4A4A4A]"
          variants={riseUp}
        >
          Eko Pages turns the Sustainable Development Goals into books,
          animation and courses built for African children — so the next
          generation grows up ready to protect the planet they&apos;ll inherit.
        </motion.p>
        <motion.div className="flex flex-wrap gap-[14px]" variants={riseUp}>
          <motion.a
            className="inline-flex font-['Lato'] min-h-[50px] items-center justify-center rounded-full bg-[#5A0C91] px-[26px] text-[15px] font-bold text-white shadow-[0_8px_14px_rgb(79_0_124_/_22%)]"
            href="#start"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
          >
            Start learning free
          </motion.a>
          <motion.a
            className="inline-flex font-['Lato'] min-h-[50px] items-center justify-center rounded-full border-[2px] border-[#5A0C91] px-[26px] text-[15px] font-bold text-[#620a9d]"
            href="#how-it-works"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
          >
            See how it works
          </motion.a>
        </motion.div>
      </div>
      <motion.article
        className="@container  relative m-[18px_25px] overflow-hidden rounded-[32.56px] bg-[linear-gradient(130deg,#8027bb_0%,#5e0b98_51%,#330052_100%)] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_16%)] max-[700px]:m-[0_16px_16px] "
        aria-label="Featured story: Jemima and the Wind Turbine"
        variants={card}
      >
        <motion.span
          className="absolute top-[5.5%] right-[4.2%] rounded-full bg-[#f9ad32] px-[clamp(16px,3.4cqw,36px)] py-[clamp(10px,2.5cqw,26px)] text-[clamp(12px,2.7cqw,27px)] leading-none font-extrabold tracking-[-0.02em] text-[#1f0a33] shadow-[0_8px_17px_rgb(24_0_45_/_22%)]"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 18,
            delay: 0.6,
          }}
        >
          5,000+ students
        </motion.span>
        <WaterDroplet />
        <motion.div
          className="absolute right-[5.3%] bottom-[7%] left-[5.3%]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-[clamp(8px,1.3cqw,18px)] text-[clamp(16px,4cqw,40px)] leading-[1.08] font-extrabold tracking-[-0.03em]">
            Jemima &amp; the Wind Turbine
          </h2>
          <p className="m-0 text-[clamp(13px,2.7cqw,28px)] leading-tight font-normal text-white/85">
            This week&apos;s featured story · 12 min read
          </p>
        </motion.div>
      </motion.article>
    </motion.section>
  );
}
