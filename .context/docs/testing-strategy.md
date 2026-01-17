# Estrategia de testes

## Framework
- Vitest (unitario e integracao leve).

## Onde ficam os testes
- `src/components/ui/*.test.tsx`
- `src/lib/*.test.ts`
- `mcp/src/**/*.test.ts`

## Quando adicionar testes
- Qualquer mudanca em ferramentas do MCP.
- Alteracoes em geracao de scaffolds.
- Mudancas em parse de tokens ou regras de validacao.

## Como executar
- `npm run test`
- `npm run test -- --watch` durante iteracao

## CI
- O fluxo de CI deve rodar testes antes do deploy.
- Execute `npm run build && npm run test` antes de abrir PR.

## Lacunas atuais
- Nao ha e2e automatizado do DS.
- Nao ha testes de performance do MCP.

## Boas praticas
- Prefira testes deterministas, sem dependencia de rede.
- Use fixtures simples para parse de tokens.
