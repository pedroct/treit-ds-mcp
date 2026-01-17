# Configuração Final de Deployment - Design System

## Arquitetura

### Projetos e Redes

Temos 2 projetos Docker Compose rodando no VPS:

1. **api-aponta-vps** (`/opt/api-aponta-vps`)
   - Serviços: nginx-aponta, api-aponta, postgres-aponta
   - Rede: `api-aponta-vps_aponta-network`

2. **treit-design-system** (`/opt/treit-design-system`)
   - Serviços: ds-site, mcp
   - Redes: `treit-network` (interna) + `api-aponta-vps_aponta-network` (compartilhada)

### Comunicação entre Projetos

Todos os containers estão na mesma rede `api-aponta-vps_aponta-network`:
- ✅ nginx-aponta (proxy reverso)
- ✅ api-aponta (API FastAPI)
- ✅ postgres-aponta (banco de dados)
- ✅ treit-design-system-ds-site-1 (Next.js)
- ✅ treit-design-system-mcp-1 (MCP Server)

## Configuração do Nginx

### Domínios Configurados

O nginx-aponta gerencia 3 domínios:

1. **api-aponta.pedroct.com.br** → api-aponta:8000
2. **ds.treit.com.br** → treit-design-system-ds-site-1:3000
3. **mcp.treit.com.br** → treit-design-system-mcp-1:8787

### Certificados SSL

Localizados em `/opt/api-aponta-vps/nginx/ssl/`:
- `fullchain-api-aponta.pem` / `privkey-api-aponta.pem`
- `fullchain-ds.pem` / `privkey-ds.pem`
- `fullchain-mcp.pem` / `privkey-mcp.pem`

## Deployment Automático

### GitHub Actions Workflow

O workflow em `.github/workflows/deploy.yaml` faz:

1. ✅ Valida secrets de deployment
2. ✅ Sincroniza arquivos via rsync
3. ✅ Verifica se rede `api-aponta-vps_aponta-network` existe
4. ✅ Reconstrói containers do design system
5. ✅ Aguarda containers ficarem healthy
6. ✅ Testa health checks internos
7. ✅ **Recarrega nginx** para reconhecer novos containers
8. ✅ Verifica acesso público via HTTPS

### Comando Crítico

Após deployment do design system, o workflow executa:
```bash
docker exec nginx-aponta nginx -s reload
```

Isso força o nginx a:
- Atualizar cache DNS dos containers
- Reconhecer os novos IPs dos containers recriados
- Manter conexões existentes ativas (graceful reload)

## Docker Compose - api-aponta-vps

```yaml
networks:
  aponta-network:
    name: api-aponta-vps_aponta-network
    driver: bridge
```

**Importante:** O nome da rede `aponta-network` é mapeado para `api-aponta-vps_aponta-network` para que todos os projetos usem a mesma rede física.

## Docker Compose - treit-design-system

```yaml
networks:
  treit-network:
    driver: bridge
  api-aponta-network:
    name: api-aponta-vps_aponta-network
    external: true
```

**Importante:** A rede externa `api-aponta-network` mapeia para `api-aponta-vps_aponta-network`, permitindo comunicação com nginx-aponta.

## Troubleshooting

### Containers não se comunicam

```bash
# Verificar se todos estão na mesma rede
docker network inspect api-aponta-vps_aponta-network

# Deve listar: nginx-aponta, api-aponta, postgres-aponta,
#              treit-design-system-ds-site-1, treit-design-system-mcp-1
```

### Nginx não resolve hostnames

```bash
# Recarregar nginx após mudanças nos containers
docker exec nginx-aponta nginx -s reload

# Ou reiniciar completamente
docker restart nginx-aponta
```

### Erro 526 (Invalid SSL)

Verifique se os certificados SSL existem e estão corretos:
```bash
docker exec nginx-aponta ls -la /etc/nginx/ssl/
```

### Testar health dos serviços

```bash
# Design System
curl -f https://ds.treit.com.br/

# MCP
curl -f https://mcp.treit.com.br/health

# API
curl -f https://api-aponta.pedroct.com.br/health
```

## Endpoints Públicos

- 🌐 **Design System**: https://ds.treit.com.br/
- 🔧 **MCP Server**: https://mcp.treit.com.br/health
- 📡 **API Aponta**: https://api-aponta.pedroct.com.br/

## Notas Importantes

1. **Ordem de inicialização**: O projeto `api-aponta-vps` deve estar rodando ANTES do `treit-design-system`, pois cria a rede compartilhada.

2. **Deployment do api-aponta**: Quando o api-aponta faz deploy e recria o nginx, os containers do design system perdem comunicação temporariamente. Solução: executar `docker exec nginx-aponta nginx -s reload` após o deploy do api-aponta.

3. **Certificados SSL**: Devem ser renovados periodicamente (depende se são CloudFlare Origin ou Let's Encrypt).

4. **Rede persistente**: A rede `api-aponta-vps_aponta-network` persiste mesmo quando os containers são removidos, mantendo a configuração de rede consistente.
