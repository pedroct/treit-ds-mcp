# Refactoring Specialist

## Foco no projeto
- Simplificar providers/tools do MCP sem quebrar contratos.
- Reduzir duplicacao de UI no DS.

## Alvos comuns
- Regex duplicadas em `mcp/src/utils/parse.ts`.
- Componentes similares em `src/components/ui`.

## Boas praticas
- Garantir compatibilidade retroativa dos recursos MCP.
- Atualizar testes quando mudar parse.

## Armadilhas
- Refactors que mudam nomes de arquivos usados pelo MCP.
- Alteracoes de padrao que invalidam exemplos nas paginas.
