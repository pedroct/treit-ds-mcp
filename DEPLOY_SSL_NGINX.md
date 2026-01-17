# Deploy Nginx com SSL na VPS

Este documento contém as instruções para configurar o Nginx como proxy reverso para os três domínios com certificados SSL do Cloudflare.

## Domínios a serem configurados

1. `api-aponta.pedroct.com.br` → Container `api-aponta` (porta 8000)
2. `ds.treit.com.br` → Container `treit-design-system-ds-site-1` (porta 3000)
3. `mcp.treit.com.br` → Container `treit-design-system-mcp-1` (porta 8787)

## Pré-requisitos

- Acesso SSH à VPS
- Containers Docker já rodando
- Certificados SSL do Cloudflare (já disponíveis)

## Passo 1: Criar estrutura de diretórios na VPS

```bash
# Conectar na VPS via SSH
ssh root@srv1264175.hstgr.cloud

# Criar estrutura de diretórios
mkdir -p /opt/nginx-proxy/ssl
mkdir -p /opt/nginx-proxy/conf
```

## Passo 2: Criar certificados SSL

### 2.1 Certificado para ds.treit.com.br

```bash
cat > /opt/nginx-proxy/ssl/fullchain-ds.pem <<'EOF'
-----BEGIN CERTIFICATE-----
MIIElzCCA3+gAwIBAgIUSL/FYF3x+dlU3KY0PZgjJxlPuPwwDQYJKoZIhvcNAQEL
BQAwgYsxCzAJBgNVBAYTAlVTMRkwFwYDVQQKExBDbG91ZEZsYXJlLCBJbmMuMTQw
MgYDVQQLEytDbG91ZEZsYXJlIE9yaWdpbiBTU0wgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMRMwEQYDVQQIEwpDYWxpZm9ybmlh
MB4XDTI2MDExNjA3MzEwMFoXDTQxMDExMjA3MzEwMFowYjEZMBcGA1UEChMQQ2xv
dWRGbGFyZSwgSW5jLjEdMBsGA1UECxMUQ2xvdWRGbGFyZSBPcmlnaW4gQ0ExJjAk
BgNVBAMTHUNsb3VkRmxhcmUgT3JpZ2luIENlcnRpZmljYXRlMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu+NrpeET4fQN5dwUjy3giox+eO8pm5v8FknO
oldz27rpUTh01mQFCyKGDkJg2jBcM/1oaXvDYIjLk+A5WnMGDhagJ6Ye7DFpYvnb
FeECqdpMf+r6QddMWF39DoOY3kp4e2hJWReQPY06l4paMxq2Lvv55wHKiDt7hheK
prhEbAru5Bm/geS4xXWCtH4+nXgf7BTKLThd7Aj/glRgX5T7Bw4Se/P40531mFIZ
kyYVFgx98M/Kb/5ZFO/itcEx+87BexvmwU13gTBrQBngdy94U4YiiIit4mfdArWb
k2SkgfJS0gDQMexapnreKsxYHyyB26+bFX4SikT2cBeA9cDIwQIDAQABo4IBGTCC
ARUwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcD
ATAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBRZUJ+wlcsCOuhsi2zJ4wXFgrnhCTAf
BgNVHSMEGDAWgBQk6FNXXXw0QIep65TbuuEWePwppDBABggrBgEFBQcBAQQ0MDIw
MAYIKwYBBQUHMAGGJGh0dHA6Ly9vY3NwLmNsb3VkZmxhcmUuY29tL29yaWdpbl9j
YTAaBgNVHREEEzARgg9kcy50cmVpdC5jb20uYnIwOAYDVR0fBDEwLzAtoCugKYYn
aHR0cDovL2NybC5jbG91ZGZsYXJlLmNvbS9vcmlnaW5fY2EuY3JsMA0GCSqGSIb3
DQEBCwUAA4IBAQAHD5S9aRlFqf8Yu3FQPqqH3ZMeud5YBpgmojdQnYFO0v7Rfzid
r3+JZqQfIpleZU8d7yRVeAQZAB1zje5MN9emTaRLERwGzaJpnwM+xbuIvHvuPW57
8r40FnnUCquDtjVBPWgpwr+ok8P3G/0sBaGeQ8qGfRpBdbvfGOkoYuFmVBCA4ZSt
+ekRvqQS0C0f6Y95JUCdovchxg6Cc4xAXX9DKltulNh9qEGKm9ynKu1Puad6F8B0
C/+r/Uau7T8sqZ3+jyGsHU76x3CdDHdg8MBOocFs91f2WyQ8cHfd/rBktVDC73c9
E1pPCOwl3SehjMThJzsWBJHx4ek4voN6tOUG
-----END CERTIFICATE-----
EOF

cat > /opt/nginx-proxy/ssl/privkey-ds.pem <<'EOF'
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC742ul4RPh9A3l
3BSPLeCKjH547ymbm/wWSc6iV3PbuulROHTWZAULIoYOQmDaMFwz/Whpe8NgiMuT
4DlacwYOFqAnph7sMWli+dsV4QKp2kx/6vpB10xYXf0Og5jeSnh7aElZF5A9jTqX
ilozGrYu+/nnAcqIO3uGF4qmuERsCu7kGb+B5LjFdYK0fj6deB/sFMotOF3sCP+C
VGBflPsHDhJ78/jTnfWYUhmTJhUWDH3wz8pv/lkU7+K1wTH7zsF7G+bBTXeBMGtA
GeB3L3hThiKIiK3iZ90CtZuTZKSB8lLSANAx7Fqmet4qzFgfLIHbr5sVfhKKRPZw
F4D1wMjBAgMBAAECggEAF1BkU4pi7VUbct/s2KnmjIabrG2v1ehkfs8EghI0NQoj
yLFm1RIG6q9rX0JXEofw7v4VKk6iSxyaV0R51WqDsDSYRac4O9JzS2XpzLSVoCYv
eyl5CXm51la+T4Jekgm/Wr/RZynUewDG6hYvtFrui5S2eRbYrvAjlxtdd+vSSK4Z
nIjAktJ+0jc7zpfs0aswdHXYnL4X39XJ312udX8tHtbW5U2fwXvgtJTnwWx5m1Vy
jUnLRk1+lLPWKLwh4aF92KsGccE2E4lu5GMYun7hrIslBJBI8XvgVFtIhBlah3Lj
Hjt13d7EelCDkUB9epGlrgZmHR5eJCnS2C37X4KOuQKBgQDn4eUMoks2yvK6UCTb
2NOEjZ1UVW/9oexCjh9R+tp4ecYtfbgRE5T7rmAFCx4k1FvApwPE+HsG/N6uflDw
bgqVsRM7ZUks0quiUzxVNbHzSIkC+/ZcvjWjxnb8uZ9Vu3G3Kt8TsArfKT88Oj/8
7b3AvoNNZs0eYegsETlEyVnlmQKBgQDPbiO+SVvXcr5Pl7SfLe2J13l4BSWczuvu
+ZCmLEvWiUzEOsoNP1UX0jrR78s+coWsn7sLMnX3CRziLV0SuwzrFrIjjav0v77x
T97h1cAMKmpge2bEmhU+gT3RXjw0N2N/psh0qc8eWEuVu5TKIIcdtQvX1gy+1FTX
b0lYKdalaQKBgQCZ8ImTHZs5QPprXhFaMlQZx7oO5rl2dCzY8mkwj4zCNnWudavh
ClL50wXD02GrqZ9QApCqDxv9w5pB1XH+a89zGR9faxptO17eYMvI9eCxVhI/fO5N
G6mYlIUhuklhLRONOlTmSRSumj90yGb6jwpODyw0Em9SIEV2G+kdFV8s4QKBgA8V
tWe7MgCjCZAEOlBxKJsjnmPKDAgxTBse7xQGmKVLatfCZrs75dZLpZdq1t79uRbq
rtGLo+SJNx6DqgcYr0HRbrcDMIQmBZ7K7iyCPOslkoLdtoWJpw3anEJDliE9/fBk
kqNZTgSo6yZCc/mXD/xrFCdoG5ktG9Zm83CD6mYxAoGAKqCRk35O1UMN/sbyuD90
sM48/5GzzxHlV2DPd/xyU5snxjDX+eRgvYBwC0O0Hy3Aj0giQZ5DKP/KwwaiaVtk
6oPzITljyJyi9zUtPOGJxgRAA9bR902tMwoYsYInSVwt1JE0CVB4Y3KcgVyJZc0M
T9NdqR5sQPVA4l7VzUW8HdM=
-----END PRIVATE KEY-----
EOF
```

