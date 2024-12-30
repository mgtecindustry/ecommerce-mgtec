import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductCarousel from "@/components/Carousel";
import Services from "@/components/Services";
import { Badge } from "@/components/ui/badge";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Home() {
  const products = await getAllProducts();
  return (
    <div style={{ fontFamily: roboto.style.fontFamily }}>
      <BlackFridayBanner />
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <div className="space-y-4 text-center mb-12">
          <Badge
            variant="outline"
            className="px-6 py-1.5 text-lg font-medium bg-white hover:bg-gray-50"
          >
            Produse Selectate
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter   text-blue-500">
            Recomandările noastre
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Descoperiți selecția noastră de produse premium, alese special
            pentru dumneavoastră
          </p>
        </div>
        <ProductCarousel products={products} />
        <div className="w-full max-w-7xl mx-auto mt-12 mb-8">
          <Services />
        </div>
      </div>
    </div>
  );
}
