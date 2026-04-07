# Akasharium — Redesign Visual Completo

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar visualmente a home, página de sistemas e páginas por sistema (D&D, Daggerheart, Vampiro) com identidade "Akasharium" — hero cinematográfico com parallax, partículas âmbar, ornamentos SVG e temas distintos por sistema.

**Architecture:** CSS-first (keyframes, noise SVG data URI, pseudo-elementos) + Vanilla JS pontual via hook `useParallax`. Hero da home e de sistemas são client components para suportar scroll listener. Páginas por sistema usam CSS variables já existentes em `data-system-theme` para separar temas sem JS extra.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind v4, Cinzel / Crimson Pro / Share Tech Mono (já carregadas).

---

## Mapa de Arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `app/globals.css` | Modificar | Novos keyframes, classes hero, ornamentos, temas por sistema |
| `lib/useParallax.ts` | Criar | Hook client-side de parallax por scroll |
| `components/ui/OrnamentLine.tsx` | Criar | Linha decorativa com losango central (SVG) |
| `components/home/HeroParticles.tsx` | Criar | Partículas âmbar flutuantes para home |
| `components/home/HomeHero.tsx` | Criar | Hero client component com parallax |
| `app/layout.tsx` | Modificar | Metadata Akasharium + Header no layout |
| `components/layout/Header.tsx` | Modificar | "Forge RPG" → "Akasharium" |
| `app/page.tsx` | Modificar | Home redesenhada com HomeHero + seções |
| `app/sistemas-de-rpg/page.tsx` | Modificar | Hero compacto + grid de sistemas redesenhado |
| `app/sistemas-de-rpg/[sistema]/page.tsx` | Modificar | Hero temático por sistema |

---

## Task 1: CSS Foundations — Keyframes e Classes Utilitárias

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Adicionar keyframes e classes hero ao final de `globals.css`**

Adicionar após o bloco `::-webkit-scrollbar` existente:

```css
/* ══════════════════════════════════════════════ */
/* KEYFRAMES                                       */
/* ══════════════════════════════════════════════ */
@keyframes fadeRise {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes glowPulse {
  0%, 100% { text-shadow: 0 0 80px rgba(201,162,39,0.5), 0 0 30px rgba(201,162,39,0.2); }
  50%       { text-shadow: 0 0 130px rgba(201,162,39,0.85), 0 0 60px rgba(201,162,39,0.4); }
}
@keyframes shimmerSweep {
  from { transform: translateX(-100%) skewX(-15deg); }
  to   { transform: translateX(300%) skewX(-15deg); }
}
@keyframes bgGradientPulse {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
}
@keyframes vampireGlowPulse {
  0%, 100% { text-shadow: 0 0 60px rgba(139,0,0,0.6); }
  50%       { text-shadow: 0 0 110px rgba(139,0,0,0.95), 0 0 40px rgba(139,0,0,0.4); }
}

/* ══════════════════════════════════════════════ */
/* HERO BACKGROUND                                 */
/* ══════════════════════════════════════════════ */
.hero-bg {
  background-color: #050305;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E"),
    radial-gradient(ellipse at 30% 20%, rgba(80,0,120,0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(120,0,40,0.12) 0%, transparent 50%);
  background-size: 300px 300px, 100% 100%, 100% 100%;
}
.hero-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 50%, rgba(80,0,120,0.1) 0%, transparent 65%);
  animation: bgGradientPulse 8s ease-in-out infinite;
  pointer-events: none;
}

/* ══════════════════════════════════════════════ */
/* ANIMATION UTILITIES                             */
/* ══════════════════════════════════════════════ */
.animate-fade-rise {
  animation: fadeRise 0.8s ease-out both;
}
.animate-fade-rise-d1 {
  animation: fadeRise 0.8s ease-out 0.2s both;
}
.animate-fade-rise-d2 {
  animation: fadeRise 0.8s ease-out 0.4s both;
}
.animate-fade-rise-d3 {
  animation: fadeRise 0.8s ease-out 0.6s both;
}
.glow-pulse-gold {
  animation: glowPulse 4s ease-in-out infinite;
}
.glow-pulse-vampire {
  animation: vampireGlowPulse 4s ease-in-out infinite;
}

/* ══════════════════════════════════════════════ */
/* SHIMMER BUTTON                                  */
/* ══════════════════════════════════════════════ */
.shimmer-btn {
  position: relative;
  overflow: hidden;
}
.shimmer-btn::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  transform: translateX(-100%) skewX(-15deg);
}
.shimmer-btn:hover::after {
  animation: shimmerSweep 0.6s ease forwards;
}

/* ══════════════════════════════════════════════ */
/* SECTION TITLE — ORNATE VARIANT                  */
/* ══════════════════════════════════════════════ */
.section-title-ornate {
  @apply font-display text-xs font-bold uppercase tracking-widest flex items-center gap-3 mb-6;
  color: var(--color-theme-brand-bright);
}
.section-title-ornate::before,
.section-title-ornate::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-theme-border));
}
.section-title-ornate::before {
  background: linear-gradient(to left, transparent, var(--color-theme-border));
}

/* ══════════════════════════════════════════════ */
/* CARD ENTER ANIMATION                            */
/* ══════════════════════════════════════════════ */
.card-enter {
  animation: fadeRise 0.6s ease-out both;
  animation-delay: calc(var(--card-i, 0) * 80ms);
}

/* ══════════════════════════════════════════════ */
/* SYSTEM HERO — BASE + PER SYSTEM                 */
/* ══════════════════════════════════════════════ */
.system-hero-bg {
  background-color: var(--color-theme-surface);
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"),
    radial-gradient(ellipse at 50% 0%, var(--color-theme-glow) 0%, transparent 70%);
  background-size: 300px 300px, 100% 100%;
  position: relative;
}

/* D&D — double border frame */
[data-system-theme="dnd"] .system-hero-bg {
  background-color: #0d0505;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"),
    radial-gradient(ellipse at 50% 0%, rgba(139,0,0,0.25) 0%, transparent 65%),
    radial-gradient(ellipse at 20% 100%, rgba(139,0,0,0.1) 0%, transparent 50%);
  background-size: 300px 300px, 100% 100%, 100% 100%;
}
[data-system-theme="dnd"] .system-hero-bg::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(139,0,0,0.2);
  pointer-events: none;
}
[data-system-theme="dnd"] .system-hero-bg::after {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(139,0,0,0.12);
  pointer-events: none;
}

/* Daggerheart */
[data-system-theme="daggerheart"] .system-hero-bg {
  background-color: #1a1208;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"),
    radial-gradient(ellipse at 20% 0%, rgba(194,77,44,0.2) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(50,120,80,0.1) 0%, transparent 50%);
  background-size: 300px 300px, 100% 100%, 100% 100%;
}

/* Vampiro */
[data-system-theme="vampiro"] .system-hero-bg {
  background-color: #080305;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E"),
    radial-gradient(ellipse at 50% -10%, rgba(120,0,20,0.35) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 80%, rgba(80,0,10,0.15) 0%, transparent 50%);
  background-size: 300px 300px, 100% 100%, 100% 100%;
}

/* ══════════════════════════════════════════════ */
/* SYSTEM WATERMARKS (pseudo-elements)             */
/* ══════════════════════════════════════════════ */
.system-watermark {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.06;
}

/* ══════════════════════════════════════════════ */
/* SYSTEM SEPARATORS                               */
/* ══════════════════════════════════════════════ */
.separator-rune {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 2rem 0;
  color: var(--color-theme-border-bright);
}
.separator-rune::before,
.separator-rune::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-theme-border);
}

/* ══════════════════════════════════════════════ */
/* SYSTEM CARD GRID — THEMED                       */
/* ══════════════════════════════════════════════ */
.system-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.system-card:hover {
  transform: translateY(-4px) scale(1.01);
}
```

