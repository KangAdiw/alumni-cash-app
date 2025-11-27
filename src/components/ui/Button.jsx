import React from "react";
import { cn } from "../../utils/cn";

const Button = ({
  children,
  variant = "primary", // Pilihan: primary, outline, ghost, danger
  className,
  ...props
}) => {
  // Style dasar tombol
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  // Variasi warna tombol
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant] || variants.primary, // Default ke primary jika typo
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
