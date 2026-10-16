"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { displayName, useAuth } from "@/components/auth/AuthProvider";
import { DashboardIcon, type DashboardIconName } from "@/components/dashboard/icons";
import { EASE_OUT } from "@/components/motion/Reveal";

const navigation: { label: string; href: string; icon: DashboardIconName }[] = [
  { label: "Dashboard", href: "/dashboard", icon: "home" },
  { label: "My courses", href: "/dashboard/courses", icon: "courses" },
  { label: "Certificates", href: "/dashboard/certificates", icon: "certificate" },
  { label: "My orders", href: "/dashboard/orders", icon: "orders" },
  { label: "My books", href: "/dashboard/books", icon: "books" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { status, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Signed-out visitors get sent to the login page, and back here afterwards.
  useEffect(() => {
    if (status !== "anonymous") return;
    router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [status, pathname, router]);

  if (status !== "authenticated") {
    return (
      <div className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] py-24 text-center font-['Lato'] text-[15px] text-[#6b646a]">
        {status === "loading" ? "Loading your dashboard…" : "Taking you to sign in…"}
      </div>
    );
  }

  const name = displayName(user);
  const current = navigation.find((item) => item.href === pathname);

  return (
    <>
      {/* Same purple banner that opens every other page, carrying the greeting. */}
      <section className="bg-[linear-gradient(115deg,#5A0C91_0%,#3B0766_55%,#1F0A33_100%)] text-white">
        <motion.div
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-10 pb-[104px] max-[700px]:w-[calc(100%-2rem)]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <p className="font-['Lato'] text-[14px] leading-[1.2] text-white/80">
            {current?.label ?? "Dashboard"}
          </p>
          <h1 className="mt-4 font-['Baloo_2'] text-[36px] leading-[1.2] font-bold max-[700px]:text-[28px]">
            Hello, {name}
          </h1>
          <p className="mt-2 font-['Lato'] text-[16px] leading-[24px] text-white/80">
            Your courses, certificates and orders, all in one place.
          </p>
        </motion.div>
      </section>

      {/* Pulled up so the panels overlap the banner. */}
      <div className="relative z-10 mx-auto -mt-[64px] grid w-[calc(100%-3rem)] max-w-[1140px] grid-cols-[250px_1fr] items-start gap-7 pb-[68px] max-[900px]:grid-cols-1 max-[700px]:w-[calc(100%-2rem)]">
        <motion.nav
          className="sticky top-[90px] overflow-hidden rounded-[20px] border border-[#e8e3db] bg-white p-3 shadow-[0_14px_30px_rgb(31_10_51_/_12%)] max-[900px]:static max-[900px]:flex max-[900px]:gap-2 max-[900px]:overflow-x-auto"
          aria-label="Dashboard"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE_OUT }}
        >
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                className={`relative flex items-center gap-3 rounded-[14px] px-3 py-3 font-['Lato'] text-[14px] font-bold whitespace-nowrap transition-colors ${
                  active ? "text-[#5A0C91]" : "text-[#4A4A4A] hover:text-[#1F0A33]"
                }`}
                href={item.href}
                key={item.href}
              >
                {active && (
                  <motion.span
                    className="absolute inset-0 rounded-[14px] bg-[#f3eef8]"
                    layoutId="dashboard-nav"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-[10px] ${
                    active ? "bg-[#5A0C91] text-white" : "bg-[#f3eef8] text-[#5A0C91]"
                  }`}
                >
                  <DashboardIcon name={item.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
          <Link
            className="mt-2 flex min-h-[44px] items-center justify-center rounded-full bg-[#5A0C91] px-4 font-['Lato'] text-[14px] font-bold whitespace-nowrap text-white max-[900px]:mt-0"
            href="/courses"
          >
            Explore courses
          </Link>
        </motion.nav>

        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}

/** Shared card chrome for dashboard panels. */
export function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[20px] border border-[#e8e3db] bg-white p-7 shadow-[0_14px_30px_rgb(31_10_51_/_8%)] max-[700px]:p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-['Baloo_2'] text-[20px] leading-tight font-bold text-[#1e0a39]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function EmptyState({ message, cta }: { message: string; cta?: React.ReactNode }) {
  return (
    <div className="rounded-[16px] bg-[#faf7f2] py-10 text-center">
      <p className="font-['Lato'] text-[15px] text-[#6b646a]">{message}</p>
      {cta && <div className="mt-5">{cta}</div>}
    </div>
  );
}
