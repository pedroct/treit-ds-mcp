# Visao geral do projeto

## Objetivo
Disponibilizar um Design System completo (site Next.js) e um servidor MCP que expõe recursos e ferramentas baseadas no proprio repositorio.

## Principais capacidades
- Documentacao visual do DS (cores, tipografia, espacamento, componentes, padroes).
- Biblioteca de componentes em `src/components`.
- MCP com recursos e ferramentas para consumo por agentes e automacoes.
- Deploy dockerizado via GitHub Actions.

## Publico alvo
- Times de frontend/UI que consomem o DS.
- Times de produto/design que validam padroes.
- Times de devops que fazem deploy do DS/MCP.
- Agentes/automacoes que usam MCP para contexto.

## Dependencias chave
- Next.js + Tailwind + TypeScript.
- MCP SDK (@modelcontextprotocol/sdk).
- Docker + Docker Compose.

## Como iniciar
1. `npm install`
2. `npm run dev` (site DS)
3. `npm run test` (testes)
4. `npm run build` (bundle e build)

## Entrypoints importantes
- `src/app/page.tsx` (home do DS)
- `src/app/styleguide/layout.tsx` (layout do styleguide)
- `mcp/src/index.ts` (servidor MCP)

## Deploy
- Ver `DEPLOYMENT_GITHUB_ACTIONS.md`.
- Imagens docker em `Dockerfile.ds-site` e `Dockerfile.mcp`.
