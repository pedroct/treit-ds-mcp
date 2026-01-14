import path from "node:path";
import { listFilesWithExtension, readFileText } from "../utils/fs.js";
import {
  extractExports,
  extractImports,
  extractPropsInfo,
  extractSummary,
  inferTags,
  toKebabCase,
  toPascalCase,
} from "../utils/parse.js";

export type ComponentCategory = "ui" | "layout";

export interface ComponentMeta {
  name: string;
  category: ComponentCategory;
  filePath: string;
  exports: string[];
  dependencies: string[];
  summary: string;
  props: Array<{
    name: string;
    properties: string[];
  }>;
  usageExamples: string[];
  tags: string[];
}

export interface ComponentsIndex {
  list: ComponentMeta[];
  byName: Map<string, ComponentMeta>;
  bySlug: Map<string, ComponentMeta>;
}

function buildUsageExamples(name: string, propsInfo: ComponentMeta["props"]): string[] {
  if (propsInfo.length > 0 && propsInfo[0]?.properties.length) {
    const props = propsInfo[0].properties.slice(0, 2);
    const propsString = props.map((prop) => `${prop}={...}`).join(" ");
    return [`<${name} ${propsString} />`];
  }
  return [`<${name} />`];
}

function normalizeDependencies(imports: string[]): string[] {
  const relevant = new Set<string>();
  imports.forEach((modulePath) => {
    if (
      modulePath.startsWith("@/components") ||
      modulePath.startsWith("@/lib") ||
      modulePath.includes("lucide-react") ||
      modulePath.includes("@radix-ui") ||
      modulePath.includes("class-variance-authority")
    ) {
      relevant.add(modulePath);
    }
  });
  return Array.from(relevant);
}

async function readComponentMeta(
  filePath: string,
  category: ComponentCategory,
  repoRoot: string
): Promise<ComponentMeta> {
  const source = await readFileText(filePath);
  const fileName = path.basename(filePath, ".tsx");
  const name = toPascalCase(fileName);
  const exports = extractExports(source);
  const dependencies = normalizeDependencies(extractImports(source));
  const summary = extractSummary(source, name);
  const props = extractPropsInfo(source);
  const tags = inferTags(name, filePath, source);
  const usageExamples = buildUsageExamples(name, props);
  const relativePath = path.relative(repoRoot, filePath).replace(/\\/g, "/");

  return {
    name,
    category,
    filePath: relativePath,
    exports,
    dependencies,
    summary,
    props,
    usageExamples,
    tags,
  };
}

export async function buildComponentsIndex(repoRoot: string): Promise<ComponentsIndex> {
  const uiDir = path.join(repoRoot, "src", "components", "ui");
  const layoutDir = path.join(repoRoot, "src", "components", "layout");

  const [uiFiles, layoutFiles] = await Promise.all([
    listFilesWithExtension(uiDir, ".tsx"),
    listFilesWithExtension(layoutDir, ".tsx"),
  ]);

  const metas: ComponentMeta[] = [];
  for (const file of uiFiles) {
    metas.push(await readComponentMeta(file, "ui", repoRoot));
  }
  for (const file of layoutFiles) {
    metas.push(await readComponentMeta(file, "layout", repoRoot));
  }

  const byName = new Map<string, ComponentMeta>();
  const bySlug = new Map<string, ComponentMeta>();

  metas.forEach((meta) => {
    byName.set(meta.name.toLowerCase(), meta);
    bySlug.set(toKebabCase(meta.name), meta);
  });

  return {
    list: metas.sort((a, b) => a.name.localeCompare(b.name)),
    byName,
    bySlug,
  };
}

export function getComponentByName(index: ComponentsIndex, name: string): ComponentMeta | null {
  const normalized = name.trim().toLowerCase();
  return (
    index.byName.get(normalized) ??
    index.bySlug.get(toKebabCase(name)) ??
    null
  );
}
