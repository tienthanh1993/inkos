import type { ChatDepth } from "./chat-depth.js";
import { normalizeWritingLanguage } from "@actalk/inkos-core";

export type TuiLocale = "zh-CN" | "en" | "vi-VN";

export interface TuiCopy {
  readonly locale: TuiLocale;
  readonly labels: {
    readonly project: string;
    readonly book: string;
    readonly depth: string;
    readonly session: string;
    readonly messageCount: (count: number) => string;
    readonly stage: string;
    readonly mode: string;
    readonly model: string;
    readonly error: string;
    readonly recent: string;
    readonly pending: string;
    readonly draft: string;
    readonly ready: string;
    readonly none: string;
    readonly notConfigured: string;
    readonly unknown: string;
  };
  readonly modeLabels: Record<string, string>;
  readonly composer: {
    readonly placeholder: string;
    readonly emptyConversation: string;
    readonly helper: string;
    readonly submitting: string;
    readonly failed: string;
    readonly ready: string;
  };
  readonly notes: {
    readonly help: string;
    readonly status: (stage: string, mode: string) => string;
    readonly config: string;
    readonly depthSet: (depthLabel: string) => string;
    readonly newBookGuide: string;
    readonly noLlmConfig: string;
    readonly setupProvider: string;
  };
  readonly roles: {
    readonly user: string;
    readonly assistant: string;
    readonly system: string;
  };
  readonly activity: Record<"thinking" | "checking" | "writing" | "reviewing" | "updating", string>;
  readonly stageLabels: {
    readonly completed: string;
    readonly failed: string;
    readonly blocked: string;
    readonly waitingHuman: string;
    readonly pausedByUser: string;
    readonly readyToContinue: string;
  };
  readonly depthLabels: Record<ChatDepth, string>;
}

const ZH_CN: TuiCopy = {
  locale: "zh-CN",
  labels: {
    project: "项目",
    book: "作品",
    depth: "深度",
    session: "会话",
    messageCount: (count) => `${count} 条消息`,
    stage: "阶段",
    mode: "模式",
    model: "模型",
    error: "错误",
    recent: "最近",
    pending: "待确认",
    draft: "草稿",
    ready: "就绪",
    none: "无",
    notConfigured: "未配置",
    unknown: "未知",
  },
  modeLabels: {
    auto: "自动",
    semi: "半自动",
    manual: "手动",
  },
  composer: {
    placeholder: "告诉 InkOS 要写什么、修改什么，或解释什么…",
    emptyConversation: "先告诉 InkOS 你要做什么。",
    helper: "回车发送 • /new 输入你的想法 • /write • /rewrite • /truth • /export • /depth • /help",
    submitting: "处理中…",
    failed: "上次请求失败",
    ready: "就绪",
  },
  notes: {
    help: "可用命令：/new（输入想法）、/write、/books、/rewrite、/focus、/truth、/rename、/replace、/export、/status、/clear、/depth、/quit。其他写作和项目操作直接用自然语言交给 agent。",
    status: (stage, mode) => `当前状态：${stage}（${mode}）。`,
    config: "当前 Ink 仪表盘里还不支持交互式 /config。请使用 inkos config set-global。",
    depthSet: (depthLabel) => `思考深度已切换为 ${depthLabel}。`,
    newBookGuide: "开始构思新书。直接描述你的想法——题材、世界观、主角、核心冲突都可以。AI 会逐步引导，信息足够时会直接调用建书能力。",
    noLlmConfig: "未发现 LLM 配置。",
    setupProvider: "先配置 API 提供方。",
  },
  roles: {
    user: "你",
    assistant: "InkOS",
    system: "系统",
  },
  activity: {
    thinking: "思考中",
    checking: "检查中",
    writing: "写作中",
    reviewing: "审阅中",
    updating: "更新中",
  },
  stageLabels: {
    completed: "已完成",
    failed: "失败",
    blocked: "已阻塞",
    waitingHuman: "等待你的决定",
    pausedByUser: "已由用户暂停",
    readyToContinue: "可继续执行",
  },
  depthLabels: {
    light: "轻量",
    normal: "标准",
    deep: "深入",
  },
};

