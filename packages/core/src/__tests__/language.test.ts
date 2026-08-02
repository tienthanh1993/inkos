import { describe, it, expect } from "vitest";
import { inferLanguage, normalizeWritingLanguage } from "../utils/language.js";

describe("inferLanguage", () => {
  it("infers en for Latin-dominant briefs", () => {
    expect(inferLanguage("A detective investigates a murder in 1920s London.")).toBe("en");
  });

  it("infers zh for Chinese briefs", () => {
    expect(inferLanguage("一个修仙者重生回到宗门入门那年。")).toBe("zh");
  });

  it("stays zh when CJK dominates despite an English name", () => {
    expect(inferLanguage("主角叫 Jack，一部都市重生爽文。")).toBe("zh");
  });

  it("treats incidental CJK in an English brief as en", () => {
    expect(inferLanguage("A xianxia (修仙) progression story for Royal Road.")).toBe("en");
  });


  it("normalizes Vietnamese regional aliases to the canonical writing language", () => {
    expect(normalizeWritingLanguage("vi")).toBe("vi");
    expect(normalizeWritingLanguage("vi-VN")).toBe("vi");
    expect(normalizeWritingLanguage("vi_VN")).toBe("vi");
    expect(normalizeWritingLanguage("VI-vn")).toBe("vi");
  });

  it("infers vi for Vietnamese orthography instead of falling back to en", () => {
    expect(inferLanguage("T\u00f4i mu\u1ed1n vi\u1ebft m\u1ed9t truy\u1ec7n v\u1ec1 m\u1ed9t th\u00e0nh ph\u1ed1 ven bi\u1ec3n.")).toBe("vi");
  });

  it("defaults to zh for empty or missing input", () => {
    expect(inferLanguage("")).toBe("zh");
    expect(inferLanguage(undefined)).toBe("zh");
    expect(inferLanguage(null)).toBe("zh");
  });
});
