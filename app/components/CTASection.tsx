import React from "react";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const scrollToAnalyzer = () => {
    document
      .getElementById("analyzer")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-6 py-16 sm:px-12 sm:py-20 text-center shadow-[var(--shadow-xl)]">
          {/* Decorative Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-100">
              Ready to analyze another website?
            </span>

            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Start your next website audit
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-primary-100">
              Analyze any public website for SEO, metadata, heading structure,
              accessibility, and page health—all in just a few seconds.
            </p>

            <button
              onClick={scrollToAnalyzer}
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-7 text-sm font-semibold text-primary-700 shadow-sm transition-all duration-200 hover:bg-primary-50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Analyze Another Website
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 text-sm text-primary-200/80">
              No sign-up required • Instant results
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}