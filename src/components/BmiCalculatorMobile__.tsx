import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { bmiOptions } from "@/types/constant";
import InputDropdown from "@/components/common/input-dropdown";

interface BMIResult {
  value: number;
  category: string;
  color: string;
}

const BmiCalculatorMobile = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(168);
  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("kg");
  const [heightUnit, setHeightUnit] = useState<"inches" | "cm">("cm");
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
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
    if (weight > 0 && height > 0) {
      const result = calculateBMI(weight, height);
      setBmiResult(result);
      setShowResultDialog(true);
    }
  };

  const handleReset = () => {
    setBmiResult(null);
    setShowResultDialog(false);
  };

  const handleBlogRedirect = () => {
    if (bmiResult) {
      let statusValue = null;
      let normalizedCategory =
        bmiResult.category === "Normal weight" ? "Normal" : bmiResult.category;
      const found = bmiOptions.find((opt) => opt.label === normalizedCategory);
      if (found) statusValue = found.value;
      navigate(`/blog?bmi=${statusValue}`);
      setShowResultDialog(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full max-w-7xl mx-auto ">
      <Card className="w-full bg-background border-none shadow-none rounded-none overflow-hidden">
        <CardContent className="p-0">
          {/* Mobile Layout - Hidden on md+ screens */}
          <div className="md:hidden">
            {/* Weight and Height Inputs */}
            <div className="bg-gradient-to-r from-green-400 via-green-600 to-green-700 text-white">
              <div className="grid grid-cols-2">
                {/* Weight */}
                <div className="p-4 text-center border-r border-primary-foreground/20">
                  <Label className="text-primary-foreground font-semibold text-lg mb-2 block">
                    Weight
                  </Label>
                  <div className="flex flex-row justify-center items-center">
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-20 text-center text-2xl font-bold bg-transparent border-none text-primary-foreground placeholder-primary-foreground/60 focus:ring-0 focus:border-none p-0"
                      min={weightUnit === "kg" ? 20 : 44}
                      max={weightUnit === "kg" ? 300 : 660}
                      step={0.1}
                    />
                    <InputDropdown
                      label=""
                      value={weightUnit}
                      onChange={(val) =>
                        handleWeightUnitChange(val as "lbs" | "kg")
                      }
                      options={[
                        { label: "kg", value: "kg" },
                        { label: "lbs", value: "lbs" },
                      ]}
                      className="text-xs bg-transparent border-none shadow-none text-white"
                    />
                  </div>
                </div>

                {/* Height */}
                <div className="p-4 text-center">
                  <Label className="text-primary-foreground font-semibold text-lg mb-2 block">
                    Height
                  </Label>
                  <div className="flex flex-row justify-center items-center">
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-20 text-center text-2xl font-bold bg-transparent border-none text-primary-foreground placeholder-primary-foreground/60 focus:ring-0 focus:border-none p-0"
                      min={heightUnit === "cm" ? 100 : 39}
                      max={heightUnit === "cm" ? 250 : 98}
                      step={1}
                    />
                    <InputDropdown
                      label=""
                      value={heightUnit}
                      onChange={(val) =>
                        handleHeightUnitChange(val as "inches" | "cm")
                      }
                      options={[
                        { label: "cm", value: "cm" },
                        { label: "inches", value: "inches" },
                      ]}
                      className="text-sm bg-transparent border-none shadow-none text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="pt-4 px-4">
              <Button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-green-400 via-green-600 to-green-700 text-white font-bold py-4 text-md rounded-md transition-colors"
                size="lg"
              >
                CALCULATE
              </Button>
            </div>
          </div>

          {/* Desktop Layout - Hidden on mobile, visible on md+ screens */}
          <div className="hidden md:block">
            <div className="bg-gradient-to-r from-green-400 via-green-600 to-green-700 text-white">
              <div className="grid grid-cols-3">
                {/* Weight */}
                <div className="p-6 text-center border-r border-primary-foreground/20">
                  <Label className="text-primary-foreground font-semibold text-lg mb-3 block">
                    Weight
                  </Label>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-24 text-center text-2xl font-bold bg-transparent border-none text-primary-foreground placeholder-primary-foreground/60 focus:ring-0 focus:border-none p-0"
                      min={weightUnit === "kg" ? 20 : 44}
                      max={weightUnit === "kg" ? 300 : 660}
                      step={0.1}
                    />
                  </div>
                  <div className="flex justify-center">
                    <div className="w-20">
                      <InputDropdown
                        label=""
                        value={weightUnit}
                        onChange={(val) =>
                          handleWeightUnitChange(val as "lbs" | "kg")
                        }
                        options={[
                          { label: "kg", value: "kg" },
                          { label: "lbs", value: "lbs" },
                        ]}
                        className="text-xs bg-white/20 border-white/30 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Height */}
                <div className="p-6 text-center border-r border-primary-foreground/20">
                  <Label className="text-primary-foreground font-semibold text-lg mb-3 block">
                    Height
                  </Label>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-24 text-center text-2xl font-bold bg-transparent border-none text-primary-foreground placeholder-primary-foreground/60 focus:ring-0 focus:border-none p-0"
                      min={heightUnit === "cm" ? 100 : 39}
                      max={heightUnit === "cm" ? 250 : 98}
                      step={1}
                    />
                  </div>
                  <div className="flex justify-center">
                    <div className="w-20">
                      <InputDropdown
                        label=""
                        value={heightUnit}
                        onChange={(val) =>
                          handleHeightUnitChange(val as "inches" | "cm")
                        }
                        options={[
                          { label: "cm", value: "cm" },
                          { label: "inches", value: "inches" },
                        ]}
                        className="text-xs bg-white/20 border-white/30 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Calculator */}
                <div className="p-6 flex items-center justify-center">
                  <Button
                    onClick={handleCalculate}
                    className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 text-lg rounded-md transition-colors border border-white/30"
                    size="lg"
                  >
                    CALCULATE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BMI Result Dialog */}
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>BMI Result</DialogTitle>
            <DialogDescription asChild>
              <div className="pt-4">
                <AnimatePresence>
                  {bmiResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 text-center"
                    >
                      {/* BMI Result */}
                      <div className="p-3 bg-muted rounded-lg text-center">
                        <div className="mb-2">
                          <span className="text-sm text-muted-foreground">
                            Your BMI:
                          </span>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                          className={`text-4xl font-bold ${bmiResult.color} mb-2`}
                        >
                          {bmiResult.value}
                        </motion.div>
                        <div
                          className={`text-xl font-medium ${bmiResult.color}`}
                        >
                          {bmiResult.category}
                        </div>
                      </div>

                      {/* BMI Categories Info */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                          <div className="font-medium text-blue-600">
                            Underweight
                          </div>
                          <div className="text-muted-foreground">&lt; 18.5</div>
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
                          <div className="text-muted-foreground">25 - 29.9</div>
                        </div>
                        <div className="text-center p-2 bg-red-50 dark:bg-red-950/20 rounded">
                          <div className="font-medium text-red-600">Obese</div>
                          <div className="text-muted-foreground">≥ 30</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t space-y-3">
                        <Button
                          onClick={handleBlogRedirect}
                          className={`w-full ${
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
                          Read Blog Suggestions for You
                        </Button>
                        <Button
                          onClick={handleReset}
                          variant="outline"
                          className="w-full"
                        >
                          Calculate Again
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BmiCalculatorMobile;
