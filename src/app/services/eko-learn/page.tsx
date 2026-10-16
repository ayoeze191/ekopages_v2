import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Eko Learn | Eko Pages",
  description:
    "A subscription platform for schools: SDG books, courses, quizzes and certification for pupils and teachers.",
};

const packIncludes = [
  "1 SDG pop-quiz.",
  "1 curated beginner SDG course for children, with certification, or",
  "1 curated beginner SDG teacher-training course, with certification.",
];

const packages = [
  {
    icon: "/services/icon-courses.png",
    title: "SDG courses",
    text: "Curated beginner courses on the Sustainable Development Goals for children and for teachers, each ending in a certificate.",
    href: "/courses",
    linkLabel: "See courses",
  },
  {
    icon: "/services/icon-quizzes.svg",
    title: "Pop quizzes",
    text: "Short, playful quizzes that check what pupils remember after each story or lesson.",
  },
  {
    icon: "/services/icon-books.png",
    title: "SDG themed books",
    text: "Illustrated books written by African authors, with exercises that tie each story back to the goals.",
    href: "/store",
    linkLabel: "See books",
  },
];

export default function EkoLearnPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Services"
          title="Eko Learn"
          description="Subscribe to our affordable school and group packages to access our books, courses, quizzes and games."
        />

        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-10"
          aria-label="About Eko Learn"
        >
          <Reveal>
            <Link className="font-['Lato'] text-[14px] font-bold text-[#5A0C91]" href="/services">
              ← Back to services
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 items-center gap-12 max-[900px]:grid-cols-1">
            <Reveal className="overflow-hidden rounded-[20px] bg-[#efe7f4]">
              <Image
                src="/services/eko-learn.png"
                alt="Children using Eko Learn"
                width={720}
                height={480}
                className="h-auto w-full object-cover"
              />
            </Reveal>
            <RevealGroup delay={0.1}>
              <RevealItem>
                <p className="font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]">
                  This is a subscription-based platform for schools to subscribe their students to.
                  Each school can register as many as 10,000 students on Eko Learn for free.
                </p>
              </RevealItem>
              <RevealItem>
                <div className="mt-6 rounded-[16px] bg-[#EFE7F4] px-6 py-6">
                  <p className="font-['Baloo_2'] text-[16px] leading-tight font-bold text-[#1F0A33]">
                    An Eko Learn subscription pack includes:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 font-['Lato'] text-[15px] leading-[26px] text-[#4A4A4A]">
                    {packIncludes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] pb-[68px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
          aria-label="Package inclusion"
        >
          <Reveal>
            <h2 className="font-['Baloo_2'] text-[32px] leading-tight font-bold text-[#1e0a39]">
              Package inclusion
            </h2>
          </Reveal>
          <RevealGroup className="mt-8 grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            {packages.map((pack) => (
              <RevealItem
                as="article"
                className="flex h-full flex-col rounded-2xl border border-[#E8E3DB] bg-white p-6 shadow-[0_8px_20px_rgb(50_32_18_/_8%)] transition-shadow duration-300 hover:shadow-[0_16px_30px_rgb(50_32_18_/_12%)]"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                key={pack.title}
              >
                <span className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-[#EFE6F5]">
                  <Image src={pack.icon} alt="" width={26} height={26} className="h-[26px] w-[26px] object-contain" />
                </span>
                <h3 className="mt-3 font-['Baloo_2'] text-[18px] leading-tight font-bold text-[#1F0A33]">
                  {pack.title}
                </h3>
                <p className="mt-3.5 font-['Lato'] text-[14px] leading-[22.4px] text-[#4A4A4A]">
                  {pack.text}
                </p>
                {pack.href && (
                  <Link
                    className="mt-auto flex w-fit items-center gap-1 pt-[15px] font-['Lato'] text-[14px] leading-[17px] font-bold text-[#5A0C91]"
                    href={pack.href}
                  >
                    {pack.linkLabel}
                  </Link>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      </main>
      <Footer />
    </>
  );
}
