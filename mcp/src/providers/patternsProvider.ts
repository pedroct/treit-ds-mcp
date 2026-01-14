import path from "node:path";
import { readFileText } from "../utils/fs.js";

export interface PatternExample {
  title: string;
  description: string;
  sourcePath: string;
  snippet: string;
}

export interface PatternResource {
  name: string;
  summary: string;
  guidelines: string[];
  sources: string[];
  examples: PatternExample[];
  todos?: string[];
}

function extractSnippet(source: string, startPattern: RegExp, maxLines = 16): string {
  const lines = source.split(/\r?\n/);
  const startIndex = lines.findIndex((line) => startPattern.test(line));
  if (startIndex === -1) {
    return "";
  }
  return lines.slice(startIndex, startIndex + maxLines).join("\n");
}

export async function getLayoutPattern(repoRoot: string): Promise<PatternResource> {
  const setupPath = path.join(repoRoot, "DESIGN_SYSTEM_SETUP.md");
  const homePath = path.join(repoRoot, "src", "app", "home", "page.tsx");
  const setupSource = await readFileText(setupPath).catch(() => "");
  const homeSource = await readFileText(homePath).catch(() => "");

  const guidelines: string[] = [];
  if (setupSource.includes("Layout")) {
    guidelines.push("Use consistent containers and spacing tokens from the DS.");
    guidelines.push("Prefer layout components from src/components/layout.");
  }

  if (guidelines.length === 0) {
    guidelines.push("Use layout primitives from the design system.");
  }

  const layoutSnippet = extractSnippet(homeSource, /<SidebarProvider>/);
  const examples: PatternExample[] = [];
  if (layoutSnippet) {
    examples.push({
      title: "Dashboard layout with sidebar",
      description: "Combines SidebarProvider, AppSidebar, and SidebarInset for app layout.",
      sourcePath: "src/app/home/page.tsx",
      snippet: layoutSnippet,
    });
  }

  return {
    name: "Layout",
    summary: "Core layout patterns for page structure and navigation.",
    guidelines,
    sources: ["DESIGN_SYSTEM_SETUP.md", "src/app/home/page.tsx"],
    examples,
  };
}

export async function getCardsPattern(repoRoot: string): Promise<PatternResource> {
  const designContextPath = path.join(repoRoot, "DESIGN_CONTEXT.md");
  const homePath = path.join(repoRoot, "src", "app", "home", "page.tsx");
  const styleguidePath = path.join(repoRoot, "src", "app", "styleguide", "page.tsx");
  const contextSource = await readFileText(designContextPath).catch(() => "");
  const homeSource = await readFileText(homePath).catch(() => "");
  const styleguideSource = await readFileText(styleguidePath).catch(() => "");

  const guidelines: string[] = [];
  if (contextSource.includes("Cards")) {
    guidelines.push("Use Card components for grouped content and interactions.");
  }

  if (guidelines.length === 0) {
    guidelines.push("Use Card for grouped content; keep padding consistent with DS spacing.");
  }

  const statsSnippet = extractSnippet(homeSource, /<Card>/);
  const tokensSnippet = extractSnippet(styleguideSource, /<CardHeader>/);
  const examples: PatternExample[] = [];

  if (statsSnippet) {
    examples.push({
      title: "Stats cards",
      description: "Card usage for dashboards with header/content sections.",
      sourcePath: "src/app/home/page.tsx",
      snippet: statsSnippet,
    });
  }

  if (tokensSnippet) {
    examples.push({
      title: "Styleguide component card",
      description: "Card showcase inside the design tokens page.",
      sourcePath: "src/app/styleguide/page.tsx",
      snippet: tokensSnippet,
    });
  }

  return {
    name: "Cards",
    summary: "Usage patterns for card-based content.",
    guidelines,
    sources: ["DESIGN_CONTEXT.md", "src/app/home/page.tsx", "src/app/styleguide/page.tsx"],
    examples,
    todos: examples.length === 0 ? ["Add real-world card composition examples to the documentation."] : undefined,
  };
}
