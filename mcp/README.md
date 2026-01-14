# Treit Design System MCP Server

MCP server for the Treit Design System. It exposes tokens, components, and design patterns from this repository via **STDIO** and provides tools to search, validate, and scaffold components.

## ✅ Requirements

- Node.js 18+
- npm

## 🚀 Local Usage (STDIO)

Build:

```bash
npm --prefix ./mcp install
npm --prefix ./mcp run build
```

Run (stdio):

```bash
npm run mcp:dev
```

> The server reads the repo directly (components, tokens, guidelines). It does **not** depend on Next.js runtime.

## HTTP/SSE (Experimental)

Enable the optional HTTP server:

```bash
MCP_HTTP_PORT=8787 npm run mcp:dev
```

Endpoints:

- `GET /health`
- `GET /resources`
- `GET /resource?uri=resource://components`
- `POST /tool` with `{ "name": "...", "arguments": { ... } }`
- `GET /events` (SSE keep-alive stream)

> TODO: Upgrade to official MCP HTTP/SSE transport for full protocol compatibility.

Production endpoint:

- `https://mcp.treit.com.br`

## VS Code (Claude Code) Config

Example `mcp.json` entry:

```json
{
  "servers": {
    "treit-design-system": {
      "command": "npm",
      "args": ["run", "mcp:dev"],
      "cwd": "."
    }
  }
}
```

## Resources

```
resource://tokens/colors
resource://tokens/typography
resource://tokens/spacing
resource://semantic-colors
resource://icons
resource://components
resource://components/<name>
resource://patterns/layout
resource://patterns/cards
```

## Tools

### tool.searchComponents
Input:
```json
{ "query": "button", "category": "ui", "tags": ["action"] }
```

### tool.scaffoldComponent
Input:
```json
{ "name": "PrimaryBadge", "category": "ui", "base": "Primitive" }
```

### tool.validateUsage
Input:
```json
{ "code": "<button className=\\"p-3 text-red-500\\">Click</button>" }
```

## Notes / TODO

- Replace experimental HTTP endpoints with official MCP HTTP/SSE transport at `mcp.treit.com.br`.
- Expand patterns beyond layout/cards with real-world examples.
