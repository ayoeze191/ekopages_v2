/**
 * Shared helpers for the backend's long-form copy, which arrives as loose text
 * sprinkled with stray </p> tags and CRLFs rather than real HTML.
 */
export function toParagraphs(body: string): string[] {
  return body
    // Editors type paragraph breaks into the Django admin by hand, so accept
    // every spelling they reach for: </p>, <p>, <p/>, <p />, <br>, <br/>.
    .replace(/<\s*\/?\s*p\s*\/?\s*>/gi, "\n")
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/&nbsp;/gi, " ")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function toExcerpt(body: string, maxLength = 150): string {
  const [first = ""] = toParagraphs(body);
  if (first.length <= maxLength) return first;
  const cut = first.slice(0, maxLength);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
