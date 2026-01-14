import path from "node:path";
import { readFileText } from "../utils/fs.js";

export interface TypographyResource {
  fontFamily: string;
  weights: Array<{ weight: number; name: string; tailwindClass: string }>;
  scale: Array<{ name: string; tailwindClass: string; sizePx?: number }>;
  notes: string[];
  sources: string[];
}

function parseWeightsFromTypographyDoc(source: string): TypographyResource["weights"] {
  const weightRegex = /\|\s*(\d+)\s*\|\s*([A-Za-z ]+)\s*\|\s*`([^`]+)`/g;
  const weights: TypographyResource["weights"] = [];
  let match: RegExpExecArray | null;
  while ((match = weightRegex.exec(source))) {
    const weight = Number(match[1]);
    const name = match[2]?.trim() ?? "Unknown";
    const tailwindClass = match[3]?.trim() ?? "";
    if (!Number.isNaN(weight)) {
      weights.push({ weight, name, tailwindClass });
    }
  }
  return weights;
}

function parseScaleFromDocs(source: string): TypographyResource["scale"] {
  const scale: TypographyResource["scale"] = [];
  const regex = /<h([1-6])\s+className="([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(source))) {
    scale.push({
      name: `H${match[1]}`,
      tailwindClass: match[2] ?? "",
    });
  }

  const bodyRegex = /<p\s+className="([^"]+)"/g;
  while ((match = bodyRegex.exec(source))) {
    const className = match[1] ?? "";
    if (className.includes("text-base")) {
      scale.push({ name: "Body", tailwindClass: className, sizePx: 16 });
    }
    if (className.includes("text-sm")) {
      scale.push({ name: "Body Small", tailwindClass: className, sizePx: 14 });
    }
  }

  return scale;
}

export async function getTypographyResource(repoRoot: string): Promise<TypographyResource> {
  const typographyPath = path.join(repoRoot, "TYPOGRAPHY_UPDATE.md");
  const setupPath = path.join(repoRoot, "DESIGN_SYSTEM_SETUP.md");

  const [typographySource, setupSource] = await Promise.all([
    readFileText(typographyPath).catch(() => ""),
    readFileText(setupPath).catch(() => ""),
  ]);

  const weights = parseWeightsFromTypographyDoc(typographySource);
  const scale = parseScaleFromDocs(typographySource);

  const fontFamilyMatch = setupSource.match(/Font Family:\s*([A-Za-z0-9 ]+)/i);
  const fontFamily = fontFamilyMatch?.[1]?.trim() ?? "Montserrat";

  const notes: string[] = [];
  if (weights.length === 0) {
    notes.push("No explicit weight table found; using default weights from Montserrat.");
  }
  if (scale.length === 0) {
    notes.push("Typography scale examples not detected; add typography examples to docs.");
  }

  return {
    fontFamily,
    weights,
    scale,
    notes,
    sources: ["TYPOGRAPHY_UPDATE.md", "DESIGN_SYSTEM_SETUP.md"],
  };
}
