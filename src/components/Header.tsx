import Image from "next/image";
import Link from "next/link";
import { AccountMenu } from "@/components/auth/AccountMenu";
import { CartButton } from "@/components/cart/CartButton";
import { MobileMenu } from "@/components/MobileMenu";

const navigation = [
  { label: "About us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Store", href: "/store" },
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
        <div className="flex items-center gap-1 justify-self-end max-[700px]:hidden">
          <CartButton />
          <AccountMenu />
        </div>
        <MobileMenu navigation={navigation} />
      </div>
    </header>
  );
}
