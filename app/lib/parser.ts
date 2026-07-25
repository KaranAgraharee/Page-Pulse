import * as cheerio from "cheerio";

// ─── Result type ───────────────────────────────────────────────────
export interface ParseResult {
  /** Content of the <title> tag, or null if missing. */
  title: string | null;
  /** Content of <meta name="description">, or null if missing. */
  metaDescription: string | null;
  /** Number of <h1> elements found in the document. */
  h1Count: number;
  /** Number of <img> elements that have no `alt` attribute or an empty one. */
  missingAltImages: number;
  /** Approximate visible-text word count (excluding scripts, styles, etc.). */
  wordCount: number;
}

// ─── Parser ────────────────────────────────────────────────────────

/**
 * Parse raw HTML and extract key page-health metrics.
 *
 * This function is **pure** — it only operates on the HTML string it
 * receives and never makes network requests.
 */
export function parseHtml(html: string): ParseResult {
  const $ = cheerio.load(html);

  // 1. Page title
  const title = $("title").first().text().trim() || null;

  // 2. Meta description
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || null;

  // 3. H1 count
  const h1Count = $("h1").length;

  // 4. Images missing alt
  //    Count <img> tags where `alt` is either absent or empty-string.
  let missingAltImages = 0;
  $("img").each((_, el) => {
    const alt = $(el).attr("alt");
    if (alt === undefined || alt.trim() === "") {
      missingAltImages++;
    }
  });

  // 5. Approximate word count
  //    Remove non-visible elements, then count whitespace-delimited tokens.
  $("script, style, noscript, svg, template").remove();
  const bodyText = $("body").text();
  const words = bodyText
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((w) => w.length > 0);
  const wordCount = words.length;

  return {
    title,
    metaDescription,
    h1Count,
    missingAltImages,
    wordCount,
  };
}
