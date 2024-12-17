"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Truck } from "lucide-react";
import { CheckoutStore } from "@/store/checkoutStore";

interface CourierOption {
  name: string;
  price: number;
  description: string;
  logo: string;
}

const courierOptions: CourierOption[] = [
  {
    name: "Cargus",
    price: 20,
    description: "Livrare în 2-3 zile lucrătoare",
    logo: "/cargus.png",
  },
  {
    name: "Fan Courier",
    price: 20,
    description: "Livrare în 2-3 zile lucrătoare",
    logo: "/fan-courier.png",
  },
  {
    name: "Sameday",
    price: 20,
    description: "Livrare în 2-3 zile lucrătoare",
    logo: "/same-day.png",
  },
];

export default function CourierDetails() {
  const { courier, setCourier } = CheckoutStore();

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <RadioGroup value={courier} onValueChange={setCourier}>
        <div className="grid gap-4 md:grid-cols-3 ">
          {courierOptions.map((courierOption) => (
            <Card
              key={courierOption.name}
              className={`cursor-pointer transition-all ${
                courier === courierOption.name ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardContent className="p-4">
                <RadioGroupItem
                  value={courierOption.name}
                  id={courierOption.name}
                  className="sr-only"
                  onClick={() => {
                    setCourier(courierOption.name);
                  }}
                />
                <Label
                  htmlFor={courierOption.name}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src={courierOption.logo}
                      alt={`${courierOption.name} logo`}
                      className="h-10 w-20 object-contain"
                    />
                    <Truck className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="text-lg font-semibold mb-2">
                    {courierOption.name}
                  </span>
                  <p className="text-sm text-muted-foreground mb-2">
                    {courierOption.description}
                  </p>
                  <span className="text-lg font-bold mt-auto">
                    {courierOption.price} lei
                  </span>
                </Label>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
