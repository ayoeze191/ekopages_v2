import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Reset password | Eko Pages",
  description: "Request a password reset link for your Eko Pages account.",
};

export default function ResetPasswordPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Your account"
          title="Reset your password"
          description="Tell us your email address and we'll send you a link to set a new password."
        />
        <section className="mx-auto w-[calc(100%-3rem)] max-w-[520px] pt-[72px] pb-[68px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-10">
          <Reveal>
            <ResetPasswordForm />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
