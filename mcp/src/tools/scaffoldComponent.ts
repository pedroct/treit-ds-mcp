import path from "node:path";
import { toKebabCase, toPascalCase } from "../utils/parse.js";

export interface ScaffoldComponentInput {
  name: string;
  category: "ui" | "layout";
  base?: "Card" | "Button" | "Layout" | "Primitive";
  withStory?: boolean;
}

export interface ScaffoldComponentOutput {
  files: Array<{ path: string; content: string }>;
}

function buildPrimitiveTemplate(componentName: string): string {
  return `import * as React from "react"

import { cn } from "@/lib/utils"

export interface ${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {}

const ${componentName} = React.forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props} />
    )
  }
)
${componentName}.displayName = "${componentName}"

export { ${componentName} }
`;
}

function buildButtonTemplate(componentName: string): string {
  return `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const ${componentName}Variants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ${componentName}Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ${componentName}Variants> {
  asChild?: boolean
}

const ${componentName} = React.forwardRef<HTMLButtonElement, ${componentName}Props>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(${componentName}Variants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
${componentName}.displayName = "${componentName}"

export { ${componentName}, ${componentName}Variants }
`;
}

function buildCardTemplate(componentName: string): string {
  return `import * as React from "react"

import { cn } from "@/lib/utils"

export interface ${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {}

export function ${componentName}({ className, ...props }: ${componentName}Props) {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
  )
}
`;
}

function buildLayoutTemplate(componentName: string): string {
  return `import * as React from "react"

import { cn } from "@/lib/utils"

export interface ${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {}

export function ${componentName}({ className, ...props }: ${componentName}Props) {
  return (
    <section className={cn("w-full", className)} {...props} />
  )
}
`;
}

export function scaffoldComponent(input: ScaffoldComponentInput): ScaffoldComponentOutput {
  const componentName = toPascalCase(input.name);
  const fileName = `${toKebabCase(input.name)}.tsx`;
  const base = input.base ?? "Primitive";

  let content = "";
  switch (base) {
    case "Button":
      content = buildButtonTemplate(componentName);
      break;
    case "Card":
      content = buildCardTemplate(componentName);
      break;
    case "Layout":
      content = buildLayoutTemplate(componentName);
      break;
    default:
      content = buildPrimitiveTemplate(componentName);
  }

  const folder = input.category === "ui" ? "src/components/ui" : "src/components/layout";
  const filePath = path.posix.join(folder, fileName);

  const files = [{ path: filePath, content }];

  if (input.withStory) {
    files.push({
      path: path.posix.join("stories", `${toKebabCase(input.name)}.mdx`),
      content: `# ${componentName}\n\nTODO: add component documentation.\n`,
    });
  }

  return { files };
}
