# Atualização das Cores da Marca - Manual Treit

## 📋 Resumo

Adicionada seção completa **"Cores Primárias - Manual da Marca"** no styleguide, incluindo todos os códigos de cores conforme especificado no manual da marca Treit Consulting & Training.

---

## 🎨 Cores Implementadas

### 1. Branco Puro
- **Nome**: Branco
- **CMYK**: 0-0-0-0
- **RGB**: 255-255-255
- **HEXA**: #FFFFFF

### 2. Laranja (Primary)
- **Nome**: Laranja
- **Pantone**: ORANGE 021 C
- **CMYK**: 0-78-94-0
- **RGB**: 253-80-1
- **HEXA**: #fd5001

### 3. Azul Claro / Ciano (Secondary)
- **Nome**: Azul claro
- **Pantone**: 319 C
- **CMYK**: 61-0-8-0
- **RGB**: 44-217-247
- **HEXA**: #2cd9f7

### 4. Azul Escuro (Accent)
- **Nome**: Azul escuro
- **Pantone**: 2935 C
- **CMYK**: 100-64-21-6
- **RGB**: 0-86-210
- **HEXA**: #0056d2

### 5. Preto
- **Nome**: Preto
- **Pantone**: BLACK 6 C
- **CMYK**: 91-79-62-97
- **RGB**: 0-0-0
- **HEXA**: #000000

### 6. Escalas de Cinza
Conforme manual da marca:
- **80%** Preto
- **60%** Preto
- **40%** Preto
- **20%** Preto

---

## 📁 Arquivo Modificado

### [src/app/styleguide/page.tsx](src/app/styleguide/page.tsx)

Adicionada nova seção **"Cores Primárias - Manual da Marca"** que exibe:

1. **4 Cores Principais** em cards individuais:
   - Branco, Laranja, Azul claro, Azul escuro
   - Cada card mostra:
     - Amostra da cor (40px de altura)
     - Nome da cor
     - Código Pantone
     - Código CMYK
     - Código RGB
     - Código HEXA destacado

2. **Seção Preto e Branco** em cards maiores:
   - Card Preto com nota explicativa sobre uso em versões negativa/positiva
   - Card Escalas de Cinza mostrando as 4 variações (80%, 60%, 40%, 20%)

3. **Reorganização**:
   - "Cores Primárias - Manual da Marca" → Cores oficiais conforme manual
   - "Color Scales" → Escalas geradas 50-900 para desenvolvimento
   - "Cores Semânticas (Sistema)" → Cores funcionais do sistema (Success, Warning, etc.)

---

## 🎯 Alinhamento com o Manual

A implementação está 100% alinhada com o manual da marca Treit:

✅ **Códigos CMYK** - Para impressão gráfica
✅ **Códigos RGB** - Para uso em telas/digital
✅ **Códigos HEXA** - Para desenvolvimento web/CSS
✅ **Referências Pantone** - Para comunicação com gráficas
✅ **Escalas de Cinza** - Conforme especificação 20%, 40%, 60%, 80%

---

## 📊 Estrutura Visual no Styleguide

```
┌─────────────────────────────────────────────────────┐
│  Cores Primárias - Manual da Marca                  │
├──────────┬──────────┬──────────┬──────────┐         │
│  Branco  │ Laranja  │ Azul     │ Azul     │         │
│          │          │ claro    │ escuro   │         │
│  #FFFFFF │ #fd5001  │ #2cd9f7  │ #0056d2  │         │
│  PANTONE │ PANTONE  │ PANTONE  │ PANTONE  │         │
│  specs   │ ORANGE   │ 319 C    │ 2935 C   │         │
│          │ 021 C    │          │          │         │
└──────────┴──────────┴──────────┴──────────┘         │
                                                       │
┌──────────────────────┬──────────────────────┐       │
│  Preto               │  Escalas de Cinza    │       │
│  #000000             │  80% 60% 40% 20%     │       │
│  PANTONE BLACK 6 C   │  [████][███][██][█]  │       │
│  + nota sobre uso    │                      │       │
└──────────────────────┴──────────────────────┘       │
└─────────────────────────────────────────────────────┘
```

---

## 💡 Detalhes de Implementação

### Formato de Exibição

Cada cor primária é exibida em um card com:

```tsx
<div className="border-2 rounded-lg overflow-hidden">
  <div className="h-40" style={{ backgroundColor: "#fd5001" }} />
  <div className="p-4 bg-card">
    <h3 className="font-bold text-lg mb-3">Laranja</h3>
    <div className="space-y-1 text-sm">
      <p><span className="font-semibold">PANTONE ORANGE 021 C</span></p>
      <p className="text-muted-foreground">CMYK: 0-78-94-0</p>
      <p className="text-muted-foreground">RGB: 253-80-1</p>
      <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">
        HEXA: #fd5001
      </p>
    </div>
  </div>
</div>
```

### Responsividade

- **Mobile (< 768px)**: 1 coluna
- **Tablet (768px - 1024px)**: 2 colunas
- **Desktop (> 1024px)**: 4 colunas

---

## 🔄 Diferença entre Seções

### Cores Primárias - Manual da Marca
- ✅ Cores oficiais da identidade visual
- ✅ Códigos CMYK, RGB, HEXA completos
- ✅ Referências Pantone
- ✅ Para uso em materiais de marca

### Color Scales (Escalas 50-900)
- 🔧 Variações geradas para desenvolvimento
- 🔧 Facilita implementação de UI
- 🔧 Baseadas nas cores primárias

### Cores Semânticas
- 🎯 Cores funcionais do sistema
- 🎯 Success, Warning, Error, Info
- 🎯 Para feedback de interface

---

## 🚀 Como Visualizar

Acesse: **http://localhost:3000/styleguide**

Role até a seção **"Cores Primárias - Manual da Marca"** logo após as escalas de cores.

Você verá:
1. Grid com 4 cores principais (Branco, Laranja, Azul claro, Azul escuro)
2. Cada cor com seus códigos completos
3. Seção adicional com Preto e Escalas de Cinza

---

## ✅ Checklist

- ✅ Branco Puro (CMYK, RGB, HEXA)
- ✅ Laranja PANTONE ORANGE 021 C (CMYK, RGB, HEXA)
- ✅ Azul claro PANTONE 319 C (CMYK, RGB, HEXA)
- ✅ Azul escuro PANTONE 2935 C (CMYK, RGB, HEXA)
- ✅ Preto PANTONE BLACK 6 C (CMYK, RGB, HEXA)
- ✅ Escalas de Cinza (80%, 60%, 40%, 20%)
- ✅ Layout responsivo
- ✅ Visual consistente com o manual

---

## 📝 Uso Prático

### Para Designers
Use os códigos CMYK ao preparar materiais para impressão.

### Para Desenvolvedores
Use os códigos HEXA/RGB no código CSS/Tailwind:
```css
/* Laranja */
color: #fd5001;
background-color: rgb(253, 80, 1);

/* Azul claro */
color: #2cd9f7;

/* Azul escuro */
color: #0056d2;
```

### Para Comunicação com Gráficas
Use as referências Pantone:
- PANTONE ORANGE 021 C
- PANTONE 319 C
- PANTONE 2935 C
- PANTONE BLACK 6 C

---

**Status**: ✅ **Completo**

Todas as cores do manual da marca estão agora documentadas no styleguide com códigos completos CMYK, RGB e HEXA.
