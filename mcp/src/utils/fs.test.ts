import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileExists, readFileText, listFilesWithExtension, findRepoRoot } from './fs'

describe('fs utilities', () => {
  const testDir = path.join(process.cwd(), 'test-temp')

  beforeEach(async () => {
    // Create test directory
    await fs.mkdir(testDir, { recursive: true })
  })

  afterEach(async () => {
    // Clean up test directory
    await fs.rm(testDir, { recursive: true, force: true })
  })

  describe('fileExists', () => {
    it('returns true for existing file', async () => {
      const testFile = path.join(testDir, 'test.txt')
      await fs.writeFile(testFile, 'test content')
      expect(await fileExists(testFile)).toBe(true)
    })

    it('returns false for non-existent file', async () => {
      const testFile = path.join(testDir, 'nonexistent.txt')
      expect(await fileExists(testFile)).toBe(false)
    })

    it('returns true for existing directory', async () => {
      expect(await fileExists(testDir)).toBe(true)
    })
  })

  describe('readFileText', () => {
    it('reads file content', async () => {
      const testFile = path.join(testDir, 'test.txt')
      const content = 'Hello World'
      await fs.writeFile(testFile, content, 'utf8')
      expect(await readFileText(testFile)).toBe(content)
    })

    it('reads UTF-8 encoded file', async () => {
      const testFile = path.join(testDir, 'utf8.txt')
      const content = 'Olá Mundo! 你好世界'
      await fs.writeFile(testFile, content, 'utf8')
      expect(await readFileText(testFile)).toBe(content)
    })

    it('throws error for non-existent file', async () => {
      const testFile = path.join(testDir, 'nonexistent.txt')
      await expect(readFileText(testFile)).rejects.toThrow()
    })
  })

  describe('listFilesWithExtension', () => {
    beforeEach(async () => {
      // Create test files with different extensions
      await fs.writeFile(path.join(testDir, 'file1.tsx'), '')
      await fs.writeFile(path.join(testDir, 'file2.tsx'), '')
      await fs.writeFile(path.join(testDir, 'file3.ts'), '')
      await fs.writeFile(path.join(testDir, 'file4.txt'), '')
    })

    it('lists files with specific extension', async () => {
      const files = await listFilesWithExtension(testDir, '.tsx')
      expect(files).toHaveLength(2)
      expect(files.every(f => f.endsWith('.tsx'))).toBe(true)
    })

    it('returns empty array for non-matching extension', async () => {
      const files = await listFilesWithExtension(testDir, '.jsx')
      expect(files).toHaveLength(0)
    })

    it('returns empty array for non-existent directory', async () => {
      const files = await listFilesWithExtension(path.join(testDir, 'nonexistent'), '.tsx')
      expect(files).toHaveLength(0)
    })

    it('returns full paths', async () => {
      const files = await listFilesWithExtension(testDir, '.tsx')
      expect(files.every(f => path.isAbsolute(f))).toBe(true)
    })

    it('does not include subdirectories', async () => {
      const subDir = path.join(testDir, 'subdir')
      await fs.mkdir(subDir)
      await fs.writeFile(path.join(subDir, 'nested.tsx'), '')

      const files = await listFilesWithExtension(testDir, '.tsx')
      expect(files.every(f => !f.includes('nested.tsx'))).toBe(true)
    })
  })

  describe('findRepoRoot', () => {
    it('finds repo root with tailwind.config.ts and src/', async () => {
      // Create mock repo structure
      await fs.writeFile(path.join(testDir, 'tailwind.config.ts'), '')
      await fs.mkdir(path.join(testDir, 'src'))

      const root = await findRepoRoot(testDir)
      expect(root).toBe(testDir)
    })

    it('searches up to parent directories', async () => {
      // Create mock repo structure in parent
      await fs.writeFile(path.join(testDir, 'tailwind.config.ts'), '')
      await fs.mkdir(path.join(testDir, 'src'))

      // Create subdirectory
      const subDir = path.join(testDir, 'mcp', 'dist')
      await fs.mkdir(subDir, { recursive: true })

      const root = await findRepoRoot(subDir)
      expect(root).toBe(testDir)
    })

    it('throws error when repo root not found', async () => {
      // Test from a temporary directory that's definitely not in a repo
      // Use os.tmpdir() to get a path outside the repo
      const { tmpdir } = await import('node:os')
      const isolatedDir = path.join(tmpdir(), 'test-no-repo', Date.now().toString())
      await fs.mkdir(isolatedDir, { recursive: true })

      try {
        await expect(findRepoRoot(isolatedDir)).rejects.toThrow('Unable to locate repo root')
      } finally {
        await fs.rm(isolatedDir, { recursive: true, force: true })
      }
    })

    it('stops searching after 6 levels', async () => {
      // Create deep directory structure in temp dir outside the repo
      const { tmpdir } = await import('node:os')
      const isolatedDir = path.join(tmpdir(), 'test-deep-search', Date.now().toString())
      const deepDir = path.join(isolatedDir, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      await fs.mkdir(deepDir, { recursive: true })

      try {
        await expect(findRepoRoot(deepDir)).rejects.toThrow('Unable to locate repo root')
      } finally {
        await fs.rm(isolatedDir, { recursive: true, force: true })
      }
    })
  })
})
