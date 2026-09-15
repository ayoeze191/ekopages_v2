"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";

const partners = [
  {
    name: "British Council",
    src: "/partners/BritishCouncil.svg",
    width: 175,
    height: 50,
  },
  { name: "Chevening", src: "/partners/chevening.svg", width: 127, height: 126 },
  { name: "TNCI", src: "/partners/tnciLogo.svg", width: 238, height: 68 },
  {
    name: "Lagos State Ministry of Education",
    src: "/partners/lagosGovLogo.svg",
    width: 160,
    height: 158,
  },
  {
    name: "REES Africa",
    src: "/partners/resAfricaLogo.svg",
    width: 230,
    height: 68,
  },
  {
    name: "Federal Ministry of Education",
    src: "/partners/fedLogo.svg",
    width: 168,
    height: 170,
  },
];

/** Gap between logos, in px. Must match GAP_CLASS below. */
const GAP = 56;
const GAP_CLASS = "gap-[56px]";
/** Cruising speed, px per second. */
const SPEED = 42;
/** How quickly the strip reaches (or leaves) cruising speed. Lower = lazier. */
const EASE_MS = 260;

function PartnerLogo({ partner }: { partner: (typeof partners)[number] }) {
  return (
    <motion.div
      className="shrink-0"
      whileHover={{ y: -3, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      <Image
        className="h-[68px] w-[180px] object-contain opacity-75 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
        src={partner.src}
        alt={`${partner.name} logo`}
        width={partner.width}
        height={partner.height}
      />
    </motion.div>
  );
}

function PartnerRow({
  hidden = false,
  ref,
}: {
  hidden?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className={`flex shrink-0 items-center ${GAP_CLASS}`}
      aria-hidden={hidden || undefined}
    >
      {partners.map((partner) => (
        <PartnerLogo key={partner.name} partner={partner} />
      ))}
    </div>
  );
}

function PartnerMarquee() {
  const rowRef = useRef<HTMLDivElement>(null);
  /** Width of one full set of logos plus its trailing gap — the loop period. */
  const periodRef = useRef(0);
  /** Current speed in px/sec, lerped toward the target so hover glides to a stop. */
  const speedRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);

  const measure = useCallback(() => {
    if (rowRef.current) periodRef.current = rowRef.current.offsetWidth + GAP;
  }, []);

  useEffect(() => {
    measure();
    const row = rowRef.current;
    if (!row) return;
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [measure]);

  useAnimationFrame((_, delta) => {
    const period = periodRef.current;
    if (!period) return;

    const target = paused ? 0 : SPEED;
    speedRef.current += (target - speedRef.current) * Math.min(1, delta / EASE_MS);

    let next = x.get() - (speedRef.current * delta) / 1000;
    // Wrap by exactly one period so the second copy lands where the first began.
    if (next <= -period) next += period;
    x.set(next);
  });

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent_0,#000_9%,#000_91%,transparent_100%)]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <motion.div className={`flex w-max items-center ${GAP_CLASS}`} style={{ x }}>
        <PartnerRow ref={rowRef} />
        <PartnerRow hidden />
      </motion.div>
    </div>
  );
}

export function TrustStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className=" border-y border-[#e6dfd5] py-[25px] sm:py-[30px]"
      aria-label="Trusted partners"
    >
      <div className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] max-[700px]:w-[calc(100%-2rem)]">
        <p className="font-['Lato'] text-center text-xs font-bold tracking-[0.17em] text-[#525057]">
          TRUSTED BY EDUCATORS &amp; PARTNERS ACROSS AFRICA
        </p>
        <div className="mt-3.5 sm:mt-4.5">
          {reduceMotion ? (
            <div className={`flex flex-wrap items-center justify-center ${GAP_CLASS}`}>
              {partners.map((partner) => (
                <PartnerLogo key={partner.name} partner={partner} />
              ))}
            </div>
          ) : (
            <PartnerMarquee />
          )}
        </div>
      </div>
    </section>
  );
}
