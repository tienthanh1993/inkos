import { describe, expect, it } from "vitest";
import { translateStudioString } from "./use-i18n";

describe("Studio language catalog", () => {
  it("keeps zh/en catalog entries intact while selecting Vietnamese copy", () => {
    expect(translateStudioString("nav.books", "zh")).toBe("\u4e66\u7c4d");
    expect(translateStudioString("nav.books", "en")).toBe("Books");
    expect(translateStudioString("nav.books", "vi")).toBe("S\u00e1ch");
    expect(translateStudioString("nav.createStoryboard", "vi")).toBe("T\u1ea1o ph\u00e2n c\u1ea3nh");
  });

  it("returns native Vietnamese labels for writing metrics", () => {
    expect(translateStudioString("book.words", "vi")).toBe("t\u1eeb");
    expect(translateStudioString("reader.characters", "vi")).toBe("k\u00fd t\u1ef1");
  });
});
