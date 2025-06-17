import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function BackButton() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} variant="outline" type="button" className="rounded-full w-10 h-10">
      <ArrowLeft size={15} />
    </Button>
  );
}
