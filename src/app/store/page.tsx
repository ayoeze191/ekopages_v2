import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StoreView } from "@/components/StoreView";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Eko Store | Eko Pages",
  description:
    "Books and merch that teach the SDGs, illustrated by African artists.",
};

export default async function StorePage() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <StoreView products={products} />
      </main>
      <Footer />
    </>
  );
}
