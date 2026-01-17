# Fix: Deprecation Warning HTTP/2

## Problema

O nginx está mostrando warnings sobre sintaxe deprecada do HTTP/2:

```
nginx: [warn] the "listen ... http2" directive is deprecated, use the "http2" directive instead
```

## Solução

Atualizar a sintaxe de:
```nginx
listen 443 ssl http2;
```

Para:
```nginx
listen 443 ssl;
http2 on;
```

## Comandos para aplicar na VPS

Execute estes comandos na VPS para corrigir os warnings:

```bash
# 1. Fazer backup da configuração atual
cp /opt/api-aponta-vps/nginx/nginx.conf /opt/api-aponta-vps/nginx/nginx.conf.before-http2-fix

# 2. Aplicar a correção com sed
sed -i 's/listen 443 ssl http2;/listen 443 ssl;\n        http2 on;/g' /opt/api-aponta-vps/nginx/nginx.conf

# 3. Verificar a configuração
docker exec nginx-aponta nginx -t

# 4. Se o teste passar, recarregar o nginx
docker exec nginx-aponta nginx -s reload

# 5. Verificar que os warnings sumiram
docker logs --tail 20 nginx-aponta
```

## Alternativa: Editar manualmente

Se preferir editar manualmente, abra o arquivo:

```bash
nano /opt/api-aponta-vps/nginx/nginx.conf
```

E para cada bloco `server` HTTPS, substitua:

**Antes:**
```nginx
server {
    listen 443 ssl http2;
    server_name api-aponta.pedroct.com.br;
    ...
}
```

**Depois:**
```nginx
server {
    listen 443 ssl;
    http2 on;
    server_name api-aponta.pedroct.com.br;
    ...
}
```

Faça isso para os 3 blocos HTTPS:
- api-aponta.pedroct.com.br
- ds.treit.com.br
- mcp.treit.com.br

## Verificação

Após aplicar a correção, você não deve mais ver os warnings:

```bash
docker logs nginx-aponta | grep "deprecated"
```

Se não retornar nada, a correção foi bem-sucedida.

## Impacto

- **Funcionalidade:** Nenhum. O HTTP/2 continuará funcionando normalmente.
- **Performance:** Nenhuma diferença.
- **Compatibilidade:** A nova sintaxe é suportada desde nginx 1.25.1+

## Referências

- [Nginx HTTP/2 Module Documentation](http://nginx.org/en/docs/http/ngx_http_v2_module.html)
- [Nginx Changelog - http2 directive](http://nginx.org/en/CHANGES)
