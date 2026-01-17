# Arquitetura

## Visao geral
O repositorio tem dois blocos principais:
- **Site do Design System (Next.js)** em `src/`, com paginas de tokens, componentes e padroes.
- **Servidor MCP** em `mcp/`, que expõe recursos e ferramentas lendo o proprio repo.

Esses dois blocos se complementam: o MCP extrai dados e exemplos do DS (tokens, componentes, paginas) para entregar contexto consumivel por ferramentas.

## Componentes principais e responsabilidades
- `src/app/` (Next.js App Router)
  - Paginas de conteudo: `/colors`, `/typography`, `/spacing`, `/components`, `/icons`, `/patterns`, `/styleguide`.
  - `layout.tsx` define metadados e estilos globais.
- `src/components/ui` e `src/components/layout`
  - Biblioteca de UI reutilizavel; base para uso no DS e consumo externo.
- `mcp/src/index.ts`
  - Entrypoint do servidor MCP (stdio) e HTTP opcional para `/health`/`/resources`/`/resource`/`/tool`.
- `mcp/src/providers/*`
  - Providers que leem arquivos do repo para montar recursos (cores, tipografia, espacamento, icones, padroes).
- `mcp/src/tools/*`
  - Ferramentas para buscar componentes, gerar scaffolds e validar uso do DS.

## Fluxo alto nivel
1. O MCP localiza a raiz do repo.
2. Indexa componentes em `src/components`.
3. Exponde recursos (tokens, icones, padroes) lendo arquivos do DS.
4. Ferramentas usam o indice e regras do DS para responder consultas.

## Padroes e convencoes
- **Next.js App Router** para paginação e layout.
- **Separacao por dominios**: `components`, `app`, `lib`, `hooks`.
- **Providers MCP** encapsulam parse de arquivos e retornam JSON tipado.
- **Ferramentas MCP** sao puras (nao escrevem arquivos); retornam payloads com propostas.

## Decisoes de stack
- **TypeScript** para tipagem e consistencia entre DS e MCP.
- **Next.js + Tailwind** para UI rapida e iteravel.
- **MCP SDK** para expor recursos e ferramentas ao ecossistema MCP.
- **Docker Compose** para deploy de DS + MCP na VPS.

## Pontos de extensao
- Novos tokens: ajustar `tailwind.config.ts` e `src/app/globals.css`.
- Novos recursos MCP: criar provider em `mcp/src/providers` e registrar em `mcp/src/index.ts`.
- Novos componentes: adicionar em `src/components/ui` ou `src/components/layout` (o MCP indexa automaticamente).
