"use client";

import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { useState, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
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
  const [showFilters, setShowFilters] = useState(false);

  const allBrands = Array.from(
    new Set(products.map((product) => product.brand))
  );

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setFilteredProducts(products);
  };

  useEffect(() => {
    let filtered = products;

    // Filtrare după categorii
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.categories?.some((category) =>
          selectedCategories.includes(category._ref)
        )
      );
    }

    // Filtrare după branduri
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(
        (product) => product.brand && selectedBrands.includes(product.brand)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, selectedBrands, products]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const sortByPriceAsc = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (a.price === undefined || b.price === undefined) {
        return 0;
      }
      return a.price - b.price;
    });
    setFilteredProducts(sortedProducts);
  };
  const sortByPriceDesc = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (a.price === undefined || b.price === undefined) {
        return 0;
      }
      return b.price - a.price;
    });
    setFilteredProducts(sortedProducts);
  };

  const handleAZSort = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (a.name === undefined || b.name === undefined) {
        return 0;
      } else if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };
  const handleZASort = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (a.name === undefined || b.name === undefined) {
        return 0;
      } else if (b.name < a.name) return -1;
      else if (b.name > a.name) return 1;

      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
      <div className="grid sm:flex  sm:mt-12 space-y-8">
        <div className="flex-col w-1/5  justify-center items-center mt-8 h-full ">
          {/* Categorii */}
          <div className="hidden sm:flex flex-col p-4 w-full relative bg-white">
            <h2 className="scroll-m-20 pb-2 border-b text-3xl font-semibold tracking-tight first:mt-0">
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

          {/* Producător */}
          <div className="hidden sm:flex flex-col mt-8 p-4 w-full relative bg-white">
            <h2 className="scroll-m-20 pb-2 border-b text-3xl font-semibold tracking-tight first:mt-0">
              Producător
            </h2>
            {allBrands.map(
              (brand) =>
                brand && (
                  <div key={brand} className="flex mt-2 items-center space-x-2">
                    <Checkbox
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandChange(brand)}
                    />
                    <Label
                      htmlFor={brand}
                      className="leading-7 [&:not(:first-child)]"
                    >
                      {brand}
                    </Label>
                  </div>
                )
            )}
          </div>

          {/* Resetare filtre */}
          <div className="bg-white text-red-500 mt-4">
            <p
              onClick={resetFilters}
              className="ml-4 hidden sm:flex my-4 cursor-pointer items-center justify-between"
            >
              Sterge toate filtrele
              <span className="mr-2">
                <FaTimes />
              </span>
            </p>
          </div>
        </div>

        {/* Grid de produse */}
        <div className="hidden sm:grid ml-8">
          {/* Sortari */}
          <div className="hidden sm:flex bg-white p-2  sm:px-8 ml-1 mb-4 sm:mb-8 text-sm font-medium leading-none h-12  items-center">
            <form
              onChange={() => {}}
              className="grid  sm:flex justify-between w-full items-center"
            >
              <div>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="price-asc"
                    className="mr-2 translate-y-[2px]"
                    onClick={sortByPriceAsc}
                  />
                  Preț crescător
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="price-desc"
                    className="mr-2 translate-y-[2px]"
                    onClick={sortByPriceDesc}
                  />
                  Preț descrescător
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="a-z"
                    className="mr-2 translate-y-[2px]"
                    onClick={handleAZSort}
                  />
                  Alfabetic A-Z
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="z-a"
                    className="mr-2 translate-y-[2px]"
                    onClick={handleZASort}
                  />
                  Alfabetic Z-A
                </label>
              </div>
            </form>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
      <div className="block w-full sm:hidden bg-white ">
        <div className="flex sm:hidden justify-between items-center px-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center py-2 px-4 rounded-md"
          >
            <FaFilter className="mr-2" />
            Filtre
          </button>
        </div>
        {showFilters && (
          <div className="grid items-center mx-auto justify-center p-4">
            <h2 className=" text-center text-lg font-semibold text-gray-800 border-b">
              Sortează
            </h2>
            <form className="grid sm:hidden justify-between w-full items-center mt-4">
              <div>
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="radio"
                    name="sort"
                    value="price-asc"
                    className="mr-2 translate-y-[2px]"
                    onClick={sortByPriceAsc}
                  />
                  Preț crescător
                </label>
              </div>
              <div>
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="radio"
                    name="sort"
                    value="price-desc"
                    className="mr-2 translate-y-[2px]"
                    onClick={sortByPriceDesc}
                  />
                  Preț descrescător
                </label>
              </div>
              <div>
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="radio"
                    name="sort"
                    value="a-z"
                    className="mr-2 translate-y-[2px]"
                    onClick={handleAZSort}
                  />
                  Alfabetic A-Z
                </label>
              </div>
              <div>
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="radio"
                    name="sort"
                    value="z-a"
                    className="mr-2 translate-y-[2px]"
                    onClick={handleZASort}
                  />
                  Alfabetic Z-A
                </label>
              </div>
            </form>
            <div className="grid items-center mx-auto justify-center mt-6">
              <h2 className="text-center text-lg font-semibold text-gray-800 mb-4 border-b">
                Producător
              </h2>
              {allBrands.map(
                (brand) =>
                  brand && (
                    <div
                      key={brand}
                      className="flex mt-2 items-center space-x-2"
                    >
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <Label
                        htmlFor={brand}
                        className="leading-7 text-sm text-gray-700"
                      >
                        {brand}
                      </Label>
                    </div>
                  )
              )}
            </div>
            <div className="grid items-center mx-auto justify-center mt-6">
              <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
                Categorii
              </h2>
              {categories.map((category) => (
                <div
                  className="flex mt-2 items-center space-x-2"
                  key={category._id}
                >
                  <Checkbox
                    id={category._id}
                    checked={selectedCategories.includes(category._id)}
                    onCheckedChange={() => handleCategoryChange(category._id)}
                  />
                  <Label
                    htmlFor={category._id}
                    className="leading-7 text-sm text-gray-700"
                  >
                    {category.title}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsView;