### 2.2 Certificado para mcp.treit.com.br

```bash
cat > /opt/nginx-proxy/ssl/fullchain-mcp.pem <<'EOF'
-----BEGIN CERTIFICATE-----
MIIEmDCCA4CgAwIBAgIUMRnAqlC+4xiBafZTyMNv0YscheEwDQYJKoZIhvcNAQEL
BQAwgYsxCzAJBgNVBAYTAlVTMRkwFwYDVQQKExBDbG91ZEZsYXJlLCBJbmMuMTQw
MgYDVQQLEytDbG91ZEZsYXJlIE9yaWdpbiBTU0wgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMRMwEQYDVQQIEwpDYWxpZm9ybmlh
MB4XDTI2MDExNjA3MzIwMFoXDTQxMDExMjA3MzIwMFowYjEZMBcGA1UEChMQQ2xv
dWRGbGFyZSwgSW5jLjEdMBsGA1UECxMUQ2xvdWRGbGFyZSBPcmlnaW4gQ0ExJjAk
BgNVBAMTHUNsb3VkRmxhcmUgT3JpZ2luIENlcnRpZmljYXRlMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEArnrovA/th3cC2O1I+Qx4OaaAIKRWZciw1DJB
Bc/HEpxlW+fRK5l5SgNPyG5cl1B8qaWpTE7sXbqTO7cOLy9Lvh9xSH/miNnnNqgf
X9DRWHb/JFBmgXd7G5udzUJBOh4UE00apUvegyjkXL1+sVjUj6oQWofsxRieOECG
3f6KnplgM+UsK+AS2bg2FSRFWKLd1/2n2InAFPnGmMxDXeXNcISvLsB8HVXUWklp
PTFot/YXWh/nRZ+koQg5jczvLjVGSZ2oHccajVYWOA7weo/VOpohihCCQ5TIIJko
LA41SA7eWqZ8ZspHn0zVkyR5e2t/J+nyaDx16Vrr9QejVljBBQIDAQABo4IBGjCC
ARYwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcD
ATAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBSvPrUqwTEgpeDjtZxd7AjHb4WB4TAf
BgNVHSMEGDAWgBQk6FNXXXw0QIep65TbuuEWePwppDBABggrBgEFBQcBAQQ0MDIw
MAYIKwYBBQUHMAGGJGh0dHA6Ly9vY3NwLmNsb3VkZmxhcmUuY29tL29yaWdpbl9j
YTAbBgNVHREEFDASghBtY3AudHJlaXQuY29tLmJyMDgGA1UdHwQxMC8wLaAroCmG
J2h0dHA6Ly9jcmwuY2xvdWRmbGFyZS5jb20vb3JpZ2luX2NhLmNybDANBgkqhkiG
9w0BAQsFAAOCAQEAb0LpFqcypNS3a6V8oCIQmECYgHD9EkUYkj4mj63qn0et4hwr
0KjNv/7q+Pa+sG/dpdCxLbAvP3dZ6qUhQhb0aOgq6cKremIz5CsdPROW3yEHhcm+
mEMaWWSTFC/jKZjgBqYVNsGAjbMnfqg3Qj39z8Gurpjs+Mt8iHon+duHkYC81rUA
JgnAY7v0cV7PlFaJlyAkwrKxzrjokDeX71tC35VTqNCsVb2ra6XYTevl6kncBuwi
GiTdpWCJR23F76Iv7WXGSDCnIFEUDfVbJ9nhuMA2vaM6VF7qXifLFfAr8+xtMk+n
+WEmQiTSTudOH4JXuKUbRJeEvgJ2q111nOFltQ==
-----END CERTIFICATE-----
EOF

cat > /opt/nginx-proxy/ssl/privkey-mcp.pem <<'EOF'
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCueui8D+2HdwLY
7Uj5DHg5poAgpFZlyLDUMkEFz8cSnGVb59ErmXlKA0/IblyXUHyppalMTuxdupM7
tw4vL0u+H3FIf+aI2ec2qB9f0NFYdv8kUGaBd3sbm53NQkE6HhQTTRqlS96DKORc
vX6xWNSPqhBah+zFGJ44QIbd/oqemWAz5Swr4BLZuDYVJEVYot3X/afYicAU+caY
zENd5c1whK8uwHwdVdRaSWk9MWi39hdaH+dFn6ShCDmNzO8uNUZJnagdxxqNVhY4
DvB6j9U6miGKEIJDlMggmSgsDjVIDt5apnxmykefTNWTJHl7a38n6fJoPHXpWuv1
B6NWWMEFAgMBAAECggEAAOy8viU6EOlJngad7lhjH70ZIAzDuqmsyqcfu80aEag7
pX6asXSdO7SKScMdLjeHPZ5XtOrH+Adn33czXEuPukJJtBGd3wfp0/SVDy//MaaW
m7KDl8T45YPQFL+STG5OrjtO1f7xsjf3UK8eOruzi4JiShryOPY0ZBLVeo8H9lpS
ZHzQrJ/Qime1W229u5tlumz8uLnHJVQ0077QNuoeNsAnOhRbpo0HuRlGjfVQKOM+
yWeSd+iG0H2SNuAJGk6tX/HUf+ClMJuxqr07GGODOeLeCkf5a0AGYTbaHmE9WAKZ
IRHr4quYHYtB8fpjoFt79RiKWb0Rb7Vn1Xm3OvVZaQKBgQDxoOEwFj7u4XckvlPs
zBb4QmaCjKDB45N6jhUpqplGOFy+06zIBm4IT3lhflu4x3IAJEGd8MdbArBC0ebf
HCwsbU/J3jPJ0dNww2YeZXD3t+DIhIaqqL/SzZQo4uXuvYNpu64+4G7l/VIEGtUU
fij6RwZ/UfPZHOMiKdZ7Ot7e/QKBgQC425rzw5vJRCqww3yv2Vt8eEhvZKyK2Jaj
7ctvPx9UIYRpymnM/moCQ8jOH43aPkRI2Rv1CDMbbqt2m5S2mlK9ysKBDEiR4amU
JfxC8OQKgYNEyrbpBGBEj4qXtmmq7AUkwK/4/TbyY9U9HuK4IF7YngsacLzbdiuM
22gPQJl8qQKBgQCGIhYAGMlU2MrIFfQG5wD1Tf8UB7cSCyCKjydGWxL9PTqXIHCx
FYitiljKe1e1itpJI9ddMxWn+yUX4uf0APKwsvnxCS3comNrHL2qsAt3KJdbGN6d
DFJ4VnEiBVs5HfE+l9ZRx0so12hZKQASgTqEPTtpIHhqlTOtemY7QGIKjQKBgQC2
wxetjWVGVYjHfl6WFRVoOBuVVjlohL5akE2jTQsSSJj7Zs23iIkSeCXd9EBw10L3
qv8DAPpWUtJez272IhlP31jx8U0GPc9E01FWdYdgA6/eoXS5aEQtRKVHXWeXPwXO
0lqoluBuQNmgNhr847QiAg8EMxXk/C4OcxWsjrexEQKBgC+qwpGuSd7xTX8rG26a
tWY1Nhrt9OhxvWZ7YdIH0Kh+NHyBqHsqGk3L5A2UqbZka6slUKkyIVjAo/7/3MI5
23MYLZLwPl2G/fXOM401YosAYzLr3Md/Rh2zUKDvzxjSsNX4D94fQSt6sYqvrRBl
ug6Hy0a3pzl/kG+IagETR+3B
-----END PRIVATE KEY-----
EOF
```

