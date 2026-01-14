import { PageHeader } from "@/components/layout/page-header";
import {
  Home,
  Search,
  Bell,
  User,
  Settings,
  Heart,
  Star,
  Send,
  Trash,
  Edit,
  Eye,
  Download,
  Upload,
  Check,
  X,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function IconsPage() {
  const icons = [
    { name: "Home", Icon: Home },
    { name: "Search", Icon: Search },
    { name: "Bell", Icon: Bell },
    { name: "User", Icon: User },
    { name: "Settings", Icon: Settings },
    { name: "Heart", Icon: Heart },
    { name: "Star", Icon: Star },
    { name: "Send", Icon: Send },
    { name: "Trash", Icon: Trash },
    { name: "Edit", Icon: Edit },
    { name: "Eye", Icon: Eye },
    { name: "Download", Icon: Download },
    { name: "Upload", Icon: Upload },
    { name: "Check", Icon: Check },
    { name: "X", Icon: X },
    { name: "Plus", Icon: Plus },
    { name: "Minus", Icon: Minus },
    { name: "ChevronRight", Icon: ChevronRight },
    { name: "ChevronLeft", Icon: ChevronLeft },
    { name: "ChevronUp", Icon: ChevronUp },
    { name: "ChevronDown", Icon: ChevronDown },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Ícones"
        description="Biblioteca de ícones usando Lucide React"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Biblioteca de Ícones</h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {icons.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-accent transition-colors"
                >
                  <Icon className="h-6 w-6 mb-2" />
                  <span className="text-xs text-center">{name}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Tamanhos</h2>
            <div className="flex items-center gap-8 p-6 border rounded-lg">
              <div className="text-center">
                <Home className="h-4 w-4 mb-2 mx-auto" />
                <p className="text-xs">Small (16px)</p>
                <code className="text-xs text-muted-foreground">h-4 w-4</code>
              </div>
              <div className="text-center">
                <Home className="h-5 w-5 mb-2 mx-auto" />
                <p className="text-xs">Default (20px)</p>
                <code className="text-xs text-muted-foreground">h-5 w-5</code>
              </div>
              <div className="text-center">
                <Home className="h-6 w-6 mb-2 mx-auto" />
                <p className="text-xs">Medium (24px)</p>
                <code className="text-xs text-muted-foreground">h-6 w-6</code>
              </div>
              <div className="text-center">
                <Home className="h-8 w-8 mb-2 mx-auto" />
                <p className="text-xs">Large (32px)</p>
                <code className="text-xs text-muted-foreground">h-8 w-8</code>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Cores</h2>
            <div className="flex items-center gap-8 p-6 border rounded-lg">
              <div className="text-center">
                <Heart className="h-6 w-6 mb-2 mx-auto text-foreground" />
                <p className="text-xs">Foreground</p>
              </div>
              <div className="text-center">
                <Heart className="h-6 w-6 mb-2 mx-auto text-muted-foreground" />
                <p className="text-xs">Muted</p>
              </div>
              <div className="text-center">
                <Heart className="h-6 w-6 mb-2 mx-auto text-primary" />
                <p className="text-xs">Primary</p>
              </div>
              <div className="text-center">
                <Heart className="h-6 w-6 mb-2 mx-auto text-destructive" />
                <p className="text-xs">Destructive</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Exemplo de Uso</h2>
            <div className="bg-muted rounded-lg p-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`import { Home } from "lucide-react";

export function MyComponent() {
  return (
    <div>
      <Home className="h-6 w-6 text-primary" />
    </div>
  );
}`}</code>
              </pre>
            </div>
          </section>

          <section>
            <div className="bg-muted/50 border rounded-lg p-6">
              <p className="text-sm text-muted-foreground">
                <strong>Documentação completa:</strong>{" "}
                <a
                  href="https://lucide.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://lucide.dev
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Mais de 1000 ícones disponíveis na biblioteca Lucide React
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
