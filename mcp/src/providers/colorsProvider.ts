import path from "node:path";
import { readFileText } from "../utils/fs.js";
import { extractCssVariables, extractTailwindColorTokens } from "../utils/parse.js";

export interface ColorsResource {
  source: {
    tailwindConfig: string;
    globalsCss: string;
  };
  tokens: {
    tailwindColors: Record<string, unknown>;
    cssVariables: string[];
  };
  notes: string[];
}

export async function getColorsResource(repoRoot: string): Promise<ColorsResource> {
  const tailwindPath = path.join(repoRoot, "tailwind.config.ts");
  const globalsPath = path.join(repoRoot, "src", "app", "globals.css");

  const [tailwindSource, globalsSource] = await Promise.all([
    readFileText(tailwindPath),
    readFileText(globalsPath),
  ]);

  const tailwindTokens = extractTailwindColorTokens(tailwindSource);
  const cssVars = extractCssVariables(globalsSource);

  const notes: string[] = [];
  if (Object.keys(tailwindTokens.colors).length === 0) {
    notes.push("Tailwind colors could not be fully parsed; using CSS variables as fallback.");
  }
  if (cssVars.length === 0) {
    notes.push("No CSS variables detected in globals.css.");
  }

  return {
    source: {
      tailwindConfig: "tailwind.config.ts",
      globalsCss: "src/app/globals.css",
    },
    tokens: {
      tailwindColors: tailwindTokens.colors,
      cssVariables: cssVars,
    },
    notes,
  };
}
