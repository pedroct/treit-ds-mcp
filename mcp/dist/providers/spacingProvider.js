import path from "node:path";
import { readFileText } from "../utils/fs.js";
function extractSpacingScale(source) {
    const matches = source.match(/\b(\d+(\.\d+)?)\b/g) ?? [];
    const numbers = matches
        .map((value) => Number(value))
        .filter((value) => !Number.isNaN(value) && value <= 64);
    const unique = Array.from(new Set(numbers));
    return unique.sort((a, b) => a - b);
}
export async function getSpacingResource(repoRoot) {
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
    const notes = [];
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
