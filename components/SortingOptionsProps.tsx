import { Card, CardContent } from "./ui/card";
import { RadioGroup } from "./ui/radio-group";
import { SortOption } from "./SortOption";
interface SortingOptionsProps {
  onSort: (type: "price-asc" | "price-desc" | "a-z" | "z-a") => void;
}

const SortingOptions = ({ onSort }: SortingOptionsProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-4">
        <RadioGroup
          defaultValue="price-asc"
          className="grid sm:flex sm:justify-between gap-4"
        >
          <SortOption
            value="price-asc"
            label="Preț crescător"
            onSort={onSort}
          />
          <SortOption
            value="price-desc"
            label="Preț descrescător"
            onSort={onSort}
          />
          <SortOption value="a-z" label="Alfabetic A-Z" onSort={onSort} />
          <SortOption value="z-a" label="Alfabetic Z-A" onSort={onSort} />
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
export default SortingOptions;
