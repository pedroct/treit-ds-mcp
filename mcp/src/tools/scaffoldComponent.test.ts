import { describe, it, expect } from 'vitest'
import { scaffoldComponent, ScaffoldComponentInput } from './scaffoldComponent'

describe('scaffoldComponent', () => {
  describe('basic scaffolding', () => {
    it('scaffolds a primitive component in ui category', () => {
      const result = scaffoldComponent({
        name: 'MyComponent',
        category: 'ui',
      })

      expect(result.files).toHaveLength(1)
      expect(result.files[0]?.path).toBe('src/components/ui/my-component.tsx')
      expect(result.files[0]?.content).toContain('MyComponent')
      expect(result.files[0]?.content).toContain('interface MyComponentProps')
    })

    it('scaffolds a component in layout category', () => {
      const result = scaffoldComponent({
        name: 'PageLayout',
        category: 'layout',
      })

      expect(result.files).toHaveLength(1)
      expect(result.files[0]?.path).toBe('src/components/layout/page-layout.tsx')
    })

    it('converts kebab-case name to PascalCase', () => {
      const result = scaffoldComponent({
        name: 'my-custom-component',
        category: 'ui',
      })

      expect(result.files[0]?.content).toContain('MyCustomComponent')
      expect(result.files[0]?.content).toContain('interface MyCustomComponentProps')
    })

    it('converts snake_case name to PascalCase', () => {
      const result = scaffoldComponent({
        name: 'my_custom_component',
        category: 'ui',
      })

      expect(result.files[0]?.content).toContain('MyCustomComponent')
    })
  })

  describe('template types', () => {
    it('generates primitive template by default', () => {
      const result = scaffoldComponent({
        name: 'Custom',
        category: 'ui',
      })

      expect(result.files[0]?.content).toContain('HTMLDivElement')
      expect(result.files[0]?.content).toContain('React.forwardRef')
      expect(result.files[0]?.content).toContain('cn("", className)')
    })

    it('generates button template', () => {
      const result = scaffoldComponent({
        name: 'CustomButton',
        category: 'ui',
        base: 'Button',
      })

      expect(result.files[0]?.content).toContain('CustomButtonVariants')
      expect(result.files[0]?.content).toContain('cva')
      expect(result.files[0]?.content).toContain('Slot')
      expect(result.files[0]?.content).toContain('variant')
      expect(result.files[0]?.content).toContain('size')
      expect(result.files[0]?.content).toContain('asChild')
    })

    it('generates card template', () => {
      const result = scaffoldComponent({
        name: 'CustomCard',
        category: 'ui',
        base: 'Card',
      })

      expect(result.files[0]?.content).toContain('rounded-lg border')
      expect(result.files[0]?.content).toContain('bg-card')
      expect(result.files[0]?.content).not.toContain('forwardRef')
    })

    it('generates layout template', () => {
      const result = scaffoldComponent({
        name: 'CustomLayout',
        category: 'layout',
        base: 'Layout',
      })

      expect(result.files[0]?.content).toContain('<section')
      expect(result.files[0]?.content).toContain('w-full')
    })

    it('generates primitive template for unspecified base', () => {
      const result = scaffoldComponent({
        name: 'Custom',
        category: 'ui',
        base: 'Primitive',
      })

      expect(result.files[0]?.content).toContain('HTMLDivElement')
      expect(result.files[0]?.content).toContain('React.forwardRef')
    })
  })

  describe('story generation', () => {
    it('does not generate story by default', () => {
      const result = scaffoldComponent({
        name: 'MyComponent',
        category: 'ui',
      })

      expect(result.files).toHaveLength(1)
      expect(result.files.every(f => !f.path.includes('stories'))).toBe(true)
    })

    it('generates story when withStory is true', () => {
      const result = scaffoldComponent({
        name: 'MyComponent',
        category: 'ui',
        withStory: true,
      })

      expect(result.files).toHaveLength(2)
      const storyFile = result.files.find(f => f.path.includes('stories'))
      expect(storyFile).toBeDefined()
      expect(storyFile?.path).toBe('stories/my-component.mdx')
      expect(storyFile?.content).toContain('# MyComponent')
      expect(storyFile?.content).toContain('TODO: add component documentation')
    })

    it('generates story with correct name casing', () => {
      const result = scaffoldComponent({
        name: 'custom-button',
        category: 'ui',
        withStory: true,
      })

      const storyFile = result.files.find(f => f.path.includes('stories'))
      expect(storyFile?.content).toContain('# CustomButton')
      expect(storyFile?.path).toBe('stories/custom-button.mdx')
    })
  })

  describe('output structure', () => {
    it('uses posix path separators', () => {
      const result = scaffoldComponent({
        name: 'MyComponent',
        category: 'ui',
      })

      expect(result.files[0]?.path).toContain('/')
      expect(result.files[0]?.path).not.toContain('\\')
    })

    it('includes all required imports', () => {
      const result = scaffoldComponent({
        name: 'Test',
        category: 'ui',
      })

      expect(result.files[0]?.content).toContain('import * as React')
      expect(result.files[0]?.content).toContain('import { cn }')
      expect(result.files[0]?.content).toContain('from "@/lib/utils"')
    })

    it('includes displayName', () => {
      const result = scaffoldComponent({
        name: 'MyComponent',
        category: 'ui',
      })

      expect(result.files[0]?.content).toContain('MyComponent.displayName = "MyComponent"')
    })

    it('exports the component', () => {
      const result = scaffoldComponent({
        name: 'MyComponent',
        category: 'ui',
      })

      expect(result.files[0]?.content).toContain('export { MyComponent }')
    })
  })

  describe('button template specifics', () => {
    it('exports variants', () => {
      const result = scaffoldComponent({
        name: 'CustomButton',
        category: 'ui',
        base: 'Button',
      })

      expect(result.files[0]?.content).toContain('export { CustomButton, CustomButtonVariants }')
    })

    it('includes default and outline variants', () => {
      const result = scaffoldComponent({
        name: 'CustomButton',
        category: 'ui',
        base: 'Button',
      })

      expect(result.files[0]?.content).toContain('default:')
      expect(result.files[0]?.content).toContain('outline:')
    })

    it('includes size variants', () => {
      const result = scaffoldComponent({
        name: 'CustomButton',
        category: 'ui',
        base: 'Button',
      })

      expect(result.files[0]?.content).toContain('sm:')
      expect(result.files[0]?.content).toContain('lg:')
    })

    it('includes VariantProps type', () => {
      const result = scaffoldComponent({
        name: 'CustomButton',
        category: 'ui',
        base: 'Button',
      })

      expect(result.files[0]?.content).toContain('VariantProps')
      expect(result.files[0]?.content).toContain('class-variance-authority')
    })
  })
})
