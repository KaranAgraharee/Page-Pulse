import React from "react";
import { clsx } from "clsx";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Reusable animated skeleton placeholder block.
 */
export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "bg-gray-200/80 rounded-md animate-pulse",
        className
      )}
      {...props}
    />
  );
}
