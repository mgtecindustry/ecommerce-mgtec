import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductCarousel from "@/components/Carousel";
import Services from "@/components/Services";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-static";
export const revalidate = 60;
export default async function Home() {
  const products = await getAllProducts();
  return (
    <div>
      <BlackFridayBanner />
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <div className="space-y-2 text-center mb-8">
          <Badge variant="secondary" className="mb-2">
            Produse Selectate
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight">
            Recomandarile noastre
          </h2>
          <p className="text-muted-foreground">
            Descoperiți selecția noastră de produse premium, alese special
            pentru dumneavoastră
          </p>
        </div>
        <ProductCarousel products={products} />
        <div className="w-full  max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8 px-4">
          <Services />
        </div>
      </div>
    </div>
  );
}
