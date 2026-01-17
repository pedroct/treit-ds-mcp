# Indice de Documentacao

Bem-vindo ao contexto do projeto. Comece pelo overview e depois siga para arquitetura, fluxo de dados e workflow.

## Guias principais
- [Visao geral do projeto](./project-overview.md)
- [Arquitetura](./architecture.md)
- [Fluxo de dados e integracoes](./data-flow.md)
- [Workflow de desenvolvimento](./development-workflow.md)
- [Estrategia de testes](./testing-strategy.md)
- [Seguranca](./security.md)
- [Tooling e produtividade](./tooling.md)
- [Glossario](./glossary.md)

## Pastas mais importantes
- `src/` - Site do Design System (Next.js App Router)
- `src/components/` - Componentes UI e layout do DS
- `mcp/` - Servidor MCP, providers e ferramentas
- `nginx/` - Artefatos de proxy/reverse proxy
- `Dockerfile.ds-site` e `Dockerfile.mcp` - Imagens de deploy
- `docker-compose.yml` - Orquestracao local/VPS
- `DEPLOYMENT_GITHUB_ACTIONS.md` - Guia de deploy via GitHub Actions

## Como usar este contexto
- Use `project-overview.md` para onboarding rapido.
- Use `architecture.md` para entender responsabilidades e limites.
- Use `data-flow.md` para saber de onde vem cada dado e como e transformado.
- Use `development-workflow.md` antes de abrir PRs.
