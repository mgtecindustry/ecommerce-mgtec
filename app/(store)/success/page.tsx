"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useBasketStore from "@/store/store";
import { createOrder } from "@/actions/createOrder";
import { Roboto } from "next/font/google";

// Mută declararea fontului aici, la nivel de modul (în afara componentei)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Adăugăm interfețele pentru tipurile de date
interface Product {
  _id: string;
}

interface BasketItem {
  product: Product;
  quantity: number;
}

interface OrderData {
  nume: string;
  email: string;
  adresa: string;
  oras: string;
  telefon: string;
  judet: string;
  codPostal: string;
  tipCurier: string;
  products: BasketItem[];
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const saveOrder = async () => {
      if (!orderNumber) return;

      // Curăță coșul de cumpărături
      clearBasket();

      // Obține datele din localStorage
      const storedOrderData = localStorage.getItem("orderData");
      if (!storedOrderData) return;

      const parsedOrderData = JSON.parse(storedOrderData) as OrderData;
      setOrderData(parsedOrderData);

      // Creează un obiect pentru comanda ta
      const order = {
        _type: "orderDetails",
        orderNumber: orderNumber,
        numeClient: parsedOrderData.nume,
        emailClient: parsedOrderData.email,
        adresaClient: parsedOrderData.adresa,
        orasClient: parsedOrderData.oras,
        telefonClient: parsedOrderData.telefon,
        judetClient: parsedOrderData.judet,
        codPostalClient: parsedOrderData.codPostal,
        tipCurier: parsedOrderData.tipCurier,
        products: parsedOrderData.products.map((item: BasketItem) => ({
          _type: "object",
          _key: crypto.randomUUID(),
          product: { _ref: item.product._id },
          quantity: item.quantity,
        })),
      };
      await createOrder(order, orderNumber);
    };

    saveOrder();
  }, [orderNumber, clearBasket]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gray-50 ${roboto.className}`}
    >
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-center">
          Mulțumim pentru comanda dumneavoastră!
        </h1>

        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <p className="text-lg text-gray-700 mb-4 text-center">
            Comanda dumneavoastră a fost confirmată și va fi expediată în
            curând.
          </p>

          {/* Detalii comanda */}
          {orderData && (
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>Număr comandă:</strong> {orderNumber}
              </p>
              <p className="text-gray-600">
                <strong>Nume client:</strong> {orderData.nume}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {orderData.email}
              </p>
              <p className="text-gray-600">
                <strong>Adresă:</strong> {orderData.adresa}, {orderData.oras},{" "}
                {orderData.judet}, {orderData.codPostal}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/comenzi">Vezi detaliile comenzii</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/produse">Continuă cumpărăturile</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
