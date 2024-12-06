import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import DiscoverOurProductsBanner from "@/components/DiscoverOurProductsBanner";

import ProductsViewClient from "@/components/ProductsViewClient";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 ">
      <DiscoverOurProductsBanner />

      <div className="p-4 mx-auto w-full">
        <ProductsViewClient products={products} categories={categories} />
      </div>
    </div>
  );
}
