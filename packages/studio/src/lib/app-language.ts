// 全局应用语言：非 React 模块（store slice、parts-builder、error-copy 等）无法用
// useI18n hook，从这里读取。App.tsx 在项目配置加载/切换语言时调用 setAppLanguage 同步。
import { normalizeWritingLanguage, type WritingLanguage } from "@actalk/inkos-core";

export type AppLanguage = WritingLanguage;

let current: AppLanguage = "zh";

export function normalizeAppLanguage(value: unknown): AppLanguage {
  return normalizeWritingLanguage(value) ?? "zh";
}

export function setAppLanguage(lang: AppLanguage): void {
  current = normalizeAppLanguage(lang);
}

export function getAppLanguage(): AppLanguage {
  return current;
}

/** 内联双语：tr("中文", "English")。默认中文，保持既有测试与默认体验不变。 */
export function tr(zh: string, en: string, vi?: string): string {
  if (current === "en") return en;
  if (current === "vi") return vi ?? en;
  return zh;
}
