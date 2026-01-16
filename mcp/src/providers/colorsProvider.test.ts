import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { getColorsResource } from './colorsProvider'

describe('colorsProvider', () => {
  const testDir = path.join(process.cwd(), 'test-temp-colors')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
  })

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true })
  })

  describe('getColorsResource', () => {
    it('extracts colors from tailwind config', async () => {
      const tailwindConfig = `
        export default {
          theme: {
            extend: {
              colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
              },
              borderRadius: {}
            }
          }
        }
      `
      const globalsCss = `
        :root {
          --background: 0 0% 100%;
          --foreground: 222.2 84% 4.9%;
        }
      `

      await fs.writeFile(path.join(testDir, 'tailwind.config.ts'), tailwindConfig)
      await fs.mkdir(path.join(testDir, 'src', 'app'), { recursive: true })
      await fs.writeFile(path.join(testDir, 'src', 'app', 'globals.css'), globalsCss)

      const result = await getColorsResource(testDir)

      expect(result.source.tailwindConfig).toBe('tailwind.config.ts')
      expect(result.source.globalsCss).toBe('src/app/globals.css')
      expect(result.tokens.tailwindColors).toHaveProperty('background')
      expect(result.tokens.tailwindColors).toHaveProperty('foreground')
      expect(result.tokens.cssVariables).toContain('--background')
      expect(result.tokens.cssVariables).toContain('--foreground')
    })

    it('extracts nested color tokens', async () => {
      const tailwindConfig = `
        export default {
          theme: {
            extend: {
              colors: {
                primary: {
                  DEFAULT: 'hsl(var(--primary))',
                  foreground: 'hsl(var(--primary-foreground))',
                },
              },
              borderRadius: {}
            }
          }
        }
      `
      const globalsCss = `
        :root {
          --primary: 221.2 83.2% 53.3%;
          --primary-foreground: 210 40% 98%;
        }
      `

      await fs.writeFile(path.join(testDir, 'tailwind.config.ts'), tailwindConfig)
      await fs.mkdir(path.join(testDir, 'src', 'app'), { recursive: true })
      await fs.writeFile(path.join(testDir, 'src', 'app', 'globals.css'), globalsCss)

      const result = await getColorsResource(testDir)

      expect(result.tokens.tailwindColors.primary).toMatchObject({
        DEFAULT: '--primary',
        foreground: '--primary-foreground',
      })
      expect(result.tokens.cssVariables).toContain('--primary')
      expect(result.tokens.cssVariables).toContain('--primary-foreground')
    })

    it('handles missing tailwind colors gracefully', async () => {
      const tailwindConfig = `export default { theme: {} }`
      const globalsCss = `
        :root {
          --background: 0 0% 100%;
        }
      `

      await fs.writeFile(path.join(testDir, 'tailwind.config.ts'), tailwindConfig)
      await fs.mkdir(path.join(testDir, 'src', 'app'), { recursive: true })
      await fs.writeFile(path.join(testDir, 'src', 'app', 'globals.css'), globalsCss)

      const result = await getColorsResource(testDir)

      expect(result.notes).toContain('Tailwind colors could not be fully parsed; using CSS variables as fallback.')
      expect(result.tokens.cssVariables).toContain('--background')
    })

    it('handles missing CSS variables gracefully', async () => {
      const tailwindConfig = `
        export default {
          theme: {
            extend: {
              colors: {
                background: 'hsl(var(--background))',
              },
              borderRadius: {}
            }
          }
        }
      `
      const globalsCss = `.foo { color: red; }`

      await fs.writeFile(path.join(testDir, 'tailwind.config.ts'), tailwindConfig)
      await fs.mkdir(path.join(testDir, 'src', 'app'), { recursive: true })
      await fs.writeFile(path.join(testDir, 'src', 'app', 'globals.css'), globalsCss)

      const result = await getColorsResource(testDir)

      expect(result.notes).toContain('No CSS variables detected in globals.css.')
    })

    it('includes both light and dark mode CSS variables', async () => {
      const tailwindConfig = `
        export default {
          theme: {
            extend: {
              colors: {
                background: 'hsl(var(--background))',
              },
              borderRadius: {}
            }
          }
        }
      `
      const globalsCss = `
        :root {
          --background: 0 0% 100%;
        }

        .dark {
          --background: 222.2 84% 4.9%;
          --foreground: 210 40% 98%;
        }
      `

      await fs.writeFile(path.join(testDir, 'tailwind.config.ts'), tailwindConfig)
      await fs.mkdir(path.join(testDir, 'src', 'app'), { recursive: true })
      await fs.writeFile(path.join(testDir, 'src', 'app', 'globals.css'), globalsCss)

      const result = await getColorsResource(testDir)

      expect(result.tokens.cssVariables).toContain('--background')
      expect(result.tokens.cssVariables).toContain('--foreground')
    })

    it('returns correct source file paths', async () => {
      const tailwindConfig = `export default {}`
      const globalsCss = ``

      await fs.writeFile(path.join(testDir, 'tailwind.config.ts'), tailwindConfig)
      await fs.mkdir(path.join(testDir, 'src', 'app'), { recursive: true })
      await fs.writeFile(path.join(testDir, 'src', 'app', 'globals.css'), globalsCss)

      const result = await getColorsResource(testDir)

      expect(result.source.tailwindConfig).toBe('tailwind.config.ts')
      expect(result.source.globalsCss).toBe('src/app/globals.css')
    })
  })
})
