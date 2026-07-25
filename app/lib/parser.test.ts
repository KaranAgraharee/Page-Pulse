import { describe, it, expect } from "vitest";
import { parseHtml } from "./parser";

describe("HTML Parser (parseHtml)", () => {
  it("happy path: parses complete HTML document correctly", () => {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>My Awesome Website</title>
          <meta name="description" content="A comprehensive guide to modern web development." />
        </head>
        <body>
          <h1>Welcome to My Site</h1>
          <p>This is a paragraph with several words to test word counting accuracy.</p>
          <img src="logo.png" alt="Company Logo" />
          <img src="banner.png" />
          <img src="icon.png" alt="" />
          <script>console.log("script block");</script>
          <style>body { color: red; }</style>
        </body>
      </html>
    `;

    const result = parseHtml(html);

    expect(result.title).toBe("My Awesome Website");
    expect(result.metaDescription).toBe(
      "A comprehensive guide to modern web development."
    );
    expect(result.h1Count).toBe(1);
    expect(result.missingAltImages).toBe(2); // banner.png (no alt) & icon.png (empty alt)
    expect(result.wordCount).toBe(16);
  });

  it("handles missing <title> tag gracefully", () => {
    const html = `
      <html>
        <head>
          <meta name="description" content="Some description" />
        </head>
        <body>
          <h1>Headline</h1>
        </body>
      </html>
    `;

    const result = parseHtml(html);

    expect(result.title).toBeNull();
    expect(result.metaDescription).toBe("Some description");
    expect(result.h1Count).toBe(1);
  });

  it("handles missing meta description tag gracefully", () => {
    const html = `
      <html>
        <head>
          <title>Title Only</title>
        </head>
        <body>
          <p>Just content</p>
        </body>
      </html>
    `;

    const result = parseHtml(html);

    expect(result.title).toBe("Title Only");
    expect(result.metaDescription).toBeNull();
  });

  it("handles document with no <h1> tags", () => {
    const html = `
      <html>
        <body>
          <h2>Subtitle</h2>
          <h3>Sub-subtitle</h3>
          <p>No main heading on this page.</p>
        </body>
      </html>
    `;

    const result = parseHtml(html);

    expect(result.h1Count).toBe(0);
  });

  it("handles multiple <h1> tags correctly", () => {
    const html = `
      <html>
        <body>
          <h1>First H1</h1>
          <h1>Second H1</h1>
          <h1>Third H1</h1>
        </body>
      </html>
    `;

    const result = parseHtml(html);

    expect(result.h1Count).toBe(3);
  });

  it("handles document with no <img> tags", () => {
    const html = `
      <html>
        <body>
          <p>Text only page with no images.</p>
        </body>
      </html>
    `;

    const result = parseHtml(html);

    expect(result.missingAltImages).toBe(0);
  });

  it("treats images with whitespace-only alt as missing alt", () => {
    const html = `
      <html>
        <body>
          <img src="1.png" alt="   " />
          <img src="2.png" alt="Valid alt text" />
        </body>
      </html>
    `;

    const result = parseHtml(html);

    expect(result.missingAltImages).toBe(1);
  });

  it("excludes script, style, noscript, svg, and template content from word count", () => {
    const html = `
      <html>
        <head>
          <style>h1 { font-size: 24px; color: blue; }</style>
        </head>
        <body>
          <script>const hidden = "this should not be counted";</script>
          <noscript>Enable JavaScript to view content</noscript>
          <svg><text>SVG Text</text></svg>
          <template><p>Template text</p></template>
          <p>One two three four five.</p>
        </body>
      </html>
    `;

    const result = parseHtml(html);

    expect(result.wordCount).toBe(5);
  });
});
