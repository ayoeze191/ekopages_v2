import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentResult } from "@/components/checkout/PaymentResult";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Payment confirmation | Eko Pages",
  description: "Confirmation of your Eko Store order.",
};

export default function PaymentConfirmationPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Eko Store"
          title="Order confirmation"
          description="We're checking the payment with our provider."
        />
        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] pb-[68px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-10"
          aria-label="Payment confirmation"
        >
          <Suspense fallback={<div className="min-h-[320px]" />}>
            <PaymentResult />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
