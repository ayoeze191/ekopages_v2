"use client";

import Image from "next/image";
import Link from "next/link";
import { EmptyState, Panel } from "@/components/dashboard/DashboardShell";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { fetchDashboardBooks } from "@/lib/dashboard";
import { useApiResource } from "@/lib/useApiResource";

export default function MyBooksPage() {
  const { data, loading } = useApiResource(fetchDashboardBooks, []);
  const books = data ?? [];

  return (
    <Panel title="My books">
      {loading ? (
        <EmptyState message="Loading your books…" />
      ) : books.length === 0 ? (
        <EmptyState
          message="No books here yet. Books you buy or unlock with Eko Learn appear here."
          cta={
            <Link
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#5A0C91] px-6 font-['Lato'] text-[14px] font-bold text-white"
              href="/store"
            >
              Browse books
            </Link>
          }
        />
      ) : (
        <RevealGroup className="grid grid-cols-3 gap-5 max-[760px]:grid-cols-2 max-[480px]:grid-cols-1">
          {books.map((book, index) => (
            <RevealItem
              as="article"
              className="overflow-hidden rounded-[16px] border border-[#e8e3db] bg-white"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              key={book.id ?? index}
            >
              <div className="relative h-[170px] bg-[#efe7f4]">
                {book.image && (
                  <Image className="object-cover" src={book.image} alt="" fill sizes="300px" unoptimized />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-['Baloo_2'] text-[15px] leading-tight font-bold text-[#1F0A33]">
                  {book.name ?? book.title ?? "Untitled"}
                </h3>
                {book.author && (
                  <p className="mt-1 font-['Lato'] text-[12px] text-[#4A4A4A]">Written by {book.author}</p>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </Panel>
  );
}
