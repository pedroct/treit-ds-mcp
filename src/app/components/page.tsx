import { PageHeader } from "@/components/layout/page-header";

export default function ComponentsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Componentes"
        description="Biblioteca completa de componentes UI com Shadcn"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-muted/50 border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Componentes em Desenvolvimento</h2>
            <p className="text-muted-foreground mb-6">
              Os componentes Shadcn UI serão adicionados conforme necessário.
            </p>
            <p className="text-sm text-muted-foreground">
              Execute <code className="bg-background px-2 py-1 rounded">npx shadcn@latest add [component]</code> para adicionar componentes
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Buttons</h3>
              <p className="text-sm text-muted-foreground">
                Botões em diferentes variantes e tamanhos
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Forms</h3>
              <p className="text-sm text-muted-foreground">
                Inputs, selects, checkboxes e radio buttons
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Cards</h3>
              <p className="text-sm text-muted-foreground">
                Containers para conteúdo
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Dialogs</h3>
              <p className="text-sm text-muted-foreground">
                Modais e overlays
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Navigation</h3>
              <p className="text-sm text-muted-foreground">
                Menus, tabs e breadcrumbs
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Feedback</h3>
              <p className="text-sm text-muted-foreground">
                Alerts, toasts e tooltips
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
