/**
 * The design's "→". A typed arrow can't be used: the Lato web subset has no
 * U+2192 glyph, so the browser substitutes a thinner, lower one from another font.
 */
export function ArrowRight({ className = "h-[14px] w-[14px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}
