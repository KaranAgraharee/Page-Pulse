"use client";

import React from "react";
import { AlertTriangle, RefreshCw, HelpCircle, ShieldAlert } from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { classifyErrorDetails, type ErrorType } from "../lib/errors";

interface ErrorCardProps {
  /** Raw error message or error type code */
  error?: string;
  /** HTTP status code if available */
  statusCode?: number;
  /** Optional callback to retry the action */
  onRetry?: () => void;
  /** Custom class name override */
  className?: string;
}

const errorBadgeVariant: Record<ErrorType, "danger" | "warning" | "default"> = {
  INVALID_URL: "warning",
  TIMEOUT: "warning",
  NOT_FOUND: "danger",
  SERVER_ERROR: "danger",
  NETWORK_ERROR: "danger",
  NON_HTML: "warning",
  UNKNOWN_ERROR: "danger",
};

export default function ErrorCard({
  error,
  statusCode,
  onRetry,
  className = "",
}: ErrorCardProps) {
  const details = classifyErrorDetails(error, statusCode);
  const badgeVariant = errorBadgeVariant[details.type];

  return (
    <div
      className={`bg-white rounded-xl border border-red-200/80 shadow-[var(--shadow-base)] p-6 md:p-8 overflow-hidden relative ${className}`}
      role="alert"
    >
      {/* Background accent glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-red-50/50 blur-2xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-start gap-5">
        {/* Error icon container */}
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-600 border border-red-100 flex-shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Error Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h3 className="text-lg font-semibold text-gray-900">
              {details.title}
            </h3>
            <Badge variant={badgeVariant}>
              {details.statusCode ? `HTTP ${details.statusCode}` : details.type}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            {details.message}
          </p>

          {/* Action Hint */}
          {details.actionHint && (
            <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-100 mb-4">
              <HelpCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <span>{details.actionHint}</span>
            </div>
          )}

          {/* Actions */}
          {onRetry && (
            <div className="pt-1">
              <Button
                variant="secondary"
                size="sm"
                onClick={onRetry}
                icon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
