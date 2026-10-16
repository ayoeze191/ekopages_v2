import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ArrowRight";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { articleExcerpt, formatNewsDate, type NewsArticle } from "@/lib/news";
import { photoUrl } from "@/lib/photo";

/** Same 3-up card grid as the projects page: 364px cards in the 1140 frame. */
export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  if (articles.length === 0) {
    return (
      <p className="py-10 text-center font-['Lato'] text-[14px] text-[#6b646a]">
        No stories published yet — check back shortly.
      </p>
    );
  }

  return (
    <RevealGroup className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
      {articles.map((article) => (
        <RevealItem
          as="article"
          className="group h-full overflow-hidden rounded-[14px] border border-[#e8e3db] bg-white shadow-[0_7px_16px_rgb(50_32_18_/_8%)] transition-shadow duration-300 hover:shadow-[0_16px_30px_rgb(50_32_18_/_12%)]"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          key={article.id}
        >
          <Link className="flex h-full flex-col" href={`/news/${article.id}`}>
            <div className="relative h-[190px] shrink-0 bg-[#efe7f4]">
              <Image
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                src={photoUrl(article.image, 480)}
                alt=""
                fill
                sizes="(max-width: 560px) 100vw, 364px"
                unoptimized
              />
            </div>
            <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
              <p className="font-['Lato'] text-[12px] leading-[16px] font-bold tracking-[0.08em] text-[#6b646a] uppercase">
                {formatNewsDate(article.date_created)}
              </p>
              <h3 className="mt-2 font-['Baloo_2'] text-[18px] leading-tight font-bold text-[#1F0A33]">
                {article.title}
              </h3>
              <p className="mt-2.5 font-['Lato'] text-[14px] leading-[22.4px] text-[#4A4A4A]">
                {articleExcerpt(article.body)}
              </p>
              <span className="mt-auto flex w-fit items-center gap-1 pt-4 font-['Lato'] text-[14px] leading-[17px] font-bold text-[#5A0C91]">
                Read story
                <ArrowRight className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