### 2.3 Gerar certificado para api-aponta.pedroct.com.br

**NOTA**: Você precisa gerar um novo certificado SSL Origin no Cloudflare para `api-aponta.pedroct.com.br`.

Passos:
1. Acesse o dashboard do Cloudflare
2. Selecione o domínio `pedroct.com.br`
3. Vá em SSL/TLS → Origin Server
4. Clique em "Create Certificate"
5. Adicione o hostname: `api-aponta.pedroct.com.br`
6. Copie o certificado e a chave privada
7. Execute na VPS:

```bash
cat > /opt/nginx-proxy/ssl/fullchain-api.pem <<'EOF'
[COLE AQUI O CERTIFICATE DO CLOUDFLARE]
EOF

cat > /opt/nginx-proxy/ssl/privkey-api.pem <<'EOF'
[COLE AQUI A PRIVATE KEY DO CLOUDFLARE]
EOF
```

## Passo 3: Criar configuração do Nginx

```bash
cat > /opt/nginx-proxy/conf/nginx.conf <<'EOF'
events {
    worker_connections 1024;
}

http {
    # Upstream para api-aponta (já existente)
    upstream api_backend {
        server api-aponta:8000;
    }

    # Upstream para ds.treit.com.br
    upstream ds_site_backend {
        server treit-design-system-ds-site-1:3000;
    }

    # Upstream para mcp.treit.com.br
    upstream mcp_backend {
        server treit-design-system-mcp-1:8787;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=100r/s;

    # Log format
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;

    # ========================================
    # api-aponta.pedroct.com.br
    # ========================================

    server {
        listen 80;
        server_name api-aponta.pedroct.com.br;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name api-aponta.pedroct.com.br;

        ssl_certificate /etc/nginx/ssl/fullchain-api.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey-api.pem;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers on;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;

        set_real_ip_from 173.245.48.0/20;
        set_real_ip_from 103.21.244.0/22;
        set_real_ip_from 103.22.200.0/22;
        set_real_ip_from 103.31.4.0/22;
        set_real_ip_from 141.101.64.0/18;
        set_real_ip_from 108.162.192.0/18;
        set_real_ip_from 190.93.240.0/20;
        set_real_ip_from 188.114.96.0/20;
        set_real_ip_from 197.234.240.0/22;
        set_real_ip_from 198.41.128.0/17;
        set_real_ip_from 162.158.0.0/15;
        set_real_ip_from 104.16.0.0/13;
        set_real_ip_from 104.24.0.0/14;
        set_real_ip_from 172.64.0.0/13;
        set_real_ip_from 131.0.72.0/22;
        real_ip_header CF-Connecting-IP;

        location / {
            limit_req zone=api_limit burst=20 nodelay;

            proxy_pass http://api_backend;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
            proxy_set_header Connection "";

            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;

            proxy_buffering on;
            proxy_buffer_size 4k;
            proxy_buffers 8 4k;
        }

        location /nginx-health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }

    # ========================================
    # ds.treit.com.br
    # ========================================

    server {
        listen 80;
        server_name ds.treit.com.br;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name ds.treit.com.br;

        ssl_certificate /etc/nginx/ssl/fullchain-ds.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey-ds.pem;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers on;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;

        set_real_ip_from 173.245.48.0/20;
        set_real_ip_from 103.21.244.0/22;
        set_real_ip_from 103.22.200.0/22;
        set_real_ip_from 103.31.4.0/22;
        set_real_ip_from 141.101.64.0/18;
        set_real_ip_from 108.162.192.0/18;
        set_real_ip_from 190.93.240.0/20;
        set_real_ip_from 188.114.96.0/20;
        set_real_ip_from 197.234.240.0/22;
        set_real_ip_from 198.41.128.0/17;
        set_real_ip_from 162.158.0.0/15;
        set_real_ip_from 104.16.0.0/13;
        set_real_ip_from 104.24.0.0/14;
        set_real_ip_from 172.64.0.0/13;
        set_real_ip_from 131.0.72.0/22;
        real_ip_header CF-Connecting-IP;

        location / {
            proxy_pass http://ds_site_backend;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
            proxy_set_header Connection "";
        }
    }

    # ========================================
    # mcp.treit.com.br
    # ========================================

    server {
        listen 80;
        server_name mcp.treit.com.br;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name mcp.treit.com.br;

        ssl_certificate /etc/nginx/ssl/fullchain-mcp.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey-mcp.pem;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers on;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;

        set_real_ip_from 173.245.48.0/20;
        set_real_ip_from 103.21.244.0/22;
        set_real_ip_from 103.22.200.0/22;
        set_real_ip_from 103.31.4.0/22;
        set_real_ip_from 141.101.64.0/18;
        set_real_ip_from 108.162.192.0/18;
        set_real_ip_from 190.93.240.0/20;
        set_real_ip_from 188.114.96.0/20;
        set_real_ip_from 197.234.240.0/22;
        set_real_ip_from 198.41.128.0/17;
        set_real_ip_from 162.158.0.0/15;
        set_real_ip_from 104.16.0.0/13;
        set_real_ip_from 104.24.0.0/14;
        set_real_ip_from 172.64.0.0/13;
        set_real_ip_from 131.0.72.0/22;
        real_ip_header CF-Connecting-IP;

        location / {
            proxy_pass http://mcp_backend;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
            proxy_set_header Connection "";
        }
    }
}
EOF
```

