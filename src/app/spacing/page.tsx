import { PageHeader } from "@/components/layout/page-header";

export default function SpacingPage() {
  const spacingScale = [
    { name: "0", value: "0px", tailwind: "0" },
    { name: "0.5", value: "2px", tailwind: "0.5" },
    { name: "1", value: "4px", tailwind: "1" },
    { name: "2", value: "8px", tailwind: "2" },
    { name: "3", value: "12px", tailwind: "3" },
    { name: "4", value: "16px", tailwind: "4" },
    { name: "5", value: "20px", tailwind: "5" },
    { name: "6", value: "24px", tailwind: "6" },
    { name: "8", value: "32px", tailwind: "8" },
    { name: "10", value: "40px", tailwind: "10" },
    { name: "12", value: "48px", tailwind: "12" },
    { name: "16", value: "64px", tailwind: "16" },
    { name: "20", value: "80px", tailwind: "20" },
    { name: "24", value: "96px", tailwind: "24" },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Espaçamento"
        description="Sistema de espaçamento baseado em múltiplos de 4px"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Escala de Espaçamento</h2>
            <div className="space-y-4">
              {spacingScale.map((space) => (
                <div
                  key={space.name}
                  className="flex items-center gap-4 border rounded-lg p-4"
                >
                  <div className="w-32 font-mono text-sm">
                    <div className="font-semibold">{space.tailwind}</div>
                    <div className="text-muted-foreground">{space.value}</div>
                  </div>
                  <div className="flex-1">
                    <div
                      className="bg-primary"
                      style={{ height: "24px", width: space.value }}
                    />
                  </div>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    p-{space.tailwind}
                  </code>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Exemplos de Uso</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Padding</h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4">
                    <div className="bg-background p-4 rounded border">
                      Padding 4 (16px)
                    </div>
                  </div>
                </div>
                <code className="text-xs text-muted-foreground mt-2 block">
                  className="p-4"
                </code>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Margin</h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4">
                    <div className="bg-background p-2 rounded border mb-4">
                      Elemento 1
                    </div>
                    <div className="bg-background p-2 rounded border">
                      Elemento 2
                    </div>
                  </div>
                </div>
                <code className="text-xs text-muted-foreground mt-2 block">
                  className="mb-4"
                </code>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Gap (Flexbox/Grid)</h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4">
                    <div className="flex gap-4">
                      <div className="bg-background p-4 rounded border flex-1">
                        Item 1
                      </div>
                      <div className="bg-background p-4 rounded border flex-1">
                        Item 2
                      </div>
                      <div className="bg-background p-4 rounded border flex-1">
                        Item 3
                      </div>
                    </div>
                  </div>
                </div>
                <code className="text-xs text-muted-foreground mt-2 block">
                  className="flex gap-4"
                </code>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Border Radius</h2>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="bg-muted h-24 rounded-none mb-2" />
                <p className="text-sm font-mono">rounded-none</p>
                <p className="text-xs text-muted-foreground">0px</p>
              </div>
              <div className="text-center">
                <div className="bg-muted h-24 rounded-sm mb-2" />
                <p className="text-sm font-mono">rounded-sm</p>
                <p className="text-xs text-muted-foreground">2px</p>
              </div>
              <div className="text-center">
                <div className="bg-muted h-24 rounded mb-2" />
                <p className="text-sm font-mono">rounded</p>
                <p className="text-xs text-muted-foreground">4px</p>
              </div>
              <div className="text-center">
                <div className="bg-muted h-24 rounded-md mb-2" />
                <p className="text-sm font-mono">rounded-md</p>
                <p className="text-xs text-muted-foreground">6px</p>
              </div>
              <div className="text-center">
                <div className="bg-muted h-24 rounded-lg mb-2" />
                <p className="text-sm font-mono">rounded-lg</p>
                <p className="text-xs text-muted-foreground">8px</p>
              </div>
              <div className="text-center">
                <div className="bg-muted h-24 rounded-xl mb-2" />
                <p className="text-sm font-mono">rounded-xl</p>
                <p className="text-xs text-muted-foreground">12px</p>
              </div>
              <div className="text-center">
                <div className="bg-muted h-24 rounded-2xl mb-2" />
                <p className="text-sm font-mono">rounded-2xl</p>
                <p className="text-xs text-muted-foreground">16px</p>
              </div>
              <div className="text-center">
                <div className="bg-muted h-24 rounded-full mb-2" />
                <p className="text-sm font-mono">rounded-full</p>
                <p className="text-xs text-muted-foreground">9999px</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
