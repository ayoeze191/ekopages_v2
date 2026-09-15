import { Reveal } from "@/components/motion/Reveal";
import { StoreShelf } from "@/components/StoreShelf";
import { getProducts } from "@/lib/products";

export async function EkoStore() {
  const products = await getProducts();

  return (
    <section
      className="mx-auto mt-[100px] w-[calc(100%-3rem)] max-w-[1180px] pb-[68px] max-[700px]:mt-16 max-[700px]:w-[calc(100%-2rem)] max-[700px]:pb-0"
      id="store"
    >
      <div className=" px-0 py-0 sm:px-[18px] sm:py-0">
        <Reveal className="flex items-center justify-between gap-5 sm:pt-0 max-[700px]:flex-col max-[700px]:items-start">
          <div>
            <h2 className="text-[32px] font-['Baloo_2'] leading-tight font-bold text-[#1e0a39]">
              Eko Store
            </h2>
            <p className="mt-2.5 text-[16px] text-[#4A4A4A]">
              Beautifully illustrated books, written by African authors.
            </p>
          </div>
          <a
            className="shrink-0 rounded-full border-[2px] border-[#5A0C91] px-[25px] py-3 text-[15px] font-bold whitespace-nowrap text-[#620a9d] transition hover:-translate-y-0.5"
            href="#all-books"
          >
            Go to store
          </a>
        </Reveal>
        {products.length > 0 ? (
          <StoreShelf products={products} />
        ) : (
          <p className="py-10 text-center text-[13px] text-[#6b646a]">
            Our shelves are restocking — check back shortly.
          </p>
        )}
      </div>
    </section>
  );
}
