import { Card, CardContent } from "@/components/ui/card";
import { Truck, RotateCcw, HeadphonesIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
  return (
    <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white">
      <CardContent className="flex flex-col items-center justify-center p-6 h-full">
        <Icon className="w-12 h-12 text-primary mb-4" />
        <div className="text-center">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Services() {
  const services = [
    {
      title: "Livrare Gratuită",
      description: "Pentru comenzi peste 200 RON",
      icon: Truck,
    },
    {
      title: "Retur Gratuit",
      description: "30 de zile pentru retur",
      icon: RotateCcw,
    },
    {
      title: "Suport",
      description: "Asistență telefonică și email",
      icon: HeadphonesIcon,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Serviciile Noastre
        </h2>
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
