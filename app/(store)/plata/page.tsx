"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import useBasketStore from "@/store/store";
import axios from "axios";
import Loader from "@/components/Loader";

export default function PlataPage() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const { items } = useBasketStore();
  const totalAmount = useBasketStore.getState().getTotalPrice();

  useEffect(() => {
    const initializePlata = async () => {
      try {
        const paymentData = {
          amount: totalAmount,
          currency: "RON",
          orderId: crypto.randomUUID(),
          firstName: user?.firstName ?? "",
          lastName: user?.lastName ?? "",
          email: user?.emailAddresses[0].emailAddress ?? "",
          mobilePhone: "",
          address: "",
        };

        const response = await axios.post("/api/payment", paymentData);

        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl;
        }
      } catch (error) {
        console.error("Eroare la inițializarea plății:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && items.length > 0) {
      initializePlata();
    }
  }, [user, items, totalAmount]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
        <p className="ml-2">Se procesează plata...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Rezumat comandă</h1>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="font-semibold mb-2">Detalii comandă:</h2>
            <p>Total produse: {items.length}</p>
            <p className="font-bold">
              Total de plată: {totalAmount.toFixed(2)} RON
            </p>
          </div>

          <div className="border-b pb-4">
            <h2 className="font-semibold mb-2">Detalii client:</h2>
            <p>
              Nume: {user?.firstName} {user?.lastName}
            </p>
            <p>Email: {user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-600">
            Veți fi redirecționat către pagina securizată de plată Netopia...
          </p>
        </div>
      </div>
    </div>
  );
}
