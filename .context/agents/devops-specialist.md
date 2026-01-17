# DevOps Specialist

## Foco no projeto
- GitHub Actions para deploy de DS + MCP.
- Docker Compose na VPS.
- Nginx como reverse proxy com TLS por host.

## Arquivos-chave
- `.github/workflows/deploy.yaml`
- `docker-compose.yml`
- `Dockerfile.ds-site`, `Dockerfile.mcp`
- `DEPLOYMENT_GITHUB_ACTIONS.md`

## Workflow recomendado
1. Validar secrets do GitHub.
2. Rodar build/test em CI.
3. Fazer `docker compose up -d` na VPS.
4. Verificar `/health` publico e interno.

## Armadilhas
- Certificado TLS errado por host (SNI).
- Cloudflare em modo errado (deve ser Full strict).
- Health checks apontando para endpoints inexistentes.
