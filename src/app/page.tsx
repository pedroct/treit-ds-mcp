import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Design System
            </h1>
            <p className="text-xl text-muted-foreground">
              Um sistema de design completo construído com Next.js, Tailwind CSS e Shadcn UI
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Link
              href="/styleguide"
              className="p-6 rounded-lg border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2 text-primary">Styleguide</h2>
              <p className="text-muted-foreground">
                Design tokens completo e componentes Shadcn UI
              </p>
            </Link>

            <Link
              href="/colors"
              className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">Cores</h2>
              <p className="text-muted-foreground">
                Paleta de cores, tokens e variações
              </p>
            </Link>

            <Link
              href="/typography"
              className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">Tipografia</h2>
              <p className="text-muted-foreground">
                Hierarquia, tamanhos e estilos de texto
              </p>
            </Link>

            <Link
              href="/components"
              className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">Componentes</h2>
              <p className="text-muted-foreground">
                Biblioteca completa de componentes UI
              </p>
            </Link>

            <Link
              href="/spacing"
              className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">Espaçamento</h2>
              <p className="text-muted-foreground">
                Sistema de espaçamento e grid
              </p>
            </Link>

            <Link
              href="/icons"
              className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">Ícones</h2>
              <p className="text-muted-foreground">
                Biblioteca de ícones e guidelines
              </p>
            </Link>

            <Link
              href="/patterns"
              className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">Padrões</h2>
              <p className="text-muted-foreground">
                Padrões de UI e melhores práticas
              </p>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Última atualização: Janeiro 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