## Passo 4: Criar Dockerfile do Nginx

```bash
cat > /opt/nginx-proxy/Dockerfile <<'EOF'
FROM nginx:alpine

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY ssl/*.pem /etc/nginx/ssl/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
EOF
```

## Passo 5: Verificar redes Docker existentes

```bash
# Listar redes
docker network ls

# Se a rede api-aponta-network não existir, criar:
docker network create api-aponta-network

# Se a rede treit-design-system_default não existir, criar:
docker network create treit-design-system_default
```

## Passo 6: Parar containers que usam portas 80 e 443

```bash
# Verificar containers usando portas 80/443
docker ps | grep -E "80|443"

# Se houver algum container nginx antigo, parar
docker stop nginx-aponta 2>/dev/null || true
docker rm nginx-aponta 2>/dev/null || true
```

## Passo 7: Criar e iniciar o container Nginx

```bash
cd /opt/nginx-proxy

# Build da imagem
docker build -t nginx-proxy:latest .

# Executar o container conectado às redes necessárias
docker run -d \
  --name nginx-proxy \
  --restart unless-stopped \
  -p 80:80 \
  -p 443:443 \
  --network api-aponta-network \
  nginx-proxy:latest

# Conectar às outras redes
docker network connect treit-design-system_default nginx-proxy 2>/dev/null || \
  echo "Aviso: rede treit-design-system_default não encontrada"
```

