import path from "node:path";
import { readFileText } from "../utils/fs.js";

export interface SpacingResource {
  base: number;
  scale: number[];
  notes: string[];
  sources: string[];
}

function extractSpacingScale(source: string): number[] {
  const matches = source.match(/\b(\d+(\.\d+)?)\b/g) ?? [];
  const numbers = matches
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value) && value <= 64);
  const unique = Array.from(new Set(numbers));
  return unique.sort((a, b) => a - b);
}

export async function getSpacingResource(repoRoot: string): Promise<SpacingResource> {
  const readmePath = path.join(repoRoot, "README.md");
  const designContextPath = path.join(repoRoot, "DESIGN_CONTEXT.md");

  const [readmeSource, designContextSource] = await Promise.all([
    readFileText(readmePath).catch(() => ""),
    readFileText(designContextPath).catch(() => ""),
  ]);

  const scaleFromReadme = extractSpacingScale(readmeSource);
  const scaleFromContext = extractSpacingScale(designContextSource);
  const scale = Array.from(new Set([...scaleFromReadme, ...scaleFromContext]))
    .filter((value) => value <= 64)
    .sort((a, b) => a - b);

  const notes: string[] = [];
  if (scale.length === 0) {
    notes.push("Spacing scale not found; fallback to Tailwind default scale (4px base).");
  }

  return {
    base: 4,
    scale,
    notes,
    sources: ["README.md", "DESIGN_CONTEXT.md"],
  };
}
