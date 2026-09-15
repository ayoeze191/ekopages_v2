"use client";

import Image from "next/image";
import Link from "next/link";

const columns = [
  { title: "Company", links: ["About us", "Projects", "Become a partner"] },
  { title: "Resources", links: ["Services", "Eko Store", "Eko News", "FAQs"] },
];

const socials = [
  {
    label: "Instagram",
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "Twitter",
    icon: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    ),
  },
];

export function Footer() {
  return (
    <footer className="mt-[100px] bg-[#1e0733] text-white max-[700px]:mt-16">
      <div className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] pt-12 max-[700px]:w-[calc(100%-2rem)]">
        <div className="grid grid-cols-[298fr_249fr_183fr_376fr] gap-6 max-[850px]:grid-cols-2 max-[850px]:gap-10 max-[540px]:grid-cols-1">
          <div>
            <Link className="inline-flex" href="/" aria-label="Eko Pages home">
              {/* The brand logo, knocked out to white for the dark footer. */}
              <Image
                className="h-9 w-auto brightness-0 invert"
                src="/ekopages-logo.svg"
                width={153}
                height={85}
                alt="Eko Pages"
              />
            </Link>
            <p className="mt-5 max-w-[230px] font-['Lato'] text-[14px] leading-[23px] text-white/75">
              Eko Pages is a publishing outfit that immerses children in the act
              of environmental sustainability through books, stories and
              courses.
            </p>
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-['Baloo_2'] text-[14px] leading-tight font-bold">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-2 font-['Lato'] text-[14px] leading-[20px] text-white/75">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      className="transition hover:text-white"
                      href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="rounded-[16px] border border-white/10 bg-white/[0.06] p-6">
            <h2 className="font-['Baloo_2'] text-[18px] leading-tight font-bold">
              Subscribe to our newsletter
            </h2>
            <p className="mt-3 font-['Lato'] text-[12px] leading-[18px] text-white/75">
              The latest developments in Edtech, straight to your inbox.
            </p>
            <form
              className="mt-4 flex gap-2.5"
              action="#"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                className="h-[44px] min-w-0 flex-1 rounded-[10px] bg-[#f4f2f7] px-3.5 font-['Lato'] text-[14px] text-[#1e0a39] outline-none placeholder:text-[#918993] focus:ring-2 focus:ring-[#9868be]"
                id="newsletter-email"
                type="email"
                placeholder="you@email.com"
              />
              <button
                className="h-[44px] shrink-0 rounded-full bg-[#5A0C91] px-[18px] font-['Lato'] text-[13px] font-bold transition hover:bg-[#7915b4]"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/10 py-6 max-[540px]:flex-col max-[540px]:items-start">
          <p className="font-['Lato'] text-[12px] text-white/55">
            © 2026 Eko Pages. All rights reserved.
          </p>
          <div className="flex gap-3.5">
            {socials.map((social) => (
              <a
                className="grid h-[30px] w-[30px] place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 transition hover:border-white/30 hover:text-white"
                href="#social"
                aria-label={social.label}
                key={social.label}
              >
                <svg
                  className="h-[13px] w-[13px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
