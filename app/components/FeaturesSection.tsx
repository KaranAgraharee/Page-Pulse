import React from "react";
import {
  Search,
  Zap,
  Eye,
  Code,
  Layers,
  BarChart3,
} from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const features = [
  {
    icon: Search,
    title: "SEO Analysis",
    description:
      "Check meta tags, heading hierarchy, Open Graph data, and keyword optimization in one scan.",
  },
  {
    icon: Zap,
    title: "Performance Metrics",
    description:
      "Measure page weight, resource count, render-blocking scripts, and load-time indicators.",
  },
  {
    icon: Eye,
    title: "Accessibility Audit",
    description:
      "Surface missing alt text, low contrast, ARIA issues, and screen-reader compatibility gaps.",
  },
  {
    icon: Code,
    title: "Meta Tag Inspector",
    description:
      "Validate title, description, canonical URLs, robots directives, and social card previews.",
  },
  {
    icon: Layers,
    title: "Heading Structure",
    description:
      "Visualize your heading tree to catch broken hierarchy, duplicate H1s, and skipped levels.",
  },
  {
    icon: BarChart3,
    title: "Instant Reports",
    description:
      "Get a shareable, developer-friendly report with scores, issues, and fix suggestions in seconds.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Features"
          title="Everything you need to optimise"
          subtitle="Page Pulse gives you a complete toolkit to understand, diagnose, and improve any web page — no setup required."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group bg-white rounded-xl border border-gray-200 p-6 shadow-[var(--shadow-base)] transition-all duration-300 ease-out hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 animate-fade-in-up delay-${(i + 1) * 100}`}
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 text-primary-600 mb-4 transition-colors duration-200 group-hover:bg-primary-600 group-hover:text-white">
                  <Icon className="w-5 h-5" />
                </div>
                {/* Content */}
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
