# Seguranca

## Superficie de exposicao
- Site DS e estatico (Next.js build), sem autenticação.
- MCP expõe endpoints HTTP somente quando `MCP_HTTP_PORT` esta definido.

## Segredos e configuracao
- Nao versionar chaves em arquivos de config (ex.: `.cursor/mcp.json`).
- Use Secrets do GitHub Actions para deploy.
- Certificados TLS devem ficar fora do repo e sob permissao restrita na VPS.

## Recomendacoes
- Ativar HTTPS com certificados dedicados por host no Nginx.
- Manter Cloudflare em modo **Full (strict)** quando usar Origin Cert.
- Restringir portas expostas no host a somente o necessario (80/443).

## Riscos conhecidos
- MCP depende de leitura do filesystem; paths invalidos ou arquivos ausentes reduzem cobertura dos recursos.
- Endpoints do MCP nao tem autenticacao; use proxy se precisar restringir.

## Boas praticas
- Validar configuracoes com `nginx -t` antes de reload.
- Revisar `docker-compose.yml` ao expor novas portas.
