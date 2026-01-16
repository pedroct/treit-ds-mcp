import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { buildComponentsIndex, getComponentByName } from './componentsProvider'

describe('componentsProvider', () => {
  const testDir = path.join(process.cwd(), 'test-temp-components')
  const uiDir = path.join(testDir, 'src', 'components', 'ui')
  const layoutDir = path.join(testDir, 'src', 'components', 'layout')

  beforeEach(async () => {
    await fs.mkdir(uiDir, { recursive: true })
    await fs.mkdir(layoutDir, { recursive: true })
  })

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true })
  })

  describe('buildComponentsIndex', () => {
    it('indexes components from ui directory', async () => {
      const buttonSource = `
        /**
         * A customizable button component
         */
        export interface ButtonProps {
          variant?: string
          size?: string
        }

        export const Button = () => {}
      `

      await fs.writeFile(path.join(uiDir, 'button.tsx'), buttonSource)

      const index = await buildComponentsIndex(testDir)

      expect(index.list).toHaveLength(1)
      expect(index.list[0]?.name).toBe('Button')
      expect(index.list[0]?.category).toBe('ui')
      expect(index.list[0]?.exports).toContain('Button')
      expect(index.list[0]?.summary).toBe('A customizable button component')
    })

    it('indexes components from layout directory', async () => {
      const headerSource = `
        export const Header = () => {}
      `

      await fs.writeFile(path.join(layoutDir, 'header.tsx'), headerSource)

      const index = await buildComponentsIndex(testDir)

      expect(index.list).toHaveLength(1)
      expect(index.list[0]?.name).toBe('Header')
      expect(index.list[0]?.category).toBe('layout')
    })

    it('indexes multiple components', async () => {
      const buttonSource = `export const Button = () => {}`
      const cardSource = `export const Card = () => {}`
      const headerSource = `export const Header = () => {}`

      await fs.writeFile(path.join(uiDir, 'button.tsx'), buttonSource)
      await fs.writeFile(path.join(uiDir, 'card.tsx'), cardSource)
      await fs.writeFile(path.join(layoutDir, 'header.tsx'), headerSource)

      const index = await buildComponentsIndex(testDir)

      expect(index.list).toHaveLength(3)
    })

    it('sorts components alphabetically', async () => {
      await fs.writeFile(path.join(uiDir, 'zebra.tsx'), `export const Zebra = () => {}`)
      await fs.writeFile(path.join(uiDir, 'alpha.tsx'), `export const Alpha = () => {}`)
      await fs.writeFile(path.join(uiDir, 'middle.tsx'), `export const Middle = () => {}`)

      const index = await buildComponentsIndex(testDir)

      expect(index.list[0]?.name).toBe('Alpha')
      expect(index.list[1]?.name).toBe('Middle')
      expect(index.list[2]?.name).toBe('Zebra')
    })

    it('creates byName map with lowercase keys', async () => {
      const buttonSource = `export const Button = () => {}`
      await fs.writeFile(path.join(uiDir, 'button.tsx'), buttonSource)

      const index = await buildComponentsIndex(testDir)

      expect(index.byName.has('button')).toBe(true)
      expect(index.byName.get('button')?.name).toBe('Button')
    })

    it('creates bySlug map with kebab-case keys', async () => {
      const buttonSource = `export const MyButton = () => {}`
      await fs.writeFile(path.join(uiDir, 'my-button.tsx'), buttonSource)

      const index = await buildComponentsIndex(testDir)

      expect(index.bySlug.has('my-button')).toBe(true)
      expect(index.bySlug.get('my-button')?.name).toBe('MyButton')
    })

    it('extracts props information', async () => {
      const buttonSource = `
        export interface ButtonProps {
          variant?: 'default' | 'outline'
          size?: 'sm' | 'lg'
          disabled?: boolean
        }

        export const Button = (props: ButtonProps) => {}
      `

      await fs.writeFile(path.join(uiDir, 'button.tsx'), buttonSource)

      const index = await buildComponentsIndex(testDir)

      expect(index.list[0]?.props).toHaveLength(1)
      expect(index.list[0]?.props[0]?.name).toBe('ButtonProps')
      expect(index.list[0]?.props[0]?.properties).toContain('variant')
      expect(index.list[0]?.props[0]?.properties).toContain('size')
      expect(index.list[0]?.props[0]?.properties).toContain('disabled')
    })

    it('extracts dependencies', async () => {
      const buttonSource = `
        import { cn } from "@/lib/utils"
        import { Slot } from "@radix-ui/react-slot"
        import { cva } from "class-variance-authority"

        export const Button = () => {}
      `

      await fs.writeFile(path.join(uiDir, 'button.tsx'), buttonSource)

      const index = await buildComponentsIndex(testDir)

      expect(index.list[0]?.dependencies).toContain('@/lib/utils')
      expect(index.list[0]?.dependencies).toContain('@radix-ui/react-slot')
      expect(index.list[0]?.dependencies).toContain('class-variance-authority')
    })

    it('generates usage examples', async () => {
      const buttonSource = `
        export interface ButtonProps {
          variant?: string
          size?: string
        }

        export const Button = () => {}
      `

      await fs.writeFile(path.join(uiDir, 'button.tsx'), buttonSource)

      const index = await buildComponentsIndex(testDir)

      expect(index.list[0]?.usageExamples).toHaveLength(1)
      expect(index.list[0]?.usageExamples[0]).toContain('<Button')
      expect(index.list[0]?.usageExamples[0]).toContain('variant={...}')
      expect(index.list[0]?.usageExamples[0]).toContain('size={...}')
    })

    it('infers tags from component', async () => {
      const buttonSource = `export const Button = () => {}`

      await fs.writeFile(path.join(uiDir, 'button.tsx'), buttonSource)

      const index = await buildComponentsIndex(testDir)

      expect(index.list[0]?.tags).toContain('action')
    })

    it('uses relative file paths', async () => {
      const buttonSource = `export const Button = () => {}`

      await fs.writeFile(path.join(uiDir, 'button.tsx'), buttonSource)

      const index = await buildComponentsIndex(testDir)

      expect(index.list[0]?.filePath).toBe('src/components/ui/button.tsx')
      expect(index.list[0]?.filePath).not.toContain(testDir)
    })

    it('handles directories without tsx files', async () => {
      await fs.writeFile(path.join(uiDir, 'styles.css'), `.button {}`)

      const index = await buildComponentsIndex(testDir)

      expect(index.list).toHaveLength(0)
    })
  })

  describe('getComponentByName', () => {
    let index: any

    beforeEach(async () => {
      const buttonSource = `export const Button = () => {}`
      const myCardSource = `export const MyCard = () => {}`

      await fs.writeFile(path.join(uiDir, 'button.tsx'), buttonSource)
      await fs.writeFile(path.join(uiDir, 'my-card.tsx'), myCardSource)

      index = await buildComponentsIndex(testDir)
    })

    it('finds component by exact name', () => {
      const component = getComponentByName(index, 'Button')
      expect(component?.name).toBe('Button')
    })

    it('finds component case-insensitively', () => {
      const component = getComponentByName(index, 'BUTTON')
      expect(component?.name).toBe('Button')
    })

    it('finds component by kebab-case', () => {
      const component = getComponentByName(index, 'my-card')
      expect(component?.name).toBe('MyCard')
    })

    it('trims whitespace from name', () => {
      const component = getComponentByName(index, '  Button  ')
      expect(component?.name).toBe('Button')
    })

    it('returns null for non-existent component', () => {
      const component = getComponentByName(index, 'NonExistent')
      expect(component).toBeNull()
    })

    it('returns null for empty name', () => {
      const component = getComponentByName(index, '')
      expect(component).toBeNull()
    })
  })
})