## Passo 8: Verificar logs e status

```bash
# Ver logs do nginx
docker logs -f nginx-proxy

# Testar configuração do nginx dentro do container
docker exec nginx-proxy nginx -t

# Verificar status dos containers
docker ps -a | grep -E "nginx-proxy|api-aponta|treit"
```

## Passo 9: Testar endpoints

```bash
# Testar HTTP → HTTPS redirect
curl -I http://ds.treit.com.br

# Testar HTTPS
curl -I https://ds.treit.com.br
curl -I https://mcp.treit.com.br/health
curl -I https://api-aponta.pedroct.com.br/health
```

## Troubleshooting

### Erro: Containers não conseguem se comunicar

```bash
# Verificar se os containers estão na mesma rede
docker network inspect api-aponta-network
docker network inspect treit-design-system_default

# Verificar nome exato dos containers
docker ps --format "{{.Names}}"

# Se os nomes dos containers forem diferentes, ajustar no nginx.conf
```

### Erro: Certificado SSL inválido

```bash
# Verificar certificados dentro do container
docker exec nginx-proxy ls -lh /etc/nginx/ssl/
docker exec nginx-proxy openssl x509 -in /etc/nginx/ssl/fullchain-ds.pem -text -noout | grep -E "Subject:|Issuer:|Not After"
```

