import { PageHeader } from "@/components/layout/page-header";

export default function PatternsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Padrões"
        description="Padrões de UI e melhores práticas de desenvolvimento"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Layout Patterns</h2>
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Container</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use containers para centralizar e limitar a largura do conteúdo
                </p>
                <div className="bg-muted rounded p-4">
                  <code className="text-sm">className="container mx-auto px-4"</code>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Grid Layout</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sistema de grid responsivo para layouts complexos
                </p>
                <div className="bg-muted rounded p-4 mb-4">
                  <code className="text-sm">
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  </code>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary/10 h-20 rounded" />
                  <div className="bg-primary/10 h-20 rounded" />
                  <div className="bg-primary/10 h-20 rounded" />
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Flex Layout</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use flexbox para alinhamento e distribuição de espaço
                </p>
                <div className="bg-muted rounded p-4 mb-4">
                  <code className="text-sm">
                    className="flex items-center justify-between gap-4"
                  </code>
                </div>
                <div className="flex items-center justify-between gap-4 p-4 bg-primary/10 rounded">
                  <div className="bg-background p-4 rounded">Item 1</div>
                  <div className="bg-background p-4 rounded">Item 2</div>
                  <div className="bg-background p-4 rounded">Item 3</div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Card Patterns</h2>
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
                <div className="mt-4">
                  <div className="border rounded-lg p-6 bg-card">
                    <h4 className="font-semibold mb-2">Card Title</h4>
                    <p className="text-sm text-muted-foreground">
                      Card content goes here. This is a basic card pattern with title and content.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Hover Card</h3>
                <div className="mt-4">
                  <div className="border rounded-lg p-6 bg-card hover:bg-accent transition-colors cursor-pointer">
                    <h4 className="font-semibold mb-2">Interactive Card</h4>
                    <p className="text-sm text-muted-foreground">
                      This card changes appearance on hover
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Responsive Patterns</h2>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Breakpoints</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-4">
                  <code className="bg-muted px-2 py-1 rounded w-24">sm:</code>
                  <span className="text-muted-foreground">640px e acima</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="bg-muted px-2 py-1 rounded w-24">md:</code>
                  <span className="text-muted-foreground">768px e acima</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="bg-muted px-2 py-1 rounded w-24">lg:</code>
                  <span className="text-muted-foreground">1024px e acima</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="bg-muted px-2 py-1 rounded w-24">xl:</code>
                  <span className="text-muted-foreground">1280px e acima</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="bg-muted px-2 py-1 rounded w-24">2xl:</code>
                  <span className="text-muted-foreground">1536px e acima</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Melhores Práticas</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4 py-2">
                <p className="font-medium">Consistência</p>
                <p className="text-sm text-muted-foreground">
                  Use os mesmos padrões em toda a aplicação para manter consistência
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4 py-2">
                <p className="font-medium">Acessibilidade</p>
                <p className="text-sm text-muted-foreground">
                  Sempre considere contraste de cores e navegação por teclado
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4 py-2">
                <p className="font-medium">Performance</p>
                <p className="text-sm text-muted-foreground">
                  Otimize imagens e minimize re-renders desnecessários
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4 py-2">
                <p className="font-medium">Responsividade</p>
                <p className="text-sm text-muted-foreground">
                  Teste em múltiplos dispositivos e tamanhos de tela
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
