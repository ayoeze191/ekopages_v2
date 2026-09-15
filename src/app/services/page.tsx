import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ServicesCatalogue } from "@/components/ServicesCatalogue";

export const metadata: Metadata = {
  title: "Services | Eko Pages",
  description:
    "From daily reading to full school partnerships — every Eko Pages service in one place.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero
          eyebrow="Services"
          title="Everything Eko Pages offers, in one place"
          description="From daily reading to full school partnerships. Pick the service that fits how your child learns."
        />
        <ServicesCatalogue />
      </main>
      <Footer />
    </>
  );
}
