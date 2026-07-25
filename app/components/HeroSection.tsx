"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import Badge from "./ui/Badge";
import UrlForm from "./UrlForm";

interface HeroSectionProps {
  onAnalyze?: (url: string) => void;
  isLoading?: boolean;
}

export default function HeroSection({
  onAnalyze,
  isLoading = false,
}: HeroSectionProps) {
  return (
    <section id="analyzer" className="relative overflow-hidden bg-white pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orb — top right */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-100/50 blur-3xl animate-float" />
        {/* Gradient orb — bottom left */}
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary-50/60 blur-3xl animate-float delay-300" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--gray-300) 1px, transparent 1px), linear-gradient(90deg, var(--gray-300) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — Copy & Form */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <Badge variant="primary" className="mb-6 animate-fade-in">
              <Sparkles className="w-3 h-3" />
              Developer-first web analysis
            </Badge>

            <h1 className="text-4xl  sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-gray-900 leading-[1.18] animate-fade-in-up">
              Analyse any website for{" "}
              <span className="bg-black/90 px-1 rounded-sm text-white"> SEO</span>,
              <span className="text-primary-600"> Structure</span> and
              <span className="text-primary-600"> Accessibility</span>.
            </h1>

            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg animate-fade-in-up delay-100">
              Paste any URL and get instant analysis for SEO, performance,
              accessibility, and structure. Built for developers who ship fast.
            </p>

            {/* URL Input Form */}
            <div className="mt-8 animate-fade-in-up delay-200">
              <UrlForm
                onSubmit={(url) => onAnalyze?.(url)}
                isLoading={isLoading}
                placeholder="https://example.com"
              />
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-4 animate-fade-in-up delay-300 justify-center lg:justify-start">
              {/* <div className="flex -space-x-2">
                {[
                  "bg-primary-400",
                  "bg-emerald-400",
                  "bg-amber-400",
                  "bg-rose-400",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div> */}
              {/* <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">2,000+</span>{" "}
                pages analyzed this week
              </p> */}
            </div>
          </div>

          {/* Right — Mock Dashboard Preview */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg animate-fade-in-up delay-200">
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-primary-100/40 rounded-3xl blur-2xl" />

              {/* Dashboard card */}
              <div className="relative bg-white rounded-2xl border border-gray-200 shadow-[var(--shadow-xl)] overflow-hidden">
                {/* Card header */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/60">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-gray-100 rounded-md h-6 flex items-center px-3">
                      <span className="text-xs text-gray-400 font-mono">
                        pagepulse.dev/report
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5 space-y-5">
                  {/* Score ring */}
                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          fill="none"
                          stroke="var(--gray-100)"
                          strokeWidth="6"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          fill="none"
                          stroke="var(--primary-500)"
                          strokeWidth="6"
                          strokeDasharray={`${0.92 * 2 * Math.PI * 34} ${2 * Math.PI * 34}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">
                        92
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Overall Score
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Excellent health
                      </p>
                    </div>
                  </div>

                  {/* Metric bars */}
                  <div className="space-y-3">
                    {[
                      { label: "SEO", score: 95, color: "bg-emerald-500" },
                      { label: "Performance", score: 88, color: "bg-primary-500" },
                      { label: "Accessibility", score: 91, color: "bg-amber-500" },
                      { label: "Best Practices", score: 94, color: "bg-violet-500" },
                    ].map((metric) => (
                      <div key={metric.label} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600">
                            {metric.label}
                          </span>
                          <span className="text-xs font-bold text-gray-900">
                            {metric.score}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${metric.color} rounded-full`}
                            style={{ width: `${metric.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
