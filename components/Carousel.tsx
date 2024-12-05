"use client";

import React from "react";
import { Product } from "@/sanity.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductThumb from "./ProductThumb";

interface ProductCarouselProps {
  products: Product[];
}

function ProductCarouselContent({ products }: ProductCarouselProps) {
  if (!products || products.length === 0) {
    return <div className="text-center py-4">No products available.</div>;
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-6xl mx-auto relative"
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product._id}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <div className="p-1">
              <ProductThumb product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90" />
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90" />
    </Carousel>
  );
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  return <ProductCarouselContent products={products} />;
}
