import { useId } from "react";
import { AtSignIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailInputProps {
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: string;
}

export default function EmailInput({
  label = "Email",
  placeholder = "Enter your email",
  className,
  value,
  onChange,
  required = false,
  error,
}: EmailInputProps) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          className={`peer ps-9 ${error ? "border-red-500" : ""} ${
            className || ""
          }`}
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
        />

        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <AtSignIcon size={16} aria-hidden="true" />
        </div>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
