---
status: filled
generated: 2026-01-16
agents:
  - type: "code-reviewer"
    role: "Review code changes for quality, style, and best practices"
  - type: "bug-fixer"
    role: "Analyze bug reports and error messages"
  - type: "feature-developer"
    role: "Implement new features according to specifications"
  - type: "refactoring-specialist"
    role: "Identify code smells and improvement opportunities"
  - type: "test-writer"
    role: "Write comprehensive unit and integration tests"
  - type: "documentation-writer"
    role: "Create clear, comprehensive documentation"
  - type: "performance-optimizer"
    role: "Identify performance bottlenecks"
  - type: "security-auditor"
    role: "Identify security vulnerabilities"
  - type: "backend-specialist"
    role: "Design and implement server-side architecture"
  - type: "frontend-specialist"
    role: "Design and implement user interfaces"
  - type: "architect-specialist"
    role: "Design overall system architecture and patterns"
  - type: "devops-specialist"
    role: "Design and maintain CI/CD pipelines"
  - type: "database-specialist"
    role: "Design and optimize database schemas"
  - type: "mobile-specialist"
    role: "Develop native and cross-platform mobile applications"
docs:
  - "project-overview.md"
  - "architecture.md"
  - "development-workflow.md"
  - "testing-strategy.md"
  - "glossary.md"
  - "data-flow.md"
  - "security.md"
  - "tooling.md"
phases:
  - id: "phase-1"
    name: "Discovery & Alignment"
    prevc: "P"
  - id: "phase-2"
    name: "Implementation & Iteration"
    prevc: "E"
  - id: "phase-3"
    name: "Validation & Handoff"
    prevc: "V"
---

# MCP Plan

## Objetivo
Manter o servidor MCP alinhado ao Design System, garantindo recursos consistentes, ferramentas confiaveis e deploy estavel.

## Sinal de sucesso
- `/health` e `/resources` respondendo 200.
- Tools retornam payloads validos.
- Deploy em `main` concluido sem regressao.

## Contexto tecnico
- MCP em `mcp/src/index.ts`.
- Providers leem arquivos do DS e retornam JSON.
- Tools fazem busca, scaffold e validacao.

## Agentes e foco
| Agente | Por que participa | Foco inicial |
| --- | --- | --- |
| Code Reviewer | Evitar regressao e padroes quebrados | Validar contratos MCP e UI | 
| Bug Fixer | Corrigir falhas em parse e endpoints | Debug de providers e tools |
| Feature Developer | Evoluir recursos MCP | Novos recursos/padroes |
| Test Writer | Garantir cobertura | Tests para providers/tools |
| Devops Specialist | Deploy estavel | Workflow e Docker | 

## Riscos
- Parse fragil de tokens (regex) ao alterar `tailwind.config.ts`.
- Erros de tipagem no build do MCP.
- Certificados TLS errados no proxy.

## Dependencias
- Docs de tokens (`DESIGN_CONTEXT.md`, `TYPOGRAPHY_UPDATE.md`).
- `docker-compose.yml` e `deploy.yaml`.

## Fases

### Fase 1 - Discovery & Alignment
1. Revisar providers e fontes de dados.
2. Conferir endpoints MCP expostos.
3. Validar docs de tokens e padroes.

### Fase 2 - Implementation & Iteration
1. Ajustar providers e tools.
2. Adicionar/atualizar testes.
3. Atualizar docs de contexto.

### Fase 3 - Validation & Handoff
1. `npm run build && npm run test`.
2. Verificar `/health` interno e publico.
3. Confirmar deploy em `main`.

## Rollback
- Reverter commit anterior do MCP.
- Restaurar imagem docker anterior na VPS.
