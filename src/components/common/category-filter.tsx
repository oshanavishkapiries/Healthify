import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 mb-4 pb-4 overflow-x-auto scrollbar-hide flex-nowrap md:flex-wrap md:overflow-x-visible">
      <Button
        variant={selected === "All" ? "default" : "outline"}
        className="font-medium px-6 rounded-lg transition-colors whitespace-nowrap"
        onClick={() => onSelect("All")}
      >
        <span className="text-sm">All</span>
      </Button>
      {categories.map((cat, idx) => (
        <Button
          key={cat + idx}
          variant={selected === cat ? "default" : "outline"}
          className="font-medium px-6 rounded-lg transition-colors whitespace-nowrap"
          onClick={() => onSelect(cat)}
        >
          <span className="text-sm">{cat}</span>
        </Button>
      ))}
    </div>
  );
}
