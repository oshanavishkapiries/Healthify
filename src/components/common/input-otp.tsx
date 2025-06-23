import { useId } from "react";
import { OTPInput, type SlotProps } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface InputOTPProps {
  label?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  maxLength?: number;
  disabled?: boolean;
  showDivider?: boolean;
  dividerPosition?: number;
}

export default function InputOTP({
  label = "OTP Code",
  className,
  value,
  onChange,
  error,
  maxLength = 6,
  disabled = false,
  showDivider = true,
  dividerPosition = 3,
}: InputOTPProps) {
  const id = useId();

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <OTPInput
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        containerClassName={cn(
          "flex items-center gap-3 has-disabled:opacity-50",
          className
        )}
        maxLength={maxLength}
        render={({ slots }) => (
          <>
            <div className="flex">
              {slots.slice(0, dividerPosition).map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>

            {showDivider && (
              <div className="text-muted-foreground/80">
                <MinusIcon size={16} aria-hidden="true" />
              </div>
            )}

            <div className="flex">
              {slots.slice(dividerPosition).map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>
          </>
        )}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-input bg-background text-foreground relative -ms-px flex size-9 items-center justify-center border font-medium shadow-xs transition-[color,box-shadow] first:ms-0 first:rounded-s-md last:rounded-e-md",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
