import { toast } from "sonner";

export type ErrorType =
  | "INVALID_URL"
  | "TIMEOUT"
  | "NOT_FOUND"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "NON_HTML"
  | "UNKNOWN_ERROR";

export interface ErrorDetails {
  type: ErrorType;
  title: string;
  message: string;
  actionHint?: string;
  statusCode?: number;
}

/**
 * Maps raw error messages or HTTP status codes to clean, user-friendly error objects.
 * Never includes stack traces or raw technical stack details.
 */
export function classifyErrorDetails(
  rawError?: string,
  statusCode?: number
): ErrorDetails {
  const message = rawError || "";

  // 1. Invalid URL
  if (
    message.toLowerCase().includes("invalid url") ||
    message.toLowerCase().includes("valid url is required") ||
    statusCode === 422
  ) {
    return {
      type: "INVALID_URL",
      title: "Invalid URL Format",
      message:
        "Please enter a valid web address starting with http:// or https://",
      actionHint: "Check for missing protocols or typos in the domain name.",
      statusCode: 422,
    };
  }

  // 2. Timeout
  if (
    message.toLowerCase().includes("timeout") ||
    message.toLowerCase().includes("took too long") ||
    statusCode === 504
  ) {
    return {
      type: "TIMEOUT",
      title: "Request Timed Out",
      message: "The target website took too long to respond (>15 seconds).",
      actionHint: "Try again later or verify if the site is currently experiencing high load.",
      statusCode: 504,
    };
  }

  // 3. 404 Not Found
  if (
    statusCode === 404 ||
    message.includes("404") ||
    message.toLowerCase().includes("not found")
  ) {
    return {
      type: "NOT_FOUND",
      title: "Page Not Found (404)",
      message: "The requested URL could not be found on the target server.",
      actionHint: "Double check the path and filename for spelling errors.",
      statusCode: 404,
    };
  }

  // 4. 500 Internal Server Error
  if (
    statusCode === 500 ||
    message.includes("500") ||
    message.toLowerCase().includes("server error")
  ) {
    return {
      type: "SERVER_ERROR",
      title: "Target Server Error (500)",
      message: "The target web server encountered an internal error while fulfilling the request.",
      actionHint: "This is an issue on the target website's host server.",
      statusCode: 500,
    };
  }

  // 5. Non-HTML response
  if (
    message.toLowerCase().includes("expected an html page") ||
    message.toLowerCase().includes("non-html") ||
    message.toLowerCase().includes("content-type")
  ) {
    return {
      type: "NON_HTML",
      title: "Unsupported Content Type",
      message: "Page Pulse only analyzes HTML web pages (e.g. web pages, landing pages).",
      actionHint: "Make sure the URL points to an HTML document, not an image, API, or PDF.",
      statusCode: 422,
    };
  }

  // 6. Network Error / DNS Failure
  if (
    statusCode === 502 ||
    message.toLowerCase().includes("dns lookup failed") ||
    message.toLowerCase().includes("network error") ||
    message.toLowerCase().includes("unable to reach")
  ) {
    return {
      type: "NETWORK_ERROR",
      title: "Connection Failed",
      message: "Could not reach the web server or DNS resolution failed.",
      actionHint: "Verify your internet connection or check if the domain is registered and active.",
      statusCode: 502,
    };
  }

  // Default fallback (safe, no stack traces)
  return {
    type: "UNKNOWN_ERROR",
    title: "Analysis Failed",
    message: rawError || "An unexpected error occurred while analyzing the page.",
    actionHint: "Please refresh and try again.",
    statusCode: statusCode || 500,
  };
}

/**
 * Triggers a user-friendly toast notification using Sonner.
 */
export function showErrorToast(
  rawError?: string,
  statusCode?: number,
  onRetry?: () => void
) {
  const details = classifyErrorDetails(rawError, statusCode);

  toast.error(details.title, {
    description: details.message,
    duration: 5000,
    action: onRetry
      ? {
          label: "Retry",
          onClick: onRetry,
        }
      : undefined,
  });
}
