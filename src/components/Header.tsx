import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";

const navigation = [
  { label: "About us", href: "/#about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Store", href: "/#store" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-y border-y-[#eee7de] border-t-[#3b3340] bg-[#FAF7EF]">
      <div className="mx-auto grid h-[65px] w-[calc(100%-3rem)] max-w-[1180px] grid-cols-[1fr_auto_1fr] items-center max-[700px]:h-[62px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:grid-cols-[auto_1fr]">
        <Link
          className="logo flex w-fit items-center"
          href="/"
          aria-label="Eko Pages home"
        >
          <Image
            className="h-9 w-auto"
            src="/ekopages-logo.svg"
            width={153}
            height={85}
            alt="Eko Pages"
            priority
          />
        </Link>
        <nav
          className="flex items-center gap-[28px] font-['Lato'] text-[15px] font-normal max-[700px]:hidden"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              className="text-[#1F0A33] font-bold"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="justify-self-end border-0 bg-transparent p-0 text-xs text-[#1e0a39] max-[700px]:hidden"
          type="button"
          aria-label="Open Oyin's account"
        >
          <span
            className="inline-grid aspect-square h-8 w-[32px] place-items-center rounded-full bg-[#620a9d] text-xs font-bold text-white"
            aria-hidden="true"
          >
            O
          </span>
          <span className="ml-2 text-[#232323] text-[14px] font-bold">
            Hello, Oyin
          </span>
        </button>
        <MobileMenu navigation={navigation} />
      </div>
    </header>
  );
}
