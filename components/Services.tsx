import { Card, CardContent } from "@/components/ui/card";

function Services() {
  return (
    <>
      <Card className="transition-all duration-300 hover:scale-110 hover:shadow-lg">
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <h3 className="font-bold mb-2">Livrare Gratuită</h3>
            <p className="text-gray-600">Pentru comenzi peste 200 RON</p>
          </div>
        </CardContent>
      </Card>

      <Card className="transition-all duration-300 hover:scale-110 hover:shadow-lg">
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <h3 className="font-bold mb-2">Retur Gratuit</h3>
            <p className="text-gray-600">30 de zile pentru retur</p>
          </div>
        </CardContent>
      </Card>

      <Card className="transition-all duration-300 hover:scale-110 hover:shadow-lg">
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <h3 className="font-bold mb-2">Suport</h3>
            <p className="text-gray-600">Asistență telefonică și email</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Services;
