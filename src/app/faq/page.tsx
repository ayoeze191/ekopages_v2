import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "FAQs | Eko Pages",
  description: "Common questions about Eko Pages, Eko Learn and buying our books.",
};

/** Answers carried over from v1's FAQ page. */
const faqs: FaqItem[] = [
  {
    question: "What is Eko Pages?",
    answer: [
      "Eko Pages is a publishing outfit that immerses children into the act of environmental sustainability with our top books and stories.",
    ],
  },
  {
    question: "How do I buy books?",
    answer: [
      "There are multiple ways to buy books on the Eko Pages website.",
      "To start, you can search for the book you want in our search bar. You can also browse to the books or Eko Store to purchase your preferred book.",
      "When you find a book you like, click “Buy now” to add it to your shopping cart — you can always remove items later.",
      "Enter your billing details and choose your delivery location. Once done, click “Place order” at the bottom right of your screen, and you will be directed to make payment for your order.",
    ],
  },
  {
    question: "How do I subscribe to Eko Learn?",
    answer: [
      "You can subscribe to Eko Learn on the Eko Pages website when you create a profile. You will be required to pay a yearly subscription. Once you have subscribed, you will gain access to books, courses and certifications.",
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="FAQs"
          title="Frequently asked questions"
          description="Here are some common questions asked by users about Eko Pages."
        />
        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[860px] pt-[90px] pb-[68px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
          aria-label="Frequently asked questions"
        >
          <Reveal>
            <FaqAccordion items={faqs} />
          </Reveal>
          <Reveal className="mt-8 text-center" delay={0.1}>
            <p className="font-['Lato'] text-[15px] leading-[26px] text-[#4A4A4A]">
              Still need a hand? Read more{" "}
              <Link className="font-bold text-[#5A0C91] underline" href="/about">
                about Eko Pages
              </Link>{" "}
              or browse{" "}
              <Link className="font-bold text-[#5A0C91] underline" href="/services">
                our services
              </Link>
              .
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
