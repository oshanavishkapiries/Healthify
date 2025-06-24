import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MinusIcon, PlusIcon } from "lucide-react";
import {
  Button as RACButton,
  Group,
  Input,
  NumberField,
} from "react-aria-components";
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

interface BMIResult {
  value: number;
  category: string;
  color: string;
}

export default function BmiCalPopup() {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const calculateBMI = (weight: number, height: number): BMIResult => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Define thresholds and categories in order
    const bmiCategories = [
      { max: 18.5, label: "Underweight", color: "text-blue-600" },
      { max: 25, label: "Normal weight", color: "text-green-600" },
      { max: 30, label: "Overweight", color: "text-yellow-600" },
      { max: Infinity, label: "Obese", color: "text-red-600" },
    ];

    const { label: category, color } =
      bmiCategories.find((cat) => bmi < cat.max) ||
      bmiCategories[bmiCategories.length - 1];

    return {
      value: Math.round(bmi * 10) / 10,
      category,
      color,
    };
  };

  const handleCalculate = () => {
    const result = calculateBMI(weight, height);
    setBmiResult(result);
    setShowResult(true);
  };

  const handleReset = () => {
    setWeight(70);
    setHeight(170);
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
                      <div>
                        <Label className="text-foreground text-sm font-medium mb-2 block">
                          Weight (kg)
                        </Label>
                        <NumberField
                          value={weight}
                          onChange={setWeight}
                          minValue={20}
                          maxValue={300}
                          step={0.1}
                        >
                          <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
                            <RACButton
                              slot="decrement"
                              className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <MinusIcon size={16} aria-hidden="true" />
                            </RACButton>
                            <Input className="bg-background text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
                            <RACButton
                              slot="increment"
                              className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <PlusIcon size={16} aria-hidden="true" />
                            </RACButton>
                          </Group>
                        </NumberField>
                      </div>

                      {/* Height Input */}
                      <div>
                        <Label className="text-foreground text-sm font-medium mb-2 block">
                          Height (cm)
                        </Label>
                        <NumberField
                          value={height}
                          onChange={setHeight}
                          minValue={100}
                          maxValue={250}
                          step={1}
                        >
                          <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
                            <RACButton
                              slot="decrement"
                              className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <MinusIcon size={16} aria-hidden="true" />
                            </RACButton>
                            <Input className="bg-background text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
                            <RACButton
                              slot="increment"
                              className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <PlusIcon size={16} aria-hidden="true" />
                            </RACButton>
                          </Group>
                        </NumberField>
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
                        <Button onClick={handleBlogRedirect} className="flex-1">
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
