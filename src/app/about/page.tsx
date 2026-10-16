import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TrustStrip } from "@/components/TrustStrip";

export const metadata: Metadata = {
  title: "About us | Eko Pages",
  description:
    "Eko Pages is a publishing outfit that immerses children in environmental sustainability through books, stories and publications.",
};

const purpose = [
  "Our purpose is simple — to catch them young and inspire children to lead the next generation with a deep understanding of sustainability issues, foundational literacy, and numeracy. We promote stories and educational content that reflect African cultures and realities, ensuring that every Nigerian child achieves basic literacy and numeracy by 2030 while acquiring the knowledge and skills to drive sustainable development in line with SDG 4 — eliminating disparities, ensuring that no child is left behind in the pursuit of a better, greener planet.",
  "Eko Pages is a publishing outfit that immerses children into the act of environmental sustainability with our top books, stories and publications.",
];

const whyEkoPages = [
  "At Eko Pages, we believe that education is the foundation of progress and that empowering children and educators with the right tools can transform communities. Our platform uniquely combines foundational literacy and numeracy education with climate and sustainability-focused content, ensuring that young learners are equipped not only with essential academic skills but also with the awareness and capacity to address global challenges. In a world increasingly shaped by environmental crises, Eko Pages fills a critical gap by embedding sustainability into education, fostering a generation of informed and proactive changemakers.",
  "What sets Eko Pages apart is our deep commitment to local relevance and accessibility. Our books and e-learning materials are tailored to reflect African cultures, stories, and realities, making education relatable and impactful for children across Nigeria. With a vision to ensure every child achieves basic literacy and numeracy by 2030, we combine storytelling, innovative technology, and hands-on community programs to deliver high-quality education at scale. By choosing Eko Pages, you are supporting a movement that empowers learners, strengthens communities, and builds a sustainable future for all.",
];

const beliefs = [
  {
    title: "Vision",
    icon: "/about/vision.png",
    text: "To create a world where every child and educator is equipped in foundational learning to drive sustainable development and make informed choices for a better planet.",
  },
  {
    title: "Mission",
    icon: "/about/mission.png",
    text: "To empower children and educators with foundational literacy, numeracy, and climate education through our innovative e-learning platform, engaging literature, and hands-on community programs. We aim to build a generation equipped with the knowledge and skills needed to drive sustainable development, address global challenges, and make informed choices for a better, greener planet by 2030.",
  },
];

const team = [
  { name: "Tenn Zipa", role: "Team lead", photo: "/about/images1.png" },
  { name: "Yetunde Fadeyi", role: "C.O.O", photo: "/about/images2.png" },
  {
    name: "Mariam Olayiwola",
    role: "Head of Comms",
    photo: "/about/images2.png",
  },
  { name: "Melvin Enoch", role: "Creative Lead", photo: "/about/images1.png" },
  {
    name: "Oyinda Ahmed",
    role: "Product Designer / Manager",
    photo: "/about/images2.png",
  },
  {
    name: "Lateefah Rufai",
    role: "Product Designer / Manager",
    photo: "/about/images2.png",
  },
  {
    name: "Olabode Ezekiel",
    role: "Software Engineer",
    photo: "/about/images1.png",
  },
  {
    name: "Ayomide Adewale",
    role: "Backend Developer",
    photo: "/about/images2.png",
  },
  // { name: "Akinfolarin Stephen", role: "Frontend Developer", photo: "/about/images2.png" },
  { name: "Adigun Kunle", role: "Legal Advisory", photo: "/about/images2.png" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="About us"
          title="Catch them young, and they lead the next generation"
          description="Eko Pages is a publishing outfit that immerses children in environmental sustainability through books, stories and publications."
        />

        <section
          className="mx-auto grid w-[calc(100%-3rem)] max-w-[1140px] grid-cols-[1fr_360px] items-center gap-12 pt-[90px] max-[900px]:grid-cols-1 max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
          id="our-story"
          aria-label="Our purpose"
        >
          <RevealGroup>
            <RevealItem>
              <h2 className="font-['Baloo_2'] text-[32px] leading-tight font-bold text-[#1e0a39]">
                Our purpose
              </h2>
            </RevealItem>
            {purpose.map((paragraph) => (
              <RevealItem key={paragraph.slice(0, 24)}>
                <p className="mt-4 font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]">
                  {paragraph}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal
            className="justify-self-center max-[900px]:justify-self-start"
            delay={0.15}
          >
            <Image
              src="/about/earth.png"
              alt=""
              width={360}
              height={360}
              className="h-auto w-[360px] max-w-full"
            />
          </Reveal>
        </section>

        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
          aria-label="Why Eko Pages"
        >
          <RevealGroup className="max-w-[860px]">
            <RevealItem>
              <h2 className="font-['Baloo_2'] text-[32px] leading-tight font-bold text-[#1e0a39]">
                Why Eko Pages?
              </h2>
            </RevealItem>
            {whyEkoPages.map((paragraph) => (
              <RevealItem key={paragraph.slice(0, 24)}>
                <p className="mt-4 font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]">
                  {paragraph}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
          aria-label="Vision and mission"
        >
          <RevealGroup className="grid grid-cols-2 gap-6 max-[760px]:grid-cols-1">
            {beliefs.map((belief) => (
              <RevealItem
                as="article"
                className="rounded-[20px] border border-[#e8e3db] bg-white p-8 shadow-[0_7px_16px_rgb(50_32_18_/_8%)]"
                key={belief.title}
              >
                <Image
                  src={belief.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain"
                />
                <h3 className="mt-5 font-['Baloo_2'] text-[24px] leading-tight font-bold text-[#1e0a39]">
                  {belief.title}
                </h3>
                <p className="mt-3 font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]">
                  {belief.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] pb-[68px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
          aria-label="The team"
        >
          <Reveal>
            <h2 className="font-['Baloo_2'] text-[32px] leading-tight font-bold text-[#1e0a39]">
              Meet the team
            </h2>
            <p className="mt-2.5 font-['Lato'] text-[16px] text-[#4A4A4A]">
              The publishers, designers and engineers behind Eko Pages.
            </p>
          </Reveal>
          <RevealGroup
            className="mt-8 grid grid-cols-4 gap-6 max-[900px]:grid-cols-3 max-[640px]:grid-cols-2"
            stagger={0.06}
          >
            {team.map((member) => (
              <RevealItem
                as="article"
                className="rounded-[18px] border border-dashed border-[#c9a3dd] bg-white/60 px-4 py-6 text-center"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                key={member.name}
              >
                <Image
                  src={member.photo}
                  alt=""
                  width={120}
                  height={120}
                  className="mx-auto h-[120px] w-[120px] object-contain"
                />
                <h3 className="mt-4 font-['Baloo_2'] text-[16px] leading-tight font-bold text-[#1F0A33]">
                  {member.name}
                </h3>
                <p className="mt-1 font-['Lato'] text-[13px] leading-[18px] text-[#4A4A4A]">
                  {member.role}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        <TrustStrip />
      </main>
      <Footer />
    </>
  );
}
