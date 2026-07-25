import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzePage } from "../../lib/analyzer";

// ─── Request schema ────────────────────────────────────────────────
const analyzeSchema = z.object({
  url: z.url({ message: "A valid URL is required (e.g. https://example.com)." }),
});

// ─── POST handler ──────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // 1. Parse & validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const validation = analyzeSchema.safeParse(body);
  if (!validation.success) {
    const message = validation.error.issues[0]?.message ?? "Invalid request.";
    return NextResponse.json({ error: message }, { status: 422 });
  }

  // 2. Run analyzer
  const result = await analyzePage(validation.data.url);
  // 3. Return
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: result.httpStatus }
    );
  }

  const { ok: _, ...data } = result;
  return NextResponse.json(data);
}
