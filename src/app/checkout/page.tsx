import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Checkout | Eko Pages",
  description: "Enter your billing details and complete your Eko Store order.",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Eko Store"
          title="Checkout"
          description="Tell us where the books should go, and we'll hand you over to payment."
        />
        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] pb-[68px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-10"
          aria-label="Checkout"
        >
          <Reveal>
            <CheckoutView />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
