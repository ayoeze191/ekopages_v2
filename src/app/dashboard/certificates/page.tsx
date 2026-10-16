"use client";

import Image from "next/image";
import Link from "next/link";
import { EmptyState, Panel } from "@/components/dashboard/DashboardShell";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { fetchCertificates } from "@/lib/dashboard";
import { formatDate } from "@/lib/text";
import { useApiResource } from "@/lib/useApiResource";

export default function CertificatesPage() {
  const { data, loading } = useApiResource(fetchCertificates, []);
  const certificates = data ?? [];

  return (
    <Panel
      title="Certificates"
      action={
        <Link className="font-['Lato'] text-[14px] font-bold text-[#5A0C91]" href="/dashboard/courses">
          Back to my courses
        </Link>
      }
    >
      {loading ? (
        <EmptyState message="Loading your certificates…" />
      ) : certificates.length === 0 ? (
        <EmptyState
          message="You're yet to earn a certificate. Complete a course to earn one."
          cta={
            <Link
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#5A0C91] px-6 font-['Lato'] text-[14px] font-bold text-white"
              href="/courses"
            >
              Take a course
            </Link>
          }
        />
      ) : (
        <RevealGroup className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1">
          {certificates.map((certificate) => (
            <RevealItem
              as="article"
              className="overflow-hidden rounded-[16px] border border-[#e8e3db] bg-white"
              key={`${certificate.title}-${certificate.date_created}`}
            >
              {certificate.image_fmt && (
                <div className="relative h-[180px] bg-[#efe7f4]">
                  <Image
                    className="object-contain"
                    src={certificate.image_fmt}
                    alt=""
                    fill
                    sizes="400px"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-['Baloo_2'] text-[16px] leading-tight font-bold text-[#1F0A33]">
                  {certificate.title}
                </h3>
                <p className="mt-1 font-['Lato'] text-[13px] text-[#6b646a]">
                  {formatDate(certificate.date_created)}
                </p>
                {certificate.pdf_fmt && (
                  <a
                    className="mt-4 inline-flex font-['Lato'] text-[14px] font-bold text-[#5A0C91]"
                    href={certificate.pdf_fmt}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download PDF
                  </a>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </Panel>
  );
}
