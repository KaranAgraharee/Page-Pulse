import React from "react";
import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";

// ─── MetricRow ─────────────────────────────────────────────────────

export interface MetricRowProps {
  /** Lucide icon component to render. */
  icon: LucideIcon;
  /** Label describing the metric. */
  label: string;
  /** The value to display (string, number, or React node). */
  value: React.ReactNode;
  /** Optional helper text shown below the value. */
  hint?: string;
  /** Status styling for the row. */
  status?: "default" | "success" | "warning" | "danger";
}

const statusDot: Record<NonNullable<MetricRowProps["status"]>, string> = {
  default: "bg-gray-300",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
};

const statusIcon: Record<NonNullable<MetricRowProps["status"]>, string> = {
  default: "text-gray-400 bg-gray-50",
  success: "text-emerald-600 bg-emerald-50",
  warning: "text-amber-600 bg-amber-50",
  danger: "text-red-600 bg-red-50",
};

export default function MetricRow({
  icon: Icon,
  label,
  value,
  hint,
  status = "default",
}: MetricRowProps) {
  return (
    <div className="flex items-start gap-3 py-3 group">
      {/* Icon */}
      <div
        className={clsx(
          "flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 transition-colors duration-200",
          statusIcon[status]
        )}
      >
        <Icon className="w-4.5 h-4.5" />
      </div>

      {/* Label + hint */}
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm text-gray-500">{label}</p>
        {hint && (
          <p className="text-xs text-gray-400 mt-0.5">{hint}</p>
        )}
      </div>

      {/* Value + status dot */}
      <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
        <span
          className={clsx(
            "w-2 h-2 rounded-full transition-transform group-hover:scale-125",
            statusDot[status]
          )}
          aria-hidden="true"
        />
        <span className="sr-only">Status: {status}</span>
        <span className="text-sm font-semibold text-gray-900 text-right">
          {value}
        </span>
      </div>
    </div>
  );
}
