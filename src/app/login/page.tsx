import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForms } from "@/components/auth/AuthForms";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Sign in | Eko Pages",
  description: "Sign in to Eko Learn for your courses, quizzes, certificates and orders.",
};

const perks = [
  "Pick up your SDG courses where you left off.",
  "Take pop quizzes and collect certificates.",
  "Track the books and merch you've ordered.",
];

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Your account"
          title="Sign in to Eko Pages"
          description="Your courses, quizzes, certificates and orders all live in one place."
        />
        <section
          className="mx-auto grid w-[calc(100%-3rem)] max-w-[1140px] grid-cols-[1fr_460px] items-start gap-14 pt-[72px] pb-[68px] max-[900px]:grid-cols-1 max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-10"
          aria-label="Sign in"
        >
          <RevealGroup>
            <RevealItem>
              <h2 className="font-['Baloo_2'] text-[32px] leading-tight font-bold text-[#1e0a39]">
                One account, everything Eko
              </h2>
            </RevealItem>
            {perks.map((perk) => (
              <RevealItem key={perk}>
                <p className="mt-4 max-w-[460px] font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]">
                  {perk}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <Suspense fallback={<div className="min-h-[520px]" />}>
              <AuthForms />
            </Suspense>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
