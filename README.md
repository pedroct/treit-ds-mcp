# Design System

Um sistema de design completo construído com Next.js 15, Tailwind CSS e Shadcn UI.

## 🚀 Tecnologias

- **Next.js 15.5.9** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **Shadcn UI** - Componentes reutilizáveis
- **Lucide React** - Biblioteca de ícones

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🎨 Estrutura do Projeto

```
design_system/
├── src/
│   ├── app/
│   │   ├── colors/          # Página de cores
│   │   ├── typography/      # Página de tipografia
│   │   ├── components/      # Página de componentes
│   │   ├── spacing/         # Página de espaçamento
│   │   ├── icons/           # Página de ícones
│   │   ├── patterns/        # Página de padrões
│   │   ├── layout.tsx       # Layout principal
│   │   ├── page.tsx         # Página inicial
│   │   └── globals.css      # Estilos globais
│   ├── components/
│   │   ├── layout/          # Componentes de layout
│   │   └── ui/              # Componentes UI (Shadcn)
│   └── lib/
│       └── utils.ts         # Utilitários
├── components.json          # Configuração Shadcn UI
├── tailwind.config.ts       # Configuração Tailwind
├── tsconfig.json            # Configuração TypeScript
└── package.json
```

## 🎯 Páginas Disponíveis

- **Home** (`/`) - Página inicial com navegação
- **Cores** (`/colors`) - Paleta de cores e tokens CSS
- **Tipografia** (`/typography`) - Hierarquia e estilos de texto
- **Componentes** (`/components`) - Biblioteca de componentes UI
- **Espaçamento** (`/spacing`) - Sistema de espaçamento e grid
- **Ícones** (`/icons`) - Biblioteca de ícones Lucide
- **Padrões** (`/patterns`) - Padrões de UI e melhores práticas

## 🧩 Adicionando Componentes Shadcn

Para adicionar componentes do Shadcn UI:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# etc...
```

## 🎨 Sistema de Design

### Cores

O design system usa variáveis CSS (HSL) para cores, permitindo fácil customização:

- Primary, Secondary, Muted, Accent
- Destructive (para ações de erro/exclusão)
- Background, Card, Popover
- Border, Input, Ring

### Tipografia

Hierarquia completa com:
- Headings (H1-H6)
- Body text (Large, Medium, Small)
- Utility text (Caption, Label, Overline)

### Espaçamento

Sistema baseado em múltiplos de 4px:
- 0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24

## 🔧 Configuração MCP

O projeto inclui integração com:
- **Shadcn MCP** - Para gerenciamento de componentes
- **Figma MCP** - Para integração com design no Figma

Configuração em `.mcp.json`

Guia de configuração do MCP na IDE: `MCP_IDE_SETUP.md`
Guia de configuração do deployment (GitHub Actions): `DEPLOYMENT_GITHUB_ACTIONS.md`

## 🚀 Deploy & Domínios

- **DS Site (Next.js)**: `https://ds.treit.com.br`
- **MCP Server**: `https://mcp.treit.com.br`

No Docker, o `ds-site` expõe `3000` e o `mcp` expõe `8787`. O Cloudflare aponta os domínios para esses serviços. O `docker-compose.yml` inclui `healthcheck` e labels para facilitar o deploy/monitoramento.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter ESLint

## 🌐 Acesso

Após executar `npm run dev`, acesse:

- Local: http://localhost:3000
- Network: http://192.168.1.5:3000

## 📚 Documentação

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

## 🤝 Contribuindo

Este é um projeto de design system em desenvolvimento. Sinta-se livre para adicionar novos componentes e padrões.

## 📄 Licença

MIT

---

**Última atualização:** Janeiro 2026
