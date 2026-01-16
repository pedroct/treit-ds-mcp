# Testing Guide

Este projeto utiliza **Vitest** e **React Testing Library** para testes.

## 🚀 Scripts Disponíveis

```bash
# Executar testes em watch mode (recomendado para desenvolvimento)
npm test

# Executar testes uma vez (CI/CD)
npm run test:run

# Executar testes com UI interativa
npm run test:ui

# Executar testes com coverage
npm run test:coverage
```

## 📁 Estrutura

```
src/
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── button.test.tsx     # Testes do componente
│       ├── card.tsx
│       └── card.test.tsx
├── lib/
│   ├── utils.ts
│   └── utils.test.ts
└── test/
    ├── setup.ts                # Configuração global dos testes
    └── README.md               # Este arquivo
```

## ✅ Convenções

1. **Nomeação**: Arquivos de teste devem ter o sufixo `.test.ts` ou `.test.tsx`
2. **Localização**: Testes devem ficar ao lado do arquivo que testam
3. **Estrutura**: Use `describe` para agrupar testes relacionados

## 📝 Exemplo de Teste

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

## 🔧 Ferramentas

- **Vitest**: Test runner rápido e moderno
- **@testing-library/react**: Biblioteca para testar componentes React
- **@testing-library/user-event**: Simular interações do usuário
- **@testing-library/jest-dom**: Matchers customizados para o DOM

## 📊 Coverage

Execute `npm run test:coverage` para gerar relatório de cobertura.

O relatório será gerado em `coverage/` e incluirá:
- `coverage/index.html` - Relatório visual interativo
- `coverage/coverage-final.json` - Dados brutos

## 🎯 Boas Práticas

1. **Teste comportamento, não implementação**
   - Foque em como o usuário interage com o componente
   - Evite testar detalhes internos de implementação

2. **Use queries semânticas**
   - Prefira `getByRole`, `getByLabelText`, `getByText`
   - Evite `getByTestId` quando possível

3. **Testes devem ser independentes**
   - Cada teste deve funcionar isoladamente
   - Use `beforeEach`/`afterEach` para setup/cleanup

4. **Mantenha testes simples e legíveis**
   - Um teste deve verificar uma coisa
   - Use nomes descritivos

## 🔗 Referências

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
