export interface ValidateUsageInput {
  code: string;
}

export interface ValidateUsageIssue {
  severity: "error" | "warn";
  message: string;
  hint?: string;
}

export interface ValidateUsageOutput {
  ok: boolean;
  issues: ValidateUsageIssue[];
}

const NON_TOKEN_COLORS = ["red", "blue", "green", "yellow", "orange", "pink", "purple"];

function findSpacingIssues(code: string): ValidateUsageIssue[] {
  const issues: ValidateUsageIssue[] = [];
  const regex = /\b(p|m|gap|space-x|space-y)-(\d+)\b/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(code))) {
    const value = Number(match[2]);
    if (!Number.isNaN(value) && value % 4 !== 0) {
      issues.push({
        severity: "warn",
        message: `Spacing token "${match[0]}" is not aligned to a 4px base.`,
        hint: "Prefer multiples of 4 (e.g. p-2, p-4, gap-4) or documented spacing scale.",
      });
    }
  }
  return issues;
}

function findColorIssues(code: string): ValidateUsageIssue[] {
  const issues: ValidateUsageIssue[] = [];
  NON_TOKEN_COLORS.forEach((color) => {
    const regex = new RegExp(`\\b(text|bg|border)-${color}-\\d+\\b`, "g");
    if (regex.test(code)) {
      issues.push({
        severity: "warn",
        message: `Direct ${color} utility detected.`,
        hint: "Prefer semantic tokens like text-foreground, bg-primary, bg-muted, text-muted-foreground.",
      });
    }
  });
  return issues;
}

function findComponentIssues(code: string): ValidateUsageIssue[] {
  const issues: ValidateUsageIssue[] = [];
  const buttonRegex = /<button\b[^>]*>/g;
  if (buttonRegex.test(code)) {
    issues.push({
      severity: "warn",
      message: "Native <button> detected without DS component.",
      hint: "Use the Design System Button component from src/components/ui/button.tsx.",
    });
  }
  return issues;
}

function findIconIssues(code: string): ValidateUsageIssue[] {
  const issues: ValidateUsageIssue[] = [];
  const importRegex = /from\s+["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(code))) {
    const modulePath = match[1] ?? "";
    if (modulePath.includes("icon") && modulePath !== "lucide-react") {
      issues.push({
        severity: "warn",
        message: `Icon library "${modulePath}" detected.`,
        hint: "Prefer lucide-react for icons in the Treit Design System.",
      });
    }
  }
  return issues;
}

export function validateUsage(input: ValidateUsageInput): ValidateUsageOutput {
  const issues = [
    ...findSpacingIssues(input.code),
    ...findColorIssues(input.code),
    ...findComponentIssues(input.code),
    ...findIconIssues(input.code),
  ];

  return {
    ok: issues.length === 0,
    issues,
  };
}
