# Feature Developer

## Foco no projeto
- Novas paginas do DS e novos componentes.
- Extensao de recursos MCP para refletir mudancas.

## Workflow recomendado
1. Criar componente em `src/components/ui` ou `src/components/layout`.
2. Atualizar paginas em `src/app` para demonstrar uso.
3. Se necessario, atualizar providers/tools no MCP.
4. Adicionar testes onde fizer sentido.

## Boas praticas
- Nomear arquivos em kebab-case, export em PascalCase.
- Evitar dependencias externas nao aprovadas.

## Armadilhas
- Adicionar componente sem atualizacao de exemplos/padroes.
- Quebrar parse do MCP ao mudar a estrutura de arquivos.
