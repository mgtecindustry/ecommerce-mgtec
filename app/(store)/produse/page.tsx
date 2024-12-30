import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import DiscoverOurProductsBanner from "@/components/DiscoverOurProductsBanner";
import { Roboto } from "next/font/google";

import ProductsViewClient from "@/components/ProductsViewClient";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className={`flex flex-col min-h-screen ${roboto.className}`}>
      <DiscoverOurProductsBanner />

      <div className="p-2 sm:p-4 mx-auto w-full  bg-gray-100">
        <ProductsViewClient products={products} categories={categories} />
      </div>
    </div>
  );
}
