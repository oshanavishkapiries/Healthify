import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { bmiOptions } from "@/types/constant";

interface BMIResult {
  value: number;
  category: string;
  color: string;
}

const BmiCalculatorV2 = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(5.5);
  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("kg");
  const [heightUnit, setHeightUnit] = useState<"feet" | "cm">("feet");
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showWeightDropdown, setShowWeightDropdown] = useState(false);
  const [showHeightDropdown, setShowHeightDropdown] = useState(false);
  const navigate = useNavigate();

  // Conversion helpers
  const toKg = (w: number, unit: string) => (unit === "kg" ? w : w * 0.453592);
  const toCm = (h: number, unit: string) => (unit === "cm" ? h : h * 30.48);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove leading zeros and convert to number
    const cleanValue = value.replace(/^0+/, "") || "0";
    const numValue = parseFloat(cleanValue);
    if (!isNaN(numValue)) {
      setWeight(numValue);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove leading zeros and convert to number
    const cleanValue = value.replace(/^0+/, "") || "0";
    const numValue = parseFloat(cleanValue);
    if (!isNaN(numValue)) {
      setHeight(numValue);
    }
  };

  const handleWeightUnitChange = (unit: "lbs" | "kg") => {
    if (unit !== weightUnit) {
      setWeight(
        unit === "kg"
          ? Math.round(weight * 0.453592 * 10) / 10
          : Math.round((weight / 0.453592) * 10) / 10
      );
      setWeightUnit(unit);
    }
    setShowWeightDropdown(false);
  };

  const handleHeightUnitChange = (unit: "feet" | "cm") => {
    if (unit !== heightUnit) {
      setHeight(
        unit === "cm"
          ? Math.round(height * 30.48 * 10) / 10
          : Math.round((height / 30.48) * 10) / 10
      );
      setHeightUnit(unit);
    }
    setShowHeightDropdown(false);
  };

  const calculateBMI = (weight: number, height: number): BMIResult => {
    const weightKg = toKg(weight, weightUnit);
    const heightCm = toCm(height, heightUnit);
    const heightInMeters = heightCm / 100;
    const bmi = weightKg / (heightInMeters * heightInMeters);

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
      setIsDialogOpen(true);
    }
  };

  const handleReset = () => {
    setWeight(70);
    setHeight(5.5);
    setWeightUnit("kg");
    setHeightUnit("feet");
    setBmiResult(null);
  };

  const handleBlogRedirect = () => {
    if (bmiResult) {
      let statusValue = null;
      let normalizedCategory =
        bmiResult.category === "Normal weight" ? "Normal" : bmiResult.category;
      const found = bmiOptions.find((opt) => opt.label === normalizedCategory);
      if (found) statusValue = found.value;
      navigate(`/blog?bmi=${statusValue}`);
      setIsDialogOpen(false);
    }
  };

  // Function to handle dropdown toggles with proper state management
  const toggleWeightDropdown = () => {
    setShowWeightDropdown(!showWeightDropdown);
    setShowHeightDropdown(false); // Close height dropdown when opening weight dropdown
  };

  const toggleHeightDropdown = () => {
    setShowHeightDropdown(!showHeightDropdown);
    setShowWeightDropdown(false); // Close weight dropdown when opening height dropdown
  };

  return (
    <div className="w-full max-w-7xl mx-auto lg:p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="max-lg:bg-gradient-to-r from-green-600 via-green-500 to-[#07d51d] relative px-4 lg:px-0 lg:bg-transparent grid grid-cols-12 gap-4 col-span-12 lg:col-span-8">
          {/* Weight Panel */}
          <div className="relative col-span-6">
            <div className="lg:bg-gradient-to-r lg:from-green-600 via-green-500 lg:to-[#07d51d] rounded-lg p-4 text-white">
              <div className="text-sm font-medium mb-2">Weight</div>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={weight || ""}
                  onChange={handleWeightChange}
                  className="text-2xl font-bold bg-transparent text-white outline-none w-20"
                  placeholder="0"
                  min={weightUnit === "kg" ? 20 : 44}
                  max={weightUnit === "kg" ? 300 : 660}
                  step={0.1}
                />
                <div className="flex items-center gap-1">
                  <button
                    onClick={toggleWeightDropdown}
                    className="text-white hover:text-green-100 transition-colors flex items-center gap-1"
                  >
                    <span className="text-base font-medium">{weightUnit}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Weight Dropdown */}
              {showWeightDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => handleWeightUnitChange("kg")}
                    className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 text-base"
                  >
                    kg
                  </button>
                  <button
                    onClick={() => handleWeightUnitChange("lbs")}
                    className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 text-base"
                  >
                    lbs
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Height Panel */}
          <div className="relative col-span-6">
            <div className="lg:bg-gradient-to-r lg:from-green-600 via-green-500 lg:to-[#07d51d] rounded-lg p-4 text-white">
              <div className="text-sm font-medium mb-2">Height</div>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={height || ""}
                  onChange={handleHeightChange}
                  className="text-2xl font-bold bg-transparent text-white outline-none w-20"
                  placeholder="0"
                  min={heightUnit === "cm" ? 100 : 3}
                  max={heightUnit === "cm" ? 250 : 8}
                  step={0.1}
                />
                <div className="flex items-center gap-1">
                  <button
                    onClick={toggleHeightDropdown}
                    className="text-white hover:text-green-100 transition-colors flex items-center gap-1"
                  >
                    <span className="text-base font-medium">{heightUnit}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Height Dropdown */}
              {showHeightDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => handleHeightUnitChange("cm")}
                    className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 text-base"
                  >
                    cm
                  </button>
                  <button
                    onClick={() => handleHeightUnitChange("feet")}
                    className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 text-base"
                  >
                    feet
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:hidden col-span-2 w-[1px] bg-gray-200 h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
        </div>

        {/* Calculate Button */}
        <div className="relative col-span-12 lg:col-span-4 px-4 lg:px-0">
          <button
            onClick={handleCalculate}
            className="w-full h-full bg-green-600 rounded-lg p-4 text-white font-semibold text-xl hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            Calculate
          </button>
        </div>
      </div>

      {/* Result Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsDialogOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                {bmiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="text-sm text-gray-600 mb-2">Your BMI:</div>
                    <motion.div
                      key={bmiResult.value}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className={`text-3xl font-bold ${bmiResult.color} mb-2`}
                    >
                      {bmiResult.value}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className={`text-lg font-medium ${bmiResult.color}`}
                    >
                      {bmiResult.category}
                    </motion.div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="grid grid-cols-2 gap-2 text-xs"
                >
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-medium text-blue-600">Underweight</div>
                    <div className="text-gray-500">&lt; 18.5</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-medium text-green-600">Normal</div>
                    <div className="text-gray-500">18.5 - 24.9</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded">
                    <div className="font-medium text-yellow-600">
                      Overweight
                    </div>
                    <div className="text-gray-500">25 - 29.9</div>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded">
                    <div className="font-medium text-red-600">Obese</div>
                    <div className="text-gray-500">≥ 30</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="flex flex-col gap-3 pt-4"
                >
                  <button
                    onClick={handleBlogRedirect}
                    className={`w-full px-4 py-3 rounded-md text-white font-medium ${
                      bmiResult
                        ? bmiOptions.find(
                            (opt) =>
                              opt.label ===
                              (bmiResult.category === "Normal weight"
                                ? "Normal"
                                : bmiResult.category)
                          )?.buttonClass || "bg-green-500 hover:bg-green-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Suggest Posts for You
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        handleReset();
                        setIsDialogOpen(false);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Recalculate
                    </button>
                    <button
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BmiCalculatorV2;
