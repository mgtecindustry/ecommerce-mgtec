"use client";

import dynamic from "next/dynamic";

const ProductsView = dynamic(() => import("@/components/ProductsView"), {
  ssr: false,
});

export default ProductsView;
