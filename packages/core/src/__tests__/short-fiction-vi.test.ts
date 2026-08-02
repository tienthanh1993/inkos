import { describe, expect, it } from "vitest";
import {
  ShortRunActionPayloadSchema,
  shortRunCharsPerChapterRange,
} from "../interaction/action-envelope.js";
import {
  parseShortFictionBatchDraft,
  validateShortFictionDraftForFinal,
} from "../agents/short-fiction.js";
import {
  buildShortFictionOutlineSystemPrompt,
  buildShortFictionOutlineUserPrompt,
  buildShortFictionWriterSystemPrompt,
} from "../prompts/short-fiction.js";

describe("Vietnamese short fiction", () => {
  it("uses a native Vietnamese word range for short-run validation", () => {
    expect(shortRunCharsPerChapterRange("vi")).toEqual({ min: 600, max: 800 });
    expect(ShortRunActionPayloadSchema.safeParse({
      direction: "m\u1ed9t truy\u1ec7n ng\u1eafn",
      language: "vi",
      charsPerChapter: 650,
    }).success).toBe(true);
    expect(ShortRunActionPayloadSchema.safeParse({
      direction: "m\u1ed9t truy\u1ec7n ng\u1eafn",
      language: "vi",
      charsPerChapter: 900,
    }).success).toBe(false);
  });

  it("selects explicit Vietnamese prompt branches", () => {
    const input = {
      direction: "m\u1ed9t b\u1ea3n \u00e1n b\u1ecb che gi\u1ea5u",
      chapterCount: 12,
      charsPerChapter: 650,
    };
    expect(buildShortFictionOutlineSystemPrompt("vi")).toContain("Vietnamese");
    expect(buildShortFictionWriterSystemPrompt("vi")).toContain("Vietnamese");
    expect(buildShortFictionOutlineUserPrompt(input, "vi")).toContain("Vietnamese");
  });

  it("counts parsed Vietnamese chapters in words and validates complete output", () => {
    const draft = parseShortFictionBatchDraft([
      "=== SHORT_FICTION_TITLE ===",
      "M\u1ed9t truy\u1ec7n",
      "=== CHAPTER 1 TITLE ===",
      "Kh\u1edfi \u0111\u1ea7u",
      "=== CHAPTER 1 CONTENT ===",
      "T\u00f4i vi\u1ebft m\u1ed9t truy\u1ec7n.",
    ].join("\n"), { expectedChapters: 1, language: "vi" });

    expect(draft.chapters[0]?.charCount).toBe(4);
    expect(() => validateShortFictionDraftForFinal(draft, { expectedChapters: 1 })).not.toThrow();
  });
});
