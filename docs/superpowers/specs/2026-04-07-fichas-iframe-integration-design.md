# Design Spec — Integração de Fichas HTML via iframe

**Data:** 2026-04-07  
**Status:** Aprovado  
**Abordagem escolhida:** Opção A — iframe embed

---

## Contexto

O projeto possui 4 fichas de personagem HTML completas em `legacy/html/`. Cada ficha é auto-contida: todo CSS está em `<style>` inline, fontes via CDN (Google Fonts), e JavaScript inline gera partículas animadas por tema (folhas, brasas, engrenagens, névoa). Não há assets externos além das fontes.

O app Next.js já tem a rota `/sistemas-de-rpg/dnd/personagens/[slug]` que carrega o JSON do personagem e renderiza via `DnDFichaSheet → FichaView`. O objetivo é substituir esse rendering genérico pelo HTML legado fiel, preservando 100% do visual e das animações JS.

**Prioridade:** fidelidade visual acima de organização técnica.

---

## Decisões Técnicas

- **Partículas animadas são obrigatórias** → abordagens que não executam JS foram descartadas.
- **Conversão manual para JSX** descartada por risco de drift visual e volume de trabalho (~4000 linhas).
- **iframe escolhido** por executar JS nativamente, isolar CSS completamente, e não exigir reescrita das fichas.
- Os HTMLs são servidos de `public/fichas/` (same-origin), permitindo acesso ao `contentDocument` para auto-resize de altura.

---

## Arquitetura

### Ficheiros afetados / criados

| Arquivo | Ação |
|---|---|
| `public/fichas/Nahida_Lesser_Lord_Kusanali.html` | Criado (copiado de legacy) |
| `public/fichas/Arlecchino_The_Knave_v2.html` | Criado (copiado de legacy) |
| `public/fichas/Corven_Cogspire_Ficha.html` | Criado (copiado de legacy) |
| `public/fichas/Build_Klein_Moretti_v2.html` | Criado (copiado de legacy) |
| `components/ficha/FichaIframe.tsx` | Criado (Client Component) |
| `components/ficha/DnDFichaSheet.tsx` | Atualizado (recebe slug, usa FichaIframe) |
| `app/sistemas-de-rpg/[sistema]/personagens/[slug]/page.tsx` | Atualizado (passa slug para DnDFichaSheet) |
| `legacy/html/` | Preservado — não apagar |

---

## Componentes

### `FichaIframe.tsx` (Client Component)

```tsx
"use client";
import { useRef, useState } from "react";

interface FichaIframeProps {
  src: string;
}

export default function FichaIframe({ src }: FichaIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(800);

  function handleLoad() {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return;
    setHeight(iframe.contentDocument.body.scrollHeight);
  }

  return (
    <iframe
      ref={iframeRef}
      src={src}
      onLoad={handleLoad}
      style={{ width: "100%", height: `${height}px`, border: "none", display: "block" }}
      title="Ficha de personagem"
    />
  );
}
```

**Comportamento:**
- Altura inicial: 800px (evita flash de conteúdo cortado)
- `onLoad` lê `scrollHeight` do documento interno e ajusta
- Same-origin garante acesso ao `contentDocument`

### `DnDFichaSheet.tsx` (atualizado)

```tsx
import FichaIframe from "@/components/ficha/FichaIframe";
import FichaView from "@/components/ficha/FichaView";

interface DnDFichaSheetProps {
  ficha: Record<string, any>;
  slug: string;
}

const LEGACY_SLUGS = [
  "Nahida_Lesser_Lord_Kusanali",
  "Arlecchino_The_Knave_v2",
  "Corven_Cogspire_Ficha",
  "Build_Klein_Moretti_v2",
];

export default function DnDFichaSheet({ ficha, slug }: DnDFichaSheetProps) {
  if (LEGACY_SLUGS.includes(slug)) {
    return <FichaIframe src={`/fichas/${slug}.html`} />;
  }
  return (
    <div className="px-4 sm:px-10">
      <FichaView ficha={ficha} system="dnd" />
    </div>
  );
}
```

**Fallback:** personagens D&D sem HTML legado continuam usando `FichaView`.

### `page.tsx` do personagem (atualizado)

- Passar `slug` para `DnDFichaSheet`
- Remover `px-4 sm:px-10` do wrapper do bloco D&D (o iframe não usa padding externo)

---

## Fluxo de dados

```
URL: /sistemas-de-rpg/dnd/personagens/Nahida_Lesser_Lord_Kusanali
  ↓
page.tsx — carrega JSON, extrai slug
  ↓
DnDFichaSheet (slug="Nahida_Lesser_Lord_Kusanali")
  ↓ slug está em LEGACY_SLUGS
FichaIframe src="/fichas/Nahida_Lesser_Lord_Kusanali.html"
  ↓
<iframe> carrega o HTML completo da pasta public/fichas/
  ↓ onLoad
auto-resize por scrollHeight
```

---

## O que não muda

- Nav de voltar, breadcrumb, botão "Editar Ficha" — permanecem acima do iframe no layout Next.js
- `FichaView` existente — mantido como fallback
- `legacy/html/` — preservado, não apagar
- JSON dos personagens — não alterado

---

## Fora do escopo

- Conversão JSX das fichas (pode ser feita incrementalmente no futuro)
- Responsividade interna das fichas (as fichas têm `max-width` próprio)
- SEO do conteúdo das fichas (conteúdo dentro de iframe não é indexado — aceitável para este projeto)

---

## Critérios de sucesso

1. `npm run build` sem erros
2. Rota `/sistemas-de-rpg/dnd/personagens/[slug]` renderiza o iframe para todos os 4 personagens
3. Visual idêntico ao HTML original (incluindo animações de partículas)
4. Altura do iframe cobre todo o conteúdo sem scroll interno
5. Nav, breadcrumb e botão Editar visíveis acima da ficha
