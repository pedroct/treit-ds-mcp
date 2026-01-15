# Configuração de Deployment - GitHub Actions

Este documento explica como configurar os **GitHub Secrets** necessários para a pipeline de deploy do **DS Site + MCP**.

## 📋 Secrets Necessários

A pipeline requer 4 secrets configurados no repositório:

| Secret | Descrição | Exemplo |
|--------|-----------|---------|
| `VPS_HOST` | IP ou hostname do servidor VPS | `31.97.16.12` |
| `VPS_USER` | Usuário SSH do servidor | `root` |
| `VPS_PATH` | Caminho do projeto no servidor | `/opt/treit-design-system` |
| `VPS_SSH_PRIVATE_KEY` | Chave privada SSH completa | Conteúdo do arquivo `~/.ssh/id_rsa` |

---

## 🔧 Como Configurar os Secrets

### Opção 1: Interface Web do GitHub

1. Acesse o repositório: https://github.com/pedroct/treit-ds-mcp
2. Vá para **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Adicione cada secret:

#### VPS_HOST
- **Name**: `VPS_HOST`
- **Value**: `31.97.16.12`

#### VPS_USER
- **Name**: `VPS_USER`
- **Value**: `root`

#### VPS_PATH
- **Name**: `VPS_PATH`
- **Value**: `/opt/treit-design-system`

#### VPS_SSH_PRIVATE_KEY
- **Name**: `VPS_SSH_PRIVATE_KEY`
- **Value**: Cole o conteúdo completo da sua chave privada SSH

**Como obter a chave privada SSH:**

```bash
# No seu computador local, exiba a chave privada:
cat ~/.ssh/id_rsa

# Ou, se estiver usando uma chave específica:
cat ~/.ssh/id_ed25519
```

⚠️ **IMPORTANTE**: A chave privada deve:
- Incluir as linhas BEGIN e END
- Não ter senha/passphrase (ou você precisará configurar ssh-agent com passphrase)
- Ter permissão de acesso ao servidor VPS

---

### Opção 2: GitHub CLI (gh)

Se você tem o GitHub CLI instalado:

```bash
gh secret set VPS_HOST --body "31.97.16.12" -R pedroct/treit-ds-mcp
gh secret set VPS_USER --body "root" -R pedroct/treit-ds-mcp
gh secret set VPS_PATH --body "/opt/treit-design-system" -R pedroct/treit-ds-mcp
gh secret set VPS_SSH_PRIVATE_KEY --body "$(cat ~/.ssh/id_rsa)" -R pedroct/treit-ds-mcp
```

---

## ✅ Verificação

Após configurar os secrets:

1. Acesse: https://github.com/pedroct/treit-ds-mcp/actions
2. Clique em **Actions** → **Deploy to VPS**
3. Clique em **Run workflow** → **Run workflow** (ou faça um push para `main`/`develop`)
4. Acompanhe a execução

A pipeline deve:
- ✅ Validar secrets obrigatórios
- ✅ Fazer deploy no VPS via `docker compose`
- ✅ Verificar health checks internos
- ✅ Verificar endpoints públicos

---

## 🌐 Endpoints Públicos

- DS Site: `https://ds.treit.com.br`
- MCP Server: `https://mcp.treit.com.br/health`

---

## 🔐 Segurança da Chave SSH

### Gerar uma nova chave SSH (se necessário)

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy -N ""
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub root@31.97.16.12
ssh -i ~/.ssh/github_actions_deploy root@31.97.16.12 "echo 'Conexão OK'"
cat ~/.ssh/github_actions_deploy
```

### Verificar acesso SSH no servidor

```bash
cat /root/.ssh/authorized_keys
```

---

## 🐛 Troubleshooting

### Erro: "VPS_HOST secret is not set"
- Verifique se o secret foi criado com o nome exato: `VPS_HOST` (case-sensitive)
- Verifique se está no nível de repositório, não de ambiente

### Erro: "Permission denied (publickey)"
- A chave privada configurada não corresponde a nenhuma chave autorizada no servidor
- Execute `ssh-copy-id` para adicionar a chave pública ao servidor
- Verifique `/root/.ssh/authorized_keys` no servidor

### Pipeline falha no health check
- Verifique os logs: `docker compose logs -f ds-site` e `docker compose logs -f mcp`
- Verifique se `docker compose ps` mostra containers healthy

---

## 📚 Referências

- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [SSH Key Authentication](https://www.ssh.com/academy/ssh/key)
- [Workflow Deploy](.github/workflows/deploy.yaml)
