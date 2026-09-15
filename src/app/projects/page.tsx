import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectsView } from "@/components/ProjectsView";

export const metadata: Metadata = {
  title: "Projects | Eko Pages",
  description:
    "Sustainability projects run with partner schools and communities across Africa.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <ProjectsView />
      </main>
      <Footer />
    </>
  );
}
