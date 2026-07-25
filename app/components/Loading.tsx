import React from "react";
import Skeleton from "./ui/Skeleton";

interface LoadingProps {
  /** Optional custom class name */
  className?: string;
}

/**
 * Report Loading Skeleton component.
 * Mirrors the exact layout and dimensions of ReportGrid and ReportCard
 * to ensure smooth transitions with ZERO layout shift.
 */
export default function Loading({ className = "" }: LoadingProps) {
  return (
    <div className={`w-full animate-fade-in ${className}`}>
      {/* Loading Status Banner */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary-500 animate-ping" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Grid matching ReportGrid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Score Card Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-[var(--shadow-base)] p-6 flex flex-col items-center justify-center h-full gap-4 min-h-[380px]">
            {/* Score Ring Skeleton */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="absolute w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center">
                <Skeleton className="h-8 w-12 mb-1" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>

            {/* Label Skeletons */}
            <div className="flex flex-col items-center gap-1.5 w-full">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-36" />
            </div>

            {/* Quick Stats Skeleton */}
            <div className="w-full grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 mt-2">
              <div className="flex flex-col items-center gap-1">
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Report Card Skeleton */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-[var(--shadow-base)] overflow-hidden">
            {/* Header Skeleton */}
            <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* 7 Metric Rows Skeleton */}
            <div className="px-6 divide-y divide-gray-100">
              {[
                { labelW: "w-24", valW: "w-12", hintW: "w-0" },
                { labelW: "w-28", valW: "w-16", hintW: "w-28" },
                { labelW: "w-20", valW: "w-36", hintW: "w-24" },
                { labelW: "w-32", valW: "w-40", hintW: "w-32" },
                { labelW: "w-20", valW: "w-8", hintW: "w-36" },
                { labelW: "w-36", valW: "w-8", hintW: "w-28" },
                { labelW: "w-24", valW: "w-16", hintW: "w-32" },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-9 h-9 rounded-lg flex-shrink-0" />
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className={`h-4 ${row.labelW}`} />
                      {row.hintW !== "w-0" && (
                        <Skeleton className={`h-3 ${row.hintW}`} />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-1.5 h-1.5 rounded-full" />
                    <Skeleton className={`h-4 ${row.valW}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Skeleton */}
            <div className="px-6 py-3 bg-gray-50/60 border-t border-gray-100 flex justify-center">
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
