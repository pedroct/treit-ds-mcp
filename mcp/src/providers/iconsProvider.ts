import path from "node:path";
import { readFileText } from "../utils/fs.js";

export interface IconsResource {
  library: string;
  recommendedSizes: Array<{ name: string; className: string; sizePx: number }>;
  sampleIcons: string[];
  notes: string[];
  sources: string[];
}

function extractIconsFromPage(source: string): string[] {
  const icons: string[] = [];
  const regex = /{ name: "([A-Za-z0-9_]+)", Icon: /g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(source))) {
    if (match[1]) {
      icons.push(match[1]);
    }
  }
  return icons;
}

export async function getIconsResource(repoRoot: string): Promise<IconsResource> {
  const iconsPagePath = path.join(repoRoot, "src", "app", "icons", "page.tsx");
  let source = "";
  try {
    source = await readFileText(iconsPagePath);
  } catch {
    source = "";
  }

  const sampleIcons = extractIconsFromPage(source);
  const notes: string[] = [];
  if (sampleIcons.length === 0) {
    notes.push("No icon list detected; add icons in src/app/icons/page.tsx.");
  }

  return {
    library: "lucide-react",
    recommendedSizes: [
      { name: "sm", className: "h-4 w-4", sizePx: 16 },
      { name: "md", className: "h-5 w-5", sizePx: 20 },
      { name: "lg", className: "h-6 w-6", sizePx: 24 },
      { name: "xl", className: "h-8 w-8", sizePx: 32 },
    ],
    sampleIcons,
    notes,
    sources: ["src/app/icons/page.tsx"],
  };
}
