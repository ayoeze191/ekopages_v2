import { Fragment } from "react";
import { INLINE_TAG, stripInlineTags } from "@/lib/text";

/**
 * Renders a paragraph that editors wrote in the Django admin, honouring the
 * handful of inline tags they use: <b>/<strong> and <i>/<em>.
 *
 * Deliberately not dangerouslySetInnerHTML — this builds React elements from an
 * allowlist, so nothing else in the text can turn into markup.
 */
export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  const pattern = new RegExp(INLINE_TAG.source, "gi");
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const plain = (value: string) => stripInlineTags(value);

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={lastIndex}>{plain(text.slice(lastIndex, match.index))}</Fragment>);
    }
    const tag = match[1].toLowerCase();
    const inner = plain(match[2]);
    nodes.push(
      tag === "b" || tag === "strong" ? (
        <strong className="font-bold text-[#1F0A33]" key={match.index}>
          {inner}
        </strong>
      ) : (
        <em key={match.index}>{inner}</em>
      ),
    );
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    // Anything left over, including a stray unclosed tag, stays plain text.
    nodes.push(<Fragment key={lastIndex}>{plain(text.slice(lastIndex))}</Fragment>);
  }

  return <>{nodes}</>;
}
