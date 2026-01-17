# Fluxo de dados e integracoes

## Fontes de dados internas
- `tailwind.config.ts` e `src/app/globals.css` -> tokens de cores e variaveis CSS.
- `TYPOGRAPHY_UPDATE.md` e `DESIGN_SYSTEM_SETUP.md` -> tipografia (familia e escala).
- `README.md` e `DESIGN_CONTEXT.md` -> espacamento e guidelines.
- `src/app/icons/page.tsx` -> lista de icones exibidos.
- `src/components/ui` e `src/components/layout` -> indice de componentes e metadados.
- `src/app/home/page.tsx` e `src/app/styleguide/page.tsx` -> exemplos de padroes.

## MCP: pipeline de dados
1. `findRepoRoot()` determina a raiz do repositorio.
2. `buildComponentsIndex()` varre `src/components` e cria um catalogo.
3. Providers leem arquivos e extraem tokens/padroes.
4. MCP expõe recursos via:
   - `resource://tokens/*`
   - `resource://semantic-colors`
   - `resource://icons`
   - `resource://components`
   - `resource://patterns/*`

## Endpoints HTTP do MCP (quando `MCP_HTTP_PORT` estiver setado)
- `GET /health` -> status simples.
- `GET /resources` -> lista de recursos MCP.
- `GET /resource?uri=...` -> payload de um recurso.
- `POST /tool` -> executa tool (`tool.searchComponents`, `tool.scaffoldComponent`, `tool.validateUsage`).
- `GET /events` -> SSE para keepalive/telemetria leve.

## Transformacoes relevantes
- Parsing de tokens de cores: regex no `tailwind.config.ts` + CSS vars de `globals.css`.
- Tipografia: extraida de docs (tabela e exemplos) e normalizada em JSON.
- Componentes: parse de imports/exports/props para gerar metadados.
- Validacao: regras simples para spacing, cores nao tokenizadas e uso de componentes.

## Integracoes externas
- **Nenhuma API externa critica** no runtime do DS.
- **Deploy/CI** usa GitHub Actions e Docker (documentado em `DEPLOYMENT_GITHUB_ACTIONS.md`).
- **Proxy/SSL** via Nginx/Cloudflare (documentos em `DEPLOY_SSL_*.md`).

## Observabilidade e falhas
- MCP retorna erros JSON com status 4xx em payload invalido.
- `/health` responde 200 para checks basicos.
- Falhas comuns: falta de arquivos fonte (tokens/docs) ou parse incompleto de regex.

## Estado e persistencia
- O DS e estatico (Next.js build) e nao depende de banco.
- O MCP e stateless e deriva dados do filesystem.
