import axios, { AxiosError } from "axios";
import { parseHtml, type ParseResult } from "./parser";

// ─── Constants ─────────────────────────────────────────────────────
const TIMEOUT_MS = 15_000;
const MAX_CONTENT_LENGTH = 5 * 1024 * 1024; // 5 MB

// ─── Result types ──────────────────────────────────────────────────

export interface AnalyzeSuccess extends ParseResult {
  ok: true;
  status: number;
  responseTime: number;
}

export interface AnalyzeFailure {
  ok: false;
  /** Suggested HTTP status code for the API response. */
  httpStatus: number;
  error: string;
}

export type AnalyzeResult = AnalyzeSuccess | AnalyzeFailure;

// ─── Security: SSRF Protection ─────────────────────────────────────

/**
 * Validates if the parsed URL targets internal/private IP ranges or loopback.
 * Prevents Server-Side Request Forgery (SSRF).
 */
export function isPrivateOrInternalHost(hostname: string): boolean {
  const host = hostname.toLowerCase().trim();

  // Loopback / localhost
  if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "0.0.0.0") {
    return true;
  }

  // AWS / Cloud Metadata endpoint
  if (host === "169.254.169.254") {
    return true;
  }

  // IPv4 Private IP Ranges (10.x.x.x, 172.16-31.x.x, 192.168.x.x)
  const ipv4Pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = host.match(ipv4Pattern);

  if (match) {
    const [, oct1, oct2] = match.map(Number);

    // 10.0.0.0 – 10.255.255.255
    if (oct1 === 10) return true;

    // 172.16.0.0 – 172.31.255.255
    if (oct1 === 172 && oct2 >= 16 && oct2 <= 31) return true;

    // 192.168.0.0 – 192.168.255.255
    if (oct1 === 192 && oct2 === 168) return true;

    // Link-local 169.254.0.0/16
    if (oct1 === 169 && oct2 === 254) return true;
  }

  return false;
}

// ─── Error classification ──────────────────────────────────────────

function classifyError(err: unknown): AnalyzeFailure {
  if (err instanceof AxiosError) {
    if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
      return {
        ok: false,
        httpStatus: 504,
        error: "The target page took too long to respond (timeout).",
      };
    }

    if (err.code === "ENOTFOUND") {
      return {
        ok: false,
        httpStatus: 502,
        error: "DNS lookup failed — the domain could not be resolved.",
      };
    }

    if (
      err.code === "ECONNREFUSED" ||
      err.code === "ECONNRESET" ||
      err.code === "EHOSTUNREACH" ||
      err.code === "ENETUNREACH"
    ) {
      return {
        ok: false,
        httpStatus: 502,
        error: `Network error: unable to reach the target page (${err.code}).`,
      };
    }

    if (err.response) {
      return {
        ok: false,
        httpStatus: 502,
        error: `The target page returned HTTP ${err.response.status}.`,
      };
    }

    return {
      ok: false,
      httpStatus: 502,
      error: `Failed to fetch the page: ${err.message}`,
    };
  }

  return {
    ok: false,
    httpStatus: 500,
    error: "An unexpected error occurred while analyzing the page.",
  };
}

// ─── Analyzer ──────────────────────────────────────────────────────

/**
 * Fetch a web page by URL, measure its response time, validate the
 * response is HTML, then parse it for key metrics.
 *
 * **Never throws** — every failure path returns an `AnalyzeFailure`.
 */
export async function analyzePage(url: string): Promise<AnalyzeResult> {
  // 1. SSRF Security Check
  try {
    const parsedUrl = new URL(url);
    if (isPrivateOrInternalHost(parsedUrl.hostname)) {
      return {
        ok: false,
        httpStatus: 403,
        error: "Analysis of internal or loopback addresses is restricted for security.",
      };
    }
  } catch {
    return {
      ok: false,
      httpStatus: 422,
      error: "Invalid target URL format.",
    };
  }

  // 2. Fetch & Measure Timing
  let response;
  let responseTime: number;

  try {
    const start = performance.now();

    response = await axios.get(url, {
      timeout: TIMEOUT_MS,
      maxRedirects: 5,
      responseType: "text",
      headers: {
        "User-Agent": "PagePulse/1.0",
        Accept: "text/html, application/xhtml+xml, */*",
      },
      // Don't throw on HTTP error statuses — we handle them ourselves.
      validateStatus: () => true,
      maxContentLength: MAX_CONTENT_LENGTH,
    });

    responseTime = Math.round(performance.now() - start);
  } catch (err: unknown) {
    return classifyError(err);
  }

  // 3. Validate content-type is HTML-like
  const rawContentType = response.headers["content-type"];
  const contentType =
    typeof rawContentType === "string"
      ? rawContentType.split(";")[0].trim().toLowerCase()
      : "";

  if (!contentType.includes("html")) {
    return {
      ok: false,
      httpStatus: 422,
      error: `Expected an HTML page but received "${contentType || "unknown"}".`,
    };
  }

  // 4. Ensure we have a body to parse
  const html: string =
    typeof response.data === "string" ? response.data : String(response.data ?? "");

  if (!html.trim()) {
    return {
      ok: false,
      httpStatus: 422,
      error: "The page returned an empty body.",
    };
  }

  // 5. Parse HTML
  let parsed: ParseResult;
  try {
    parsed = parseHtml(html);
  } catch {
    return {
      ok: false,
      httpStatus: 500,
      error: "Failed to parse the HTML content.",
    };
  }

  // 6. Merge & return
  return {
    ok: true,
    status: response.status,
    responseTime,
    ...parsed,
  };
}
