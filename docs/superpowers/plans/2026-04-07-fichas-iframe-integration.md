# Fichas HTML — Integração via iframe

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrar as 4 fichas HTML legadas no app Next.js via iframe, preservando 100% do visual e das animações JS.

**Architecture:** Os HTMLs são copiados para `public/fichas/` e servidos como assets estáticos. Um Client Component `FichaIframe` embute cada ficha via `<iframe>` com auto-resize por `scrollHeight`. O `DnDFichaSheet` seleciona entre iframe (personagens legados) e `FichaView` (futuros).

**Tech Stack:** Next.js 16 App Router, TypeScript, React `useRef`/`useState`, HTML estático em `public/`

---

## Arquivos afetados

| Arquivo | Ação |
|---|---|
| `public/fichas/Nahida_Lesser_Lord_Kusanali.html` | Criar (copiar de legacy) |
| `public/fichas/Arlecchino_The_Knave_v2.html` | Criar (copiar de legacy) |
| `public/fichas/Corven_Cogspire_Ficha.html` | Criar (copiar de legacy) |
| `public/fichas/Build_Klein_Moretti_v2.html` | Criar (copiar de legacy) |
| `components/ficha/FichaIframe.tsx` | Criar |
| `components/ficha/DnDFichaSheet.tsx` | Modificar |
| `app/sistemas-de-rpg/[sistema]/personagens/[slug]/page.tsx` | Modificar |

---

## Task 1 — Copiar HTMLs para `public/fichas/`

**Files:**
- Create: `public/fichas/Nahida_Lesser_Lord_Kusanali.html`
- Create: `public/fichas/Arlecchino_The_Knave_v2.html`
- Create: `public/fichas/Corven_Cogspire_Ficha.html`
- Create: `public/fichas/Build_Klein_Moretti_v2.html`

- [ ] **Step 1: Criar diretório e copiar arquivos**

```bash
mkdir -p public/fichas
cp legacy/html/Nahida_Lesser_Lord_Kusanali.html public/fichas/
cp legacy/html/Arlecchino_The_Knave_v2.html public/fichas/
cp legacy/html/Corven_Cogspire_Ficha.html public/fichas/
cp legacy/html/Build_Klein_Moretti_v2.html public/fichas/
```

- [ ] **Step 2: Verificar que os arquivos estão no lugar**

```bash
ls public/fichas/
```

Esperado:
```
Arlecchino_The_Knave_v2.html
Build_Klein_Moretti_v2.html
Corven_Cogspire_Ficha.html
Nahida_Lesser_Lord_Kusanali.html
```

- [ ] **Step 3: Verificar que os HTMLs são servidos pelo Next.js**

```bash
npm run dev
```

Abrir no browser: `http://localhost:3000/fichas/Corven_Cogspire_Ficha.html`

Esperado: ficha completa renderizando com animações de engrenagens/faíscas visíveis.

- [ ] **Step 4: Commit**

```bash
git add public/fichas/
git commit -m "feat: adiciona fichas HTML legadas em public/fichas"
```

---

## Task 2 — Criar `FichaIframe` Client Component

**Files:**
- Create: `components/ficha/FichaIframe.tsx`

- [ ] **Step 1: Criar o componente**

Criar `components/ficha/FichaIframe.tsx` com o seguinte conteúdo:

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
      style={{
        width: "100%",
        height: `${height}px`,
        border: "none",
        display: "block",
      }}
      title="Ficha de personagem"
    />
  );
}
```

- [ ] **Step 2: Verificar que não há erros de TypeScript**

```bash
npx tsc --noEmit
```

Esperado: nenhum erro.

- [ ] **Step 3: Commit**

```bash
git add components/ficha/FichaIframe.tsx
git commit -m "feat: adiciona FichaIframe client component com auto-resize"
```

---

## Task 3 — Atualizar `DnDFichaSheet` para usar iframe

**Files:**
- Modify: `components/ficha/DnDFichaSheet.tsx`

Estado atual do arquivo:

```tsx
import FichaView from "@/components/ficha/FichaView";
import type { DnDFicha } from "@/types/character";

interface DnDFichaSheetProps {
  ficha: DnDFicha;
}

