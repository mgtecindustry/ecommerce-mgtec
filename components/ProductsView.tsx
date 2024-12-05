"use client";

import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const resetFilters = () => {
    setSelectedCategories([]);
    setFilteredProducts(products);
    setSelectedBrands([]);
  };

  useEffect(() => {
    if (selectedCategories.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.categories?.some((category) =>
            selectedCategories.includes(category._ref)
          )
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategories, products]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div>
      <div className="flex mt-12 space-y-8 ">
        <div className="flex-col w-1/5 bg-gray-100 mt-8">
          <div className="hidden md:flex flex-col  p-4 w-full relative">
            <h2 className="scroll-m-20  pb-2 border-b text-3xl font-semibold tracking-tight first:mt-0">
              Categorii
            </h2>
            {categories.map((category) => (
              <div
                key={category._id}
                className="flex mt-2 items-center space-x-2"
              >
                <Checkbox
                  id={category._id}
                  checked={selectedCategories.includes(category._id)}
                  onCheckedChange={() => handleCategoryChange(category._id)}
                />
                <Label
                  htmlFor={category._id}
                  className="leading-7 [&:not(:first-child)]"
                >
                  {category.title}
                </Label>
              </div>
            ))}
          </div>
          <div className="hidden md:flex flex-col mt-8 p-4 w-full  relative">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Producator
            </h2>
            {products.map((product) => (
              <div
                key={product._id}
                className="flext mt-2 items-center space-x-2"
              >
                <Checkbox id={product._id} />
                <Label
                  htmlFor={product._id}
                  className="leading-7 [&not(:first-child)]"
                >
                  {product.brand}
                </Label>
              </div>
            ))}
          </div>
          <Button
            onClick={resetFilters}
            className="mx-auto hidden md:flex mt-4"
          >
            Reseteaza filtrele
          </Button>
        </div>
        <div className="flex-1 ml-8">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
