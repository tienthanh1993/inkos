import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LanguageSelector } from "./LanguageSelector";

describe("LanguageSelector", () => {
  it("renders Vietnamese as a first-class writing-language option", () => {
    const html = renderToStaticMarkup(<LanguageSelector onSelect={() => undefined} />);

    expect(html).toContain("S\u00e1ng t\u00e1c ti\u1ebfng Vi\u1ec7t");
    expect(html).toContain("K\u1ef3 \u1ea3o");
    expect(html).toContain("Truy\u1ec7n Vi\u1ec7t");
  });
});
