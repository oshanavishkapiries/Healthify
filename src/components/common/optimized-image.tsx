import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  containerClassName,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {isLoading && <div className="absolute inset-0 bg-primary/10 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
};
