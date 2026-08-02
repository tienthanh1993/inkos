import { describe, expect, it } from "vitest";
import {
  applySlashSuggestion,
  buildSlashCommands,
  getSlashSuggestions,
  getNextSlashSelection,
  SLASH_COMMANDS,
} from "../tui/slash-autocomplete.js";

describe("tui slash autocomplete", () => {
  it("filters slash commands by prefix", () => {
    expect(getSlashSuggestions("/st", SLASH_COMMANDS)).toEqual(["/status"]);
    expect(getSlashSuggestions("/w", SLASH_COMMANDS)).toEqual(["/write"]);
    expect(getSlashSuggestions("/o", SLASH_COMMANDS)).toEqual([]);
    expect(getSlashSuggestions("/d", SLASH_COMMANDS)).toEqual(["/depth <light|normal|deep>"]);
    expect(getSlashSuggestions("/cr", SLASH_COMMANDS)).toEqual([]);
  });

  it("does not suggest anything for non-slash input", () => {
    expect(getSlashSuggestions("status", SLASH_COMMANDS)).toEqual([]);
    expect(getSlashSuggestions("", SLASH_COMMANDS)).toEqual([]);
  });

  it("cycles the active suggestion index", () => {
    expect(getNextSlashSelection(0, 3, "down")).toBe(1);
    expect(getNextSlashSelection(2, 3, "down")).toBe(0);
    expect(getNextSlashSelection(0, 3, "up")).toBe(2);
  });

  it("applies the selected suggestion to the composer input", () => {
    expect(applySlashSuggestion("/st", ["/status"], 0)).toBe("/status");
    expect(applySlashSuggestion("/d", ["/depth <light|normal|deep>"], 0)).toBe("/depth ");
  });

  it("builds locale-specific command lists with identical stems", () => {
    const zh = buildSlashCommands();
    const en = buildSlashCommands("en");
    const vi = buildSlashCommands("vi");

    expect(zh).toEqual(SLASH_COMMANDS);
    expect(zh[0]).toBe("/new \u8f93\u5165\u4f60\u7684\u60f3\u6cd5");
    expect(en[0]).toBe("/new describe your idea");
    expect(vi[0]).toBe("/new m\u00f4 t\u1ea3 \u00fd t\u01b0\u1edfng c\u1ee7a b\u1ea1n");
    expect(vi[4]).toBe("/focus <n\u1ed9i dung>");
    expect(vi[12]).toBe("/depth <nh\u1eb9|th\u01b0\u1eddng|s\u00e2u>");
    expect(en).toHaveLength(zh.length);
    expect(vi).toHaveLength(zh.length);
    expect(en.map((c) => c.match(/^\/\S+/)?.[0])).toEqual(zh.map((c) => c.match(/^\/\S+/)?.[0]));
    expect(vi.map((c) => c.match(/^\/\S+/)?.[0])).toEqual(zh.map((c) => c.match(/^\/\S+/)?.[0]));
  });
});
