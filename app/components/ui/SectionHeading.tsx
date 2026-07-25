import React from "react";
import { clsx } from "clsx";

interface SectionHeadingProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  overline,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "max-w-2xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {overline && (
        <p className="text-sm font-semibold tracking-wide uppercase text-primary-600 mb-3 animate-fade-in">
          {overline}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 animate-fade-in-up">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-500 leading-relaxed animate-fade-in-up delay-100">
          {subtitle}
        </p>
      )}
    </div>
  );
}
