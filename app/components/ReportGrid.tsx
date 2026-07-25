import React from "react";
import ReportCard, { type ReportData } from "./ReportCard";

interface ReportGridProps {
  /** The analysis result data to display. */
  data: ReportData;
  className?: string;
}

/**
 * Responsive grid wrapper that displays the ReportCard alongside
 * a summary panel. Designed to scale — additional cards (e.g.
 * heading tree, link checker) can be added here later.
 */
export default function ReportGrid({ data, className = "" }: ReportGridProps) {
  // Compute a simple overall score (0-100) from the metrics
  const scores: number[] = [];

  // HTTP status
  scores.push(data.status >= 200 && data.status < 300 ? 100 : 0);
  // Response time: 100 if <300ms, 0 if >5000ms, linear between
  scores.push(Math.max(0, Math.min(100, Math.round(((5000 - data.responseTime) / 4700) * 100))));
  // Title present
  scores.push(data.title ? 100 : 0);
  // Meta description present
  scores.push(data.metaDescription ? 100 : 0);
  // H1 count (1 = 100, 0 = 0, >1 = 50)
  scores.push(data.h1Count === 1 ? 100 : data.h1Count === 0 ? 0 : 50);
  // Missing alt (0 = 100, 1-3 = 60, >3 = 20)
  scores.push(data.missingAltImages === 0 ? 100 : data.missingAltImages <= 3 ? 60 : 20);
  // Word count (300+ = 100, 100-299 = 60, <100 = 20)
  scores.push(data.wordCount >= 300 ? 100 : data.wordCount >= 100 ? 60 : 20);

  const overall = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  const scoreColor =
    overall >= 80
      ? "text-emerald-600"
      : overall >= 50
        ? "text-amber-600"
        : "text-red-600";

  const scoreRingColor =
    overall >= 80
      ? "stroke-emerald-500"
      : overall >= 50
        ? "stroke-amber-500"
        : "stroke-red-500";

  const scoreLabel =
    overall >= 80 ? "Excellent" : overall >= 50 ? "Needs Work" : "Poor";

  const circumference = 2 * Math.PI * 54;
  const dashArray = `${(overall / 100) * circumference} ${circumference}`;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
      {/* Summary score card */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl border border-gray-200 shadow-[var(--shadow-base)] p-6 flex flex-col items-center justify-center h-full gap-4">
          {/* Score ring */}
          <div className="relative w-32 h-32">
            <svg
              className="w-32 h-32 -rotate-90"
              viewBox="0 0 128 128"
            >
              <circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                className="stroke-gray-100"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                className={scoreRingColor}
                strokeWidth="8"
                strokeDasharray={dashArray}
                strokeLinecap="round"
                style={{
                  transition: "stroke-dasharray 0.8s ease-out",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${scoreColor}`}>
                {overall}
              </span>
              <span className="text-xs text-gray-400 font-medium mt-0.5">
                / 100
              </span>
            </div>
          </div>

          {/* Label */}
          <div className="text-center">
            <p className={`text-sm font-semibold ${scoreColor}`}>
              {scoreLabel}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Overall page health score
            </p>
          </div>

          {/* Quick stats */}
          <div className="w-full grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 mt-2">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {data.responseTime}
                <span className="text-xs font-normal text-gray-400 ml-0.5">
                  ms
                </span>
              </p>
              <p className="text-xs text-gray-400">Response</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {data.wordCount.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Words</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed report card */}
      <div className="lg:col-span-2">
        <ReportCard data={data} className="h-full" />
      </div>
    </div>
  );
}
