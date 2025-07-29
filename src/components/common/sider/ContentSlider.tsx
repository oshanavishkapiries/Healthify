import React, { useState, useEffect } from "react";
//import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider_1 from "./Slider_1";
import Slider_2 from "./Slider_2";

interface ContentSliderProps {
  autoPlay?: boolean;
  interval?: number;
}

const ContentSlider: React.FC<ContentSliderProps> = ({
  autoPlay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of slider components
  const sliderComponents = [Slider_1, Slider_2];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderComponents.length - 1 ? 0 : prevIndex + 1
    );
  };

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? sliderComponents.length - 1 : prevIndex - 1
  //   );
  // };

  // const goToSlide = (index: number) => {
  //   setCurrentIndex(index);
  // };

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  return (
    <div className="relative w-full h-[250px] sm:h-[320px] md:h-[450px] lg:h-[500px] xl:h-[600px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderComponents.map((SliderComponent, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <SliderComponent />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button> */}

      {/* Dots Indicator */}
      {/* {sliderComponents.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {sliderComponents.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )} */}

      {/* Slide Counter */}
      {/* {sliderComponents.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-20">
          {currentIndex + 1} / {sliderComponents.length}
        </div>
      )} */}
    </div>
  );
};

export default ContentSlider;
