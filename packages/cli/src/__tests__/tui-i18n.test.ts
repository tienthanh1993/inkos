import { describe, expect, it } from "vitest";
import { formatModeLabel, getTuiCopy, normalizeStageLabel, resolveTuiLocale } from "../tui/i18n.js";

describe("tui i18n", () => {
  it("defaults to Chinese and supports explicit English override", () => {
    expect(resolveTuiLocale({})).toBe("zh-CN");
    expect(resolveTuiLocale({ INKOS_TUI_LOCALE: "en" })).toBe("en");
    expect(resolveTuiLocale({ LANG: "en_US.UTF-8" })).toBe("en");
    expect(resolveTuiLocale({}, "en")).toBe("en");
  });

  it("normalizes vi-VN locale aliases and keeps Vietnamese TUI copy distinct", () => {
    expect(resolveTuiLocale({ INKOS_TUI_LOCALE: "vi-VN" })).toBe("vi-VN");
    expect(resolveTuiLocale({ LANG: "vi_VN.UTF-8" })).toBe("vi-VN");
    const copy = getTuiCopy("vi-VN");
    expect(copy.labels.project).toBe("D\u1ef1 \u00e1n");
    expect(copy.labels.book).toBe("S\u00e1ch");
    expect(normalizeStageLabel("writing chapter", copy)).toBe("\u0111ang vi\u1ebft");
    expect(formatModeLabel("semi", copy)).toBe("b\u00e1n t\u1ef1 \u0111\u1ed9ng");
  });

  it("normalizes common activity labels for Chinese chrome", () => {
    const copy = getTuiCopy("zh-CN");
    expect(normalizeStageLabel("writing chapter", copy)).toBe("写作中");
    expect(normalizeStageLabel("thinking ...", copy)).toBe("思考中");
    expect(normalizeStageLabel("idle", copy)).toBe("就绪");
    expect(normalizeStageLabel("waiting_human", copy)).toBe("等待你的决定");
    expect(normalizeStageLabel("completed", copy)).toBe("已完成");
    expect(formatModeLabel("semi", copy)).toBe("半自动");
    expect(formatModeLabel("auto", copy)).toBe("自动");
  });
});
