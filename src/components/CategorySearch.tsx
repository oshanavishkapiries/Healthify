import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CategoryAddPopup from "./CategoryAddPopup";

// New: Accept options, value, onChange, label, placeholder, error, onAddNew
interface Option {
  value: string;
  label: string;
}

interface InputCategorySearchProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  onAddNew?: (label: string) => void;
}

export default function InputCategorySearch({
  label = "Select category",
  placeholder = "Select or add category",
  options,
  value,
  onChange,
  error,
  onAddNew,
}: InputCategorySearchProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  const selectedLabel = value
    ? options.find((option) => option.value === value)?.label
    : "";

  const handleAddNewCategory = async (categoryName: string) => {
    // Mock API call - replace with actual backend call later
    console.log("Adding new category:", categoryName);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Call the parent's onAddNew callback
    onAddNew?.(categoryName);
  };

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]",
              error && "border-red-500"
            )}
          >
            <span
              className={cn(
                "truncate",
                !selectedLabel && "text-muted-foreground"
              )}
            >
              {selectedLabel || placeholder}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput
              placeholder="Find category"
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onChange?.(option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    {value === option.value && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CategoryAddPopup
                  onAdd={handleAddNewCategory}
                  trigger={
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                    >
                      <PlusIcon
                        size={16}
                        className="-ms-2 opacity-60"
                        aria-hidden="true"
                      />
                      New category
                    </Button>
                  }
                />
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
