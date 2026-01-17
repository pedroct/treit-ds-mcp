# Workflow de desenvolvimento

## Branching
- `develop` para trabalho continuo e PRs.
- `main` apenas com merges aprovados para deploy de producao.

## Fluxo recomendado
1. Crie branch a partir de `develop`.
2. Rode `npm install`.
3. Use `npm run dev` para iteracao local.
4. Adicione/atualize testes quando alterar ferramentas/geradores do MCP.
5. Rode `npm run test` antes do PR.
6. Atualize o bundle com `npm run build` quando for preparar entrega.
7. Abra PR para `develop`, revise, e depois promova para `main`.

## CI/CD
- GitHub Actions faz build e deploy na VPS.
- O deploy so roda para `main`.
- Nao comite segredos em arquivos de configuracao.

## Docker/Compose
- `Dockerfile.ds-site` e `Dockerfile.mcp` constroem as imagens.
- `docker-compose.yml` orquestra DS + MCP.
- Health checks usam `/health`.

## Documentacao
- Atualize `DEPLOYMENT_GITHUB_ACTIONS.md` se mudar pipeline.
- Registre mudancas relevantes em `README.md`.

## Boas praticas
- Prefira componentes em `src/components`.
- Evite tokens nao semanticamente definidos.
- Mantenha a consistencia de nomes e a exportacao dos componentes.
