"use client";

import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

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
    <div className="flex flex-col min-h-screen  items-center bg-gray-100">
      <div className="hidden sm:flex sm:mt-12 gap-8 ">
        <div className="flex-col w-full sm:w-1/5 space-y-8">
          <Card className="hidden sm:block">
            <CardHeader>
              <CardTitle>Categorii</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category._id}
                    checked={selectedCategories.includes(category._id)}
                    onCheckedChange={() => handleCategoryChange(category._id)}
                  />
                  <Label htmlFor={category._id}>{category.title}</Label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="hidden sm:block">
            <CardHeader>
              <CardTitle>Producător</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {allBrands.map(
                (brand) =>
                  brand && (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <Label htmlFor={brand}>{brand}</Label>
                    </div>
                  )
              )}
            </CardContent>
          </Card>

          <Button
            className="hidden sm:flex items-center w-full"
            onClick={resetFilters}
          >
            Reseteaza filtre
          </Button>
        </div>

        <div className="flex-grow">
          <Card className="mb-8">
            <CardContent className="p-4">
              <RadioGroup
                defaultValue="price-asc"
                className="grid sm:flex sm:justify-between gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="price-asc"
                    id="price-asc"
                    onClick={sortByPriceAsc}
                  />
                  <Label htmlFor="price-asc">Preț crescător</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="price-desc"
                    id="price-desc"
                    onClick={sortByPriceDesc}
                  />
                  <Label htmlFor="price-desc">Preț descrescător</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="a-z" id="a-z" onClick={handleAZSort} />
                  <Label htmlFor="a-z">Alfabetic A-Z</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="z-a" id="z-a" onClick={handleZASort} />
                  <Label htmlFor="z-a">Alfabetic Z-A</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
      <div className="block w-full sm:hidden bg-background ">
        <Sheet open={showFilters} onOpenChange={setShowFilters}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-start mb-4">
              <Filter className="mr-2 h-4 w-4" />
              Filtre
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filtre și Sortare</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="font-medium">Sortează</h3>
                <Separator />
                <RadioGroup defaultValue="price-asc" className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="price-asc"
                      id="price-asc"
                      onClick={sortByPriceAsc}
                    />
                    <Label htmlFor="price-asc">Preț crescător</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="price-desc"
                      id="price-desc"
                      onClick={sortByPriceDesc}
                    />
                    <Label htmlFor="price-desc">Preț descrescător</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="a-z"
                      id="a-z"
                      onClick={handleAZSort}
                    />
                    <Label htmlFor="a-z">Alfabetic A-Z</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="z-a"
                      id="z-a"
                      onClick={handleZASort}
                    />
                    <Label htmlFor="z-a">Alfabetic Z-A</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Producător</h3>
                <Separator />
                {allBrands.map(
                  (brand) =>
                    brand && (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandChange(brand)}
                        />
                        <Label htmlFor={brand}>{brand}</Label>
                      </div>
                    )
                )}
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Categorii</h3>
                <Separator />
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={category._id}
                      checked={selectedCategories.includes(category._id)}
                      onCheckedChange={() => handleCategoryChange(category._id)}
                    />
                    <Label htmlFor={category._id}>{category.title}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={resetFilters}>Resetează filtre</Button>
          </SheetContent>
        </Sheet>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsView;
