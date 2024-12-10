"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentResultPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  return (
    <div className="container mx-auto p-4 min-h-[50vh] flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          {status === "success" ? "Plată reușită!" : "Plată eșuată"}
        </h1>
        <p className="text-gray-600">
          {status === "success"
            ? "Vă mulțumim pentru comandă. Veți primi un email cu detaliile comenzii."
            : message ||
              "A apărut o eroare la procesarea plății. Vă rugăm să încercați din nou."}
        </p>
      </div>
    </div>
  );
}
