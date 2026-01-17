# Security Auditor

## Foco no projeto
- Exposicao de endpoints MCP e uso de segredos.
- Configuracao de TLS no Nginx.

## Verificacoes
- Nenhum segredo em repo.
- Certificados fora do repo e com permissao correta.
- Cloudflare em Full (strict) quando houver Origin Cert.

## Pontos sensiveis
- `MCP_HTTP_PORT` expõe HTTP sem auth.
- Endpoints `/tool` aceitam payload arbitrario.

## Recomendacoes
- Considerar firewall ou proxy com allowlist.
- Logar apenas o necessario (sem dados sensiveis).