### Erro: Porta 80 ou 443 já em uso

```bash
# Verificar processo usando as portas
sudo netstat -tulpn | grep -E ":80|:443"
sudo lsof -i :80
sudo lsof -i :443

# Parar serviço conflitante
sudo systemctl stop apache2  # ou nginx, se instalado no host
```

### Recarregar configuração sem downtime

```bash
# Editar configuração
vim /opt/nginx-proxy/conf/nginx.conf

# Rebuild e recriar container
cd /opt/nginx-proxy
docker build -t nginx-proxy:latest .
docker stop nginx-proxy
docker rm nginx-proxy

# Recriar (usar mesmo comando do Passo 7)
```

## Configuração do Cloudflare

Para cada domínio no Cloudflare:

1. SSL/TLS mode: **Full (strict)**
2. Edge Certificates: Certificado gerenciado pelo Cloudflare
3. Origin Server: Certificados Origin criados (já configurados no nginx)
4. Registros DNS:
   - `ds.treit.com.br` → AAAA → `2a02:4780:14:c143::1` (Proxied ☁️)
   - `mcp.treit.com.br` → AAAA → `2a02:4780:14:c143::1` (Proxied ☁️)
   - `api-aponta.pedroct.com.br` → A → `31.97.16.12` (Proxied ☁️)

