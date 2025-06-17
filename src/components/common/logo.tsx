import * as React from "react";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
}

export function Logo({
  width = 40,
  height = 40,
  className,
  ...props
}: LogoProps) {
  return (
    <div className={className} {...props}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrrCUaTz-dGzvJS0OArGv3VRv_dRrH7Aojiw&s"
        alt="Logo"
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
}
