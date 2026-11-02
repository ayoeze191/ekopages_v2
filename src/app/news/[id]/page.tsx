import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { RichText } from "@/components/RichText";
import { Header } from "@/components/Header";
import { NewsGrid } from "@/components/NewsGrid";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { photoUrl } from "@/lib/photo";
import {
  articleExcerpt,
  articleParagraphs,
  formatNewsDate,
  getArticle,
  getNews,
} from "@/lib/news";

type ArticleParams = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((article) => ({ id: String(article.id) }));
}

export async function generateMetadata({ params }: ArticleParams): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(Number(id));
  if (!article) return { title: "Story not found | Eko Pages" };
  return {
    title: `${article.title} | Eko Pages`,
    description: articleExcerpt(article.body, 155),
  };
}

export default async function ArticlePage({ params }: ArticleParams) {
  const { id } = await params;
  const article = await getArticle(Number(id));
  if (!article) notFound();

  const paragraphs = articleParagraphs(article.body);
  const otherStories = (await getNews())
    .filter((other) => other.id !== article.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <article className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[56px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-8">
          <RevealGroup>
            <RevealItem>
              <Link
                className="font-['Lato'] text-[14px] font-bold text-[#5A0C91]"
                href="/news"
              >
                ← Eko News
              </Link>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 font-['Lato'] text-[13px] leading-[16px] font-bold tracking-[0.08em] text-[#6b646a] uppercase">
                {formatNewsDate(article.date_created)}
              </p>
              <h1 className="mt-3 max-w-[860px] font-['Baloo_2'] text-[36px] leading-[1.2] font-bold text-[#1F0A33] max-[700px]:text-[28px]">
                {article.title}
              </h1>
            </RevealItem>
            <RevealItem>
              {article.image ? (
                <div className="relative mt-8 h-[420px] overflow-hidden rounded-[28px] bg-[#efe7f4] max-[700px]:h-[220px]">
                  <Image
                    className="object-cover"
                    src={photoUrl(article.image, 1140)}
                    alt=""
                    fill
                    sizes="(max-width: 1140px) 100vw, 1140px"
                    priority
                    unoptimized
                  />
                </div>
              ) : (
                // Published without a picture — keep the rhythm with a slim band.
                <div className="mt-8 h-[120px] rounded-[28px] bg-[linear-gradient(130deg,#8027bb_0%,#5e0b98_51%,#330052_100%)]" />
              )}
            </RevealItem>
          </RevealGroup>

          <Reveal className="mt-10 max-w-[760px]">
            {paragraphs.map((paragraph, index) => (
              <p
                className="mb-5 font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]"
                key={index}
              >
                <RichText text={paragraph} />
              </p>
            ))}
          </Reveal>
        </article>

        {otherStories.length > 0 && (
          <section
            className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] pb-[44px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
            aria-label="Other stories"
          >
            <Reveal>
              <h2 className="mb-7 font-['Baloo_2'] text-[24px] leading-tight font-bold text-[#1e0a39]">
                Other interesting reads
              </h2>
            </Reveal>
            <NewsGrid articles={otherStories} />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