- [ ] **Step 2: Verificar no dev server que nenhum estilo quebrou**

```bash
npm run dev
```

Abrir `http://localhost:3000` e confirmar que a home ainda renderiza sem erros visuais.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: adiciona keyframes, hero-bg, animações e temas por sistema"
```

---

## Task 2: Componentes Utilitários — OrnamentLine e HeroParticles

**Files:**
- Create: `components/ui/OrnamentLine.tsx`
- Create: `components/home/HeroParticles.tsx`

- [ ] **Step 1: Criar `components/ui/OrnamentLine.tsx`**

```tsx
interface OrnamentLineProps {
  color?: string;
  opacity?: number;
  width?: number;
}

export default function OrnamentLine({
  color = "#c9a227",
  opacity = 0.35,
  width = 220,
}: OrnamentLineProps) {
  const half = width / 2 - 12;
  return (
    <div className="flex items-center justify-center w-full my-3" style={{ opacity }}>
      <svg
        width={width}
        height={14}
        viewBox={`0 0 ${width} 14`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="0" y1="7" x2={half} y2="7" stroke={color} strokeWidth="0.6" />
        <rect
          x={width / 2 - 5}
          y="2"
          width="10"
          height="10"
          transform={`rotate(45 ${width / 2} 7)`}
          stroke={color}
          strokeWidth="0.6"
          fill="none"
        />
        <line x1={width / 2 + 12} y1="7" x2={width} y2="7" stroke={color} strokeWidth="0.6" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Criar `components/home/HeroParticles.tsx`**

```tsx
"use client";

import { useMemo } from "react";

export default function HeroParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => {
        const s = (i + 1) * 137;
        return {
          id: i,
          left: (s * 7) % 100,
          size: 1 + ((s * 13) % 20) / 10,
          duration: 10 + ((s * 19) % 8),
          delay: (s * 23) % 10,
          color: i % 2 === 0 ? "#c9a227" : "#b87333",
        };
      }),
    []
  );

  return (
    <div className="ember-bg" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ember"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/OrnamentLine.tsx components/home/HeroParticles.tsx
git commit -m "feat: adiciona OrnamentLine e HeroParticles"
```

---

## Task 3: Hook de Parallax e HomeHero Client Component

**Files:**
- Create: `lib/useParallax.ts`
- Create: `components/home/HomeHero.tsx`

- [ ] **Step 1: Criar `lib/useParallax.ts`**

```typescript
"use client";

import { useEffect, useRef } from "react";

/**
 * Aplica parallax suave ao elemento referenciado.
 * O elemento se move `scrollY * factor` pixels no eixo Y.
 * Use `factor` baixo (0.25–0.4) para efeito sutil.
 */
export function useParallax(factor = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = () => {
      el.style.transform = `translateY(${window.scrollY * factor}px)`;
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [factor]);

  return ref;
}
```

- [ ] **Step 2: Criar `components/home/HomeHero.tsx`**

```tsx
"use client";

import Link from "next/link";
import OrnamentLine from "@/components/ui/OrnamentLine";
import HeroParticles from "@/components/home/HeroParticles";
import { useParallax } from "@/lib/useParallax";

interface HomeHeroProps {
  characterCount: number;
}

export default function HomeHero({ characterCount }: HomeHeroProps) {
  const bgRef = useParallax(0.28);

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden border-b"
      style={{
        minHeight: "100svh",
        borderColor: "var(--color-rpg-border)",
        background: "#050305",
      }}
    >
      {/* Parallax background layer */}
      <div
        ref={bgRef}
        className="hero-bg absolute"
        style={{ inset: "-15% -5%", zIndex: 0 }}
      />

      {/* Amber particles */}
      <HeroParticles />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 py-24 md:py-32 max-w-4xl mx-auto w-full">
        <div className="animate-fade-rise">
          <OrnamentLine color="#c9a227" opacity={0.4} />
        </div>

        <span
          className="font-mono text-[10px] uppercase tracking-[0.4em] block mb-5 mt-2 animate-fade-rise-d1"
          style={{ color: "var(--color-rpg-gold)", opacity: 0.55 }}
        >
          Central de Fichas &middot; Multi-Sistema
        </span>

        <h1
          className="font-display font-black leading-none tracking-wider glow-pulse-gold animate-fade-rise-d1"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 9rem)",
            color: "#e8c85a",
          }}
        >
          AKASHARIUM
        </h1>

        <p
          className="font-body italic text-xl mt-6 max-w-lg mx-auto leading-relaxed animate-fade-rise-d2"
          style={{ color: "var(--color-rpg-text-muted)" }}
        >
          Gerencie fichas de personagens de múltiplos sistemas de RPG em um único lugar.
          Visualize, edite e organize suas aventuras.
        </p>

        <div className="animate-fade-rise-d2">
          <OrnamentLine color="#c9a227" opacity={0.25} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-rise-d3">
          <Link
            href="/sistemas-de-rpg"
            className="shimmer-btn font-mono text-xs uppercase tracking-[0.2em] px-10 py-3 border transition-colors"
            style={{
              borderColor: "#c9a227",
              color: "#c9a227",
              background: "rgba(201,162,39,0.08)",
            }}
          >
            <span className="relative z-10">Explorar Sistemas</span>
          </Link>

          {characterCount > 0 && (
            <a
              href="#personagens"
              className="font-mono text-xs uppercase tracking-[0.2em] px-10 py-3 border transition-colors hover:border-[rgba(201,162,39,0.4)]"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                color: "var(--color-rpg-text-muted)",
              }}
            >
              Ver Personagens ({characterCount})
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar no browser que não há erros de TypeScript**

```bash
npm run build 2>&1 | head -40
```

Esperado: sem erros de type relacionados aos novos arquivos.

- [ ] **Step 4: Commit**

```bash
git add lib/useParallax.ts components/home/HomeHero.tsx
git commit -m "feat: useParallax hook e HomeHero client component com parallax"
```

---

## Task 4: Renomeação Global — Akasharium + Header no Layout

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/layout/Header.tsx`

- [ ] **Step 1: Atualizar `app/layout.tsx`**

Substituir o conteúdo completo por:

```tsx
import type { Metadata } from "next";
import { Cinzel, Crimson_Pro, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const shareTech = Share_Tech_Mono({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Akasharium — Fichas de Personagem",
  description: "Central de fichas de RPG multi-sistema: D&D, Daggerheart, Vampiro e mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${crimson.variable} ${shareTech.variable} antialiased`}
    >
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Atualizar `components/layout/Header.tsx`**

Substituir o conteúdo completo por:

```tsx
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="border-b sticky top-0 z-50 backdrop-blur-md"
      style={{
        borderColor: "var(--color-rpg-border)",
        background: "rgba(5,3,5,0.85)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-bold text-lg tracking-[0.15em] transition-colors hover:text-[#e8c85a]"
          style={{ color: "var(--color-rpg-gold-light)" }}
        >
          AKASHARIUM
        </Link>
        <nav className="flex gap-6 font-mono text-[10px] tracking-widest uppercase">
          <Link
            href="/"
            className="transition-colors hover:text-[var(--color-rpg-gold-light)]"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            Home
          </Link>
          <Link
            href="/sistemas-de-rpg"
            className="transition-colors hover:text-[var(--color-rpg-gold-light)]"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            Sistemas
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Verificar no browser**

```bash
npm run dev
```

Abrir `http://localhost:3000`. O header fixo deve mostrar "AKASHARIUM" e a tab do browser também.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/layout/Header.tsx
git commit -m "feat: renomeia para Akasharium e adiciona Header ao layout global"
```

---

## Task 5: Redesign da Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Substituir `app/page.tsx` pelo redesign completo**

```tsx
import { getAllCharacters, getSystemList } from "@/lib/characters";
import CharacterCard from "@/components/characters/CharacterCard";
import Link from "next/link";
import { SYSTEM_LABELS, SYSTEM_ICONS } from "@/lib/system-labels";
import HomeHero from "@/components/home/HomeHero";
import OrnamentLine from "@/components/ui/OrnamentLine";

const SYSTEM_ACCENT: Record<string, string> = {
  dnd: "#8b0000",
  daggerheart: "#c24d2c",
  vampiro: "#6e0010",
};

const SYSTEM_GLOW: Record<string, string> = {
  dnd: "rgba(139,0,0,0.35)",
  daggerheart: "rgba(194,77,44,0.35)",
  vampiro: "rgba(110,0,16,0.45)",
};

export default function Home() {
  const characters = getAllCharacters();
  const systems = getSystemList();

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <HomeHero characterCount={characters.length} />

      {/* Systems Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="section-title-ornate text-center justify-center">
          Sistemas Disponíveis
        </h2>

        <div className="grid sm:grid-cols-3 gap-5 mt-8">
          {systems.map((sys, i) => {
            const count = characters.filter((c) => c.system === sys).length;
            return (
              <SystemCard
                key={sys}
                system={sys}
                label={SYSTEM_LABELS[sys] || sys}
                icon={SYSTEM_ICONS[sys] || "⚙"}
                count={count}
                accent={SYSTEM_ACCENT[sys] || "#b87333"}
                glow={SYSTEM_GLOW[sys] || "rgba(184,115,51,0.3)"}
                index={i}
              />
            );
          })}
        </div>
      </section>

      {/* Characters Section */}
      {characters.length > 0 && (
        <section id="personagens" className="max-w-5xl mx-auto px-6 pb-24">
          <div className="mb-2">
            <OrnamentLine color="var(--color-rpg-bronze)" opacity={0.25} width={300} />
          </div>
          <h2 className="section-title-ornate justify-center">
            Personagens
            <span
              className="font-mono text-xs normal-case tracking-wider"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              {characters.length} encontrado{characters.length !== 1 ? "s" : ""}
            </span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            {characters.map((ch, i) => (
              <div
                key={ch.system + "-" + ch.id}
                className="card-enter"
                style={{ "--card-i": i } as React.CSSProperties}
              >
                <CharacterCard character={ch} />
              </div>
            ))}
          </div>
        </section>
      )}

      {characters.length === 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div
            className="text-center py-16 border"
            style={{
              borderColor: "var(--color-rpg-border)",
              background: "var(--color-rpg-surface-raised)",
            }}
          >
            <span className="text-4xl block mb-4 opacity-30">📜</span>
            <p className="text-lg" style={{ color: "var(--color-rpg-text-muted)" }}>
              Nenhum personagem criado ainda.
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--color-rpg-text-muted)", opacity: 0.5 }}
            >
              Adicione arquivos JSON em{" "}
              <code style={{ color: "var(--color-rpg-bronze)" }}>
                content/sistemas-de-rpg/
              </code>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

interface SystemCardProps {
  system: string;
  label: string;
  icon: string;
  count: number;
  accent: string;
  glow: string;
  index: number;
}

function SystemCard({ system, label, icon, count, accent, glow, index }: SystemCardProps) {
  return (
    <Link
      href={`/sistemas-de-rpg/${system}`}
      className="system-card group block border p-6 card-enter"
      style={
        {
          background: "var(--color-rpg-surface-raised)",
          borderColor: "var(--color-rpg-border)",
          borderTop: `2px solid ${accent}`,
          "--card-i": index,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 32px ${glow}`;
        (e.currentTarget as HTMLAnchorElement).style.background = `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, var(--color-rpg-surface-raised) 70%)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-rpg-surface-raised)";
      }}
    >
      <span
        className="text-3xl block mb-3 transition-all duration-300 group-hover:scale-110"
        style={{ filter: `drop-shadow(0 0 8px ${accent}99)` }}
      >
        {icon}
      </span>
      <h3
        className="font-display font-semibold text-lg"
        style={{ color: "var(--color-rpg-gold-light)" }}
      >
        {label}
      </h3>
      <span
        className="font-mono text-xs block mt-2"
        style={{ color: "var(--color-rpg-bronze)" }}
      >
        {count > 0 ? `${count} personagem${count !== 1 ? "s" : ""}` : "Nenhum personagem"}
      </span>
    </Link>
  );
}
```

- [ ] **Step 2: Verificar no browser**

```bash
npm run dev
```

Abrir `http://localhost:3000`. Verificar:
- Hero ocupa viewport completo com fundo animado
- Partículas âmbar flutuando
- Título "AKASHARIUM" com glow pulsante
- Cards de sistemas com borda top colorida e hover com glow
- Cards de personagens com animação de entrada escalonada

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: redesign completo da home page com hero parallax e cards temáticos"
```

---

## Task 6: Redesign da Página de Sistemas

**Files:**
- Modify: `app/sistemas-de-rpg/page.tsx`

- [ ] **Step 1: Criar `components/sistemas/SistemasHero.tsx`**

(Client component necessário para partículas e parallax)

```tsx
"use client";

import OrnamentLine from "@/components/ui/OrnamentLine";
import HeroParticles from "@/components/home/HeroParticles";
import { useParallax } from "@/lib/useParallax";

export default function SistemasHero() {
  const bgRef = useParallax(0.22);

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden border-b"
      style={{
        minHeight: "38vh",
        borderColor: "var(--color-rpg-border)",
        background: "#050305",
      }}
    >
      <div
        ref={bgRef}
        className="hero-bg absolute"
        style={{ inset: "-15% -5%", zIndex: 0 }}
      />
      <HeroParticles />

      <div className="relative z-10 text-center px-6 py-14 w-full max-w-3xl mx-auto">
        <div className="animate-fade-rise">
          <OrnamentLine color="#c9a227" opacity={0.35} />
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-4 mt-2 animate-fade-rise-d1"
          style={{ color: "var(--color-rpg-bronze)", opacity: 0.6 }}
        >
          Multiverso de RPG
        </span>
        <h1
          className="font-display font-extrabold text-4xl md:text-5xl tracking-wider glow-pulse-gold animate-fade-rise-d1"
          style={{ color: "var(--color-rpg-gold-light)" }}
        >
          Sistemas de RPG
        </h1>
        <p
          className="text-lg mt-3 animate-fade-rise-d2"
          style={{ color: "var(--color-rpg-text-muted)" }}
        >
          Selecione um sistema para explorar seus personagens
        </p>
        <div className="animate-fade-rise-d2 mt-2">
          <OrnamentLine color="#c9a227" opacity={0.2} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Substituir `app/sistemas-de-rpg/page.tsx`**

```tsx
import { getSystemList, getAllCharacters } from "@/lib/characters";
import Link from "next/link";
import { SYSTEM_LABELS, SYSTEM_ICONS } from "@/lib/system-labels";
import SistemasHero from "@/components/sistemas/SistemasHero";

const SYSTEM_ACCENT: Record<string, string> = {
  dnd: "#8b0000",
  daggerheart: "#c24d2c",
  vampiro: "#6e0010",
};

const SYSTEM_GLOW: Record<string, string> = {
  dnd: "rgba(139,0,0,0.4)",
  daggerheart: "rgba(194,77,44,0.4)",
  vampiro: "rgba(110,0,16,0.5)",
};

const SYSTEM_DESC: Record<string, string> = {
  dnd: "Masmorra & Dragões • Alta Fantasia Medieval",
  daggerheart: "Fantasia Narrativa • Hope & Fear",
  vampiro: "Horror Gótico • Mundo das Trevas",
};

export default function SistemasDeRPG() {
  const systems = getSystemList();
  const characters = getAllCharacters();

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <SistemasHero />

      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((sys, i) => {
            const count = characters.filter((c) => c.system === sys).length;
            const accent = SYSTEM_ACCENT[sys] || "#b87333";
            const glow = SYSTEM_GLOW[sys] || "rgba(184,115,51,0.3)";
            const desc = SYSTEM_DESC[sys] || "";

            return (
              <Link
                key={sys}
                href={`/sistemas-de-rpg/${sys}`}
                className="system-card group block border p-7 card-enter"
                style={
                  {
                    background: "var(--color-rpg-surface-raised)",
                    borderColor: "var(--color-rpg-border)",
                    borderTop: `3px solid ${accent}`,
                    "--card-i": i,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 10px 40px ${glow}`;
                  (e.currentTarget as HTMLAnchorElement).style.background = `radial-gradient(ellipse at 50% 0%, ${accent}20 0%, var(--color-rpg-surface-raised) 70%)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-rpg-surface-raised)";
                }}
              >
                <span
                  className="text-4xl block mb-4 transition-all duration-300 group-hover:scale-110 text-center"
                  style={{ filter: `drop-shadow(0 0 10px ${accent}aa)` }}
                >
                  {SYSTEM_ICONS[sys] || "⚙"}
                </span>
                <h2
                  className="font-display font-semibold text-xl text-center"
                  style={{ color: "var(--color-rpg-gold-light)" }}
                >
                  {SYSTEM_LABELS[sys] || sys}
                </h2>
                {desc && (
                  <p
                    className="font-mono text-[10px] tracking-wider uppercase text-center mt-2"
                    style={{ color: "var(--color-rpg-text-muted)", opacity: 0.7 }}
                  >
                    {desc}
                  </p>
                )}
                <p
                  className="font-mono text-xs text-center mt-3"
                  style={{ color: accent, opacity: 0.85 }}
                >
                  {count > 0
                    ? `${count} personagem${count !== 1 ? "s" : ""}`
                    : "Nenhum personagem"}
                </p>
              </Link>
            );
          })}
        </div>

        {systems.length === 0 && (
          <div
            className="text-center py-16"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            <span className="text-4xl block mb-4 opacity-30">📜</span>
            <p className="text-lg">Nenhum sistema configurado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verificar no browser**

Abrir `http://localhost:3000/sistemas-de-rpg`. Verificar:
- Hero compacto com fundo animado e partículas
- Grid de sistemas com ícones grandes e borda top colorida
- Hover com glow temático e leve scale

- [ ] **Step 4: Commit**

```bash
git add components/sistemas/SistemasHero.tsx app/sistemas-de-rpg/page.tsx
git commit -m "feat: redesign página de sistemas com hero e grid temático"
```

---

## Task 7: Watermarks SVG por Sistema

**Files:**
- Create: `components/theme/SystemWatermark.tsx`

- [ ] **Step 1: Criar `components/theme/SystemWatermark.tsx`**

```tsx
import type { SystemTheme } from "./ThemeProvider";

interface SystemWatermarkProps {
  theme: SystemTheme;
}

export default function SystemWatermark({ theme }: SystemWatermarkProps) {
  if (theme === "dnd") {
    return (
      <div className="system-watermark" aria-hidden="true">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Medieval cross with ornate ends */}
          <line x1="100" y1="20" x2="100" y2="180" stroke="#8b0000" strokeWidth="2"/>
          <line x1="20" y1="100" x2="180" y2="100" stroke="#8b0000" strokeWidth="2"/>
          <rect x="90" y="10" width="20" height="20" fill="#8b0000" opacity="0.5"/>
          <rect x="90" y="170" width="20" height="20" fill="#8b0000" opacity="0.5"/>
          <rect x="10" y="90" width="20" height="20" fill="#8b0000" opacity="0.5"/>
          <rect x="170" y="90" width="20" height="20" fill="#8b0000" opacity="0.5"/>
          <circle cx="100" cy="100" r="20" stroke="#8b0000" strokeWidth="1.5" fill="none"/>
          <circle cx="100" cy="100" r="35" stroke="#8b0000" strokeWidth="0.8" fill="none"/>
          {/* Corner flourishes */}
          <line x1="55" y1="55" x2="70" y2="70" stroke="#8b0000" strokeWidth="0.8"/>
          <line x1="145" y1="55" x2="130" y2="70" stroke="#8b0000" strokeWidth="0.8"/>
          <line x1="55" y1="145" x2="70" y2="130" stroke="#8b0000" strokeWidth="0.8"/>
          <line x1="145" y1="145" x2="130" y2="130" stroke="#8b0000" strokeWidth="0.8"/>
        </svg>
      </div>
    );
  }

  if (theme === "daggerheart") {
    return (
      <div className="system-watermark" aria-hidden="true">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Geometric diamond chain */}
          <rect x="75" y="20" width="30" height="30" transform="rotate(45 90 35)" stroke="#c24d2c" strokeWidth="1.5" fill="none"/>
          <rect x="75" y="75" width="30" height="30" transform="rotate(45 90 90)" stroke="#c24d2c" strokeWidth="2" fill="none"/>
          <rect x="75" y="130" width="30" height="30" transform="rotate(45 90 145)" stroke="#c24d2c" strokeWidth="1.5" fill="none"/>
          <line x1="90" y1="50" x2="90" y2="70" stroke="#c24d2c" strokeWidth="1"/>
          <line x1="90" y1="110" x2="90" y2="125" stroke="#c24d2c" strokeWidth="1"/>
          {/* Side diamonds */}
          <rect x="20" y="75" width="20" height="20" transform="rotate(45 30 85)" stroke="#c24d2c" strokeWidth="1" fill="none"/>
          <rect x="140" y="75" width="20" height="20" transform="rotate(45 150 85)" stroke="#c24d2c" strokeWidth="1" fill="none"/>
        </svg>
      </div>
    );
  }

  if (theme === "vampiro") {
    return (
      <div className="system-watermark" aria-hidden="true">
        <svg width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Gothic rose — 5 angular petals */}
          <polygon points="90,20 105,60 145,55 115,80 125,120 90,95 55,120 65,80 35,55 75,60" stroke="#8b0000" strokeWidth="1.5" fill="none"/>
          {/* Inner star */}
          <polygon points="90,45 98,70 125,68 103,84 111,110 90,94 69,110 77,84 55,68 82,70" stroke="#8b0000" strokeWidth="0.8" fill="none"/>
          <circle cx="90" cy="82" r="10" stroke="#8b0000" strokeWidth="1" fill="none"/>
          {/* Stem with thorns */}
          <line x1="90" y1="120" x2="90" y2="180" stroke="#8b0000" strokeWidth="1.5"/>
          <line x1="90" y1="145" x2="75" y2="135" stroke="#8b0000" strokeWidth="1"/>
          <line x1="90" y1="160" x2="105" y2="150" stroke="#8b0000" strokeWidth="1"/>
        </svg>
      </div>
    );
  }

  return null;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/theme/SystemWatermark.tsx
git commit -m "feat: watermarks SVG temáticos por sistema (D&D, Daggerheart, Vampiro)"
```

---

## Task 8: Redesign das Páginas por Sistema

**Files:**
- Modify: `app/sistemas-de-rpg/[sistema]/page.tsx`

- [ ] **Step 1: Criar `components/theme/SystemSeparator.tsx`**

```tsx
import type { SystemTheme } from "./ThemeProvider";

interface SystemSeparatorProps {
  theme: SystemTheme;
}

export default function SystemSeparator({ theme }: SystemSeparatorProps) {
  if (theme === "dnd") {
    return (
      <div className="separator-rune my-8" aria-hidden="true">
        <svg width="80" height="12" viewBox="0 0 80 12" fill="none">
          <line x1="0" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="0.8"/>
          <rect x="22" y="3" width="6" height="6" transform="rotate(45 25 6)" stroke="currentColor" strokeWidth="0.8" fill="none"/>
          <line x1="30" y1="6" x2="50" y2="6" stroke="currentColor" strokeWidth="0.8"/>
          <rect x="52" y="3" width="6" height="6" transform="rotate(45 55 6)" stroke="currentColor" strokeWidth="0.8" fill="none"/>
          <line x1="60" y1="6" x2="80" y2="6" stroke="currentColor" strokeWidth="0.8"/>
        </svg>
      </div>
    );
  }

  if (theme === "daggerheart") {
    return (
      <div className="separator-rune my-8" aria-hidden="true">
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none">
          <rect x="2" y="2" width="8" height="8" transform="rotate(45 6 6)" stroke="currentColor" strokeWidth="0.8" fill="none"/>
          <line x1="14" y1="6" x2="46" y2="6" stroke="currentColor" strokeWidth="0.8"/>
          <rect x="50" y="2" width="8" height="8" transform="rotate(45 54 6)" stroke="currentColor" strokeWidth="0.8" fill="none"/>
        </svg>
      </div>
    );
  }

  if (theme === "vampiro") {
    return (
      <div className="separator-rune my-8" aria-hidden="true">
        <svg width="100" height="16" viewBox="0 0 100 16" fill="none">
          <line x1="0" y1="6" x2="30" y2="6" stroke="currentColor" strokeWidth="0.7"/>
          {/* Drop 1 */}
          <ellipse cx="38" cy="8" rx="4" ry="6" stroke="currentColor" strokeWidth="0.7" fill="none"/>
          <line x1="38" y1="14" x2="38" y2="16" stroke="currentColor" strokeWidth="0.7"/>
          {/* Drop 2 */}
          <ellipse cx="50" cy="8" rx="4" ry="6" stroke="currentColor" strokeWidth="0.7" fill="none"/>
          <line x1="50" y1="14" x2="50" y2="16" stroke="currentColor" strokeWidth="0.7"/>
          {/* Drop 3 */}
          <ellipse cx="62" cy="8" rx="4" ry="6" stroke="currentColor" strokeWidth="0.7" fill="none"/>
          <line x1="62" y1="14" x2="62" y2="16" stroke="currentColor" strokeWidth="0.7"/>
          <line x1="70" y1="6" x2="100" y2="6" stroke="currentColor" strokeWidth="0.7"/>
        </svg>
      </div>
    );
  }

  return <div className="separator-rune my-8" aria-hidden="true" />;
}
```

- [ ] **Step 2: Substituir `app/sistemas-de-rpg/[sistema]/page.tsx`**

```tsx
import { getCharactersBySystem, getSystemList } from "@/lib/characters";
import CharacterCard from "@/components/characters/CharacterCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SystemThemeProvider, getThemeConfig, type SystemTheme } from "@/components/theme/ThemeProvider";
import { SYSTEM_LABELS } from "@/lib/system-labels";
import OrnamentLine from "@/components/ui/OrnamentLine";
import SystemWatermark from "@/components/theme/SystemWatermark";
import SystemSeparator from "@/components/theme/SystemSeparator";

export async function generateStaticParams() {
  return getSystemList().map((system) => ({ system }));
}

export default async function SystemPage({
  params,
}: {
  params: Promise<{ sistema: string }>;
}) {
  const { sistema } = await params;
  const characters = getCharactersBySystem(sistema);
  const label = SYSTEM_LABELS[sistema];

  if (!label) notFound();

  const config = getThemeConfig(sistema);
  const theme = config.theme as SystemTheme;

  return (
    <SystemThemeProvider system={sistema}>
      <div className="min-h-screen">
        {/* Hero */}
        <header className="system-hero-bg relative overflow-hidden" style={{ minHeight: "36vh" }}>
          <SystemWatermark theme={theme} />

          <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-8 pt-12 max-w-4xl mx-auto">
            <Link
              href="/sistemas-de-rpg"
              className="font-mono text-[10px] tracking-widest uppercase transition-colors mb-6 inline-block"
              style={{
                color: "var(--color-theme-text-dim)",
              }}
            >
              ← Todos os sistemas
            </Link>

            <div className="animate-fade-rise">
              <OrnamentLine
                color="var(--color-theme-brand)"
                opacity={0.45}
                width={180}
              />
            </div>

            <h1
              className={`font-display font-bold text-4xl md:text-5xl tracking-wider mt-2 animate-fade-rise-d1 ${
                theme === "vampiro" ? "glow-pulse-vampire" : "glow-pulse-gold"
              }`}
              style={{
                color: "var(--color-theme-bone)",
                textShadow: "0 0 50px var(--color-theme-glow)",
              }}
            >
              {label}
            </h1>

            <p
              className="font-mono text-xs mt-2 animate-fade-rise-d2"
              style={{ color: "var(--color-theme-text-dim)" }}
            >
              {characters.length} personagem{characters.length !== 1 ? "s" : ""}
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-10">
          <SystemSeparator theme={theme} />

          {characters.length === 0 ? (
            <div
              className="text-center py-16 border mt-4"
              style={{
                borderColor: "var(--color-theme-border)",
                background: "var(--color-theme-card)",
              }}
            >
              <span className="text-4xl block mb-4 opacity-30">📜</span>
              <p style={{ color: "var(--color-theme-text-dim)" }}>
                Nenhum personagem neste sistema ainda.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {characters.map((ch, i) => (
                <div
                  key={ch.id}
                  className="card-enter"
                  style={{ "--card-i": i } as React.CSSProperties}
                >
                  <CharacterCard character={ch} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </SystemThemeProvider>
  );
}
```

- [ ] **Step 3: Verificar cada sistema no browser**

```bash
npm run dev
```

Abrir e verificar:
- `http://localhost:3000/sistemas-de-rpg/dnd` → hero com frame duplo vermelho, watermark de cruz medieval, glow dourado
- `http://localhost:3000/sistemas-de-rpg/daggerheart` → hero laranja-jade, watermark geométrico, separador de losangos
- `http://localhost:3000/sistemas-de-rpg/vampiro` → hero bordeaux escuro, watermark de rosa gótica, separador de gotas, glow vampírico pulsante

- [ ] **Step 4: Build final sem erros**

```bash
npm run build
```

Esperado: build bem-sucedido sem erros de TypeScript ou ESLint.

- [ ] **Step 5: Commit final**

```bash
git add components/theme/SystemWatermark.tsx components/theme/SystemSeparator.tsx app/sistemas-de-rpg/[sistema]/page.tsx
git commit -m "feat: redesign páginas por sistema com hero temático, watermarks e separadores"
```

---

## Self-Review — Cobertura do Spec

| Requisito do Spec | Task que implementa |
|---|---|
| Renomeação "Forge RPG" → "Akasharium" | Task 4 |
| Hero home viewport completo + parallax | Task 3, 5 |
| Noise texture no hero | Task 1 (`.hero-bg`) |
| Gradiente radial animado | Task 1 (`bgGradientPulse`) |
| Partículas âmbar na home | Task 2, 3, 5 |
| Título AKASHARIUM com glow pulsante | Task 1 (`.glow-pulse-gold`), Task 3 |
| Animações de entrada (fadeRise) | Task 1, aplicadas em Tasks 3, 5, 6, 8 |
| Shimmer sweep no botão CTA | Task 1 (`.shimmer-btn`) |
| OrnamentLine SVG reutilizável | Task 2 |
| Seção sistemas com cards temáticos | Task 5 |
| Cards com hover glow + translateY | Task 1 (`.system-card`), Tasks 5, 6 |
| Animação de entrada escalonada | Task 1 (`.card-enter`, `--card-i`) |
| Hero compacto em `/sistemas-de-rpg` | Task 6 |
| Grid responsivo de sistemas | Task 6 |
| D&D: frame duplo + crimson | Task 1 (CSS), Task 7, 8 |
| Daggerheart: laranja-jade | Task 1 (CSS), Task 7, 8 |
| Vampiro: bordeaux escuro + glow pulsante | Task 1 (CSS + `vampireGlowPulse`), Task 7, 8 |
| Watermarks SVG por sistema | Task 7 |
| Separadores por sistema | Task 8 |
| `useParallax` hook | Task 3 |
| Header adicionado ao layout | Task 4 |
