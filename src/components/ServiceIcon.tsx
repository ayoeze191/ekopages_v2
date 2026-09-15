export type ServiceIconName = "book" | "heart" | "document" | "documentText" | "person";

/** Shared with the store's save-for-later button, which fills it in. */
export const heartPath =
  "M11.0629 16.8387C11.0629 16.8387 4.06292 12.4887 1.56292 8.63868C-0.137078 5.43868 1.06292 1.83868 4.46292 0.938678C6.46292 0.438678 8.26292 1.33868 9.06292 2.83868C9.86292 1.33868 11.6629 0.438678 13.6629 0.938678C17.0629 1.83868 18.2629 5.43868 16.5629 8.63868C14.0629 12.4887 11.0629 16.8387 11.0629 16.8387Z";

const documentOutline =
  "M0.796875 15.7998V2.7998C0.796875 2.26937 1.00759 1.76066 1.38266 1.38559C1.75773 1.01052 2.26644 0.799805 2.79688 0.799805H11.7969L16.7969 5.7998V15.7998C16.7969 16.3302 16.5862 16.8389 16.2111 17.214C15.836 17.5891 15.3273 17.7998 14.7969 17.7998H2.79688C2.26644 17.7998 1.75773 17.5891 1.38266 17.214C1.00759 16.8389 0.796875 16.3302 0.796875 15.7998Z";

const icons: Record<ServiceIconName, { viewBox: string; paths: React.ReactNode }> = {
  book: {
    viewBox: "0 0 24 24",
    paths: (
      <>
        <path d="M4 5.5C4 4.83696 4.26339 4.20107 4.73223 3.73223C5.20107 3.26339 5.83696 3 6.5 3H20V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H4V5.5Z" />
        <path d="M4 17.5C4 16.837 4.26339 16.2011 4.73223 15.7322C5.20107 15.2634 5.83696 15 6.5 15H20" />
      </>
    ),
  },
  heart: {
    viewBox: "0 0 19 18",
    paths: <path d={heartPath} />,
  },
  document: {
    viewBox: "0 0 18 19",
    paths: <path d={documentOutline} />,
  },
  /** The Services page design draws the page with two text lines inside. */
  documentText: {
    viewBox: "0 0 18 19",
    paths: (
      <>
        <path d={documentOutline} />
        <path d="M5 8.8H12.6M5 12.4H10.2" strokeLinecap="round" />
      </>
    ),
  },
  person: {
    viewBox: "0 0 24 24",
    paths: (
      <>
        <path d="M12.0016 11.3996C13.8793 11.3996 15.4016 9.87738 15.4016 7.99961C15.4016 6.12184 13.8793 4.59961 12.0016 4.59961C10.1238 4.59961 8.60156 6.12184 8.60156 7.99961C8.60156 9.87738 10.1238 11.3996 12.0016 11.3996Z" />
        <path
          d="M5 20C6 16.5 9 14.5 12 14.5C15 14.5 18 16.5 19 20"
          strokeLinecap="round"
        />
      </>
    ),
  },
};

/** Each icon at the size it was drawn (the SVGs' own width/height), which keeps the 1.6px strokes visually even. */
export const naturalIconSize: Record<ServiceIconName, string> = {
  book: "h-6 w-6",
  heart: "h-[18px] w-[19px]",
  document: "h-[19px] w-[18px]",
  documentText: "h-[19px] w-[18px]",
  person: "h-6 w-6",
};

export function ServiceIcon({
  icon,
  className = "h-[17px] w-[17px]",
}: {
  icon: ServiceIconName;
  className?: string;
}) {
  return (
    <svg
      className={`${className} fill-none stroke-current stroke-[1.6]`}
      viewBox={icons[icon].viewBox}
      aria-hidden="true"
    >
      {icons[icon].paths}
    </svg>
  );
}
