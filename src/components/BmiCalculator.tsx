import BmiCalPopup from "@/components/BmiCalPopup";

const BmiCalculator = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background/70 to-accent/20 border rounded-lg p-6 my-4 shadow-lg text-center">
      {/* Gradient overlay elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/30 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent/25 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-foreground mb-2 italic">
          Calculate your BMI
        </h2>
        <p className="text-muted-foreground text-sm mb-4">
          Enter your weight and height to get your BMI result and personalized
          health suggestions.
        </p>
        <BmiCalPopup />
      </div>
    </div>
  );
};

export default BmiCalculator;
