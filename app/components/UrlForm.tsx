"use client";

import React, { useState, useCallback } from "react";
import { Search, Loader2, X } from "lucide-react";

interface UrlFormProps {
  /** Called with the trimmed URL string when the form is submitted. */
  onSubmit: (url: string) => void;
  /** Puts the form into a loading state — disables input and button. */
  isLoading?: boolean;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** Extra classes on the outer wrapper. */
  className?: string;
}

export default function UrlForm({
  onSubmit,
  isLoading = false,
  placeholder = "https://example.com",
  className = "",
}: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validate = useCallback((value: string): string => {
    if (!value.trim()) return "Please enter a web page URL to analyse.";
    return "";
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const validationError = validate(url);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError("");
      onSubmit(url.trim());
    },
    [url, validate, onSubmit]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(e.target.value);
      if (error) setError("");
    },
    [error]
  );

  const handleClear = useCallback(() => {
    setUrl("");
    setError("");
    document.getElementById("url-input")?.focus();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-xl mx-auto ${className}`}
      noValidate
      aria-label="Web page URL analysis form"
    >
      <div
        className={`
          flex items-center gap-0 rounded-xl border bg-white
          shadow-[var(--shadow-base)] transition-all duration-200
          focus-within:shadow-[var(--shadow-md)] focus-within:border-primary-500
          ${error ? "border-red-300 focus-within:border-red-500" : "border-gray-200"}
        `}
      >
        {/* Search icon */}
        <span className="pl-4 text-gray-400 flex-shrink-0 pointer-events-none">
          <Search className="w-5 h-5" />
        </span>

        {/* URL input */}
        <input
          id="url-input"
          type="url"
          value={url}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={isLoading}
          autoComplete="url"
          aria-label="Website URL to analyse"
          aria-invalid={!!error}
          aria-describedby={error ? "url-error" : undefined}
          className="
            flex-1 h-12 sm:h-14 px-3 bg-transparent text-sm sm:text-base
            text-gray-900 placeholder:text-gray-400
            focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
            min-w-0
          "
        />

        {/* Clear input button */}
        {url && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors mr-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
            aria-label="Clear input URL"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Analyse button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            flex-shrink-0 h-10 sm:h-11 px-5 sm:px-6 mr-1.5
            rounded-lg bg-primary-600 text-white text-sm font-medium
            flex items-center justify-center gap-2
            transition-all duration-200 ease-out
            hover:bg-primary-700 active:scale-[0.97]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
            disabled:opacity-50 disabled:pointer-events-none
            cursor-pointer min-w-[100px]
          "
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="hidden sm:inline">Analyzing…</span>
            </>
          ) : (
            <span>Analyse</span>
          )}
        </button>
      </div>

      {/* Error message / Live region */}
      <div aria-live="polite" className="min-h-[24px]">
        {error && (
          <p
            id="url-error"
            role="alert"
            className="mt-2 text-sm text-red-500 pl-1 animate-fade-in flex items-center gap-1.5 font-medium"
          >
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
