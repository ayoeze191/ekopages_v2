import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { StoreCards } from "@/components/StoreGrid";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { formatPrice, getProduct, getProducts } from "@/lib/products";

type ProductParams = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }: ProductParams): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) return { title: "Product not found | Eko Pages" };
  return {
    title: `${product.name} | Eko Store`,
    description:
      product.description ||
      (product.author
        ? `${product.name} by ${product.author} — from the Eko Pages store.`
        : `${product.name} — from the Eko Pages store.`),
  };
}

export default async function ProductPage({ params }: ProductParams) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) notFound();

  const related = (await getProducts())
    .filter((other) => other.id !== product.id && other.category === product.category)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <section
          className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[56px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-8"
          aria-label={product.name}
        >
          <Reveal>
            <Link className="font-['Lato'] text-[14px] font-bold text-[#5A0C91]" href="/store">
              ← Back to Eko Store
            </Link>
          </Reveal>

          <div className="mt-6 grid grid-cols-[520px_1fr] items-start gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-8">
            <Reveal className="relative h-[520px] overflow-hidden rounded-[20px] border border-[#EAE4DA] bg-[#efe7f4] max-[700px]:h-[320px]">
              <Image
                className="object-cover"
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 900px) 100vw, 520px"
                priority
              />
            </Reveal>

            <RevealGroup delay={0.1}>
              <RevealItem>
                <p className="w-fit rounded-full bg-[#EFE6F5] px-2.5 py-[3px] font-['Lato'] text-[11px] leading-[12px] font-bold text-[#5A0C91]">
                  {product.category === "books" ? "Books" : "Merch"}
                </p>
              </RevealItem>
              <RevealItem>
                <h1 className="mt-4 font-['Baloo_2'] text-[36px] leading-[1.2] font-bold text-[#1F0A33] max-[700px]:text-[28px]">
                  {product.name}
                </h1>
                {product.author && (
                  <p className="mt-2 font-['Lato'] text-[16px] leading-[26px] text-[#4A4A4A]">
                    Written by {product.author}
                  </p>
                )}
                {product.merch_size && (
                  <p className="mt-2 font-['Lato'] text-[16px] leading-[26px] text-[#4A4A4A]">
                    Size {product.merch_size}
                  </p>
                )}
              </RevealItem>
              <RevealItem>
                <p className="mt-5 font-['Baloo_2'] text-[28px] leading-none font-bold text-[#5A0C91]">
                  {formatPrice(product.price)}
                </p>
              </RevealItem>
              {product.description && (
                <RevealItem>
                  <p className="mt-5 max-w-[520px] font-['Lato'] text-[16px] leading-[28px] text-[#4A4A4A]">
                    {product.description}
                  </p>
                </RevealItem>
              )}
              <RevealItem>
                <AddToCartButton
                  productId={product.id}
                  className="mt-7 h-[50px] w-full max-w-[320px] rounded-lg bg-[#5A0C91] font-['Lato'] text-[15px] font-bold text-white transition hover:bg-[#7915b4] disabled:opacity-70"
                />
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {related.length > 0 && (
          <section
            className="mx-auto w-[calc(100%-3rem)] max-w-[1224px] pt-[72px] pb-[44px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
            aria-label="More from the store"
          >
            <Reveal>
              <h2 className="mb-7 font-['Baloo_2'] text-[24px] leading-tight font-bold text-[#1e0a39]">
                More from the store
              </h2>
            </Reveal>
            <StoreCards products={related} />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
