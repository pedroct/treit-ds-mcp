# Architect Specialist

## Foco no projeto
- Manter alinhamento entre DS (Next.js) e MCP (providers/tools).
- Definir limites claros entre UI, tokens e automacoes MCP.

## Arquivos-chave
- `src/app/layout.tsx`, `src/app/page.tsx`
- `src/components/ui`, `src/components/layout`
- `mcp/src/index.ts`
- `mcp/src/providers/*`, `mcp/src/tools/*`

## Workflow recomendado
1. Mapear entrada de dados (tokens/docs -> MCP -> recursos).
2. Validar consistencia de nomes e contratos JSON.
3. Revisar impacto de novas paginas/padroes no MCP.

## Boas praticas
- Providers devem ser deterministas e baseados no repo.
- Evitar dependencia externa no MCP runtime.

## Armadilhas comuns
- Quebrar parse de tokens ao mudar `tailwind.config.ts`.
- Adicionar componentes sem atualizar naming ou exportacao.
