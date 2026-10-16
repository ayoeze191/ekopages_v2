import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsGrid } from "@/components/NewsGrid";
import { PageHero } from "@/components/PageHero";
import { getNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "Eko News | Eko Pages",
  description:
    "News and stories about the Sustainable Development Goals, our research and our constantly evolving firm.",
};

export default async function NewsPage() {
  const articles = await getNews();

  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Eko News"
          title="Stories from the drives, the schools and the SDGs"
          description="A collection of news and stories about the Sustainable Development Goals, our research and our constantly evolving firm."
        />
        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[118px] pb-[44px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
          aria-label="News stories"
        >
          <NewsGrid articles={articles} />
        </section>
      </main>
      <Footer />
    </>
  );
}
