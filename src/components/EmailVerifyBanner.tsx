import { useState } from "react";
import { Mail, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function EmailVerifyBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  if (!isVisible) return null;

  const handleVerifyEmail = () => {
    navigate(`/auth/verify-email`);
  };

  return (
    <div className="bg-muted text-foreground px-4 py-3 md:py-2">
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <Mail
            className="shrink-0 opacity-60 max-md:mt-0.5"
            size={16}
            aria-hidden="true"
          />
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <p className="text-sm">
              Please verify your email address to complete your account setup
              and access all features.
            </p>
            <div className="flex gap-2 max-md:flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-blue-600 hover:text-blue-700"
                onClick={handleVerifyEmail}
              >
                Verify Email
              </Button>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent text-blue-600 hover:text-blue-700"
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
        >
          <XIcon
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}
