import { z } from "zod";

export const WritingLanguageSchema = z.enum(["zh", "en", "vi"]);
export type WritingLanguage = z.infer<typeof WritingLanguageSchema>;

export const WRITING_LANGUAGES = ["zh", "en", "vi"] as const satisfies ReadonlyArray<WritingLanguage>;

/** Normalize user/config language tags to InkOS canonical writing-language codes. */
export function normalizeWritingLanguage(value: unknown): WritingLanguage | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase().replace(/_/g, "-");
  if (normalized === "vi" || normalized.startsWith("vi-")) return "vi";
  if (normalized === "en" || normalized.startsWith("en-")) return "en";
  if (normalized === "zh" || normalized.startsWith("zh-")) return "zh";
  return undefined;
}

/**
 * Infer the writing language from a free-text brief/premise when the user did not set one explicitly.
 * Chinese remains authoritative for CJK-dominant mixed-language briefs; Vietnamese-specific orthography
 * is recognized before the generic Latin fallback.
 */
export function inferLanguage(text?: string | null): WritingLanguage {
  const t = text ?? "";
  const cjk = (t.match(/[\u4e00-\u9fff]/gu) ?? []).length;
  const latin = (t.match(/[A-Za-z\u00c0-\u024f]/gu) ?? []).length;
  const vietnameseSpecific = (t.match(/[\u0103\u00e2\u0111\u00ea\u00f4\u01a1\u01b0\u00e1\u00e0\u1ea3\u00e3\u1ea1\u1eaf\u1eb1\u1eb3\u1eb5\u1eb7\u1ea5\u1ea7\u1ea9\u1eab\u1ead\u00e9\u00e8\u1ebb\u1ebd\u1eb9\u1ebf\u1ec1\u1ec3\u1ec5\u1ec7\u00ed\u00ec\u1ec9\u0129\u1ecb\u00f3\u00f2\u1ecf\u00f5\u1ecd\u1ed1\u1ed3\u1ed5\u1ed7\u1ed9\u01a1\u1edb\u1edd\u1edf\u1ee1\u1ee3\u00fa\u00f9\u1ee7\u0169\u1ee5\u01b0\u1ee9\u1eeb\u1eed\u1eef\u1ef1\u00fd\u1ef3\u1ef7\u1ef9\u1ef5]/iu) ?? []).length;

  if (cjk > 0 && cjk >= latin) return "zh";
  if (vietnameseSpecific > 0 && latin > 0) return "vi";
  if (cjk === 0 && latin > 0) return "en";
  if (latin > 0 && cjk * 4 < latin) return "en";
  return "zh";
}
