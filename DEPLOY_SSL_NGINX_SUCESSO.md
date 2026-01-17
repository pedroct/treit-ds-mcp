# Deploy SSL/TLS com Nginx - Documentação Final

## Status: ✅ IMPLEMENTADO COM SUCESSO

Data: 16 de Janeiro de 2026

## Resumo

Configuração bem-sucedida de certificados SSL/TLS do Cloudflare para três domínios através de um único container nginx como reverse proxy na VPS.

## Domínios Configurados

| Domínio | Status | Certificado | Backend |
|---------|--------|-------------|---------|
| `ds.treit.com.br` | ✅ HTTP 200 | `fullchain-ds.pem` | `treit-design-system-ds-site-1:3000` |
| `mcp.treit.com.br` | ✅ HTTP 404* | `fullchain-mcp.pem` | `treit-design-system-mcp-1:8787` |
| `api-aponta.pedroct.com.br` | ✅ HTTP 405** | `fullchain-api-aponta.pem` | `api-aponta:8000` |

*404 é esperado - endpoint `/health` não existe neste serviço
**405 é esperado - HEAD não permitido, mas GET funciona

## Arquitetura Implementada

```
Internet (Cloudflare)
        ↓
VPS (31.97.16.12:443)
        ↓
nginx-aponta (container)
    ├── ds.treit.com.br → treit-design-system-ds-site-1:3000
    ├── mcp.treit.com.br → treit-design-system-mcp-1:8787
    └── api-aponta.pedroct.com.br → api-aponta:8000
```

## Problema Inicial

Três domínios apresentavam erro **526 (Invalid SSL certificate)** do Cloudflare:
- Os containers backend estavam rodando sem proxy SSL
- Certificados SSL não estavam configurados corretamente
- Nginx estava servindo certificados genéricos para todos os domínios

## Solução Implementada

### 1. Estrutura de Certificados

Localização: `/opt/api-aponta-vps/nginx/ssl/`

```
fullchain-ds.pem           # Certificado para ds.treit.com.br
privkey-ds.pem             # Chave privada para ds.treit.com.br
fullchain-mcp.pem          # Certificado para mcp.treit.com.br
privkey-mcp.pem            # Chave privada para mcp.treit.com.br
fullchain-api-aponta.pem   # Certificado para api-aponta.pedroct.com.br
privkey-api-aponta.pem     # Chave privada para api-aponta.pedroct.com.br
```

### 2. Configuração do Nginx

Localização: `/opt/api-aponta-vps/nginx/nginx.conf`

**Características:**
- 3 blocos `server` para HTTP (porta 80) - redirecionamento 301 para HTTPS
- 3 blocos `server` para HTTPS (porta 443) - com certificados específicos
- SNI (Server Name Indication) ativado
- CloudFlare Real IP headers configurados
- Rate limiting na API
- HTTP/2 habilitado

**Upstreams configurados:**
```nginx
upstream api_backend {
    server api-aponta:8000;
}

upstream ds_site_backend {
    server treit-design-system-ds-site-1:3000;
}

upstream mcp_backend {
    server treit-design-system-mcp-1:8787;
}
```

### 3. Redes Docker

O nginx-aponta está conectado a duas redes:
- `api-aponta-vps_aponta-network` (para alcançar api-aponta)
- `treit-design-system_default` (para alcançar ds-site e mcp)

### 4. Processo de Implementação

1. **Backup da configuração existente**
   ```bash
   cp /opt/api-aponta-vps/nginx/nginx.conf /opt/api-aponta-vps/nginx/nginx.conf.backup-YYYYMMDD-HHMMSS
   ```

2. **Criação dos certificados SSL**
   - Extraídos do arquivo `certificados_cloudflare.txt`
   - Criados em `/opt/api-aponta-vps/nginx/ssl/`
   - Certificados do Cloudflare Origin CA (válidos até 2041)

3. **Atualização do nginx.conf**
   - Configuração completa reescrita do zero
   - Certificados específicos por domínio
   - CloudFlare Real IP headers
   - Rate limiting e segurança

4. **Validação e reload**
   ```bash
   docker exec nginx-aponta nginx -t
   docker restart nginx-aponta
   ```

## Comandos de Verificação

### Testar certificados via SNI
```bash
# ds.treit.com.br
openssl s_client -connect 31.97.16.12:443 -servername ds.treit.com.br </dev/null 2>/dev/null | openssl x509 -noout -text | grep -A1 "Subject Alternative Name"

# mcp.treit.com.br
openssl s_client -connect 31.97.16.12:443 -servername mcp.treit.com.br </dev/null 2>/dev/null | openssl x509 -noout -text | grep -A1 "Subject Alternative Name"

# api-aponta.pedroct.com.br
openssl s_client -connect 31.97.16.12:443 -servername api-aponta.pedroct.com.br </dev/null 2>/dev/null | openssl x509 -noout -text | grep -A1 "Subject Alternative Name"
```

