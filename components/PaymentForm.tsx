"use client";

import { useState } from "react";

export default function PaymentForm({
  orderId,
  amount,
}: {
  orderId: string;
  amount: number;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount,
          currency: "RON",
          details: `Plata pentru comanda ${orderId}`,
          customerInfo: {
            firstName: e.currentTarget.firstName.value,
            lastName: e.currentTarget.lastName.value,
            email: e.currentTarget.email.value,
            phone: e.currentTarget.phone.value,
            address: e.currentTarget.address.value,
          },
        }),
      });

      const data = await response.json();

      // Creăm un form temporar pentru a face redirect către NETOPIA
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.url;

      const envKey = document.createElement("input");
      envKey.type = "hidden";
      envKey.name = "env_key";
      envKey.value = data.env_key;

      const paymentData = document.createElement("input");
      paymentData.type = "hidden";
      paymentData.name = "data";
      paymentData.value = data.data;

      form.appendChild(envKey);
      form.appendChild(paymentData);
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error:", error);
      alert("A apărut o eroare la procesarea plății");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="firstName">Prenume</label>
        <input type="text" id="firstName" required />
      </div>
      <div>
        <label htmlFor="lastName">Nume</label>
        <input type="text" id="lastName" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <label htmlFor="phone">Telefon</label>
        <input type="tel" id="phone" required />
      </div>
      <div>
        <label htmlFor="address">Adresă</label>
        <textarea id="address" required />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isLoading ? "Se procesează..." : "Plătește"}
      </button>
    </form>
  );
}
