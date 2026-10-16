import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { TalesGrid } from "@/components/TalesGrid";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { photoUrl } from "@/lib/photo";
import { getTales } from "@/lib/tales";
import { toExcerpt } from "@/lib/text";

export const metadata: Metadata = {
  title: "Eko Tales | Eko Pages",
  description:
    "A weekly publication of children's stories, with themes that align with the Sustainable Development Goals.",
};

const howItWorks = [
  "Each tale aligns with the Sustainable Development Goals.",
  "You can get notified when a new tale is released by subscribing to our newsletter.",
];

export default async function EkoTalesPage() {
  const tales = await getTales();
  const [latest, ...archive] = tales;

  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Services"
          title="Eko Tales"
          description="A weekly publication of children's stories, with themes that align with the Sustainable Development Goals."
        />

        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-10"
          aria-label="About Eko Tales"
        >
          <Reveal>
            <Link className="font-['Lato'] text-[14px] font-bold text-[#5A0C91]" href="/services">
              ← Back to services
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 items-center gap-12 max-[900px]:grid-cols-1">
            <Reveal className="overflow-hidden rounded-[20px] bg-[#efe7f4]">
              <Image
                src="/services/eko-tales.png"
                alt="Eko Tales story illustration"
                width={720}
                height={480}
                className="h-auto w-full object-cover"
              />
            </Reveal>
            <RevealGroup delay={0.1}>
              <RevealItem>
                <p className="font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]">
                  This is a weekly publication of children&apos;s stories, with themes that align
                  with the Sustainable Development Goals.
                </p>
              </RevealItem>
              <RevealItem>
                <div className="mt-6 rounded-[16px] bg-[#EFE7F4] px-6 py-6">
                  <p className="font-['Baloo_2'] text-[16px] leading-tight font-bold text-[#1F0A33]">
                    Eko Tales are published on a weekly basis
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 font-['Lato'] text-[15px] leading-[26px] text-[#4A4A4A]">
                    {howItWorks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {latest && (
          <section
            className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
            aria-label="Tale of the week"
          >
            <Reveal>
              <h2 className="font-['Baloo_2'] text-[32px] leading-tight font-bold text-[#1e0a39]">
                Tale of the week
              </h2>
            </Reveal>
            <Reveal
              className="mt-7 grid grid-cols-[1.1fr_1fr] items-center gap-10 overflow-hidden rounded-[20px] border border-[#e8e3db] bg-white p-7 shadow-[0_7px_16px_rgb(50_32_18_/_8%)] max-[900px]:grid-cols-1 max-[700px]:p-5"
              delay={0.1}
            >
              <div className="relative h-[320px] overflow-hidden rounded-[14px] bg-[#efe7f4] max-[700px]:h-[220px]">
                <Image
                  className="object-cover"
                  src={photoUrl(latest.image, 760)}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 600px"
                  priority
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-['Baloo_2'] text-[24px] leading-tight font-bold text-[#1F0A33]">
                  {latest.title}
                </h3>
                <p className="mt-3 font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]">
                  {toExcerpt(latest.body, 320)}
                </p>
                <Link
                  className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#5A0C91] px-[26px] font-['Lato'] text-[15px] font-bold text-white shadow-[0_8px_14px_rgb(79_0_124_/_22%)] transition hover:-translate-y-0.5"
                  href={`/services/eko-tales/${latest.id}`}
                >
                  Continue reading
                </Link>
              </div>
            </Reveal>
          </section>
        )}

        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] pb-[68px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
          aria-label="All tales"
        >
          <Reveal>
            <h2 className="mb-7 font-['Baloo_2'] text-[32px] leading-tight font-bold text-[#1e0a39]">
              All tales
            </h2>
          </Reveal>
          <TalesGrid tales={archive} />
        </section>
      </main>
      <Footer />
    </>
  );
}
