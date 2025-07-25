import { ChevronDownIcon } from "lucide-react";
import { useId } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

interface DropdownOption {
  label: string;
  value: string;
}

interface InputDropdownProps {
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  options: DropdownOption[];
}

export default function InputDropdown({
  label = "Select an option",
  placeholder = "Choose an option",
  className,
  value,
  onChange,
  error,
  options,
}: InputDropdownProps) {
  const id = useId();

  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption
    ? selectedOption.label
    : value || placeholder;

  return (
    <div className="">
      <Label htmlFor={id}>{label}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-between ${
              error ? "border-red-500" : ""
            } ${className || ""}`}
            type="button"
          >
            {displayValue}
            <ChevronDownIcon className="h-4 w-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange?.(option.value)}
              className="cursor-pointer w-full"
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
