import React from "react";

const Slider_1: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/sider-images/bg-mask-image.png')`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex h-full">
        {/* Left Side - Text Content */}
        <div className="flex-1 flex items-center justify-center relative">
          <img
            src="/sider-images/full-text-eng-group.png"
            alt="Doctor"
            className="mb-15 w-[80%] sm:w-[60%] md:w-[40%]"
          />
          <img
            src="/sider-images/plus-stars.png"
            alt="Doctor"
            className="w-[30%] absolute top-10 right-10 max-md:hidden"
          />
        </div>

        {/* Right Side - Doctor Image */}
        <div className="flex-1 flex items-center justify-end relative">
          <img
            src="/sider-images/docktor-body-image.png"
            alt="Doctor"
            className="h-full object-contain"
          />
        </div>
      </div>

      {/* Bottom Container with White Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 z-10 bg-gradient-to-t from-white via-white/80 to-transparent">
        <div className="flex items-center justify-center h-full">
          <img
            src="/sider-images/Check your BMI Now!.png"
            alt="Check your BMI Now!"
            className="w-[60%] sm:w-[40%] md:w-[30%] object-contain mt-5"
          />
        </div>
      </div>
    </div>
  );
};

export default Slider_1;
