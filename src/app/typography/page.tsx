import { PageHeader } from "@/components/layout/page-header";

export default function TypographyPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Tipografia"
        description="Hierarquia tipográfica, tamanhos e estilos de texto"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Headings</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h1 className="text-4xl font-bold mb-2">Heading 1</h1>
                <code className="text-xs text-muted-foreground">text-4xl font-bold</code>
              </div>
              <div className="border-b pb-4">
                <h2 className="text-3xl font-semibold mb-2">Heading 2</h2>
                <code className="text-xs text-muted-foreground">text-3xl font-semibold</code>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-2xl font-semibold mb-2">Heading 3</h3>
                <code className="text-xs text-muted-foreground">text-2xl font-semibold</code>
              </div>
              <div className="border-b pb-4">
                <h4 className="text-xl font-semibold mb-2">Heading 4</h4>
                <code className="text-xs text-muted-foreground">text-xl font-semibold</code>
              </div>
              <div className="border-b pb-4">
                <h5 className="text-lg font-semibold mb-2">Heading 5</h5>
                <code className="text-xs text-muted-foreground">text-lg font-semibold</code>
              </div>
              <div className="pb-4">
                <h6 className="text-base font-semibold mb-2">Heading 6</h6>
                <code className="text-xs text-muted-foreground">text-base font-semibold</code>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Body Text</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-lg mb-2">
                  Body Large - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <code className="text-xs text-muted-foreground">text-lg</code>
              </div>
              <div className="border-b pb-4">
                <p className="text-base mb-2">
                  Body Medium - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <code className="text-xs text-muted-foreground">text-base</code>
              </div>
              <div className="pb-4">
                <p className="text-sm mb-2">
                  Body Small - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <code className="text-xs text-muted-foreground">text-sm</code>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Utility Text</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-xs uppercase tracking-wider mb-2">
                  Overline Text - CATEGORY LABEL
                </p>
                <code className="text-xs text-muted-foreground">
                  text-xs uppercase tracking-wider
                </code>
              </div>
              <div className="border-b pb-4">
                <p className="text-xs mb-2">
                  Caption - Pequeno texto descritivo ou legendas
                </p>
                <code className="text-xs text-muted-foreground">text-xs</code>
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium mb-2">
                  Label - Label de formulário
                </p>
                <code className="text-xs text-muted-foreground">text-sm font-medium</code>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Font Weights</h2>
            <div className="space-y-2">
              <p className="font-normal">Normal (400) - Texto padrão</p>
              <p className="font-medium">Medium (500) - Ênfase leve</p>
              <p className="font-semibold">Semibold (600) - Ênfase média</p>
              <p className="font-bold">Bold (700) - Ênfase forte</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Text Colors</h2>
            <div className="space-y-2">
              <p className="text-foreground">Foreground - Texto principal</p>
              <p className="text-muted-foreground">Muted Foreground - Texto secundário</p>
              <p className="text-primary">Primary - Texto destaque</p>
              <p className="text-destructive">Destructive - Texto de erro</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
