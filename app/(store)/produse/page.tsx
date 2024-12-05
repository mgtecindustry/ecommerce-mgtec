import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import DiscoverOurProductsBanner from "@/components/DiscoverOurProductsBanner";
import { CheckboxReactHookFormMultiple } from "@/components/CategoriesForm";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <DiscoverOurProductsBanner />

      {/* <Sidebar categories={categories} /> */}

      <div className="p-4 mx-auto flex">
        <div className="mx-auto">
          <ProductsView products={products} categories={categories} />
        </div>
      </div>
    </div>
  );
}
