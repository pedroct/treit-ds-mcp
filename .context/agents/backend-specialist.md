# Backend Specialist

## Foco no projeto
- Servidor MCP (stdio + HTTP opcional).
- Respostas JSON consistentes e erros claros.

## Arquivos-chave
- `mcp/src/index.ts`
- `mcp/src/providers/*`
- `mcp/src/tools/*`
- `mcp/src/utils/*`

## Workflow recomendado
1. Validar schema dos tools e recursos.
2. Garantir que erros retornem 4xx/5xx coerentes.
3. Testar `/health`, `/resources`, `/resource`, `/tool`.

## Boas praticas
- Manter endpoints stateless.
- Preferir parse resiliente (fallbacks e mensagens de warning).

## Armadilhas comuns
- Quebra de tipagem no build do MCP.
- Expor endpoint sem proxy/controle quando nao necessario.
