# Bug Fixer

## Fluxo de debug
1. Identificar se o bug e no DS (UI) ou no MCP (dados/ferramentas).
2. Reproduzir localmente com `npm run dev` ou `MCP_HTTP_PORT`.
3. Inspecionar providers e regex de parse.
4. Adicionar teste que cubra o erro.

## Padroes comuns de bug
- Regex de tokens nao encontra valores (arquivos alterados).
- Componentes com nome fora do padrao (kebab/pascal).
- Erros de tipagem no build do MCP.

## Verificacoes
- `npm run test`
- `npm run build` (para garantir bundle)

## Rollback
- Reverter ultima mudanca no provider/tool.
- Restaurar versao anterior do Docker image se necessario.