export default function DnDFichaSheet({ ficha }: DnDFichaSheetProps) {
  return (
    <div className="px-4 sm:px-10">
      <FichaView ficha={ficha as Record<string, any>} system="dnd" />
    </div>
  );
}
```

- [ ] **Step 1: Substituir o conteúdo do arquivo**

Reescrever `components/ficha/DnDFichaSheet.tsx`:

```tsx
import FichaIframe from "@/components/ficha/FichaIframe";
import FichaView from "@/components/ficha/FichaView";
import type { DnDFicha } from "@/types/character";

const LEGACY_SLUGS = new Set([
  "Nahida_Lesser_Lord_Kusanali",
  "Arlecchino_The_Knave_v2",
  "Corven_Cogspire_Ficha",
  "Build_Klein_Moretti_v2",
]);

interface DnDFichaSheetProps {
  ficha: DnDFicha;
  slug: string;
}

export default function DnDFichaSheet({ ficha, slug }: DnDFichaSheetProps) {
  if (LEGACY_SLUGS.has(slug)) {
    return <FichaIframe src={`/fichas/${slug}.html`} />;
  }
  return (
    <div className="px-4 sm:px-10">
      <FichaView ficha={ficha as Record<string, any>} system="dnd" />
    </div>
  );
}
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: erro em `page.tsx` porque `DnDFichaSheet` agora exige `slug` — isso é esperado, será corrigido na Task 4.

- [ ] **Step 3: Commit parcial (só o componente)**

```bash
git add components/ficha/DnDFichaSheet.tsx
git commit -m "feat: DnDFichaSheet seleciona iframe para fichas legadas"
```

---

## Task 4 — Atualizar `page.tsx` para passar `slug`

**Files:**
- Modify: `app/sistemas-de-rpg/[sistema]/personagens/[slug]/page.tsx`

O bloco D&D atual (linhas 74-76):

```tsx
{sistema === "dnd" ? (
  <DnDFichaSheet ficha={character.ficha} />
) : (
```

- [ ] **Step 1: Adicionar `slug` na chamada de `DnDFichaSheet` e remover o wrapper com padding externo**

Substituir o bloco do `DnDFichaSheet` no arquivo `app/sistemas-de-rpg/[sistema]/personagens/[slug]/page.tsx`:

```tsx
{sistema === "dnd" ? (
  <DnDFichaSheet ficha={character.ficha} slug={slug} />
) : (
  <div className="px-4 sm:px-6">
    <FichaView ficha={character.ficha} system={sistema} />
  </div>
)}
```

> Nota: o padding `px-4 sm:px-10` que estava no bloco D&D foi removido — o `FichaIframe` ocupa 100% da largura sem padding, e o fallback `FichaView` continua com padding próprio dentro de `DnDFichaSheet`.

- [ ] **Step 2: Verificar TypeScript sem erros**

```bash
npx tsc --noEmit
```

Esperado: nenhum erro.

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Esperado: build completo sem erros. Presença de avisos sobre `any` é aceitável (existiam antes).

- [ ] **Step 4: Testar as 4 fichas em dev**

```bash
npm run dev
```

Verificar cada URL:
- `http://localhost:3000/sistemas-de-rpg/dnd/personagens/Nahida_Lesser_Lord_Kusanali`
- `http://localhost:3000/sistemas-de-rpg/dnd/personagens/Arlecchino_The_Knave_v2`
- `http://localhost:3000/sistemas-de-rpg/dnd/personagens/Corven_Cogspire_Ficha`
- `http://localhost:3000/sistemas-de-rpg/dnd/personagens/Build_Klein_Moretti_v2`

Para cada uma verificar:
- [ ] Nav de voltar visível acima da ficha
- [ ] Breadcrumb visível
- [ ] Botão "Editar Ficha" visível
- [ ] Ficha renderiza com tema correto (cores, fontes)
- [ ] Animações de partículas ativas (folhas, brasas, engrenagens ou névoa)
- [ ] Conteúdo não cortado (iframe altura correta)

- [ ] **Step 5: Commit final**

```bash
git add app/sistemas-de-rpg/\[sistema\]/personagens/\[slug\]/page.tsx
git commit -m "feat: integração completa das fichas HTML via iframe"
```

---

## Critérios de sucesso

- [ ] `npm run build` sem erros
- [ ] As 4 fichas renderizam com visual idêntico ao HTML original
- [ ] Animações de partículas funcionando (JS executa dentro do iframe)
- [ ] Altura do iframe cobre todo o conteúdo
- [ ] Nav, breadcrumb e botão Editar visíveis acima de cada ficha
- [ ] Personagens de outros sistemas (não D&D) não foram afetados
