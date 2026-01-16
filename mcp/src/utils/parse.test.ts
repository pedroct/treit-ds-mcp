import { describe, it, expect } from 'vitest'
import {
  toPascalCase,
  toKebabCase,
  extractImports,
  extractExports,
  extractPropsInfo,
  extractSummary,
  inferTags,
  extractTailwindColorTokens,
  extractCssVariables,
} from './parse'

describe('parse utilities', () => {
  describe('toPascalCase', () => {
    it('converts kebab-case to PascalCase', () => {
      expect(toPascalCase('my-component')).toBe('MyComponent')
    })

    it('converts snake_case to PascalCase', () => {
      expect(toPascalCase('my_component')).toBe('MyComponent')
    })

    it('converts space-separated to PascalCase', () => {
      expect(toPascalCase('my component')).toBe('MyComponent')
    })

    it('handles already PascalCase', () => {
      expect(toPascalCase('MyComponent')).toBe('MyComponent')
    })

    it('removes special characters', () => {
      expect(toPascalCase('my@component#name')).toBe('MyComponentName')
    })
  })

  describe('toKebabCase', () => {
    it('converts PascalCase to kebab-case', () => {
      expect(toKebabCase('MyComponent')).toBe('my-component')
    })

    it('converts camelCase to kebab-case', () => {
      expect(toKebabCase('myComponent')).toBe('my-component')
    })

    it('handles already kebab-case', () => {
      expect(toKebabCase('my-component')).toBe('my-component')
    })

    it('converts underscores to hyphens', () => {
      expect(toKebabCase('my_component')).toBe('my-component')
    })

    it('converts spaces to hyphens', () => {
      expect(toKebabCase('my component')).toBe('my-component')
    })
  })

  describe('extractImports', () => {
    it('extracts single import', () => {
      const source = `import { Button } from "@/components/ui/button"`
      expect(extractImports(source)).toEqual(['@/components/ui/button'])
    })

    it('extracts multiple imports', () => {
      const source = `
        import { Button } from "@/components/ui/button"
        import { Card } from "@/components/ui/card"
        import React from "react"
      `
      expect(extractImports(source)).toEqual([
        '@/components/ui/button',
        '@/components/ui/card',
        'react',
      ])
    })

    it('handles double quotes', () => {
      const source = `import { Button } from "@/components/ui/button"`
      expect(extractImports(source)).toContain('@/components/ui/button')
    })

    it('handles single quotes', () => {
      const source = `import { Button } from '@/components/ui/button'`
      expect(extractImports(source)).toContain('@/components/ui/button')
    })

    it('returns empty array for no imports', () => {
      const source = `const foo = "bar"`
      expect(extractImports(source)).toEqual([])
    })
  })

  describe('extractExports', () => {
    it('detects default export', () => {
      const source = `export default Button`
      expect(extractExports(source)).toContain('default')
    })

    it('extracts named function export', () => {
      const source = `export function MyComponent() {}`
      expect(extractExports(source)).toContain('MyComponent')
    })

    it('extracts named const export', () => {
      const source = `export const Button = () => {}`
      expect(extractExports(source)).toContain('Button')
    })

    it('extracts named class export', () => {
      const source = `export class MyClass {}`
      expect(extractExports(source)).toContain('MyClass')
    })

    it('extracts export list', () => {
      const source = `export { Button, Card, Input }`
      const exports = extractExports(source)
      expect(exports).toContain('Button')
      expect(exports).toContain('Card')
      expect(exports).toContain('Input')
    })

    it('handles export with alias', () => {
      const source = `export { Button as MyButton }`
      expect(extractExports(source)).toContain('Button')
    })

    it('combines multiple export types', () => {
      const source = `
        export const Foo = () => {}
        export function Bar() {}
        export { Baz }
        export default Component
      `
      const exports = extractExports(source)
      expect(exports).toContain('Foo')
      expect(exports).toContain('Bar')
      expect(exports).toContain('Baz')
      expect(exports).toContain('default')
    })
  })

  describe('extractPropsInfo', () => {
    it('extracts interface props', () => {
      const source = `
        interface ButtonProps {
          variant: string
          size: number
          disabled?: boolean
        }
      `
      const props = extractPropsInfo(source)
      expect(props).toHaveLength(1)
      expect(props[0]?.name).toBe('ButtonProps')
      expect(props[0]?.properties).toContain('variant')
      expect(props[0]?.properties).toContain('size')
      expect(props[0]?.properties).toContain('disabled')
    })

    it('extracts type props', () => {
      const source = `
        type CardProps = {
          title: string
          description?: string
        }
      `
      const props = extractPropsInfo(source)
      expect(props).toHaveLength(1)
      expect(props[0]?.name).toBe('CardProps')
      expect(props[0]?.properties).toContain('title')
      expect(props[0]?.properties).toContain('description')
    })

    it('handles multiple prop definitions', () => {
      const source = `
        interface ButtonProps {
          variant: string
        }
        type CardProps = {
          title: string
        }
      `
      const props = extractPropsInfo(source)
      expect(props).toHaveLength(2)
    })

    it('returns empty array for no props', () => {
      const source = `const foo = "bar"`
      expect(extractPropsInfo(source)).toEqual([])
    })
  })

  describe('extractSummary', () => {
    it('extracts JSDoc comment', () => {
      const source = `
        /**
         * A reusable button component
         * with multiple variants
         */
        export function Button() {}
      `
      expect(extractSummary(source, 'Button')).toBe('A reusable button component')
    })

    it('handles comment without leading asterisks', () => {
      const source = `
        /**
         A simple button
         */
        export function Button() {}
      `
      expect(extractSummary(source, 'Button')).toBe('A simple button')
    })

    it('returns fallback for no comment', () => {
      const source = `export function Button() {}`
      expect(extractSummary(source, 'Button')).toBe('Component Button.')
    })
  })

  describe('inferTags', () => {
    it('infers action tag for button', () => {
      const tags = inferTags('Button', 'button.tsx', 'export const Button')
      expect(tags).toContain('action')
    })

    it('infers feedback tag for badge', () => {
      const tags = inferTags('Badge', 'badge.tsx', 'export const Badge')
      expect(tags).toContain('feedback')
    })

    it('infers overlay tag for dialog', () => {
      const tags = inferTags('Dialog', 'dialog.tsx', 'export const Dialog')
      expect(tags).toContain('overlay')
    })

    it('infers navigation tag for menu', () => {
      const tags = inferTags('Menu', 'menu.tsx', 'export const Menu')
      expect(tags).toContain('navigation')
    })

    it('infers layout tag for card', () => {
      const tags = inferTags('Card', 'card.tsx', 'export const Card')
      expect(tags).toContain('layout')
    })

    it('infers form tag for input', () => {
      const tags = inferTags('Input', 'input.tsx', 'export const Input')
      expect(tags).toContain('form')
    })

    it('defaults to ui tag for unknown components', () => {
      const tags = inferTags('CustomComponent', 'custom.tsx', 'export const Custom')
      expect(tags).toContain('ui')
    })

    it('can infer multiple tags', () => {
      const tags = inferTags('CardHeader', 'card-header.tsx', 'card header layout')
      expect(tags.length).toBeGreaterThan(0)
    })
  })

  describe('extractTailwindColorTokens', () => {
    it('extracts simple color variables', () => {
      const source = `
        colors: {
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
        },
        borderRadius
      `
      const tokens = extractTailwindColorTokens(source)
      expect(tokens.colors.background).toBe('--background')
      expect(tokens.colors.foreground).toBe('--foreground')
      expect(tokens.cssVars).toContain('--background')
      expect(tokens.cssVars).toContain('--foreground')
    })

    it('extracts nested color objects', () => {
      const source = `
        colors: {
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
          },
        },
        borderRadius
      `
      const tokens = extractTailwindColorTokens(source)
      expect(tokens.colors.primary).toMatchObject({
        DEFAULT: '--primary',
        foreground: '--primary-foreground',
      })
    })

    it('returns empty for no color block', () => {
      const source = `const config = { theme: {} }`
      const tokens = extractTailwindColorTokens(source)
      expect(Object.keys(tokens.colors)).toHaveLength(0)
      expect(tokens.cssVars).toHaveLength(0)
    })
  })

  describe('extractCssVariables', () => {
    it('extracts CSS variables', () => {
      const source = `
        :root {
          --background: 0 0% 100%;
          --foreground: 222.2 84% 4.9%;
          --primary: 221.2 83.2% 53.3%;
        }
      `
      const vars = extractCssVariables(source)
      expect(vars).toContain('--background')
      expect(vars).toContain('--foreground')
      expect(vars).toContain('--primary')
    })

    it('handles dark mode variables', () => {
      const source = `
        .dark {
          --background: 222.2 84% 4.9%;
          --foreground: 210 40% 98%;
        }
      `
      const vars = extractCssVariables(source)
      expect(vars).toContain('--background')
      expect(vars).toContain('--foreground')
    })

    it('returns empty array for no variables', () => {
      const source = `.foo { color: red; }`
      expect(extractCssVariables(source)).toEqual([])
    })
  })
})
