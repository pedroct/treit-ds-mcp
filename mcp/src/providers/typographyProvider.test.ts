import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { getTypographyResource } from './typographyProvider'

describe('typographyProvider', () => {
  const testDir = path.join(process.cwd(), 'test-temp-typography')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
  })

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true })
  })

  describe('getTypographyResource', () => {
    it('extracts font weights from typography doc', async () => {
      const typographyDoc = `
        # Typography

        ## Font Weights

        | Weight | Name | Class |
        |--------|------|-------|
        | 400 | Regular | \`font-normal\` |
        | 500 | Medium | \`font-medium\` |
        | 600 | Semibold | \`font-semibold\` |
        | 700 | Bold | \`font-bold\` |
      `
      const setupDoc = `Font Family: Montserrat`

      await fs.writeFile(path.join(testDir, 'TYPOGRAPHY_UPDATE.md'), typographyDoc)
      await fs.writeFile(path.join(testDir, 'DESIGN_SYSTEM_SETUP.md'), setupDoc)

      const result = await getTypographyResource(testDir)

      expect(result.weights).toHaveLength(4)
      expect(result.weights[0]).toMatchObject({ weight: 400, name: 'Regular', tailwindClass: 'font-normal' })
      expect(result.weights[1]).toMatchObject({ weight: 500, name: 'Medium', tailwindClass: 'font-medium' })
      expect(result.weights[2]).toMatchObject({ weight: 600, name: 'Semibold', tailwindClass: 'font-semibold' })
      expect(result.weights[3]).toMatchObject({ weight: 700, name: 'Bold', tailwindClass: 'font-bold' })
    })

    it('extracts typography scale from examples', async () => {
      const typographyDoc = `
        # Examples

        <h1 className="text-4xl font-bold">Heading 1</h1>
        <h2 className="text-3xl font-semibold">Heading 2</h2>
        <h3 className="text-2xl font-semibold">Heading 3</h3>
        <p className="text-base">Body text</p>
        <p className="text-sm">Small text</p>
      `
      const setupDoc = `Font Family: Montserrat`

      await fs.writeFile(path.join(testDir, 'TYPOGRAPHY_UPDATE.md'), typographyDoc)
      await fs.writeFile(path.join(testDir, 'DESIGN_SYSTEM_SETUP.md'), setupDoc)

      const result = await getTypographyResource(testDir)

      expect(result.scale.length).toBeGreaterThan(0)

      const h1 = result.scale.find(s => s.name === 'H1')
      expect(h1).toBeDefined()
      expect(h1?.tailwindClass).toContain('text-4xl')

      const body = result.scale.find(s => s.name === 'Body')
      expect(body).toBeDefined()
      expect(body?.tailwindClass).toContain('text-base')
      expect(body?.sizePx).toBe(16)
    })

    it('extracts font family from setup doc', async () => {
      const typographyDoc = ``
      const setupDoc = `
        # Design System Setup

        Font Family: Inter
      `

      await fs.writeFile(path.join(testDir, 'TYPOGRAPHY_UPDATE.md'), typographyDoc)
      await fs.writeFile(path.join(testDir, 'DESIGN_SYSTEM_SETUP.md'), setupDoc)

      const result = await getTypographyResource(testDir)

      expect(result.fontFamily).toBe('Inter')
    })

    it('defaults to Montserrat when font family not found', async () => {
      const typographyDoc = ``
      const setupDoc = `# Design System`

      await fs.writeFile(path.join(testDir, 'TYPOGRAPHY_UPDATE.md'), typographyDoc)
      await fs.writeFile(path.join(testDir, 'DESIGN_SYSTEM_SETUP.md'), setupDoc)

      const result = await getTypographyResource(testDir)

      expect(result.fontFamily).toBe('Montserrat')
    })

    it('handles missing typography doc gracefully', async () => {
      const setupDoc = `Font Family: Montserrat`

      await fs.writeFile(path.join(testDir, 'DESIGN_SYSTEM_SETUP.md'), setupDoc)

      const result = await getTypographyResource(testDir)

      expect(result.fontFamily).toBe('Montserrat')
      expect(result.notes).toContain('No explicit weight table found; using default weights from Montserrat.')
    })

    it('handles missing setup doc gracefully', async () => {
      const typographyDoc = `
        | Weight | Name | Class |
        |--------|------|-------|
        | 400 | Regular | \`font-normal\` |
      `

      await fs.writeFile(path.join(testDir, 'TYPOGRAPHY_UPDATE.md'), typographyDoc)

      const result = await getTypographyResource(testDir)

      expect(result.fontFamily).toBe('Montserrat')
      expect(result.weights).toHaveLength(1)
    })

    it('adds note when no weights found', async () => {
      const typographyDoc = `# Typography`
      const setupDoc = `Font Family: Montserrat`

      await fs.writeFile(path.join(testDir, 'TYPOGRAPHY_UPDATE.md'), typographyDoc)
      await fs.writeFile(path.join(testDir, 'DESIGN_SYSTEM_SETUP.md'), setupDoc)

      const result = await getTypographyResource(testDir)

      expect(result.notes).toContain('No explicit weight table found; using default weights from Montserrat.')
    })

    it('adds note when no scale found', async () => {
      const typographyDoc = `
        | Weight | Name | Class |
        |--------|------|-------|
        | 400 | Regular | \`font-normal\` |
      `
      const setupDoc = `Font Family: Montserrat`

      await fs.writeFile(path.join(testDir, 'TYPOGRAPHY_UPDATE.md'), typographyDoc)
      await fs.writeFile(path.join(testDir, 'DESIGN_SYSTEM_SETUP.md'), setupDoc)

      const result = await getTypographyResource(testDir)

      expect(result.notes).toContain('Typography scale examples not detected; add typography examples to docs.')
    })

    it('includes correct source file paths', async () => {
      const typographyDoc = ``
      const setupDoc = ``

      await fs.writeFile(path.join(testDir, 'TYPOGRAPHY_UPDATE.md'), typographyDoc)
      await fs.writeFile(path.join(testDir, 'DESIGN_SYSTEM_SETUP.md'), setupDoc)

      const result = await getTypographyResource(testDir)

      expect(result.sources).toContain('TYPOGRAPHY_UPDATE.md')
      expect(result.sources).toContain('DESIGN_SYSTEM_SETUP.md')
    })

    it('handles body small size correctly', async () => {
      const typographyDoc = `
        <p className="text-sm leading-relaxed">Small text</p>
      `
      const setupDoc = `Font Family: Montserrat`

      await fs.writeFile(path.join(testDir, 'TYPOGRAPHY_UPDATE.md'), typographyDoc)
      await fs.writeFile(path.join(testDir, 'DESIGN_SYSTEM_SETUP.md'), setupDoc)

      const result = await getTypographyResource(testDir)

      const bodySmall = result.scale.find(s => s.name === 'Body Small')
      expect(bodySmall).toBeDefined()
      expect(bodySmall?.sizePx).toBe(14)
    })
  })
})
