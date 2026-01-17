# Tooling

## Node/NPM
- `npm install` para dependencias.
- `npm run dev` para desenvolvimento local do DS.
- `npm run build` para gerar build do Next.js e bundles.
- `npm run test` para testes (Vitest).

## Docker
- `Dockerfile.ds-site` e `Dockerfile.mcp`.
- `docker-compose.yml` para subir DS + MCP.

## MCP
- Servidor MCP em `mcp/src/index.ts`.
- HTTP opcional controlado por `MCP_HTTP_PORT`.

## Nginx / Deploy
- Reverse proxy em container.
- Certificados TLS por host.
- Deploy automatizado por GitHub Actions.

## IDE/Contexto
- `.context/` guarda documentacao e playbooks.
- Use `MCP_IDE_SETUP.md` para setup do MCP no editor.
