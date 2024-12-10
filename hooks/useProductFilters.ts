import { useState, useEffect } from "react";
import { Product } from "@/sanity.types";

const useProductFilters = (initialProducts: Product[]) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);

  useEffect(() => {
    let filtered = initialProducts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.categories?.some((category) =>
          selectedCategories.includes(category._ref)
        )
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(
        (product) => product.brand && selectedBrands.includes(product.brand)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, selectedBrands, initialProducts]);

  return {
    selectedCategories,
    selectedBrands,
    filteredProducts,
    setSelectedCategories,
    setSelectedBrands,
    setFilteredProducts,
  };
};

export default useProductFilters;
