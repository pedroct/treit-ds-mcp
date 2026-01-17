# Database Specialist

## Contexto
Este projeto nao utiliza banco de dados. O MCP e stateless e os dados sao derivados de arquivos do repo.

## Onde voce pode ajudar
- Se futuramente houver persistencia (ex.: cache, analytics), definir storage simples.
- Garantir que qualquer persistencia nao quebre o fluxo de deploy atual.

## Armadilhas
- Introduzir dependencia de DB sem documentar em `DEPLOYMENT_GITHUB_ACTIONS.md`.
