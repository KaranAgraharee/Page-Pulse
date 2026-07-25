import { describe, it, expect } from "vitest";
import { z } from "zod";

const urlSchema = z.object({
  url: z.url({ message: "A valid URL is required." }),
});

describe("URL Validation Schema", () => {
  it("validates valid HTTP and HTTPS URLs", () => {
    const validUrls = [
      "https://example.com",
      "http://example.org",
      "https://sub.domain.co.uk/path/to/page?query=search#hash",
      "http://localhost:3000",
    ];

    validUrls.forEach((url) => {
      const result = urlSchema.safeParse({ url });
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid URL formats", () => {
    const invalidUrls = [
      "not-a-url",
      "example.com", // missing scheme
      "http://",
      "https://",
      "http:// invalid domain.com",
      "",
      "   ",
      12345,
      null,
      undefined,
    ];

    invalidUrls.forEach((url) => {
      const result = urlSchema.safeParse({ url });
      expect(result.success).toBe(false);
    });
  });
});
