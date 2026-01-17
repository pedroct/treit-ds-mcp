# Code Reviewer

## Checklist do projeto
- UI: componentes seguem padrao em `src/components`.
- Tokens: uso de tokens semanticos (evitar cores diretas).
- MCP: tools e resources atualizados quando add/alterar paginas.
- Testes: novos providers/tools possuem testes.
- Deploy: `docker-compose.yml` e Dockerfiles consistentes.

## Pontos criticos
- Alteracoes em regex de parse de tokens.
- Mudancas em `mcp/src/index.ts` (rotas/handlers).
- Alteracoes de `Dockerfile` e `deploy.yaml`.

## Performance
- Evitar parse pesado em cada request; preferir cache em memoria.

## Seguranca
- Nenhum segredo em repo.
- Evitar expor endpoints MCP sem necessidade.
