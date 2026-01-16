import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders correctly', () => {
      render(<Card data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card')
    })

    it('accepts custom className', () => {
      render(<Card data-testid="card" className="custom-class">Content</Card>)
      expect(screen.getByTestId('card')).toHaveClass('custom-class')
    })
  })

  describe('CardHeader', () => {
    it('renders correctly', () => {
      render(<CardHeader data-testid="card-header">Header</CardHeader>)
      const header = screen.getByTestId('card-header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('flex', 'flex-col', 'p-6')
    })
  })

  describe('CardTitle', () => {
    it('renders correctly', () => {
      render(<CardTitle data-testid="card-title">Title</CardTitle>)
      const title = screen.getByTestId('card-title')
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('text-2xl', 'font-semibold')
    })
  })

  describe('CardDescription', () => {
    it('renders correctly', () => {
      render(<CardDescription data-testid="card-description">Description</CardDescription>)
      const description = screen.getByTestId('card-description')
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    })
  })

  describe('CardContent', () => {
    it('renders correctly', () => {
      render(<CardContent data-testid="card-content">Content</CardContent>)
      const content = screen.getByTestId('card-content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveClass('p-6', 'pt-0')
    })
  })

  describe('CardFooter', () => {
    it('renders correctly', () => {
      render(<CardFooter data-testid="card-footer">Footer</CardFooter>)
      const footer = screen.getByTestId('card-footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })
  })

  describe('Full Card Composition', () => {
    it('renders all components together', () => {
      render(
        <Card data-testid="card">
          <CardHeader data-testid="header">
            <CardTitle data-testid="title">Test Title</CardTitle>
            <CardDescription data-testid="description">Test Description</CardDescription>
          </CardHeader>
          <CardContent data-testid="content">Test Content</CardContent>
          <CardFooter data-testid="footer">Test Footer</CardFooter>
        </Card>
      )

      expect(screen.getByTestId('card')).toBeInTheDocument()
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('title')).toHaveTextContent('Test Title')
      expect(screen.getByTestId('description')).toHaveTextContent('Test Description')
      expect(screen.getByTestId('content')).toHaveTextContent('Test Content')
      expect(screen.getByTestId('footer')).toHaveTextContent('Test Footer')
    })
  })
})
