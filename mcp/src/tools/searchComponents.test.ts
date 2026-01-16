import { describe, it, expect } from 'vitest'
import { searchComponents, SearchComponentsInput } from './searchComponents'
import { ComponentsIndex, ComponentMeta } from '../providers/componentsProvider'

describe('searchComponents', () => {
  const mockComponents: ComponentMeta[] = [
    {
      name: 'Button',
      category: 'ui',
      filePath: 'src/components/ui/button.tsx',
      exports: ['Button'],
      dependencies: ['@/lib/utils'],
      summary: 'A customizable button component',
      props: [{ name: 'ButtonProps', properties: ['variant', 'size'] }],
      usageExamples: ['<Button />'],
      tags: ['action', 'form'],
    },
    {
      name: 'Card',
      category: 'ui',
      filePath: 'src/components/ui/card.tsx',
      exports: ['Card', 'CardHeader', 'CardTitle'],
      dependencies: ['@/lib/utils'],
      summary: 'A card container component',
      props: [{ name: 'CardProps', properties: ['className'] }],
      usageExamples: ['<Card />'],
      tags: ['layout', 'container'],
    },
    {
      name: 'Header',
      category: 'layout',
      filePath: 'src/components/layout/header.tsx',
      exports: ['Header'],
      dependencies: [],
      summary: 'Page header layout component',
      props: [],
      usageExamples: ['<Header />'],
      tags: ['layout', 'navigation'],
    },
    {
      name: 'Input',
      category: 'ui',
      filePath: 'src/components/ui/input.tsx',
      exports: ['Input'],
      dependencies: ['@/lib/utils'],
      summary: 'Form input field',
      props: [{ name: 'InputProps', properties: ['type', 'placeholder'] }],
      usageExamples: ['<Input />'],
      tags: ['form', 'input'],
    },
  ]

  const mockIndex: ComponentsIndex = {
    list: mockComponents,
    byName: new Map(mockComponents.map(c => [c.name.toLowerCase(), c])),
    bySlug: new Map(mockComponents.map(c => [c.name.toLowerCase(), c])),
  }

  describe('basic search', () => {
    it('returns all components with empty query', () => {
      const results = searchComponents(mockIndex, {})
      expect(results).toHaveLength(4)
    })

    it('searches by name', () => {
      const results = searchComponents(mockIndex, { query: 'button' })
      expect(results).toHaveLength(1)
      expect(results[0]?.name).toBe('Button')
    })

    it('searches case-insensitively', () => {
      const results = searchComponents(mockIndex, { query: 'BUTTON' })
      expect(results).toHaveLength(1)
      expect(results[0]?.name).toBe('Button')
    })

    it('searches in file path', () => {
      const results = searchComponents(mockIndex, { query: 'layout/header' })
      expect(results).toHaveLength(1)
      expect(results[0]?.name).toBe('Header')
    })

    it('searches in summary', () => {
      const results = searchComponents(mockIndex, { query: 'customizable' })
      expect(results).toHaveLength(1)
      expect(results[0]?.name).toBe('Button')
    })

    it('returns empty array for no matches', () => {
      const results = searchComponents(mockIndex, { query: 'nonexistent' })
      expect(results).toHaveLength(0)
    })
  })

  describe('category filtering', () => {
    it('filters by ui category', () => {
      const results = searchComponents(mockIndex, { category: 'ui' })
      expect(results).toHaveLength(3)
      expect(results.every(r => r.category === 'ui')).toBe(true)
    })

    it('filters by layout category', () => {
      const results = searchComponents(mockIndex, { category: 'layout' })
      expect(results).toHaveLength(1)
      expect(results[0]?.name).toBe('Header')
    })

    it('combines category with query', () => {
      const results = searchComponents(mockIndex, {
        query: 'button',
        category: 'ui',
      })
      expect(results).toHaveLength(1)
      expect(results[0]?.name).toBe('Button')
    })

    it('returns empty when category does not match', () => {
      const results = searchComponents(mockIndex, {
        query: 'button',
        category: 'layout',
      })
      expect(results).toHaveLength(0)
    })
  })

  describe('tag filtering', () => {
    it('filters by single tag', () => {
      const results = searchComponents(mockIndex, { tags: ['form'] })
      expect(results).toHaveLength(2)
      expect(results.every(r => r.tags.includes('form'))).toBe(true)
    })

    it('filters by multiple tags (AND logic)', () => {
      const results = searchComponents(mockIndex, { tags: ['layout', 'navigation'] })
      expect(results).toHaveLength(1)
      expect(results[0]?.name).toBe('Header')
    })

    it('is case-insensitive for tags', () => {
      const results = searchComponents(mockIndex, { tags: ['FORM'] })
      expect(results.length).toBeGreaterThan(0)
    })

    it('returns empty when no component matches all tags', () => {
      const results = searchComponents(mockIndex, { tags: ['form', 'navigation'] })
      expect(results).toHaveLength(0)
    })
  })

  describe('combined filtering', () => {
    it('combines query, category, and tags', () => {
      const results = searchComponents(mockIndex, {
        query: 'button',
        category: 'ui',
        tags: ['action'],
      })
      expect(results).toHaveLength(1)
      expect(results[0]?.name).toBe('Button')
    })

    it('returns empty when all filters do not match', () => {
      const results = searchComponents(mockIndex, {
        query: 'button',
        category: 'layout',
        tags: ['form'],
      })
      expect(results).toHaveLength(0)
    })
  })

  describe('return shape', () => {
    it('returns only required fields', () => {
      const results = searchComponents(mockIndex, { query: 'button' })
      expect(results[0]).toHaveProperty('name')
      expect(results[0]).toHaveProperty('category')
      expect(results[0]).toHaveProperty('filePath')
      expect(results[0]).toHaveProperty('tags')
      expect(results[0]).not.toHaveProperty('exports')
      expect(results[0]).not.toHaveProperty('dependencies')
      expect(results[0]).not.toHaveProperty('summary')
    })

    it('preserves all required fields', () => {
      const results = searchComponents(mockIndex, { query: 'card' })
      expect(results[0]?.name).toBe('Card')
      expect(results[0]?.category).toBe('ui')
      expect(results[0]?.filePath).toBe('src/components/ui/card.tsx')
      expect(results[0]?.tags).toEqual(['layout', 'container'])
    })
  })
})
