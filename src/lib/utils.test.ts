import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('merges tailwind classes correctly', () => {
    // tailwind-merge should keep only the last conflicting class
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })

  it('handles empty input', () => {
    expect(cn()).toBe('')
  })

  it('handles arrays', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })

  it('handles duplicate classes', () => {
    // clsx keeps duplicates, tailwind-merge handles conflicts
    expect(cn('foo', 'bar', 'foo')).toContain('foo')
    expect(cn('foo', 'bar', 'foo')).toContain('bar')
  })

  it('resolves conflicting tailwind utilities', () => {
    // Later utilities should override earlier ones
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
    expect(cn('p-4', 'p-2')).toBe('p-2')
  })
})
