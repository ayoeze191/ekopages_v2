import { API_BASE } from "@/lib/config";

/** Eko News, from the same backend v1 used: news/news_list/ */
export type NewsArticle = {
  id: number;
  title: string;
  body: string;
  image: string;
  date_created: string;
};

type NewsListResponse = { message?: string; data?: NewsArticle[] };

export async function getNews(): Promise<NewsArticle[]> {
  try {
    const response = await fetch(`${API_BASE}/news/news_list/`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    const payload: NewsListResponse = await response.json();
    if (!Array.isArray(payload.data)) return [];
    // Newest first; the API returns them unsorted.
    return [...payload.data].sort(
      (a, b) => Date.parse(b.date_created) - Date.parse(a.date_created),
    );
  } catch {
    return [];
  }
}

/** There is no per-article endpoint — v1 passed the article through router state. */
export async function getArticle(id: number): Promise<NewsArticle | null> {
  const news = await getNews();
  return news.find((article) => article.id === id) ?? null;
}

export { toParagraphs as articleParagraphs, toExcerpt as articleExcerpt, formatDate as formatNewsDate } from "@/lib/text";
