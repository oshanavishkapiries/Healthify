const StaticBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary spotlight - top left */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>

      {/* Secondary spotlight - top right */}
      <div className="absolute -top-20 -right-32 w-64 h-64 bg-primary/15 rounded-full blur-2xl"></div>

      {/* Tertiary spotlight - bottom center */}
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default StaticBackground;
