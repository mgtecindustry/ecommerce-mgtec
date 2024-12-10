import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface SortOptionProps {
  value: "price-asc" | "price-desc" | "a-z" | "z-a";
  label: string;
  onSort: (type: "price-asc" | "price-desc" | "a-z" | "z-a") => void;
}

export const SortOption = ({ value, label, onSort }: SortOptionProps) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={value} onClick={() => onSort(value)} />
      <Label htmlFor={value}>{label}</Label>
    </div>
  );
};
