export function toPascalCase(input: string): string {
  return input
    .replace(/[-_]+/g, " ")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join("");
}

export function toKebabCase(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

export function extractImports(source: string): string[] {
  const imports = new Set<string>();
  const regex = /from\s+["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(source))) {
    if (match[1]) {
      imports.add(match[1]);
    }
  }
  return Array.from(imports);
}

export function extractExports(source: string): string[] {
  const exports = new Set<string>();
  if (/export\s+default\s+/g.test(source)) {
    exports.add("default");
  }

  const namedRegex = /export\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/g;
  let match: RegExpExecArray | null;
  while ((match = namedRegex.exec(source))) {
    if (match[1]) {
      exports.add(match[1]);
    }
  }

  const exportListRegex = /export\s*{\s*([^}]+)\s*}/g;
  while ((match = exportListRegex.exec(source))) {
    const names = match[1]
      ?.split(",")
      .map((part) => part.trim().split(/\s+as\s+/i)[0])
      .filter(Boolean);
    names?.forEach((name) => exports.add(name));
  }

  return Array.from(exports);
}

export interface PropsInfo {
  name: string;
  properties: string[];
}

export function extractPropsInfo(source: string): PropsInfo[] {
  const results: PropsInfo[] = [];
  const interfaceRegex = /interface\s+([A-Za-z0-9_]+Props)\s*{([\s\S]*?)}/g;
  const typeRegex = /type\s+([A-Za-z0-9_]+Props)\s*=\s*{([\s\S]*?)}/g;

  const extractProperties = (body: string): string[] => {
    const props = new Set<string>();
    const propRegex = /(?:^|\n)\s*([A-Za-z0-9_]+)\??\s*:/g;
    let propMatch: RegExpExecArray | null;
    while ((propMatch = propRegex.exec(body))) {
      if (propMatch[1]) {
        props.add(propMatch[1]);
      }
    }
    return Array.from(props);
  };

  let match: RegExpExecArray | null;
  while ((match = interfaceRegex.exec(source))) {
    if (match[1]) {
      results.push({
        name: match[1],
        properties: extractProperties(match[2] ?? ""),
      });
    }
  }

  while ((match = typeRegex.exec(source))) {
    if (match[1]) {
      results.push({
        name: match[1],
        properties: extractProperties(match[2] ?? ""),
      });
    }
  }

  return results;
}

export function extractSummary(source: string, fallbackName: string): string {
  const commentRegex = /\/\*\*([\s\S]*?)\*\//;
  const match = source.match(commentRegex);
  if (match?.[1]) {
    const firstLine = match[1]
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, "").trim())
      .find((line) => line.length > 0);
    if (firstLine) {
      return firstLine;
    }
  }
  return `Component ${fallbackName}.`;
}

export function inferTags(name: string, filePath: string, source: string): string[] {
  const tags = new Set<string>();
  const haystack = `${name} ${filePath} ${source}`.toLowerCase();
  const addIf = (keyword: string, tag: string) => {
    if (haystack.includes(keyword)) {
      tags.add(tag);
    }
  };

  addIf("button", "action");
  addIf("badge", "feedback");
  addIf("alert", "feedback");
  addIf("tooltip", "feedback");
  addIf("toast", "feedback");
  addIf("dialog", "overlay");
  addIf("modal", "overlay");
  addIf("menu", "navigation");
  addIf("menubar", "navigation");
  addIf("breadcrumb", "navigation");
  addIf("sidebar", "navigation");
  addIf("sheet", "navigation");
  addIf("card", "layout");
  addIf("header", "layout");
  addIf("grid", "layout");
  addIf("input", "form");
  addIf("select", "form");
  addIf("checkbox", "form");
  addIf("radio", "form");
  addIf("switch", "form");

  if (tags.size === 0) {
    tags.add("ui");
  }
  return Array.from(tags);
}

export interface TailwindColorTokens {
  colors: Record<string, unknown>;
  cssVars: string[];
}

export function extractTailwindColorTokens(tailwindSource: string): TailwindColorTokens {
  const colors: Record<string, unknown> = {};
  const cssVars = new Set<string>();

  const colorBlockMatch = tailwindSource.match(/colors:\s*{([\s\S]*?)\n\s*},\s*borderRadius/s);
  if (colorBlockMatch?.[1]) {
    const colorBlock = colorBlockMatch[1];
    const simpleColorRegex = /([A-Za-z0-9_-]+):\s*'hsl\(var\(--([A-Za-z0-9_-]+)\)\)'/g;
    let match: RegExpExecArray | null;
    while ((match = simpleColorRegex.exec(colorBlock))) {
      if (match[1] && match[2]) {
        colors[match[1]] = `--${match[2]}`;
        cssVars.add(`--${match[2]}`);
      }
    }

    const nestedColorRegex = /([A-Za-z0-9_-]+):\s*{\s*([^}]+)\s*}/g;
    while ((match = nestedColorRegex.exec(colorBlock))) {
      const colorName = match[1];
      const body = match[2] ?? "";
      const entries: Record<string, string> = {};
      const entryRegex = /([A-Za-z0-9_-]+):\s*'hsl\(var\(--([A-Za-z0-9_-]+)\)\)'/g;
      let entryMatch: RegExpExecArray | null;
      while ((entryMatch = entryRegex.exec(body))) {
        if (entryMatch[1] && entryMatch[2]) {
          entries[entryMatch[1]] = `--${entryMatch[2]}`;
          cssVars.add(`--${entryMatch[2]}`);
        }
      }
      if (Object.keys(entries).length > 0) {
        colors[colorName] = entries;
      }
    }
  }

  return { colors, cssVars: Array.from(cssVars) };
}

export function extractCssVariables(cssSource: string): string[] {
  const vars = new Set<string>();
  const regex = /--([A-Za-z0-9_-]+)\s*:/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(cssSource))) {
    if (match[1]) {
      vars.add(`--${match[1]}`);
    }
  }
  return Array.from(vars);
}
