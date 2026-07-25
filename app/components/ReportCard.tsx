import React from "react";
import {
  Globe,
  Clock,
  Type,
  FileText,
  Heading1,
  ImageOff,
  LetterText,
} from "lucide-react";
import Badge from "./ui/Badge";
import MetricRow from "./ui/MetricRow";

// ─── Types ─────────────────────────────────────────────────────────

export interface ReportData {
  status: number;
  responseTime: number;
  title: string | null;
  metaDescription: string | null;
  h1Count: number;
  missingAltImages: number;
  wordCount: number;
}

interface ReportCardProps {
  data: ReportData;
  className?: string;
}

// ─── Helpers ───────────────────────────────────────────────────────

function httpStatusVariant(status: number) {
  if (status >= 200 && status < 300) return "success" as const;
  if (status >= 300 && status < 400) return "warning" as const;
  return "danger" as const;
}

function httpStatusLabel(status: number) {
  if (status >= 200 && status < 300) return "OK";
  if (status >= 300 && status < 400) return "Redirect";
  if (status >= 400 && status < 500) return "Client Error";
  return "Server Error";
}

function responseTimeStatus(ms: number) {
  if (ms < 500) return "success" as const;
  if (ms < 2000) return "warning" as const;
  return "danger" as const;
}

function h1Status(count: number) {
  if (count === 1) return "success" as const;
  if (count === 0) return "danger" as const;
  return "warning" as const;
}

function h1Hint(count: number) {
  if (count === 1) return "Exactly one — perfect";
  if (count === 0) return "Missing — add an H1 for SEO";
  return `Found ${count} — use only one per page`;
}

function altStatus(count: number) {
  if (count === 0) return "success" as const;
  if (count <= 3) return "warning" as const;
  return "danger" as const;
}

function wordCountStatus(count: number) {
  if (count >= 300) return "success" as const;
  if (count >= 100) return "warning" as const;
  return "danger" as const;
}

function wordCountHint(count: number) {
  if (count >= 300) return "Good content length";
  if (count >= 100) return "Consider adding more content";
  return "Very thin content — aim for 300+ words";
}

// ─── Component ─────────────────────────────────────────────────────

export default function ReportCard({ data, className = "" }: ReportCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-[var(--shadow-base)] overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            Page Analysis
          </h3>
          <Badge variant={httpStatusVariant(data.status)}>
            {data.status} · {httpStatusLabel(data.status)}
          </Badge>
        </div>
      </div>

      {/* Metrics */}
      <div className="px-6 divide-y divide-gray-100">
        <MetricRow
          icon={Globe}
          label="HTTP Status"
          value={data.status}
          status={httpStatusVariant(data.status)}
        />

        <MetricRow
          icon={Clock}
          label="Response Time"
          value={`${data.responseTime} ms`}
          hint={
            data.responseTime < 500
              ? "Fast response"
              : data.responseTime < 2000
                ? "Moderate — could be faster"
                : "Slow — investigate performance"
          }
          status={responseTimeStatus(data.responseTime)}
        />

        <MetricRow
          icon={Type}
          label="Page Title"
          value={
            data.title ? (
              <span
                className="max-w-[200px] truncate inline-block align-bottom"
                title={data.title}
              >
                {data.title}
              </span>
            ) : (
              <span className="text-red-500">Missing</span>
            )
          }
          hint={
            data.title
              ? `${data.title.length} characters`
              : "Add a <title> tag for SEO"
          }
          status={data.title ? "success" : "danger"}
        />

        <MetricRow
          icon={FileText}
          label="Meta Description"
          value={
            data.metaDescription ? (
              <span
                className="max-w-[200px] truncate inline-block align-bottom"
                title={data.metaDescription}
              >
                {data.metaDescription}
              </span>
            ) : (
              <span className="text-red-500">Missing</span>
            )
          }
          hint={
            data.metaDescription
              ? `${data.metaDescription.length} characters`
              : "Add a meta description for search results"
          }
          status={data.metaDescription ? "success" : "warning"}
        />

        <MetricRow
          icon={Heading1}
          label="H1 Tags"
          value={data.h1Count}
          hint={h1Hint(data.h1Count)}
          status={h1Status(data.h1Count)}
        />

        <MetricRow
          icon={ImageOff}
          label="Images Missing Alt"
          value={data.missingAltImages}
          hint={
            data.missingAltImages === 0
              ? "All images have alt text"
              : `${data.missingAltImages} image${data.missingAltImages > 1 ? "s" : ""} need alt text`
          }
          status={altStatus(data.missingAltImages)}
        />

        <MetricRow
          icon={LetterText}
          label="Word Count"
          value={data.wordCount.toLocaleString()}
          hint={wordCountHint(data.wordCount)}
          status={wordCountStatus(data.wordCount)}
        />
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50/60 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Analyzed just now · Results are based on the initial HTML response
        </p>
      </div>
    </div>
  );
}
