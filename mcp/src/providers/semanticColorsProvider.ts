import { ColorsResource } from "./colorsProvider.js";

export interface SemanticColorsResource {
  tokens: Array<{
    name: string;
    token: string;
    description: string;
  }>;
  missing: string[];
}

const DEFAULT_SEMANTIC_TOKENS = [
  { name: "background", token: "--background", description: "Base background color." },
  { name: "foreground", token: "--foreground", description: "Primary text color." },
  { name: "primary", token: "--primary", description: "Primary brand color." },
  { name: "primary-foreground", token: "--primary-foreground", description: "Text on primary." },
  { name: "secondary", token: "--secondary", description: "Secondary brand color." },
  { name: "accent", token: "--accent", description: "Accent color for highlights." },
  { name: "muted", token: "--muted", description: "Muted surfaces." },
  { name: "destructive", token: "--destructive", description: "Error/destructive actions." },
  { name: "border", token: "--border", description: "Borders and dividers." },
  { name: "input", token: "--input", description: "Form input background." },
  { name: "ring", token: "--ring", description: "Focus ring color." },
  { name: "success", token: "--success", description: "Success state." },
  { name: "warning", token: "--warning", description: "Warning state." },
  { name: "info", token: "--info", description: "Informational state." },
];

export function getSemanticColorsResource(colors: ColorsResource): SemanticColorsResource {
  const available = new Set(colors.tokens.cssVariables);
  const tokens = DEFAULT_SEMANTIC_TOKENS.filter((token) => available.has(token.token));
  const missing = DEFAULT_SEMANTIC_TOKENS.filter((token) => !available.has(token.token)).map(
    (token) => token.token
  );

  return {
    tokens,
    missing,
  };
}
