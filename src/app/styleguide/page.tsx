"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Moon, Sun, AlertCircle } from "lucide-react"

export default function StyleguidePage() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const colorScales = [
    {
      name: "Orange Scale",
      colors: [
        { name: "orange-50", value: "14 100% 97%" },
        { name: "orange-100", value: "14 100% 92%" },
        { name: "orange-200", value: "14 100% 85%" },
        { name: "orange-300", value: "14 100% 75%" },
        { name: "orange-400", value: "14 100% 65%" },
        { name: "orange-500", value: "14 99% 50%", hex: "#fd5001" },
        { name: "orange-600", value: "14 99% 45%" },
        { name: "orange-700", value: "14 99% 35%" },
        { name: "orange-800", value: "14 99% 25%" },
        { name: "orange-900", value: "14 99% 15%" },
      ]
    },
    {
      name: "Cyan Scale",
      colors: [
        { name: "cyan-50", value: "188 100% 97%" },
        { name: "cyan-100", value: "188 100% 92%" },
        { name: "cyan-200", value: "188 95% 85%" },
        { name: "cyan-300", value: "188 94% 70%" },
        { name: "cyan-400", value: "188 94% 60%" },
        { name: "cyan-500", value: "188 94% 57%", hex: "#2cd9f7" },
        { name: "cyan-600", value: "188 94% 47%" },
        { name: "cyan-700", value: "188 94% 37%" },
        { name: "cyan-800", value: "188 94% 27%" },
        { name: "cyan-900", value: "188 94% 17%" },
      ]
    },
    {
      name: "Blue Scale",
      colors: [
        { name: "blue-50", value: "214 100% 97%" },
        { name: "blue-100", value: "214 100% 92%" },
        { name: "blue-200", value: "214 100% 85%" },
        { name: "blue-300", value: "214 100% 70%" },
        { name: "blue-400", value: "214 100% 55%" },
        { name: "blue-500", value: "214 100% 41%", hex: "#0056d2" },
        { name: "blue-600", value: "214 100% 35%" },
        { name: "blue-700", value: "214 100% 25%" },
        { name: "blue-800", value: "214 100% 15%" },
        { name: "blue-900", value: "214 100% 10%" },
      ]
    },
    {
      name: "Gray Scale",
      colors: [
        { name: "gray-50", value: "0 0% 98%" },
        { name: "gray-100", value: "0 0% 95%" },
        { name: "gray-200", value: "0 0% 90%" },
        { name: "gray-300", value: "0 0% 80%" },
        { name: "gray-400", value: "0 0% 60%" },
        { name: "gray-500", value: "0 0% 45%" },
        { name: "gray-600", value: "0 0% 40%" },
        { name: "gray-700", value: "0 0% 25%" },
        { name: "gray-800", value: "0 0% 15%" },
        { name: "gray-900", value: "0 0% 5%" },
      ]
    }
  ]

  const semanticColors = [
    { name: "Primary", var: "--primary", desc: "Main brand color (Orange)" },
    { name: "Secondary", var: "--secondary", desc: "Secondary brand color (Cyan)" },
    { name: "Accent", var: "--accent", desc: "Accent color (Blue)" },
    { name: "Success", var: "--success", desc: "Success states" },
    { name: "Warning", var: "--warning", desc: "Warning states" },
    { name: "Info", var: "--info", desc: "Info states" },
    { name: "Destructive", var: "--destructive", desc: "Error/delete actions" },
    { name: "Muted", var: "--muted", desc: "Subtle backgrounds" },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Design Tokens</h1>
          <p className="text-muted-foreground">
            Complete design system with colors, typography, and components
          </p>
        </div>
        <Button onClick={toggleDarkMode} variant="outline" size="icon">
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Color Scales */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Color Scales</h2>
        <div className="space-y-8">
          {colorScales.map((scale) => (
            <div key={scale.name}>
              <h3 className="text-lg font-semibold mb-4">{scale.name}</h3>
              <div className="grid grid-cols-10 gap-2">
                {scale.colors.map((color) => (
                  <div key={color.name} className="text-center">
                    <div
                      className="h-20 rounded-md border mb-2"
                      style={{ backgroundColor: `hsl(${color.value})` }}
                    />
                    <div className="text-xs font-mono mb-1">
                      {color.name.split("-")[1]}
                    </div>
                    {color.hex && (
                      <div className="text-xs text-muted-foreground">
                        {color.hex}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Colors - Manual da Marca */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Cores Primárias - Manual da Marca</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Branco */}
          <div className="border-2 rounded-lg overflow-hidden">
            <div className="h-40 bg-white border" />
            <div className="p-4 bg-card">
              <h3 className="font-bold text-lg mb-3">Branco</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold">BRANCO PURO</span></p>
                <p className="text-muted-foreground">CMYK: 0-0-0-0</p>
                <p className="text-muted-foreground">RGB: 255-255-255</p>
                <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">HEXA: #FFFFFF</p>
              </div>
            </div>
          </div>

          {/* Laranja */}
          <div className="border-2 rounded-lg overflow-hidden">
            <div className="h-40" style={{ backgroundColor: "#fd5001" }} />
            <div className="p-4 bg-card">
              <h3 className="font-bold text-lg mb-3">Laranja</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold">PANTONE ORANGE 021 C</span></p>
                <p className="text-muted-foreground">CMYK: 0-78-94-0</p>
                <p className="text-muted-foreground">RGB: 253-80-1</p>
                <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">HEXA: #fd5001</p>
              </div>
            </div>
          </div>

          {/* Azul Claro (Ciano) */}
          <div className="border-2 rounded-lg overflow-hidden">
            <div className="h-40" style={{ backgroundColor: "#2cd9f7" }} />
            <div className="p-4 bg-card">
              <h3 className="font-bold text-lg mb-3">Azul claro</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold">PANTONE 319 C</span></p>
                <p className="text-muted-foreground">CMYK: 61-0-8-0</p>
                <p className="text-muted-foreground">RGB: 44-217-247</p>
                <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">HEXA: #2cd9f7</p>
              </div>
            </div>
          </div>

          {/* Azul Escuro */}
          <div className="border-2 rounded-lg overflow-hidden">
            <div className="h-40" style={{ backgroundColor: "#0056d2" }} />
            <div className="p-4 bg-card">
              <h3 className="font-bold text-lg mb-3">Azul escuro</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold">PANTONE 2935 C</span></p>
                <p className="text-muted-foreground">CMYK: 100-64-21-6</p>
                <p className="text-muted-foreground">RGB: 0-86-210</p>
                <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">HEXA: #0056d2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preto e Branco em destaque */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Preto */}
          <div className="border-2 rounded-lg overflow-hidden">
            <div className="h-32 bg-black" />
            <div className="p-4 bg-card">
              <h3 className="font-bold text-lg mb-3">Preto</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold">PANTONE BLACK 6 C</span></p>
                <p className="text-muted-foreground">CMYK: 91-79-62-97</p>
                <p className="text-muted-foreground">RGB: 0-0-0</p>
                <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">HEXA: #000000</p>
              </div>
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  São cores que estarão presentes ao uso das versões preta e branca, negativa e positiva.
                </p>
              </div>
            </div>
          </div>

          {/* Escalas de Cinza */}
          <div className="border-2 rounded-lg overflow-hidden">
            <div className="h-32 flex">
              <div className="flex-1 bg-black bg-opacity-80" />
              <div className="flex-1 bg-black bg-opacity-60" />
              <div className="flex-1 bg-black bg-opacity-40" />
              <div className="flex-1 bg-black bg-opacity-20" />
            </div>
            <div className="p-4 bg-card">
              <h3 className="font-bold text-lg mb-3">Escalas de Cinza</h3>
              <div className="grid grid-cols-4 gap-2 text-xs text-center">
                <div>
                  <p className="font-semibold">80%</p>
                  <p className="text-muted-foreground">Preto</p>
                </div>
                <div>
                  <p className="font-semibold">60%</p>
                  <p className="text-muted-foreground">Preto</p>
                </div>
                <div>
                  <p className="font-semibold">40%</p>
                  <p className="text-muted-foreground">Preto</p>
                </div>
                <div>
                  <p className="font-semibold">20%</p>
                  <p className="text-muted-foreground">Preto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Semantic Colors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Cores Semânticas (Sistema)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {semanticColors.map((color) => (
            <div key={color.name} className="border rounded-lg overflow-hidden">
              <div
                className="h-32"
                style={{ backgroundColor: `hsl(var(${color.var}))` }}
              />
              <div className="p-4">
                <h3 className="font-semibold mb-1">{color.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{color.desc}</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {color.var}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Typography - Montserrat Family</h2>

        {/* Font Weights */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Font Weights</h3>
          <div className="space-y-3 border rounded-lg p-6">
            <div>
              <p className="text-lg font-light mb-1">Light (300) - Montserrat Light</p>
              <code className="text-xs text-muted-foreground">font-light</code>
            </div>
            <div>
              <p className="text-lg font-normal mb-1">Regular (400) - Montserrat Regular</p>
              <code className="text-xs text-muted-foreground">font-normal</code>
            </div>
            <div>
              <p className="text-lg font-medium mb-1">Medium (500) - Montserrat Medium</p>
              <code className="text-xs text-muted-foreground">font-medium</code>
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">Semibold (600) - Montserrat Semibold</p>
              <code className="text-xs text-muted-foreground">font-semibold</code>
            </div>
            <div>
              <p className="text-lg font-bold mb-1">Bold (700) - Montserrat Bold</p>
              <code className="text-xs text-muted-foreground">font-bold</code>
            </div>
            <div>
              <p className="text-lg font-extrabold mb-1">Extra Bold (800) - Montserrat ExtraBold</p>
              <code className="text-xs text-muted-foreground">font-extrabold</code>
            </div>
          </div>
        </div>

        {/* Headings */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Headings</h3>
          <div className="space-y-4 border rounded-lg p-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Heading 1 - Bold 36px</h1>
              <code className="text-xs text-muted-foreground">
                text-4xl font-bold
              </code>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-2">Heading 2 - Semibold 30px</h2>
              <code className="text-xs text-muted-foreground">
                text-3xl font-semibold
              </code>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Heading 3 - Semibold 24px</h3>
              <code className="text-xs text-muted-foreground">
                text-2xl font-semibold
              </code>
            </div>
          </div>
        </div>

        {/* Body Text */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Body Text</h3>
          <div className="space-y-4 border rounded-lg p-6">
            <div>
              <p className="text-base mb-2">
                Body text - Regular 16px. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <code className="text-xs text-muted-foreground">
                text-base
              </code>
            </div>
            <div>
              <p className="text-sm mb-2">
                Small text - Regular 14px. Used for captions and secondary information.
              </p>
              <code className="text-xs text-muted-foreground">
                text-sm
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Border Radius</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="h-20 bg-primary rounded-none mb-2" />
            <p className="text-sm font-mono">rounded-none</p>
            <p className="text-xs text-muted-foreground">0px</p>
          </div>
          <div>
            <div className="h-20 bg-primary rounded-sm mb-2" />
            <p className="text-sm font-mono">rounded-sm</p>
            <p className="text-xs text-muted-foreground">2px</p>
          </div>
          <div>
            <div className="h-20 bg-primary rounded-md mb-2" />
            <p className="text-sm font-mono">rounded-md</p>
            <p className="text-xs text-muted-foreground">6px (default)</p>
          </div>
          <div>
            <div className="h-20 bg-primary rounded-lg mb-2" />
            <p className="text-sm font-mono">rounded-lg</p>
            <p className="text-xs text-muted-foreground">8px</p>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Components</h2>

        {/* Buttons */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Badges</h3>
          <div className="flex flex-wrap gap-4">
            <Badge>Default Badge</Badge>
            <Badge variant="secondary">Secondary Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
            <Badge variant="destructive">Destructive Badge</Badge>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Cards</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content with some example text to demonstrate the card component.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With different content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cards can contain any type of content you need.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Alerts</h3>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert with an icon and description.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Destructive Alert</AlertTitle>
              <AlertDescription>
                This is a destructive/error alert to show critical information.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Design Summary */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Design Summary</h2>
        <div className="border rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Primary Color</h3>
            <p className="text-muted-foreground">
              <span className="font-mono">#fd5001</span> - Orange (PANTONE ORANGE 021 C)
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Font Family</h3>
            <p className="text-muted-foreground">Montserrat (Google Fonts)</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Style</h3>
            <p className="text-muted-foreground">
              Modern, clean, vibrant - Strong contrast with bold primary colors
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Border Radius</h3>
            <p className="text-muted-foreground">Moderately rounded (0.5rem / 8px)</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Overall Feel</h3>
            <p className="text-muted-foreground">
              Professional yet energetic, with a bright color palette that stands out while maintaining readability and accessibility
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
