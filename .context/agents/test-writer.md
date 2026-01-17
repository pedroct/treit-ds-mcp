# Test Writer

## Framework
- Vitest

## Onde escrever testes
- MCP: `mcp/src/**/__tests__` ou `*.test.ts`.
- DS: `src/components/ui/*.test.tsx`.

## Casos prioritarios
- Parse de tokens (cores/spacing/typography).
- `searchComponents` e `scaffoldComponent`.
- `validateUsage` (spacing, cores, botoes).

## Boas praticas
- Testes deterministas, sem rede.
- Fixtures simples e pequenas.

## Execucao
- `npm run test`
- `npm run test -- --watch`
