import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    let clicked = false
    const handleClick = () => {
      clicked = true
    }

    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })

    await user.click(button)
    expect(clicked).toBe(true)
  })

  it('applies default variant styles', () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary')
  })

  it('applies destructive variant styles', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })

  it('applies outline variant styles', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border', 'border-input')
  })

  it('applies small size styles', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-9')
  })

  it('applies large size styles', () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-11')
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('accepts custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Button ref={ref as any}>Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
