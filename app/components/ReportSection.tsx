"use client";

import React from "react";
import { Globe, ArrowUpRight } from "lucide-react";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";
import ReportGrid from "./ReportGrid";
import type { ReportData } from "./ReportCard";

interface ReportSectionProps {
  isLoading: boolean;
  reportData: ReportData | null;
  error: { message?: string; statusCode?: number } | null;
  analyzedUrl: string | null;
  onRetry: () => void;
}

export default function ReportSection({
  isLoading,
  reportData,
  error,
  analyzedUrl,
  onRetry,
}: ReportSectionProps) {
  // If nothing has been submitted yet and no loading/error, don't show the section
  if (!isLoading && !reportData && !error) {
    return null;
  }

  return (
    <section id="report" className="py-12 md:py-20 bg-gray-50/80 border-t border-b border-gray-200/60 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Analyzed URL Header Bar */}
        {analyzedUrl && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-[var(--shadow-sm)]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex-shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Analysed URL
                </p>
                <a
                  href={analyzedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-semibold text-gray-900 hover:text-primary-600 truncate flex items-center gap-1 transition-colors"
                >
                  <span className="truncate">{analyzedUrl}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* State 1: Loading Skeleton */}
        {isLoading && <Loading />}

        {/* State 2: Error Card */}
        {!isLoading && error && (
          <ErrorCard
            error={error.message}
            statusCode={error.statusCode}
            onRetry={onRetry}
          />
        )}

        {/* State 3: Analysis Report */}
        {!isLoading && !error && reportData && (
          <ReportGrid data={reportData} />
        )}
      </div>
    </section>
  );
}
