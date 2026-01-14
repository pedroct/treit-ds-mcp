# Configuração do MCP na IDE

Este documento explica como configurar um servidor MCP na IDE (ex.: VS Code/Claude Code) para usar o Design System da Treit.

## 1) MCP remoto (produção)

Use o MCP já publicado:

- **Endpoint**: `https://mcp.treit.com.br`

Exemplo de configuração (`.mcp.json`):

```json
{
  "mcpServers": {
    "treit-design-system": {
      "type": "http",
      "url": "https://mcp.treit.com.br"
    }
  }
}
```

## 2) MCP local (desenvolvimento)

Para usar o MCP localmente via STDIO:

1. Instale dependências do MCP:
   ```bash
   npm --prefix ./mcp install
   ```
2. Configure o servidor local no `.mcp.json`:
   ```json
   {
     "mcpServers": {
       "treit-design-system-local": {
         "command": "npm",
         "args": ["run", "mcp:dev"],
         "cwd": "."
       }
     }
   }
   ```

> Observação: o comando `npm run mcp:dev` inicia o MCP em STDIO (ideal para IDEs).

## 3) MCP local via HTTP (opcional)

Se quiser testar via HTTP/SSE:

```bash
MCP_HTTP_PORT=8787 npm run mcp:dev
```

Endpoints úteis:

- `GET http://localhost:8787/health`
- `GET http://localhost:8787/resources`
- `GET http://localhost:8787/resource?uri=resource://components`

## 4) Dicas rápidas

- Se aparecer erro `tsx não é reconhecido`, instale as dependências do `/mcp`.
- Para usar o MCP em produção, prefira a URL pública `https://mcp.treit.com.br`.
- Para desenvolvimento, use o modo STDIO local.
