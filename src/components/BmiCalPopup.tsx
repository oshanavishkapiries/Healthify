import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { bmiOptions } from "@/types/constant";
import InputDropdown from "@/components/common/input-dropdown";

interface BMIResult {
  value: number;
  category: string;
  color: string;
}

export default function BmiCalPopup() {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("kg");
  const [heightUnit, setHeightUnit] = useState<"inches" | "cm">("cm");
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  // Conversion helpers
  const toKg = (w: number, unit: string) => (unit === "kg" ? w : w * 0.453592);
  const toCm = (h: number, unit: string) => (unit === "cm" ? h : h * 2.54);

  const handleWeightUnitChange = (unit: "lbs" | "kg") => {
    if (unit !== weightUnit) {
      // Convert value to new unit
      setWeight(
        unit === "kg"
          ? Math.round(weight * 0.453592 * 10) / 10
          : Math.round((weight / 0.453592) * 10) / 10
      );
      setWeightUnit(unit);
    }
  };
  const handleHeightUnitChange = (unit: "inches" | "cm") => {
    if (unit !== heightUnit) {
      setHeight(
        unit === "cm"
          ? Math.round(height * 2.54 * 10) / 10
          : Math.round((height / 2.54) * 10) / 10
      );
      setHeightUnit(unit);
    }
  };

  const calculateBMI = (weight: number, height: number): BMIResult => {
    // Always use kg and cm for calculation
    const weightKg = toKg(weight, weightUnit);
    const heightCm = toCm(height, heightUnit);
    const heightInMeters = heightCm / 100;
    const bmi = weightKg / (heightInMeters * heightInMeters);

    // Map BMI to category using thresholds
    let categoryObj = null;
    if (bmi < 18.5) categoryObj = bmiOptions[0];
    else if (bmi < 25) categoryObj = bmiOptions[1];
    else if (bmi < 30) categoryObj = bmiOptions[2];
    else categoryObj = bmiOptions[3];

    return {
      value: Math.round(bmi * 10) / 10,
      category: categoryObj.label,
      color: categoryObj.color,
    };
  };

  const handleCalculate = () => {
    const result = calculateBMI(weight, height);
    setBmiResult(result);
    setShowResult(true);
  };

  const handleReset = () => {
    setWeight(0);
    setHeight(0);
    setWeightUnit("kg");
    setHeightUnit("cm");
    setBmiResult(null);
    setShowResult(false);
  };

  const handleBlogRedirect = () => {
    if (bmiResult) {
      let statusValue = null;
      let normalizedCategory =
        bmiResult.category === "Normal weight" ? "Normal" : bmiResult.category;
      const found = bmiOptions.find((opt) => opt.label === normalizedCategory);
      if (found) statusValue = found.value;
      navigate(`/blog?bmi=${statusValue}`);
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && handleReset()}>
      <DialogTrigger asChild>
        <Button className="w-[150px] rounded-full">Calculate</Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg"
      >
        <ScrollArea className="flex max-h-full flex-col overflow-hidden">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6">BMI Calculator</DialogTitle>
            <DialogDescription asChild>
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {!showResult ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* BMI Categories Info */}
                      <div className="pt-4 border-t">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                            <div className="font-medium text-blue-600">
                              Underweight
                            </div>
                            <div className="text-muted-foreground">
                              &lt; 18.5
                            </div>
                          </div>
                          <div className="text-center p-2 bg-green-50 dark:bg-green-950/20 rounded">
                            <div className="font-medium text-green-600">
                              Normal
                            </div>
                            <div className="text-muted-foreground">
                              18.5 - 24.9
                            </div>
                          </div>
                          <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                            <div className="font-medium text-yellow-600">
                              Overweight
                            </div>
                            <div className="text-muted-foreground">
                              25 - 29.9
                            </div>
                          </div>
                          <div className="text-center p-2 bg-red-50 dark:bg-red-950/20 rounded">
                            <div className="font-medium text-red-600">
                              Obese
                            </div>
                            <div className="text-muted-foreground">≥ 30</div>
                          </div>
                        </div>
                      </div>
                      {/* Weight Input */}
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label className="text-foreground text-sm font-medium mb-2 block">
                            Weight
                          </Label>
                          <input
                            type="number"
                            value={weight}
                            min={weightUnit === "kg" ? 20 : 44}
                            max={weightUnit === "kg" ? 300 : 660}
                            step={0.1}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full border rounded-md px-3 py-2 text-center tabular-nums bg-background text-foreground"
                          />
                        </div>
                        <div className="w-28">
                          <InputDropdown
                            label=""
                            value={weightUnit}
                            onChange={(val) =>
                              handleWeightUnitChange(val as "lbs" | "kg")
                            }
                            options={[
                              { label: "lbs", value: "lbs" },
                              { label: "kg", value: "kg" },
                            ]}
                          />
                        </div>
                      </div>
                      {/* Height Input */}
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label className="text-foreground text-sm font-medium mb-2 block">
                            Height
                          </Label>
                          <input
                            type="number"
                            value={height}
                            min={heightUnit === "cm" ? 100 : 39}
                            max={heightUnit === "cm" ? 250 : 98}
                            step={1}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="w-full border rounded-md px-3 py-2 text-center tabular-nums bg-background text-foreground"
                          />
                        </div>
                        <div className="w-28">
                          <InputDropdown
                            label=""
                            value={heightUnit}
                            onChange={(val) =>
                              handleHeightUnitChange(val as "inches" | "cm")
                            }
                            options={[
                              { label: "inches", value: "inches" },
                              { label: "cm", value: "cm" },
                            ]}
                          />
                        </div>
                      </div>
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button onClick={handleCalculate} className="flex-1">
                          Calculate BMI
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 text-center"
                    >
                      {/* BMI Result */}
                      {bmiResult && (
                        <motion.div
                          className="p-4 bg-muted rounded-lg text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="mb-2">
                            <span className="text-sm text-muted-foreground">
                              Your BMI:
                            </span>
                          </div>
                          <motion.div
                            key={bmiResult.value}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className={`text-3xl font-bold ${bmiResult.color} mb-2`}
                          >
                            {bmiResult.value}
                          </motion.div>
                          <div
                            className={`text-lg font-medium ${bmiResult.color}`}
                          >
                            {bmiResult.category}
                          </div>
                        </motion.div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                        <Button
                          onClick={handleReset}
                          variant="outline"
                          className="flex-1"
                        >
                          Recalculate
                        </Button>
                        <Button
                          onClick={handleBlogRedirect}
                          className={`flex-1 ${
                            bmiResult
                              ? bmiOptions.find(
                                  (opt) =>
                                    opt.label ===
                                    (bmiResult.category === "Normal weight"
                                      ? "Normal"
                                      : bmiResult.category)
                                )?.buttonClass || ""
                              : ""
                          }`}
                        >
                          Read blog suggestion for you
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </DialogDescription>
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
