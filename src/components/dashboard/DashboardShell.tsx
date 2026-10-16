"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { displayName, useAuth } from "@/components/auth/AuthProvider";

const navigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My courses", href: "/dashboard/courses" },
  { label: "Certificates", href: "/dashboard/certificates" },
  { label: "My orders", href: "/dashboard/orders" },
  { label: "My books", href: "/dashboard/books" },
  { label: "Settings", href: "/dashboard/settings" },
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

  return (
    <div className="mx-auto grid w-[calc(100%-3rem)] max-w-[1140px] grid-cols-[250px_1fr] items-start gap-8 pt-10 pb-[68px] max-[900px]:grid-cols-1 max-[700px]:w-[calc(100%-2rem)]">
      <nav
        className="sticky top-[90px] rounded-[20px] border border-[#e8e3db] bg-white p-4 shadow-[0_7px_16px_rgb(50_32_18_/_8%)] max-[900px]:static max-[900px]:flex max-[900px]:gap-2 max-[900px]:overflow-x-auto"
        aria-label="Dashboard"
      >
        <p className="mb-3 px-3 font-['Baloo_2'] text-[16px] font-bold text-[#1F0A33] max-[900px]:hidden">
          Hello, {displayName(user)}
        </p>
        {navigation.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              className={`relative block rounded-[12px] px-3 py-2.5 font-['Lato'] text-[14px] font-bold whitespace-nowrap transition-colors ${
                active ? "text-[#5A0C91]" : "text-[#4A4A4A] hover:text-[#1F0A33]"
              }`}
              href={item.href}
              key={item.href}
            >
              {active && (
                <motion.span
                  className="absolute inset-0 rounded-[12px] bg-[#f3eef8]"
                  layoutId="dashboard-nav"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div>{children}</div>
    </div>
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
    <section className="rounded-[20px] border border-[#e8e3db] bg-white p-7 shadow-[0_7px_16px_rgb(50_32_18_/_8%)] max-[700px]:p-5">
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
    <div className="py-8 text-center">
      <p className="font-['Lato'] text-[15px] text-[#6b646a]">{message}</p>
      {cta && <div className="mt-5">{cta}</div>}
    </div>
  );
}
