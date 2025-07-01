import { Button } from "@/components/ui/button";
import BmiFilter from "./bmi-filter";

interface CategoryFilterProps {
  categories: { label: string; value: string }[];
  selected: string;
  onSelect: (category: string) => void;
}

export const CategoryFilter = ({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) => {

  return (
    <div className="flex gap-2 mb-4 pb-4 overflow-x-auto scrollbar-hide flex-nowrap md:flex-wrap md:overflow-x-visible">
      <Button
        variant={selected === "All" ? "default" : "outline"}
        className="font-medium px-6 rounded-lg transition-colors whitespace-nowrap"
        onClick={() => onSelect("All")}
      >
        <span className="text-sm">Read All</span>
      </Button>
      <BmiFilter />
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selected === category.value ? "default" : "outline"}
          onClick={() => onSelect(category.value)}
          className="font-medium px-6 rounded-lg transition-colors whitespace-nowrap"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};
