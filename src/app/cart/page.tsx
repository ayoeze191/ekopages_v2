import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Your cart | Eko Pages",
  description: "The books and merch in your Eko Store basket.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Eko Store"
          title="Your cart"
          description="Review your books and merch before checking out."
        />
        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] pb-[68px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-10"
          aria-label="Cart"
        >
          <Reveal>
            <CartView />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
