import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputTextProps {
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: string;
  type?: string;
  id?: string;
}

export default function InputText({
  label = "Input",
  placeholder = "Enter text",
  className,
  value,
  onChange,
  required = false,
  error,
  type = "text",
  id: propId,
}: InputTextProps) {
  const generatedId = useId();
  const id = propId || generatedId;

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        className={`${error ? "border-destructive" : ""} ${className || ""}`}
      />
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}
