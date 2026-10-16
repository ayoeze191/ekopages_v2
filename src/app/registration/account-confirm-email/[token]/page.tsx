import type { Metadata } from "next";
import { VerifyEmail } from "@/components/auth/VerifyEmail";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Confirm your email | Eko Pages",
  description: "Confirm your Eko Pages email address.",
};

/** The backend's confirmation emails link here, so the path matches v1's route. */
export default async function ConfirmEmailPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Your account"
          title="Confirm your email"
          description="We're activating your Eko Pages account."
        />
        <section className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] pb-[68px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-10">
          <VerifyEmail token={token} />
        </section>
      </main>
      <Footer />
    </>
  );
}
