import { PageHeader } from "@/components/layout/page-header";

export default function ColorsPage() {
  const colorGroups = [
    {
      name: "Primary",
      colors: [
        { name: "primary", var: "--primary", description: "Cor principal da marca" },
        { name: "primary-foreground", var: "--primary-foreground", description: "Texto sobre primary" },
      ],
    },
    {
      name: "Secondary",
      colors: [
        { name: "secondary", var: "--secondary", description: "Cor secundária" },
        { name: "secondary-foreground", var: "--secondary-foreground", description: "Texto sobre secondary" },
      ],
    },
    {
      name: "Muted",
      colors: [
        { name: "muted", var: "--muted", description: "Cor suavizada" },
        { name: "muted-foreground", var: "--muted-foreground", description: "Texto sobre muted" },
      ],
    },
    {
      name: "Accent",
      colors: [
        { name: "accent", var: "--accent", description: "Cor de destaque" },
        { name: "accent-foreground", var: "--accent-foreground", description: "Texto sobre accent" },
      ],
    },
    {
      name: "Destructive",
      colors: [
        { name: "destructive", var: "--destructive", description: "Cor de ações destrutivas" },
        { name: "destructive-foreground", var: "--destructive-foreground", description: "Texto sobre destructive" },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Cores"
        description="Paleta de cores do design system com tokens CSS e variações"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {colorGroups.map((group) => (
            <div key={group.name}>
              <h2 className="text-2xl font-semibold mb-6">{group.name}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {group.colors.map((color) => (
                  <div
                    key={color.name}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div
                      className={`h-32 bg-${color.name}`}
                      style={{ backgroundColor: `hsl(var(${color.var}))` }}
                    />
                    <div className="p-4">
                      <h3 className="font-mono text-sm font-semibold mb-1">
                        {color.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {color.description}
                      </p>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {color.var}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h2 className="text-2xl font-semibold mb-6">Background & Borders</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg overflow-hidden">
                <div className="h-32 bg-background border-4 border-border" />
                <div className="p-4">
                  <h3 className="font-mono text-sm font-semibold">background</h3>
                  <code className="text-xs bg-muted px-2 py-1 rounded">--background</code>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <div className="h-32 bg-card" />
                <div className="p-4">
                  <h3 className="font-mono text-sm font-semibold">card</h3>
                  <code className="text-xs bg-muted px-2 py-1 rounded">--card</code>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <div className="h-32 bg-popover" />
                <div className="p-4">
                  <h3 className="font-mono text-sm font-semibold">popover</h3>
                  <code className="text-xs bg-muted px-2 py-1 rounded">--popover</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
