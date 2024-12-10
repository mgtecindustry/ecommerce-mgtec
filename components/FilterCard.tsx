import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface FilterCardProps {
  title: string;
  items: {
    id: string;
    label: string;
  }[];
  selectedItems: string[];
  onItemChange: (id: string) => void;
}

const FilterCard = ({
  title,
  items,
  selectedItems,
  onItemChange,
}: FilterCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => onItemChange(item.id)}
            />
            <Label htmlFor={item.id}>{item.label}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default FilterCard;