## Resumo dos comandos principais

```bash
# SSH para VPS
ssh root@srv1264175.hstgr.cloud

# Criar estrutura
mkdir -p /opt/nginx-proxy/{ssl,conf}

# Copiar certificados (seções 2.1, 2.2, 2.3)
# Criar nginx.conf (seção 3)
# Criar Dockerfile (seção 4)

# Verificar redes
docker network ls
docker network create api-aponta-network 2>/dev/null || true

# Parar containers antigos
docker stop nginx-aponta 2>/dev/null || true

# Build e deploy
cd /opt/nginx-proxy
docker build -t nginx-proxy:latest .
docker run -d --name nginx-proxy --restart unless-stopped -p 80:80 -p 443:443 --network api-aponta-network nginx-proxy:latest
docker network connect treit-design-system_default nginx-proxy 2>/dev/null || true

# Verificar
docker logs -f nginx-proxy
```

## Observações Importantes

1. **Nomes dos containers**: Verifique os nomes exatos com `docker ps` e ajuste no `nginx.conf` se necessário
2. **Redes Docker**: Os containers precisam estar nas mesmas redes para se comunicarem
3. **Certificado API**: Você precisa gerar um novo certificado Origin no Cloudflare para `api-aponta.pedroct.com.br`
4. **Portas**: Remova as portas expostas dos containers ds-site e mcp, pois o nginx será o único ponto de entrada
5. **Cloudflare Proxy**: Mantenha os registros DNS como "Proxied" (nuvem laranja) no Cloudflare
