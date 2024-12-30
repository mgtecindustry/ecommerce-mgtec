import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import { Metadata } from "next";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search results page",
};
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const queryParam = resolvedParams.query || "";
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam;
  const products = await searchProductsByName(query);

  if (!products) {
    return (
      <div
        className={`flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4 ${roboto.className}`}
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-7xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Nu au fost găsite produse pentru: {query}
          </h1>
          <p className="text-gray-600 text-center">
            Încearcă să căutați cu cuvinte diferite
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Rezultatele căutării pentru {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
