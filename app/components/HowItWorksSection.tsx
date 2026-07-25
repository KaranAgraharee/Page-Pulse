import React from "react";
import { Globe, Cpu, CheckCircle } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const steps = [
  {
    icon: Globe,
    number: "01",
    title: "Paste your URL",
    description:
      "Enter any public web page URL into the analyser — no sign-up or API key needed.",
  },
  {
    icon: Cpu,
    number: "02",
    title: "We analyse everything",
    description:
      "Page Pulse fetches the page and runs 50+ checks across SEO, performance, and accessibility.",
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "Get actionable insights",
    description:
      "Receive a scored report with prioritized issues and developer-friendly fix suggestions.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="How it works"
          title="Three steps to better pages"
          subtitle="No complex setup. No CLI. Just paste, analyse, and ship."
        />

        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px border-t-2 border-dashed border-gray-200" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col items-center text-center animate-fade-in-up delay-${(i + 1) * 100}`}
                >
                  {/* Number + Icon */}
                  <div className="relative mb-6">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 border border-primary-100 shadow-[var(--shadow-sm)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold shadow-sm">
                      {step.number.replace("0", "")}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
