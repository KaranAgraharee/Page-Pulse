"use client";

import React, { useState, useCallback } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ReportSection from "./components/ReportSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import type { ReportData } from "./components/ReportCard";
import { showErrorToast } from "./lib/errors";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [errorDetails, setErrorDetails] = useState<{
    message?: string;
    statusCode?: number;
  } | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (rawUrl: string) => {
    let formattedUrl = rawUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    setIsLoading(true);
    setErrorDetails(null);
    setReportData(null);
    setAnalyzedUrl(formattedUrl);

    // Smooth scroll down to report section
    setTimeout(() => {
      document.getElementById("report")?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      const response = await axios.post<ReportData>("/api/analyze", {
        url: formattedUrl,
      });

      setReportData(response.data);
    } catch (err: unknown) {
      let message = "An unexpected error occurred.";
      let statusCode = 500;

      if (axios.isAxiosError(err)) {
        statusCode = err.response?.status || 500;
        message =
          err.response?.data?.error ||
          err.message ||
          "Failed to communicate with analysis server.";
      }

      setErrorDetails({ message, statusCode });
      showErrorToast(message, statusCode, () => handleAnalyze(formattedUrl));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (analyzedUrl) {
      handleAnalyze(analyzedUrl);
    }
  }, [analyzedUrl, handleAnalyze]);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection onAnalyze={handleAnalyze} isLoading={isLoading} />
        <ReportSection
          isLoading={isLoading}
          reportData={reportData}
          error={errorDetails}
          analyzedUrl={analyzedUrl}
          onRetry={handleRetry}
        />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