### Testar endpoints
```bash
curl -I https://ds.treit.com.br/
curl -I https://mcp.treit.com.br/health
curl -I https://api-aponta.pedroct.com.br/health
```

### Verificar logs do nginx
```bash
docker logs --tail 50 nginx-aponta
```

### Verificar configuração do nginx
```bash
docker exec nginx-aponta nginx -t
docker exec nginx-aponta nginx -T  # Mostra configuração completa
```

## Troubleshooting Realizado

### Problema: Certificados errados sendo servidos

**Sintoma:** Todos os domínios servindo o mesmo certificado

**Causa:** O nginx.conf estava usando `fullchain.pem` e `privkey.pem` genéricos ao invés de certificados específicos por domínio

**Solução:**
1. Atualizar nginx.conf com certificados específicos
2. Reiniciar o container (não apenas reload)

### Problema: Certificados vazios no container

**Sintoma:** Certificados corretos no host, mas vazios no container

**Causa:** Volume montado com cache de arquivos antigos

**Solução:** Reiniciar o container para remontar os volumes

```bash
docker restart nginx-aponta
```

## Configuração do Cloudflare

### SSL/TLS Settings
- **Encryption mode:** Full (strict)
- **TLS Version:** TLS 1.2 e 1.3
- **Automatic HTTPS Rewrites:** Enabled
- **Always Use HTTPS:** Enabled

### DNS Records
Todos os domínios devem ter:
- Proxy status: Proxied (laranja)
- Type: A ou CNAME
- Apontando para o IP da VPS: 31.97.16.12

## Manutenção

### Renovação de Certificados

Os certificados do Cloudflare Origin CA são válidos até 2041. Quando necessário renovar:

1. Gerar novos certificados no Cloudflare Dashboard
2. Atualizar os arquivos em `/opt/api-aponta-vps/nginx/ssl/`
3. Reiniciar o nginx:
   ```bash
   docker restart nginx-aponta
   ```

### Adicionar Novo Domínio

1. Gerar certificado no Cloudflare para o novo domínio
2. Criar arquivos `fullchain-[nome].pem` e `privkey-[nome].pem`
3. Adicionar upstream no nginx.conf
4. Adicionar blocos server HTTP e HTTPS
5. Testar e reiniciar:
   ```bash
   docker exec nginx-aponta nginx -t
   docker restart nginx-aponta
   ```

### Backup Regular

```bash
# Backup dos certificados
tar -czf nginx-ssl-backup-$(date +%Y%m%d).tar.gz /opt/api-aponta-vps/nginx/ssl/

# Backup da configuração
cp /opt/api-aponta-vps/nginx/nginx.conf /opt/api-aponta-vps/nginx/nginx.conf.backup-$(date +%Y%m%d)
```

## Monitoramento

### Health Checks

- **nginx:** `https://api-aponta.pedroct.com.br/nginx-health`
- **ds-site:** Verificar resposta em `https://ds.treit.com.br/`
- **mcp:** Verificar resposta em `https://mcp.treit.com.br/`
- **api-aponta:** Verificar resposta em `https://api-aponta.pedroct.com.br/health`

### Métricas

```bash
# Ver conexões ativas
docker exec nginx-aponta cat /var/log/nginx/access.log | tail -100

# Ver erros
docker exec nginx-aponta cat /var/log/nginx/error.log | tail -50

# Status do container
docker stats nginx-aponta
```

## Notas Técnicas

### Avisos do Nginx (Não Críticos)

```
nginx: [warn] the "listen ... http2" directive is deprecated, use the "http2" directive instead
```

Este aviso indica que a sintaxe `listen 443 ssl http2` está deprecada. A sintaxe nova é:
```nginx
listen 443 ssl;
http2 on;
```

**Impacto:** Apenas um aviso, não afeta funcionalidade. Pode ser atualizado em manutenção futura.

### CloudFlare Real IP

A configuração inclui todos os ranges de IP do Cloudflare para correta identificação do IP real dos visitantes através do header `CF-Connecting-IP`.

### Rate Limiting

Configurado rate limiting de 100 requisições/segundo com burst de 20 para a API:
```nginx
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=100r/s;
limit_req zone=api_limit burst=20 nodelay;
```

## Referências

- [Cloudflare SSL Documentation](https://developers.cloudflare.com/ssl/)
- [Nginx SNI Documentation](http://nginx.org/en/docs/http/configuring_https_servers.html)
- [Cloudflare IP Ranges](https://www.cloudflare.com/ips/)

## Conclusão

A implementação foi concluída com sucesso. Todos os três domínios agora respondem corretamente com HTTPS válido, usando certificados SSL específicos do Cloudflare Origin CA, sem erro 526. O nginx funciona como reverse proxy único para todos os serviços, com configuração centralizada e fácil manutenção.

---

**Última atualização:** 16 de Janeiro de 2026
**Responsável:** Claude (via SSH na VPS srv1264175.hstgr.cloud)
**Status:** Produção - Funcionando
