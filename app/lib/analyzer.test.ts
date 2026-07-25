import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios, { AxiosError } from "axios";
import { analyzePage } from "./analyzer";

describe("Web Page Analyzer (analyzePage)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("happy path: fetches HTML page, measures timing, and parses metrics", async () => {
    const mockHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Page</title>
          <meta name="description" content="Test Description" />
        </head>
        <body>
          <h1>Main Heading</h1>
          <p>Hello world from test page.</p>
        </body>
      </html>
    `;

    vi.spyOn(axios, "get").mockResolvedValueOnce({
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
      data: mockHtml,
    });

    const result = await analyzePage("https://example.com");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.status).toBe(200);
      expect(typeof result.responseTime).toBe("number");
      expect(result.title).toBe("Test Page");
      expect(result.metaDescription).toBe("Test Description");
      expect(result.h1Count).toBe(1);
      expect(result.missingAltImages).toBe(0);
      expect(result.wordCount).toBe(7);
    }
  });

  it("handles non-HTML response (e.g. JSON or images)", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      status: 200,
      headers: { "content-type": "application/json" },
      data: JSON.stringify({ message: "API endpoint" }),
    });

    const result = await analyzePage("https://api.example.com/data");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.httpStatus).toBe(422);
      expect(result.error).toContain("Expected an HTML page");
    }
  });

  it("handles empty response body gracefully", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      status: 200,
      headers: { "content-type": "text/html" },
      data: "   ",
    });

    const result = await analyzePage("https://example.com/empty");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.httpStatus).toBe(422);
      expect(result.error).toContain("empty body");
    }
  });

  it("handles request timeout gracefully (ECONNABORTED)", async () => {
    const timeoutError = new AxiosError(
      "timeout of 15000ms exceeded",
      "ECONNABORTED"
    );

    vi.spyOn(axios, "get").mockRejectedValueOnce(timeoutError);

    const result = await analyzePage("https://slow-website.com");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.httpStatus).toBe(504);
      expect(result.error).toContain("took too long to respond");
    }
  });

  it("handles DNS lookup failure (ENOTFOUND)", async () => {
    const dnsError = new AxiosError(
      "getaddrinfo ENOTFOUND invalid-domain.xyz",
      "ENOTFOUND"
    );

    vi.spyOn(axios, "get").mockRejectedValueOnce(dnsError);

    const result = await analyzePage("https://invalid-domain.xyz");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.httpStatus).toBe(502);
      expect(result.error).toContain("DNS lookup failed");
    }
  });

  it("blocks internal and loopback IP addresses (SSRF Protection)", async () => {
    const internalUrls = [
      "http://localhost:3000",
      "http://127.0.0.1/admin",
      "http://169.254.169.254/latest/meta-data/",
      "http://10.0.0.1/internal",
      "http://192.168.1.1",
    ];

    for (const url of internalUrls) {
      const result = await analyzePage(url);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.httpStatus).toBe(403);
        expect(result.error).toContain("restricted for security");
      }
    }
  });

  it("handles network connection refused (ECONNREFUSED)", async () => {
    const connError = new AxiosError(
      "connect ECONNREFUSED 93.184.216.34:80",
      "ECONNREFUSED"
    );

    vi.spyOn(axios, "get").mockRejectedValueOnce(connError);

    const result = await analyzePage("http://unreachable-external-site.com");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.httpStatus).toBe(502);
      expect(result.error).toContain("Network error");
    }
  });

  it("handles target server 404 response", async () => {
    const notFoundError = new AxiosError(
      "Request failed with status code 404",
      "ERR_BAD_REQUEST",
      undefined,
      undefined,
      {
        status: 404,
        statusText: "Not Found",
        headers: {},
        config: {} as any,
        data: "<h1>404 Not Found</h1>",
      }
    );

    vi.spyOn(axios, "get").mockRejectedValueOnce(notFoundError);

    const result = await analyzePage("https://example.com/missing-page");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.httpStatus).toBe(502);
      expect(result.error).toContain("HTTP 404");
    }
  });
});
