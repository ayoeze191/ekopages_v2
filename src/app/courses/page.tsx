import type { Metadata } from "next";
import { CourseCatalogue } from "@/components/courses/CourseCatalogue";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Explore courses | Eko Pages",
  description: "SDG courses for children and teachers, with certification.",
};

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Eko Learn"
          title="Explore our SDG courses"
          description="Curated beginner courses for children and for teachers, each ending in a certificate."
        />
        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] pb-[68px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-10"
          aria-label="Courses"
        >
          <Reveal>
            <CourseCatalogue />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
