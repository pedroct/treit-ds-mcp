import { promises as fs } from "node:fs";
import path from "node:path";

export async function fileExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function readFileText(targetPath: string): Promise<string> {
  return fs.readFile(targetPath, "utf8");
}

export async function listFilesWithExtension(
  dirPath: string,
  extension: string
): Promise<string[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
      .map((entry) => path.join(dirPath, entry.name));
  } catch {
    return [];
  }
}

export async function findRepoRoot(startDir: string): Promise<string> {
  let currentDir = path.resolve(startDir);
  for (let i = 0; i < 6; i += 1) {
    const tailwindPath = path.join(currentDir, "tailwind.config.ts");
    const srcPath = path.join(currentDir, "src");
    if (await fileExists(tailwindPath) && await fileExists(srcPath)) {
      return currentDir;
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }
    currentDir = parentDir;
  }
  throw new Error("Unable to locate repo root from MCP server location.");
}
