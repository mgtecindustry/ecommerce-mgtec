import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { PortableText } from "next-sanity";
import AddToBasketButton from "@/components/AddToBasketButton";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

export const dynamic = "force-static";
export const revalidate = 600;

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  }
  const outOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className={`container mx-auto px-4 py-8 ${roboto.className}`}>
      <Link
        href="/produse"
        className="inline-flex items-center gap-2 mb-6 text-blue-500 hover:text-blue-700 group transition duration-300 font-medium"
      >
        <IoArrowBackOutline
          size={20}
          className="transform transition-transform duration-300 group-hover:-translate-x-1"
        />
        Înapoi la produse
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${outOfStock ? "opacity-50" : ""}`}
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of stock</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              RON{product.price?.toFixed(2)}
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>
          <div className="mt-4">
            <AddToBasketButton product={product} disabled={outOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
