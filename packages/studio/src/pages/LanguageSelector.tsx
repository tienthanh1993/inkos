import { useState } from "react";
import type { WritingLanguage } from "@actalk/inkos-core";

export function LanguageSelector({ onSelect }: { onSelect: (lang: WritingLanguage) => void }) {
  const [hovering, setHovering] = useState<WritingLanguage | null>(null);
  const [selected, setSelected] = useState<WritingLanguage | null>(null);

  const handleSelect = (lang: WritingLanguage) => {
    setSelected(lang);
    // Brief pause for the selection animation before transitioning
    setTimeout(() => onSelect(lang), 400);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8">
      {/* Logo — cinematic scale */}
      <div className="mb-16 text-center">
        <div className="flex items-baseline justify-center gap-1.5 mb-4">
          <span className="font-serif text-6xl italic text-primary">Ink</span>
          <span className="text-5xl font-semibold tracking-tight text-foreground">OS</span>
        </div>
        <div className="text-base text-muted-foreground tracking-widest uppercase">Studio</div>
      </div>

      {/* Language cards — generous, distinct, immersive */}
      <div className="flex gap-8 mb-16">
        <button
          onClick={() => handleSelect("zh")}
          onMouseEnter={() => setHovering("zh")}
          onMouseLeave={() => setHovering(null)}
          className={`group w-80 border rounded-lg p-10 text-left transition-all duration-300 ${
            selected === "zh"
              ? "border-primary bg-primary/10 scale-[1.02]"
              : hovering === "zh"
                ? "border-primary/50 bg-card"
                : "border-border bg-card/50"
          }`}
        >
          <div className="font-serif text-3xl mb-4 text-foreground">中文创作</div>
          <div className="text-base text-foreground/70 leading-relaxed mb-6">
            玄幻 · 仙侠 · 都市 · 恐怖 · 通用
          </div>
          <div className="text-sm text-muted-foreground">
            番茄小说 · 起点中文网 · 飞卢
          </div>
        </button>

        <button
          onClick={() => handleSelect("en")}
          onMouseEnter={() => setHovering("en")}
          onMouseLeave={() => setHovering(null)}
          className={`group w-80 border rounded-lg p-10 text-left transition-all duration-300 ${
            selected === "en"
              ? "border-primary bg-primary/10 scale-[1.02]"
              : hovering === "en"
                ? "border-primary/50 bg-card"
                : "border-border bg-card/50"
          }`}
        >
          <div className="font-serif text-3xl italic mb-4 text-foreground">English Writing</div>
          <div className="text-base text-foreground/70 leading-relaxed mb-6">
            LitRPG · Progression · Romantasy · Sci-Fi · Isekai
          </div>
          <div className="text-sm text-muted-foreground">
            Royal Road · Kindle Unlimited · Scribble Hub
          </div>
        </button>

        <button
          onClick={() => handleSelect("vi")}
          onMouseEnter={() => setHovering("vi")}
          onMouseLeave={() => setHovering(null)}
          className={`group w-80 border rounded-lg p-10 text-left transition-all duration-300 ${
            selected === "vi"
              ? "border-primary bg-primary/10 scale-[1.02]"
              : hovering === "vi"
                ? "border-primary/50 bg-card"
                : "border-border bg-card/50"
          }`}
        >
          <div className="font-serif text-3xl mb-4 text-foreground">{"S\u00e1ng t\u00e1c ti\u1ebfng Vi\u1ec7t"}</div>
          <div className="text-base text-foreground/70 leading-relaxed mb-6">
            {"K\u1ef3 \u1ea3o \u00b7 \u0110\u00f4 th\u1ecb \u00b7 L\u00e3ng m\u1ea1n \u00b7 Khoa h\u1ecdc vi\u1ec5n t\u01b0\u1edfng \u00b7 Truy\u1ec7n d\u00e0i"}
          </div>
          <div className="text-sm text-muted-foreground">
            {"Truy\u1ec7n Vi\u1ec7t \u00b7 Web novel \u00b7 N\u1ec1n t\u1ea3ng t\u00f9y ch\u1ecdn"}
          </div>
        </button>
      </div>

      <div className="text-sm text-muted-foreground">
        可在设置中更改 · Can be changed in Settings
      </div>
    </div>
  );
}
