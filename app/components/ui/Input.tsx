import React from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  helperText,
  error,
  icon,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={clsx(
            "w-full h-10 rounded-lg border bg-white px-3 text-sm text-gray-900",
            "placeholder:text-gray-400",
            "transition-all duration-200 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-200 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-300",
            icon && "pl-10",
            className
          )}
          {...props}
        />
      </div>
      {(helperText || error) && (
        <p
          className={clsx(
            "text-xs",
            error ? "text-red-500" : "text-gray-400"
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
