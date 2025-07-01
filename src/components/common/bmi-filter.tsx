import { bmiOptions } from "@/types/constant";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router-dom";

const BmiFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("bmi") || "";

  const handleBmiSelect = (bmi: string) => {
    const params = new URLSearchParams(searchParams);
    if (bmi === "All") {
      params.delete("bmi");
      params.set("category", "All");
    } else {
      params.set("bmi", bmi);
    }
    setSearchParams(params, { replace: true });
  };

  return (
    <>
      {bmiOptions.map((bmi: any) => (
        <Button
          key={bmi.value}
          variant={selected === bmi.value ? "default" : "outline"}
          onClick={() => handleBmiSelect(bmi.value)}
            className={selected === bmi.value ? bmi.buttonClass : ""}
        >
          {bmi.label}
        </Button>
      ))}
    </>
  );
};

export default BmiFilter;
