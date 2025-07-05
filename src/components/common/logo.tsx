import * as React from "react";
import { Link } from "react-router-dom";

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
    <Link to="/">
      <div className={className} {...props}>
        <img
          src="/logo.png"
          alt="Logo"
          width={width}
          height={height}
          className="object-contain"
        />
        {/* <h1 className="text-2xl font-bold italic">Healthify</h1> */}
      </div>
    </Link>
  );
}
