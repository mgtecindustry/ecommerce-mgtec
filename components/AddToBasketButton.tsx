"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem } = useBasketStore();
  const [isClient, setIsClient] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <button
          onClick={() => {
            setCount(count - 1);
            if (count < 1) {
              setCount(0);
            }
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${count === 0 ? "bg-gray-100 cursor-not-allowed " : "bg-gray-200 hover:bg-gray-300"}`}
          disabled={count === 0 || disabled}
        >
          <span
            className={`text-xl font-bold ${count === 0 ? "text-gray-400" : "text-gray-600"}`}
          >
            -
          </span>
        </button>
        <span className="w-8 text-center font-semibold">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
          disabled={disabled}
        >
          <span className="text-xl font-bold text-white">+</span>
        </button>
      </div>
      <Button
        className="bg-blue-500 hover:bg-blue-600"
        onClick={() => {
          if (count > 0) {
            for (let i = 0; i < count; i++) {
              addItem(product);
            }
            setCount(0);
          }
          toast({
            title: "Produs adăugat în coș",
            description: "Produsul a fost adăugat în coș",
          });
        }}
        disabled={count === 0}
      >
        Adaugă în coș
      </Button>
    </div>
  );
}

export default AddToBasketButton;
