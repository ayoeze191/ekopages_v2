import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProjectCards } from "@/components/ProjectGrid";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getProject, projects } from "@/lib/projects";

type ProjectParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectParams): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found | Eko Pages" };
  return {
    title: `${project.title} | Eko Pages`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectParams) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const otherProjects = projects.filter((other) => other.slug !== project.slug);

  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <PageHero eyebrow="Projects" title={project.title} description={project.summary} />

        <article className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-10">
          <Reveal>
            <Link className="font-['Lato'] text-[14px] font-bold text-[#5A0C91]" href="/projects">
              ← Back to projects
            </Link>
          </Reveal>

          <Reveal className="relative mt-6 h-[420px] overflow-hidden rounded-[28px] bg-[#efe7f4] max-[700px]:h-[220px]">
            <Image
              className="object-cover"
              src={project.hero}
              alt=""
              fill
              sizes="(max-width: 1140px) 100vw, 1140px"
              priority
            />
          </Reveal>

          <RevealGroup className="mt-10 max-w-[760px]">
            {project.body.map((section) => (
              <RevealItem key={section.text.slice(0, 32)}>
                {section.heading && (
                  <h2 className="mt-8 font-['Baloo_2'] text-[22px] leading-tight font-bold text-[#1e0a39]">
                    {section.heading}
                  </h2>
                )}
                <p className="mt-3 font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]">
                  {section.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          {project.gallery && (
            <section className="mt-14" aria-label={`${project.title} photos`}>
              <Reveal>
                <h2 className="mb-6 font-['Baloo_2'] text-[24px] leading-tight font-bold text-[#1e0a39]">
                  From the drive
                </h2>
              </Reveal>
              <RevealGroup
                className="grid grid-cols-3 gap-5 max-[760px]:grid-cols-2 max-[480px]:grid-cols-1"
                stagger={0.07}
              >
                {project.gallery.map((photo) => (
                  <RevealItem
                    className="relative h-[220px] overflow-hidden rounded-[14px] bg-[#efe7f4]"
                    key={photo}
                  >
                    <Image
                      className="object-cover"
                      src={photo}
                      alt=""
                      fill
                      sizes="(max-width: 480px) 100vw, 360px"
                    />
                  </RevealItem>
                ))}
              </RevealGroup>
            </section>
          )}
        </article>

        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[72px] pb-[44px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
          aria-label="Other projects"
        >
          <Reveal>
            <h2 className="mb-7 font-['Baloo_2'] text-[24px] leading-tight font-bold text-[#1e0a39]">
              Check out other projects
            </h2>
          </Reveal>
          <ProjectCards projects={otherProjects} />
        </section>
      </main>
      <Footer />
    </>
  );
}
