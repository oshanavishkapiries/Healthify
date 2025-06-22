import BmiCalPopup from "@/components/BmiCalPopup";

const BmiCalculator = () => {
  return (
    <div className="bg-background border rounded-lg p-6 my-4 shadow-sm text-center relative">
      <h2 className="text-xl font-bold text-foreground mb-2 italic">
        Calculate your BMI
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        Enter your weight and height to get your BMI result and personalized
        health suggestions.
      </p>
      <BmiCalPopup />
    </div>
  );
};

export default BmiCalculator;
