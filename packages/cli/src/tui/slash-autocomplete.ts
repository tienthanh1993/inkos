import type { CliLanguage } from "../localization.js";

const SLASH_COMMAND_VARIANTS: ReadonlyArray<{ zh: string; en: string; vi: string }> = [
  { zh: "/new \u8f93\u5165\u4f60\u7684\u60f3\u6cd5", en: "/new describe your idea", vi: "/new m\u00f4 t\u1ea3 \u00fd t\u01b0\u1edfng c\u1ee7a b\u1ea1n" },
  { zh: "/write", en: "/write", vi: "/write" },
  { zh: "/books", en: "/books", vi: "/books" },
  { zh: "/rewrite <n>", en: "/rewrite <n>", vi: "/rewrite <n>" },
  { zh: "/focus <text>", en: "/focus <text>", vi: "/focus <n\u1ed9i dung>" },
  { zh: "/truth <file> <content>", en: "/truth <file> <content>", vi: "/truth <t\u1ec7p> <n\u1ed9i dung>" },
  { zh: "/rename <from> => <to>", en: "/rename <from> => <to>", vi: "/rename <t\u00ean c\u0169> => <t\u00ean m\u1edbi>" },
  { zh: "/replace <n> <from> => <to>", en: "/replace <n> <from> => <to>", vi: "/replace <n> <c\u0169> => <m\u1edbi>" },
  { zh: "/export [txt|md|epub]", en: "/export [txt|md|epub]", vi: "/export [txt|md|epub]" },
  { zh: "/help", en: "/help", vi: "/help" },
  { zh: "/status", en: "/status", vi: "/status" },
  { zh: "/clear", en: "/clear", vi: "/clear" },
  { zh: "/depth <light|normal|deep>", en: "/depth <light|normal|deep>", vi: "/depth <nh\u1eb9|th\u01b0\u1eddng|s\u00e2u>" },
  { zh: "/quit", en: "/quit", vi: "/quit" },
  { zh: "/exit", en: "/exit", vi: "/exit" },
];

export function buildSlashCommands(language: CliLanguage = "zh"): readonly string[] {
  return SLASH_COMMAND_VARIANTS.map((variant) => language === "en" ? variant.en : language === "vi" ? variant.vi : variant.zh);
}

export const SLASH_COMMANDS = buildSlashCommands("zh");

export type SlashNavigationDirection = "up" | "down";

export function getSlashSuggestions(input: string, commands: readonly string[]): string[] {
  const value = input.trim();
  if (!value.startsWith("/")) {
    return [];
  }

  return commands.filter((command) => slashCommandStem(command).startsWith(value));
}

export function getNextSlashSelection(
  currentIndex: number,
  suggestionCount: number,
  direction: SlashNavigationDirection,
): number {
  if (suggestionCount <= 0) {
    return 0;
  }

  if (direction === "down") {
    return (currentIndex + 1) % suggestionCount;
  }

  return (currentIndex - 1 + suggestionCount) % suggestionCount;
}

export function applySlashSuggestion(
  _input: string,
  suggestions: readonly string[],
  selectedIndex: number,
): string {
  const suggestion = suggestions[selectedIndex] ?? "";
  return slashSuggestionInsertion(suggestion);
}

function slashCommandStem(command: string): string {
  return command.match(/^\/\S+/)?.[0] ?? command;
}

function slashSuggestionInsertion(suggestion: string): string {
  const stem = slashCommandStem(suggestion);
  return suggestion === stem ? stem : `${stem} `;
}
