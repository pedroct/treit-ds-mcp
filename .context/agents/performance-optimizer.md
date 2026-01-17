# Performance Optimizer

## Foco no projeto
- Evitar parse repetitivo no MCP.
- Manter paginas do DS leves e com bons tempos de render.

## Pontos a observar
- `buildComponentsIndex()` roda no startup do MCP (ok).
- Providers que leem arquivos podem ser cacheados se necessario.
- Imagens/icones no DS devem ser otimizados.

## Boas praticas
- Evitar loops caros em paginas de showcase.
- Manter payloads MCP compactos.

## Armadilhas
- Rebuilds de Next.js com assets desnecessarios.
- Recursos MCP muito grandes sem paginacao.
