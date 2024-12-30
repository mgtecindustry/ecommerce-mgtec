"use client";

import { createCheckoutSession } from "@/actions/createCheckoutSession";
import Loader from "@/components/Loader";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Metadata } from "@/actions/createCheckoutSession";
import CollapsibleDeliveryDetails from "@/components/CollapsibleDeliveryDetails";
import CollapsibleCourierDetails from "@/components/CollapsibleCourierDetails";
import { CheckoutStore } from "@/store/checkoutStore";

import { courierOptions } from "@/components/CourierDetails";
import { ArrowRight } from "lucide-react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

function CartPage() {
  const { isSignedIn } = useAuth();
  const basketStore = useBasketStore();
  const { user } = useUser();
  const router = useRouter();
  const groupedItems = basketStore.getGroupedItems();
  const courier = CheckoutStore((state) => state.courier);
  const checkoutState = CheckoutStore((state) => state.formData);
  const courierPrice =
    courierOptions.find((option) => option.name === courier)?.price ?? 0;
  const shippingCost = courierPrice;
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div
        className={`container mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh] ${roboto.className}`}
      >
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Coșul tău este gol
          </h1>
          <p className="text-gray-600 text-lg">
            Nu ai adăugat încă niciun produs în coș.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/produse")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg 
              transition duration-200 ease-in-out transform hover:scale-105 
              "
            >
              <span className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                Vezi produsele noastre
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    const checkoutState = CheckoutStore.getState();
    if (!isSignedIn) return;
    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };
      const checkoutUrl = await createCheckoutSession(
        groupedItems,
        metadata,
        shippingCost
      );
      if (checkoutUrl) {
        const orderData = {
          ...checkoutState.formData,
          tipCurier: CheckoutStore.getState().courier,
          orderNumber: metadata.orderNumber,
          products: groupedItems,
        };
        localStorage.setItem("orderData", JSON.stringify(orderData));
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormComplete = () => {
    return (
      checkoutState.nume?.trim() &&
      checkoutState.telefon?.trim() &&
      checkoutState.email?.trim() &&
      checkoutState.adresa?.trim() &&
      checkoutState.oras?.trim() &&
      checkoutState.codPostal?.trim() &&
      checkoutState.judet?.trim() &&
      courier
    );
  };

  return (
    <div className={`${roboto.className} container mx-auto p-4 max-w-6xl`}>
      <h1 className="text-2xl font-bold mb-4">Coșul tău</h1>
      <div className="flex flex-col gap-8">
        {/* Conținutul coșului */}
        <div className="flex-grow">
          {groupedItems.map((item) => (
            <div
              key={item.product._id}
              className="mb-4 p-4 border rounded flex items-center justify-between"
            >
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() =>
                  router.push(`/produs/${item.product.slug?.current}`)
                }
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "Product Image"}
                      className="w-full h-full object-cover rounded"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Pret:
                    {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                    RON
                  </p>
                </div>
              </div>
              <div className="flex items-center sm:space-x-4 space-x-2">
                <button
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition duration-200"
                  onClick={() => {
                    useBasketStore.getState().removeItem(item.product._id);
                  }}
                >
                  <span className="text-lg font-bold">−</span>
                </button>
                <span className="w-6 sm:w-8 text-center font-semibold text-gray-800">
                  {item.quantity}
                </span>
                <button
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-700 transition duration-200"
                  onClick={() => {
                    useBasketStore.getState().addItem(item.product);
                  }}
                >
                  <span className="text-lg font-bold">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detalii Livrare */}
        <div className="w-full">
          <CollapsibleDeliveryDetails />
        </div>
        <div className="w-full">
          <CollapsibleCourierDetails />
        </div>
        {/* Rezumatul Comenzii */}
        <div className="w-full bg-white p-6 border rounded">
          <h3 className="text-xl font-semibold">Rezumatul Comenzii</h3>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Produse:</span>
              <span>
                {groupedItems.reduce(
                  (total, item) => total + (item.quantity ?? 0),
                  0
                )}
              </span>
            </p>

            <p className="flex justify-between">
              <span>Cost livrare:</span>
              <span>RON {courierPrice.toFixed(2)}</span>
            </p>

            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>
                RON
                {(
                  useBasketStore.getState().getTotalPrice() + courierPrice
                ).toFixed(2)}
              </span>
            </p>
          </div>
          {isSignedIn ? (
            <div>
              <button
                onClick={handleCheckout}
                disabled={isLoading || !isFormComplete()}
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isLoading ? "Se procesează..." : "Finalizează comanda"}
              </button>
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Loghează-te pentru a finaliza comanda
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
