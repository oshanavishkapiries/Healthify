import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: string;
}

export default function PasswordInput({
  label = "Password",
  placeholder = "Enter your password",
  className,
  value,
  onChange,
  required = false,
  error,
}: PasswordInputProps) {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          className={`pe-9 ${error ? "border-red-500" : ""} ${className || ""}`}
          placeholder={placeholder}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
        />

        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOffIcon size={16} aria-hidden="true" />
          ) : (
            <EyeIcon size={16} aria-hidden="true" />
          )}
        </button>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
