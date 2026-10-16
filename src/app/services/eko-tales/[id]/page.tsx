import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TalesGrid } from "@/components/TalesGrid";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { photoUrl } from "@/lib/photo";
import { getTale, getTales } from "@/lib/tales";
import { formatDate, toExcerpt, toParagraphs } from "@/lib/text";

type TaleParams = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const tales = await getTales();
  return tales.map((tale) => ({ id: String(tale.id) }));
}

export async function generateMetadata({ params }: TaleParams): Promise<Metadata> {
  const { id } = await params;
  const tale = await getTale(Number(id));
  if (!tale) return { title: "Tale not found | Eko Pages" };
  return { title: `${tale.title} | Eko Tales`, description: toExcerpt(tale.body, 155) };
}

export default async function TalePage({ params }: TaleParams) {
  const { id } = await params;
  const tale = await getTale(Number(id));
  if (!tale) notFound();

  const paragraphs = toParagraphs(tale.body);
  const otherTales = (await getTales()).filter((other) => other.id !== tale.id).slice(0, 3);

  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <article className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[56px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-8">
          <RevealGroup>
            <RevealItem>
              <Link
                className="font-['Lato'] text-[14px] font-bold text-[#5A0C91]"
                href="/services/eko-tales"
              >
                ← Eko Tales
              </Link>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 font-['Lato'] text-[13px] leading-[16px] font-bold tracking-[0.08em] text-[#6b646a] uppercase">
                {formatDate(tale.date_created)}
              </p>
              <h1 className="mt-3 max-w-[860px] font-['Baloo_2'] text-[36px] leading-[1.2] font-bold text-[#1F0A33] max-[700px]:text-[28px]">
                {tale.title}
              </h1>
            </RevealItem>
            <RevealItem>
              <div className="relative mt-8 h-[420px] overflow-hidden rounded-[28px] bg-[#efe7f4] max-[700px]:h-[220px]">
                <Image
                  className="object-cover"
                  src={photoUrl(tale.image, 1140)}
                  alt=""
                  fill
                  sizes="(max-width: 1140px) 100vw, 1140px"
                  priority
                  unoptimized
                />
              </div>
            </RevealItem>
          </RevealGroup>

          <Reveal className="mt-10 max-w-[760px]">
            {paragraphs.map((paragraph, index) => (
              <p
                className="mb-5 font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]"
                key={index}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </article>

        {otherTales.length > 0 && (
          <section
            className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] pb-[44px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
            aria-label="More tales"
          >
            <Reveal>
              <h2 className="mb-7 font-['Baloo_2'] text-[24px] leading-tight font-bold text-[#1e0a39]">
                More Eko Tales
              </h2>
            </Reveal>
            <TalesGrid tales={otherTales} />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
