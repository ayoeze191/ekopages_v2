import { API_BASE } from "@/lib/config";

/** Eko Tales, from the endpoints v1 used: services/tales/ and services/tale_of_the_week/ */
export type Tale = {
  id: number;
  title: string;
  body: string;
  image: string;
  date_created: string;
};

type TaleListResponse = { message?: string; data?: Tale[] };

/**
 * services/tale_of_the_week/ is the full archive and the only endpoint that
 * returns a body; services/tales/ returns titles and covers only.
 */
export async function getTales(): Promise<Tale[]> {
  try {
    const response = await fetch(`${API_BASE}/services/tale_of_the_week/`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    const payload: TaleListResponse = await response.json();
    if (!Array.isArray(payload.data)) return [];
    return [...payload.data].sort(
      (a, b) => Date.parse(b.date_created) - Date.parse(a.date_created),
    );
  } catch {
    return [];
  }
}

export async function getTale(id: number): Promise<Tale | null> {
  const tales = await getTales();
  return tales.find((tale) => tale.id === id) ?? null;
}