const EN: TuiCopy = {
  locale: "en",
  labels: {
    project: "Project",
    book: "Book",
    depth: "Depth",
    session: "Session",
    messageCount: (count) => `${count} msgs`,
    stage: "Stage",
    mode: "Mode",
    model: "Model",
    error: "Error",
    recent: "Recent",
    pending: "Pending",
    draft: "Draft",
    ready: "Ready",
    none: "none",
    notConfigured: "not configured",
    unknown: "unknown",
  },
  modeLabels: {
    auto: "auto",
    semi: "semi",
    manual: "manual",
  },
  composer: {
    placeholder: "Ask InkOS to write, revise, or explain…",
    emptyConversation: "Start by asking InkOS what to do.",
    helper: "Enter to send • /new describe your idea • /write • /rewrite • /truth • /export • /depth • /help",
    submitting: "Submitting…",
    failed: "Last request failed",
    ready: "Ready",
  },
  notes: {
    help: "Commands: /new (describe your idea), /write, /books, /rewrite, /focus, /truth, /rename, /replace, /export, /status, /clear, /depth, /quit. Other writing and project operations go through the agent as natural language.",
    status: (stage, mode) => `Status: ${stage} (${mode}).`,
    config: "Interactive /config is not available inside the Ink dashboard yet. Use inkos config set-global.",
    depthSet: (depthLabel) => `Thinking depth set to ${depthLabel}.`,
    newBookGuide: "Starting a new book. Describe your idea — genre, world, protagonist, core conflict, anything. The AI will guide you and call the book-creation capability when enough information is available.",
    noLlmConfig: "No LLM configuration found.",
    setupProvider: "Let's set up your API provider first.",
  },
  roles: {
    user: "You",
    assistant: "InkOS",
    system: "System",
  },
  activity: {
    thinking: "thinking",
    checking: "checking",
    writing: "writing",
    reviewing: "reviewing",
    updating: "updating",
  },
  stageLabels: {
    completed: "completed",
    failed: "failed",
    blocked: "blocked",
    waitingHuman: "waiting for your decision",
    pausedByUser: "paused by user",
    readyToContinue: "ready to continue",
  },
  depthLabels: {
    light: "light",
    normal: "normal",
    deep: "deep",
  },
};

const VI_VN: TuiCopy = {
  ...EN,
  locale: "vi-VN",
  labels: {
    ...EN.labels,
    project: "D\u1ef1 \u00e1n",
    book: "S\u00e1ch",
    depth: "\u0110\u1ed9 s\u00e2u",
    session: "Phi\u00ean",
    messageCount: (count) => `${count} tin nh\u1eafn`,
    stage: "Giai \u0111o\u1ea1n",
    mode: "Ch\u1ebf \u0111\u1ed9",
    model: "M\u00f4 h\u00ecnh",
    error: "L\u1ed7i",
    recent: "G\u1ea7n \u0111\u00e2y",
    pending: "\u0110ang ch\u1edd",
    draft: "B\u1ea3n nh\u00e1p",
    ready: "S\u1eb5n s\u00e0ng",
    none: "kh\u00f4ng c\u00f3",
    notConfigured: "ch\u01b0a c\u1ea5u h\u00ecnh",
    unknown: "kh\u00f4ng r\u00f5",
  },
  modeLabels: {
    auto: "t\u1ef1 \u0111\u1ed9ng",
    semi: "b\u00e1n t\u1ef1 \u0111\u1ed9ng",
    manual: "th\u1ee7 c\u00f4ng",
  },
  composer: {
    placeholder: "Y\u00eau c\u1ea7u InkOS vi\u1ebft, s\u1eeda ho\u1eb7c gi\u1ea3i th\u00edch...",
    emptyConversation: "H\u00e3y b\u1eaft \u0111\u1ea7u b\u1eb1ng c\u00e1ch cho InkOS bi\u1ebft b\u1ea1n mu\u1ed1n l\u00e0m g\u00ec.",
    helper: "Enter \u0111\u1ec3 g\u1eedi | /new m\u00f4 t\u1ea3 \u00fd t\u01b0\u1edfng | /write | /rewrite | /truth | /export | /depth | /help",
    submitting: "\u0110ang x\u1eed l\u00fd...",
    failed: "Y\u00eau c\u1ea7u tr\u01b0\u1edbc th\u1ea5t b\u1ea1i",
    ready: "S\u1eb5n s\u00e0ng",
  },
  notes: {
    help: "L\u1ec7nh: /new (m\u00f4 t\u1ea3 \u00fd t\u01b0\u1edfng), /write, /books, /rewrite, /focus, /truth, /rename, /replace, /export, /status, /clear, /depth, /quit. C\u00e1c thao t\u00e1c kh\u00e1c c\u00f3 th\u1ec3 y\u00eau c\u1ea7u agent b\u1eb1ng ng\u00f4n ng\u1eef t\u1ef1 nhi\u00ean.",
    status: (stage, mode) => `Tr\u1ea1ng th\u00e1i: ${stage} (${mode}).`,
    config: "B\u1ea3ng Ink ch\u01b0a h\u1ed7 tr\u1ee3 /config t\u01b0\u01a1ng t\u00e1c. H\u00e3y d\u00f9ng inkos config set-global.",
    depthSet: (depthLabel) => `\u0110\u1ed9 s\u00e2u suy ngh\u0129 \u0111\u00e3 chuy\u1ec3n th\u00e0nh ${depthLabel}.`,
    newBookGuide: "B\u1eaft \u0111\u1ea7u x\u00e2y d\u1ef1ng s\u00e1ch m\u1edbi. H\u00e3y m\u00f4 t\u1ea3 \u00fd t\u01b0\u1edfng, th\u1ec3 lo\u1ea1i, th\u1ebf gi\u1edbi, nh\u00e2n v\u1eadt v\u00e0 xung \u0111\u1ed9t; AI s\u1ebd h\u01b0\u1edbng d\u1eabn t\u1eebng b\u01b0\u1edbc.",
    noLlmConfig: "Kh\u00f4ng t\u00ecm th\u1ea5y c\u1ea5u h\u00ecnh LLM.",
    setupProvider: "Tr\u01b0\u1edbc ti\u00ean h\u00e3y c\u1ea5u h\u00ecnh nh\u00e0 cung c\u1ea5p API.",
  },
  roles: {
    user: "B\u1ea1n",
    assistant: "InkOS",
    system: "H\u1ec7 th\u1ed1ng",
  },
  activity: {
    thinking: "\u0111ang suy ngh\u0129",
    checking: "\u0111ang ki\u1ec3m tra",
    writing: "\u0111ang vi\u1ebft",
    reviewing: "\u0111ang r\u00e0 so\u00e1t",
    updating: "\u0111ang c\u1eadp nh\u1eadt",
  },
  stageLabels: {
    completed: "\u0111\u00e3 ho\u00e0n t\u1ea5t",
    failed: "th\u1ea5t b\u1ea1i",
    blocked: "b\u1ecb ch\u1eb7n",
    waitingHuman: "\u0111ang ch\u1edd quy\u1ebft \u0111\u1ecbnh c\u1ee7a b\u1ea1n",
    pausedByUser: "\u0111\u00e3 t\u1ea1m d\u1eebng b\u1edfi ng\u01b0\u1eddi d\u00f9ng",
    readyToContinue: "c\u00f3 th\u1ec3 ti\u1ebfp t\u1ee5c",
  },
  depthLabels: {
    light: "nh\u1eb9",
    normal: "ti\u00eau chu\u1ea9n",
    deep: "s\u00e2u",
  },
};

