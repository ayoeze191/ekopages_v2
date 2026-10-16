import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { PartnerForm } from "@/components/PartnerForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TrustStrip } from "@/components/TrustStrip";

export const metadata: Metadata = {
  title: "Become a partner | Eko Pages",
  description:
    "Partner with Eko Pages on SDG projects for children — schools, sponsors and organisations welcome.",
};

const ways = [
  {
    title: "Sponsor a literacy drive",
    text: "Fund books, facilitators and materials for a school or community drive, and get a full report of the children reached.",
  },
  {
    title: "Partner as a school",
    text: "Bring Eko Learn packages, story sessions and SDG workshops to your pupils through a school-wide partnership.",
  },
  {
    title: "Collaborate on a project",
    text: "Co-create exhibitions, novelty matches and campaigns like the ones we run with our existing partners.",
  },
];

export default function BecomeAPartnerPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Become a partner"
          title="Are you passionate about SDG projects for children?"
          description="Tell us what you have in mind and our team will come back to you, or email sales@ekopages.com directly."
        />

        <section
          className="mx-auto grid w-[calc(100%-3rem)] max-w-[1140px] grid-cols-[1fr_1fr] items-start gap-12 pt-[90px] pb-[68px] max-[900px]:grid-cols-1 max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
          aria-label="Partner with us"
        >
          <RevealGroup>
            <RevealItem>
              <h2 className="font-['Baloo_2'] text-[32px] leading-tight font-bold text-[#1e0a39]">
                Ways we work together
              </h2>
            </RevealItem>
            {ways.map((way) => (
              <RevealItem key={way.title}>
                <h3 className="mt-6 font-['Baloo_2'] text-[18px] leading-tight font-bold text-[#1F0A33]">
                  {way.title}
                </h3>
                <p className="mt-2 max-w-[460px] font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]">
                  {way.text}
                </p>
              </RevealItem>
            ))}
            <RevealItem>
              <p className="mt-8 font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]">
                Prefer email? Write to{" "}
                <a
                  className="font-bold text-[#5A0C91] underline"
                  href="mailto:sales@ekopages.com"
                >
                  sales@ekopages.com
                </a>
                .
              </p>
            </RevealItem>
          </RevealGroup>

          <Reveal
            className="rounded-[20px] border border-[#e8e3db] bg-white p-8 shadow-[0_7px_16px_rgb(50_32_18_/_8%)] max-[700px]:p-6"
            delay={0.15}
          >
            <PartnerForm />
          </Reveal>
        </section>

        <TrustStrip />
      </main>
      <Footer />
    </>
  );
}
