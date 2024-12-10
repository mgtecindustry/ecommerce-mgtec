import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductCarousel from "@/components/Carousel";
import Services from "@/components/Services";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <div>
      <BlackFridayBanner />
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductCarousel products={products} />
        <div className="w-full  max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8 px-4">
          <Services />
        </div>
      </div>
    </div>
  );
}