export function resolveTuiLocale(
  env: NodeJS.ProcessEnv = process.env,
  preferredLanguage?: string,
): TuiLocale {
  const requested = normalizeLocale(env.INKOS_TUI_LOCALE ?? env.INKOS_LOCALE);
  if (requested) {
    return requested;
  }

  const preferred = normalizeLocale(preferredLanguage);
  if (preferred) {
    return preferred;
  }

  const detected = normalizeLocale(env.LC_ALL ?? env.LC_MESSAGES ?? env.LANG);
  return detected ?? "zh-CN";
}

export function getTuiCopy(locale: TuiLocale): TuiCopy {
  if (locale === "en") return EN;
  if (locale === "vi-VN") return VI_VN;
  return ZH_CN;
}

export function normalizeStageLabel(label: string, copy: TuiCopy): string {
  const normalized = label.trim().toLowerCase();
  if (!normalized) {
    return label;
  }

  const replacements: Array<[RegExp, string]> = [
    [/^thinking\b/i, copy.activity.thinking],
    [/^checking\b/i, copy.activity.checking],
    [/^writing\b/i, copy.activity.writing],
    [/^reviewing\b/i, copy.activity.reviewing],
    [/^updating\b/i, copy.activity.updating],
    [/^completed\b/i, copy.stageLabels.completed],
    [/^failed\b/i, copy.stageLabels.failed],
    [/^blocked\b/i, copy.stageLabels.blocked],
    [/^waiting_human\b/i, copy.stageLabels.waitingHuman],
    [/^paused by user\b/i, copy.stageLabels.pausedByUser],
    [/^ready to continue\b/i, copy.stageLabels.readyToContinue],
  ];

  for (const [pattern, value] of replacements) {
    if (pattern.test(label)) {
      // For English, keep the original label (already in English);
      // for other locales, use the translated value
      return copy.locale === "en" ? label : value;
    }
  }

  if (normalized === "idle") {
    return copy.labels.ready;
  }

  return label;
}

export function formatModeLabel(mode: string, copy: TuiCopy): string {
  return copy.modeLabels[mode] ?? mode;
}

function normalizeLocale(value: string | undefined): TuiLocale | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized === "auto") {
    return undefined;
  }

  const writingLanguage = normalizeWritingLanguage(normalized);
  if (writingLanguage === "zh") return "zh-CN";
  if (writingLanguage === "en") return "en";
  if (writingLanguage === "vi") return "vi-VN";

  return undefined;
}
